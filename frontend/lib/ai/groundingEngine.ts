import { OpenRouterProvider } from "./openrouterProvider";
import { retrieveKnowledge } from "../rag/retriever";
import { GroundedAnswerResponse, ModelProvenance, ScholarshipApplication } from "@/types";

type OpenRouterEndpointMetadata = {
  provider?: string;
  model?: string;
  selected?: boolean;
};

type OpenRouterMetadata = {
  requested?: string;
  strategy?: string;
  summary?: string;
  endpoints?: {
    available?: OpenRouterEndpointMetadata[];
  };
  attempts?: Array<{
    provider?: string;
    model?: string;
    status?: number;
  }>;
};

function isOpenAIAuthoredModel(modelId: string | null, provider: string | null): boolean {
  return Boolean(
    modelId?.toLowerCase().startsWith("openai/") ||
      provider?.toLowerCase() === "openai"
  );
}

function inferFreeInference(
  requestedModel: string,
  actualModel: string | null,
  routeStrategy: string | null
): boolean | null {
  if (actualModel?.toLowerCase().endsWith(":free")) return true;
  if (routeStrategy === "free" || requestedModel === "openrouter/free") return true;
  if (actualModel) return false;
  return null;
}

function buildModelProvenance(args: {
  requestedModel: string;
  metadata?: OpenRouterMetadata;
  responseModel?: string | null;
  responseGeneratedByExternalModel: boolean;
  deterministicFallbackUsed: boolean;
}): ModelProvenance {
  const selectedEndpoint = args.metadata?.endpoints?.available?.find((endpoint) => endpoint.selected);
  const selectedAttempt = args.metadata?.attempts?.find((attempt) => attempt.status === 200);
  const provider = selectedEndpoint?.provider || selectedAttempt?.provider || null;
  const actualModel = selectedEndpoint?.model || selectedAttempt?.model || args.responseModel || null;
  const routeStrategy = args.metadata?.strategy || null;
  const metadataAvailable = Boolean(args.metadata);

  const notes: string[] = [];
  if (!metadataAvailable) {
    notes.push("OpenRouter metadata was not present on the response.");
  }
  if (args.requestedModel === "openrouter/free") {
    notes.push("openrouter/free is a routing alias, not a fixed model identifier.");
  }
  if (args.deterministicFallbackUsed) {
    notes.push("Answer came from deterministic Veritas-RAG synthesis after model unavailability or unusable output.");
  }

  return {
    requestedModel: args.requestedModel,
    actualModel,
    provider,
    modelId: actualModel,
    routeStrategy,
    isFreeInference: inferFreeInference(args.requestedModel, actualModel, routeStrategy),
    isOpenAIAuthored: isOpenAIAuthoredModel(actualModel, provider),
    responseGeneratedByExternalModel: args.responseGeneratedByExternalModel,
    deterministicFallbackUsed: args.deterministicFallbackUsed,
    metadataAvailable,
    notes,
  };
}

export async function generateGroundedAnswer(
  query: string,
  app: ScholarshipApplication | null
): Promise<GroundedAnswerResponse> {
  const retrieval = retrieveKnowledge(query);
  const requestedModel = OpenRouterProvider.getModel();

  // Insufficient Evidence Protection (No Hallucination Gate)
  if (!retrieval.isSufficient || retrieval.documents.length === 0) {
    return {
      answer:
        "I couldn't find enough verified scholarship policy guidance to answer this specific inquiry with certainty. For your security and to prevent any delay, we recommend reaching out directly to your College Nodal Officer (INO) or District Welfare Office.",
      citations: ["ScholarSaathi General Citizen Advisory"],
      evidence: [],
      confidenceScore: 0.35,
      suggestedFollowUps: [
        "Why is my application marked defective?",
        "What was wrong with my Bonafide Certificate?",
        "How long does college verification take?",
      ],
      isGrounded: false,
      isSufficient: false,
      isFallback: false,
      modelUsed: requestedModel,
      modelProvenance: buildModelProvenance({
        requestedModel,
        responseGeneratedByExternalModel: false,
        deterministicFallbackUsed: false,
      }),
    };
  }

  const contextChunks = retrieval.documents
    .map(
      (d, i) =>
        `[Source ${i + 1}: ${d.sourceName} | ${d.section || d.title}]\nType: ${d.sourceType}\nContent: ${d.content}`
    )
    .join("\n\n");

  const citations = retrieval.documents.map((d) => d.clauseReference || d.title);

  // Context Header
  const citizenContext = app
    ? `Student Name: ${app.student.name} | Application ID: ${app.id} | Current State: ${app.currentState} | Desk: ${app.currentDesk}`
    : "Citizen Applicant";

  const client = OpenRouterProvider.getClient();
  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: requestedModel,
        messages: [
          {
            role: "system",
            content: `You are ScholarSaathi's Grounded AI Citizen Assistant.
You assist Indian college students with scholarship verification questions in clear, empathetic, jargon-free English.

CRITICAL GROUNDING RULES:
1. Base your answer STRICTLY on the provided Context Chunks. DO NOT fabricate deadlines, clauses, rules, or promises.
2. If the user asks about their application, refer to their context (${citizenContext}).
3. Explain official guidelines simply and reassure the student.
4. Keep the answer concise (2-4 sentences max).
5. State the relevant source name or manual section.

CONTEXT CHUNKS:
${contextChunks}`,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.1,
        max_tokens: 280,
      });

      const responseWithMetadata = response as typeof response & {
        openrouter_metadata?: OpenRouterMetadata;
      };
      const rawAnswer = (response.choices[0]?.message?.content || "").trim();
      if (rawAnswer.length > 20 && !rawAnswer.toLowerCase().startsWith("user safety")) {
        return {
          answer: rawAnswer,
          citations,
          evidence: retrieval.evidence,
          confidenceScore: retrieval.topConfidence,
          suggestedFollowUps: [
            "What happens after college approval?",
            "Who verifies my application next?",
          ],
          isGrounded: true,
          isSufficient: true,
          isFallback: false,
          modelUsed: requestedModel,
          modelProvenance: buildModelProvenance({
            requestedModel,
            metadata: responseWithMetadata.openrouter_metadata,
            responseModel: response.model || null,
            responseGeneratedByExternalModel: true,
            deterministicFallbackUsed: false,
          }),
        };
      }
    } catch (err) {
      console.warn("OpenRouter invocation notice; using deterministic grounded synthesis fallback:", err);
    }
  }

  // Deterministic Grounded Synthesis Fallback
  const primaryDoc = retrieval.documents[0];
  let fallbackAnswer = "";
  const qLower = query.toLowerCase();

  if (qLower.includes("how long") || qLower.includes("time") || qLower.includes("days") || qLower.includes("verify")) {
    fallbackAnswer = `Once you upload and resubmit your corrected Bonafide Certificate, your Institute Nodal Officer (INO) has a mandatory maximum of **7 working days** to re-verify and approve your file before automatic escalation alerts are triggered.`;
  } else if (qLower.includes("bonafide") || qLower.includes("seal") || qLower.includes("stamp") || qLower.includes("defect") || qLower.includes("wrong") || qLower.includes("stopped")) {
    fallbackAnswer = `Under official standards, a valid Bonafide Certificate requires your name, roll number, course year, the Principal's signature, and the official circular college round stamp. Documents uploaded without the circular institutional seal are marked defective by college administration.`;
  } else if (qLower.includes("next") || qLower.includes("after") || qLower.includes("resubmit") || qLower.includes("who verifies")) {
    fallbackAnswer = `After you submit your correction, your file returns to Level 1: College Nodal Officer for re-verification, followed by Level 2: District Welfare Officer (DNO) review, State sanction order, and PFMS Direct Benefit Transfer (DBT).`;
  } else if (qLower.includes("bank") || qLower.includes("npci") || qLower.includes("dbt") || qLower.includes("payment")) {
    fallbackAnswer = `For Direct Benefit Transfer (DBT) scholarship payments, your bank account must be actively seeded on the **NPCI mapper**. Standard KYC/SMS linking alone is not sufficient to receive central government grants.`;
  } else {
    fallbackAnswer = `${primaryDoc.content} (Source: ${primaryDoc.sourceName})`;
  }

  return {
    answer: fallbackAnswer,
    citations,
    evidence: retrieval.evidence,
    confidenceScore: retrieval.topConfidence,
    suggestedFollowUps: [
      "What happens after college approval?",
      "How long does the college have to re-verify?",
    ],
    isGrounded: true,
    isSufficient: true,
    isFallback: true,
    modelUsed: requestedModel,
    modelProvenance: buildModelProvenance({
      requestedModel,
      responseGeneratedByExternalModel: false,
      deterministicFallbackUsed: true,
    }),
  };
}
