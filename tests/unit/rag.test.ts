import { describe, it, expect } from "vitest";
import { retrieveKnowledge } from "../../frontend/lib/rag/retriever";

describe("Veritas-RAG Retrieval Engine Tests", () => {
  it("should accurately retrieve defect verification SLA for timeline queries", () => {
    const result = retrieveKnowledge("How long does the college have to re-verify my application?");

    expect(result.isSufficient).toBe(true);
    expect(result.documents.length).toBeGreaterThan(0);
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence[0].sourceName).toContain("National Scholarship Portal");
    expect(result.evidence[0].sourceType).toBe("PUBLIC_OFFICIAL_SOURCE");
  });

  it("should accurately retrieve Bonafide requirements for seal inquiry", () => {
    const result = retrieveKnowledge("Why does my bonafide certificate need a stamp and seal?");

    expect(result.isSufficient).toBe(true);
    expect(result.documents[0].title).toContain("Bonafide Certificate");
    expect(result.evidence[0].sourceType).toBe("PUBLIC_OFFICIAL_SOURCE");
  });

  it("should accurately retrieve NPCI mapper guidance for bank DBT failure", () => {
    const result = retrieveKnowledge("My bank account is linked to Aadhaar, why did DBT payment fail?");

    expect(result.isSufficient).toBe(true);
    expect(result.documents[0].topic).toContain("DBT Bank Account Verification");
  });

  it("should enforce retrieval sufficiency and reject out-of-domain queries", () => {
    const result = retrieveKnowledge("What is the capital of France and what is the weather today?");

    expect(result.isSufficient).toBe(false);
    expect(result.documents.length).toBe(0);
    expect(result.evidence.length).toBe(0);
  });
});
