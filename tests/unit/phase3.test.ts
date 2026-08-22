import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      const val = vals.join("=").trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

import { scholarshipKnowledgeCorpus } from "../../frontend/lib/rag/knowledgeCorpus";
import { retrieveKnowledge } from "../../frontend/lib/rag/retriever";
import { generateGroundedAnswer } from "../../frontend/lib/ai/groundingEngine";
import { ApplicationRepository } from "../../frontend/lib/repositories/applicationRepository";
import { OpenRouterProvider } from "../../frontend/lib/ai/openrouterProvider";

describe("Phase 3 — Veritas-RAG Citizen Assistant & Grounding Suite", () => {
  beforeAll(async () => {
    await ApplicationRepository.resetApplications();
  });

  it("Task 1-3: Knowledge Corpus has honest source metadata and synthetic labeling", () => {
    expect(scholarshipKnowledgeCorpus.length).toBeGreaterThanOrEqual(6);
    
    scholarshipKnowledgeCorpus.forEach((doc) => {
      expect(doc.id).toBeDefined();
      expect(doc.title).toBeDefined();
      expect(["PUBLIC_OFFICIAL_SOURCE", "SYNTHETIC_PROTOTYPE_GUIDANCE"]).toContain(doc.sourceType);
      expect(doc.sourceName).toBeDefined();
      expect(doc.content.length).toBeGreaterThan(30);
      expect(doc.keywords.length).toBeGreaterThan(0);
    });

    const syntheticDoc = scholarshipKnowledgeCorpus.find((d) => d.sourceType === "SYNTHETIC_PROTOTYPE_GUIDANCE");
    expect(syntheticDoc).toBeDefined();
    expect(syntheticDoc?.sourceName).toContain("ScholarSaathi Prototype");
  });

  it("Task 4-7: Hybrid Retrieval & Ranking accurately retrieves top evidence", () => {
    const result = retrieveKnowledge("Why was my bonafide certificate rejected?");
    expect(result.isSufficient).toBe(true);
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence[0].title).toContain("Bonafide Certificate");
    expect(result.evidence[0].sourceType).toBe("PUBLIC_OFFICIAL_SOURCE");
    expect(result.evidence[0].relevanceScore).toBeGreaterThan(0.4);
  });

  it("Task 8-9: Demo Question 1 — 'Why was my scholarship application stopped?'", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    const response = await generateGroundedAnswer("Why was my scholarship application stopped?", app);

    expect(response.isGrounded).toBe(true);
    expect(response.isSufficient).toBe(true);
    expect(response.citations.length).toBeGreaterThan(0);
    expect(response.evidence.length).toBeGreaterThan(0);
    expect(response.confidenceScore).toBeGreaterThanOrEqual(0.6);
  });

  it("Task 8-9: Demo Question 2 — 'What was wrong with my bonafide certificate?'", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    const response = await generateGroundedAnswer("What was wrong with my bonafide certificate?", app);

    expect(response.isGrounded).toBe(true);
    expect(response.isSufficient).toBe(true);
    expect(response.answer.toLowerCase()).toMatch(/(seal|stamp|bonafide|defective)/);
    expect(response.evidence.length).toBeGreaterThan(0);
  });

  it("Task 8-9: Demo Question 3 — 'What happens after I resubmit?'", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    const response = await generateGroundedAnswer("What happens after I resubmit?", app);

    expect(response.isGrounded).toBe(true);
    expect(response.isSufficient).toBe(true);
    expect(response.evidence.length).toBeGreaterThan(0);
  });

  it("Task 8-9: Demo Question 4 — 'Who verifies my application next?'", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    const response = await generateGroundedAnswer("Who verifies my application next?", app);

    expect(response.isGrounded).toBe(true);
    expect(response.isSufficient).toBe(true);
    expect(response.evidence.some((e) => e.title.includes("Multi-Tier") || e.title.includes("Verification"))).toBe(true);
  });

  it("Task 8-9: Demo Question 5 — 'How long does verification take?'", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    const response = await generateGroundedAnswer("How long does verification take?", app);

    expect(response.isGrounded).toBe(true);
    expect(response.isSufficient).toBe(true);
    expect(response.answer).toContain("7");
  });

  it("Task 16-17: Anti-Hallucination Gate — Unsupported/Fabricated Claims are rejected", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");

    // Test 1: Fabricated guarantee claim
    const response1 = await generateGroundedAnswer("Is payment guaranteed within 3 days?", app);
    expect(response1.isSufficient).toBe(false);
    expect(response1.answer).toContain("couldn't find enough verified");
    expect(response1.answer).not.toContain("Yes, payment is guaranteed within 3 days");

    // Test 2: Out of domain question
    const response2 = await generateGroundedAnswer("What is the capital of France and how to make tea?", app);
    expect(response2.isSufficient).toBe(false);
    expect(response2.answer).toContain("couldn't find enough verified");
  });

  it("Task 10-12: OpenRouter provider uses configured free model server-side", () => {
    const model = OpenRouterProvider.getModel();
    expect(model).toBe("openrouter/free");
    expect(OpenRouterProvider.isConfigured()).toBe(true);
  });
});
