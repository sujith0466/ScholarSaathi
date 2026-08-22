import { KnowledgeDocument, GroundedEvidenceItem } from "@/types";
import { scholarshipKnowledgeCorpus } from "./knowledgeCorpus";

export interface RetrievalResult {
  documents: KnowledgeDocument[];
  evidence: GroundedEvidenceItem[];
  topConfidence: number;
  isSufficient: boolean;
  normalizedQuery: string;
}

const STOPWORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to",
  "was", "were", "will", "with", "my", "your", "can", "i", "do", "does", "what",
]);

// Queries with unsupported or out-of-domain guarantee claims
const UNSUPPORTED_INTENTS = [
  "guarantee", "guaranteed", "3 days", "within 3 days",
  "capital of", "weather", "population", "make tea", "recipe",
  "stock price", "cryptocurrency", "booking", "flight"
];

export function retrieveKnowledge(query: string, topK: number = 2): RetrievalResult {
  const normalizedQuery = query.trim().toLowerCase();

  // Guard: Reject queries seeking unsupported guarantees or out-of-domain topics
  const hasUnsupportedIntent = UNSUPPORTED_INTENTS.some((term) => normalizedQuery.includes(term));
  if (hasUnsupportedIntent) {
    return {
      documents: [],
      evidence: [],
      topConfidence: 0.2,
      isSufficient: false,
      normalizedQuery,
    };
  }

  const rawTokens = normalizedQuery.split(/\W+/).filter((t) => t.length > 2);
  const queryTokens = rawTokens.filter((t) => !STOPWORDS.has(t));

  if (queryTokens.length === 0) {
    return {
      documents: [],
      evidence: [],
      topConfidence: 0,
      isSufficient: false,
      normalizedQuery,
    };
  }

  const scoredDocs = scholarshipKnowledgeCorpus.map((doc) => {
    let rawScore = 0;
    let matchCount = 0;

    // 1. Direct Keyword Phrase Matching (Strong signal)
    doc.keywords.forEach((kw) => {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        rawScore += 4.0;
        matchCount++;
      }
    });

    // 2. Title Token Overlap (Intent matching)
    const titleLower = doc.title.toLowerCase();
    queryTokens.forEach((token) => {
      if (titleLower.includes(token)) {
        rawScore += 3.0;
        matchCount++;
      }
    });

    // 3. Topic & Category Alignment
    if (normalizedQuery.includes(doc.topic.toLowerCase()) || normalizedQuery.includes(doc.category.toLowerCase())) {
      rawScore += 2.5;
      matchCount++;
    }

    // 4. Content Token Density
    const contentLower = doc.content.toLowerCase();
    queryTokens.forEach((token) => {
      if (contentLower.includes(token)) {
        rawScore += 1.0;
        matchCount++;
      }
    });

    // Normalize score to [0, 1] range
    const normalizedScore = matchCount > 0 ? Math.min(rawScore / 8.0, 0.98) : 0;

    return {
      doc,
      score: normalizedScore,
      matchCount,
    };
  });

  // Rank by descending score
  scoredDocs.sort((a, b) => b.score - a.score);

  const topMatches = scoredDocs.filter((m) => m.score >= 0.35).slice(0, topK);
  const bestScore = topMatches.length > 0 ? topMatches[0].score : 0;

  // Strict sufficiency check: requires minimum score and positive matches
  const isSufficient = bestScore >= 0.40 && topMatches.length > 0;

  const evidence: GroundedEvidenceItem[] = topMatches.map((m) => ({
    id: m.doc.id,
    title: m.doc.title,
    sourceType: m.doc.sourceType,
    sourceName: m.doc.sourceName,
    section: m.doc.section,
    clauseReference: m.doc.clauseReference,
    content: m.doc.content,
    relevanceScore: Math.round(m.score * 100) / 100,
  }));

  return {
    documents: isSufficient ? topMatches.map((m) => m.doc) : [],
    evidence: isSufficient ? evidence : [],
    topConfidence: isSufficient ? Math.min(Math.max(bestScore, 0.65), 0.95) : 0.35,
    isSufficient,
    normalizedQuery,
  };
}
