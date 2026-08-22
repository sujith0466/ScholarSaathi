import { describe, it, expect } from "vitest";
import { resolveJourneyState } from "../../frontend/domain/resolver";
import { initialApplications } from "../../frontend/lib/db/seedData";

describe("Journey State Resolver Tests", () => {
  it("should resolve Priya's initial state as ACTION_REQUIRED (Score 45)", () => {
    const priyaApp = initialApplications[0];
    const resolved = resolveJourneyState(priyaApp);

    expect(resolved.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(resolved.healthCategory).toBe("ACTION_REQUIRED");
    expect(resolved.healthScore).toBe(45);
    expect(resolved.isActionRequired).toBe(true);
    expect(resolved.nextAction.actionType).toBe("FIX_DEFECT_BONAFIDE");
  });

  it("should resolve Amit's state as HEALTHY (Score 100) and DISBURSED", () => {
    const amitApp = initialApplications[1];
    const resolved = resolveJourneyState(amitApp);

    expect(resolved.currentState).toBe("DISBURSED");
    expect(resolved.healthCategory).toBe("HEALTHY");
    expect(resolved.healthScore).toBe(100);
    expect(resolved.isActionRequired).toBe(false);
    expect(resolved.nextAction.actionType).toBe("NONE");
  });

  it("should resolve RE_SUBMITTED_INSTITUTE state as HEALTHY (Score 90)", () => {
    const resubmittedApp = {
      ...initialApplications[0],
      currentState: "RE_SUBMITTED_INSTITUTE" as const,
    };
    const resolved = resolveJourneyState(resubmittedApp);

    expect(resolved.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(resolved.healthCategory).toBe("HEALTHY");
    expect(resolved.healthScore).toBe(90);
    expect(resolved.isActionRequired).toBe(false);
    expect(resolved.nextAction.actionType).toBe("WAIT_VERIFICATION");
  });
});
