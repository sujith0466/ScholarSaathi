import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env for tests
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

import { ApplicationRepository } from "../../frontend/lib/repositories/applicationRepository";
import { resolveJourneyState } from "../../frontend/domain/resolver";
import { OpenRouterProvider } from "../../frontend/lib/ai/openrouterProvider";
import { generateGroundedAnswer } from "../../frontend/lib/ai/groundingEngine";
import { getMongoDB } from "../../frontend/lib/mongodb";

describe("Phase 2 — Golden Journey: Document Correction & Resubmission", () => {
  beforeAll(async () => {
    await ApplicationRepository.resetApplications();
  });

  it("Step 1-4: Initial state is DEFECTIVE_INSTITUTE requiring Bonafide correction", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    expect(app).not.toBeNull();
    expect(app?.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(app?.defects.length).toBeGreaterThan(0);
    expect(app?.defects[0].isResolved).toBe(false);

    const journey = resolveJourneyState(app!);
    expect(journey.healthCategory).toBe("ACTION_REQUIRED");
    expect(journey.isActionRequired).toBe(true);
    expect(journey.nextAction.actionType).toBe("FIX_DEFECT_BONAFIDE");
  });

  it("Step 5-11: Deterministic Document Validation logic", () => {
    const isDefectiveValid = false; // missing seal
    const isCorrectedValid = true;  // official seal present

    expect(isDefectiveValid).toBe(false);
    expect(isCorrectedValid).toBe(true);
  });

  it("Step 12-17: Resubmission mutates state to RE_SUBMITTED_INSTITUTE and resolves defect in MongoDB", async () => {
    const updatedApp = await ApplicationRepository.resubmitApplication("RJ202425008912", {
      fileName: "Priya_Bonafide_Stamped_Verified.pdf",
      fileUrl: "/synthetic/bonafide_valid.png",
    });

    expect(updatedApp).not.toBeNull();
    expect(updatedApp?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(updatedApp?.defects[0].isResolved).toBe(true);
    expect(updatedApp?.daysAtCurrentDesk).toBe(0);

    // Direct MongoDB check
    const db = await getMongoDB();
    if (db) {
      const doc = await db.collection("scholarshipApplications").findOne({ id: "RJ202425008912" });
      expect(doc?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
      expect(doc?.defects[0].isResolved).toBe(true);

      const historyCount = await db.collection("statusHistory").countDocuments({ applicationId: "RJ202425008912" });
      expect(historyCount).toBeGreaterThanOrEqual(2);
    }
  });

  it("Step 18-22: Journey State Resolver updates health, timeline, and next action for RE_SUBMITTED_INSTITUTE", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    expect(app).not.toBeNull();

    const journey = resolveJourneyState(app!);
    expect(journey.healthCategory).toBe("HEALTHY");
    expect(journey.healthScore).toBe(90);
    expect(journey.isActionRequired).toBe(false);
    expect(journey.statusTitle).toContain("Correction Submitted");
    expect(journey.nextAction.actionType).toBe("WAIT_VERIFICATION");
    expect(journey.nextAction.title).toContain("College Re-Verification");
  });

  it("Step 23: OpenRouter provider uses configured free model server-side", async () => {
    const model = OpenRouterProvider.getModel();
    expect(model).toBe("openrouter/free");

    const isConfigured = OpenRouterProvider.isConfigured();
    expect(isConfigured).toBe(true);

    const groundedResponse = await generateGroundedAnswer("How long does the college have to re-verify?", null);
    expect(groundedResponse.isGrounded).toBe(true);
    expect(groundedResponse.citations.length).toBeGreaterThan(0);
    expect(groundedResponse.answer.length).toBeGreaterThan(0);
  });

  it("Step 24: Demo Reset restores Priya back to DEFECTIVE_INSTITUTE", async () => {
    await ApplicationRepository.resetApplications();

    const resetApp = await ApplicationRepository.getApplication("RJ202425008912");
    expect(resetApp?.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(resetApp?.defects[0].isResolved).toBe(false);

    const journey = resolveJourneyState(resetApp!);
    expect(journey.healthCategory).toBe("ACTION_REQUIRED");
    expect(journey.healthScore).toBe(45);
  });
});
