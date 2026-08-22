import { describe, it, expect, beforeAll, afterAll } from "vitest";
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
import { getMongoClient } from "../../frontend/lib/mongodb";

describe("Phase 1.2 — API & Domain Resolver Integration Tests", () => {
  beforeEach(async () => {
    await ApplicationRepository.resetApplications();
  });



  it("should retrieve Priya Sharma's application (RJ202425008912) with DEFECTIVE_INSTITUTE", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");

    expect(app).not.toBeNull();
    expect(app?.id).toBe("RJ202425008912");
    expect(app?.student.name).toBe("Priya Sharma");
    expect(app?.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(app?.currentDesk).toBe("COLLEGE_INO");
  });

  it("should return null for non-existent application ID", async () => {
    const app = await ApplicationRepository.getApplication("NON_EXISTENT_ID_999");
    expect(app).toBeNull();
  });

  it("should resolve Priya's journey state with ACTION_REQUIRED and plain explanation", async () => {
    const app = await ApplicationRepository.getApplication("RJ202425008912");
    expect(app).not.toBeNull();

    const journey = resolveJourneyState(app!);

    expect(journey.healthCategory).toBe("ACTION_REQUIRED");
    expect(journey.healthScore).toBe(45);
    expect(journey.isActionRequired).toBe(true);
    expect(journey.statusTitle).toContain("Action Required");
    expect(journey.statusExplanation).toContain("Bonafide Certificate");
    expect(journey.nextAction.actionType).toBe("FIX_DEFECT_BONAFIDE");
    expect(journey.nextAction.deadlineDaysRemaining).toBe(9);
  });

  it("should resolve Amit Verma's application (UP202425091844) with DISBURSED and HEALTHY", async () => {
    const app = await ApplicationRepository.getApplication("UP202425091844");
    expect(app).not.toBeNull();

    const journey = resolveJourneyState(app!);

    expect(journey.healthCategory).toBe("HEALTHY");
    expect(journey.healthScore).toBe(100);
    expect(journey.isActionRequired).toBe(false);
    expect(journey.statusTitle).toContain("Disbursed");
  });
});
