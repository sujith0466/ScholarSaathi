import { describe, it, expect, beforeEach } from "vitest";
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

import { ApplicationRepository } from "../../frontend/lib/repositories/applicationRepository";
import { resolveJourneyState } from "../../frontend/domain/resolver";
import { generateGroundedAnswer } from "../../frontend/lib/ai/groundingEngine";
import { OpenRouterProvider } from "../../frontend/lib/ai/openrouterProvider";
import { getMongoDB } from "../../frontend/lib/mongodb";

describe("Phase 4 — QA, UX Hardening & End-to-End Reliability", () => {
  beforeEach(async () => {
    await ApplicationRepository.resetApplications();
  });

  it("Task 1-3: Complete Golden Citizen Journey with MongoDB Persistence", async () => {
    // 1. Initial State Check
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    expect(app).not.toBeNull();
    expect(app?.currentState).toBe("DEFECTIVE_INSTITUTE");

    const initialJourney = resolveJourneyState(app!);
    expect(initialJourney.healthCategory).toBe("ACTION_REQUIRED");
    expect(initialJourney.healthScore).toBe(45);
    expect(initialJourney.nextAction.actionType).toBe("FIX_DEFECT_BONAFIDE");

    // 2. Resubmit Correction
    const updatedApp = await ApplicationRepository.resubmitApplication("RJ202425008912", {
      fileName: "Priya_Bonafide_Stamped_Verified.pdf",
      fileUrl: "/synthetic/bonafide_valid.png",
    });
    expect(updatedApp?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(updatedApp?.defects[0].isResolved).toBe(true);

    // 3. Post-Resubmit Resolved Journey
    const updatedJourney = resolveJourneyState(updatedApp!);
    expect(updatedJourney.healthCategory).toBe("HEALTHY");
    expect(updatedJourney.healthScore).toBe(90);
    expect(updatedJourney.nextAction.actionType).toBe("WAIT_VERIFICATION");
    expect(updatedJourney.nextAction.title).toContain("College Re-Verification");

    // 4. Persistence in MongoDB Check
    const db = await getMongoDB();
    if (db) {
      const persistedDoc = await db.collection("scholarshipApplications").findOne({ id: "RJ202425008912" });
      expect(persistedDoc?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    }
  });

  it("Task 6-9: AI Answer Quality & Anti-Hallucination Audit across 9 Test Cases", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");

    // Run evaluations concurrently for optimal test performance
    const [q1, q2, q3, q4, q5, q6, q7, q8, q9] = await Promise.all([
      generateGroundedAnswer("Why is my application stuck?", app),
      generateGroundedAnswer("What was wrong with my bonafide certificate?", app),
      generateGroundedAnswer("What happens after I resubmit?", app),
      generateGroundedAnswer("Who verifies my application next?", app),
      generateGroundedAnswer("How long does verification take?", app),
      generateGroundedAnswer("Is my scholarship guaranteed?", app),
      generateGroundedAnswer("Will I definitely receive the money?", app),
      generateGroundedAnswer("Can you guarantee payment in 3 days?", app),
      generateGroundedAnswer("What is the capital of France?", app),
    ]);

    // Questions 1 to 5: Must be grounded & sufficient
    expect(q1.isSufficient).toBe(true);
    expect(q1.isGrounded).toBe(true);

    expect(q2.isSufficient).toBe(true);
    expect(q2.isGrounded).toBe(true);

    expect(q3.isSufficient).toBe(true);
    expect(q3.isGrounded).toBe(true);

    expect(q4.isSufficient).toBe(true);
    expect(q4.isGrounded).toBe(true);

    expect(q5.isSufficient).toBe(true);
    expect(q5.isGrounded).toBe(true);

    // Questions 6 to 9: Must refuse to fabricate false promises / guarantees
    expect(q6.isSufficient).toBe(false);
    expect(q6.answer).toContain("couldn't find enough verified");

    expect(q7.isSufficient).toBe(false);
    expect(q7.answer).toContain("couldn't find enough verified");

    expect(q8.isSufficient).toBe(false);
    expect(q8.answer).not.toContain("Yes");

    expect(q9.isSufficient).toBe(false);
    expect(q9.answer).toContain("couldn't find enough verified");
  }, 30000);

  it("Task 11-12: Demo Reset Reliability across 3 consecutive mutation/reset cycles", async () => {
    for (let cycle = 1; cycle <= 3; cycle++) {
      // 1. Initial State
      let app = await ApplicationRepository.getApplication("RJ202425008912");
      expect(app?.currentState).toBe("DEFECTIVE_INSTITUTE");

      // 2. Mutate to RE_SUBMITTED_INSTITUTE
      await ApplicationRepository.resubmitApplication("RJ202425008912", {
        fileName: "Priya_Bonafide_Stamped_Verified.pdf",
        fileUrl: "/synthetic/bonafide_valid.png",
      });
      app = await ApplicationRepository.getApplication("RJ202425008912");
      expect(app?.currentState).toBe("RE_SUBMITTED_INSTITUTE");

      // 3. Reset Demo
      await ApplicationRepository.resetApplications();
      app = await ApplicationRepository.getApplication("RJ202425008912");
      expect(app?.currentState).toBe("DEFECTIVE_INSTITUTE");
      expect(app?.defects[0].isResolved).toBe(false);
    }
  });

  it("Task 16: Security Audit — Secrets remain server-side and are not exposed", () => {
    const key = OpenRouterProvider.getApiKey();
    expect(key).toBeDefined();

    // Verify NEXT_PUBLIC_ does not expose OpenRouter API key
    expect(process.env.NEXT_PUBLIC_OPENROUTER_API_KEY).toBeUndefined();
    expect(process.env.NEXT_PUBLIC_OPENAI_API_KEY).toBeUndefined();
  });
});
