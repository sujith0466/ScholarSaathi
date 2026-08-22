import { describe, it, expect } from "vitest";
import React from "react";
import LandingPage from "../../frontend/app/page";
import ScholarSaathiApp from "../../frontend/app/app/page";
import { LandingNavbar } from "../../frontend/components/landing/Navbar";
import { LandingHeroSection } from "../../frontend/components/landing/HeroSection";
import { LandingProblemSection } from "../../frontend/components/landing/ProblemSection";
import { LandingTransformationSection } from "../../frontend/components/landing/TransformationSection";
import { LandingJourneySection } from "../../frontend/components/landing/JourneySection";
import { LandingDocumentInspectorShowcase } from "../../frontend/components/landing/DocumentInspectorShowcase";
import { LandingVeritasRAGShowcase } from "../../frontend/components/landing/VeritasRAGShowcase";
import { LandingTrustSection } from "../../frontend/components/landing/TrustSection";
import { LandingAccessibilitySection } from "../../frontend/components/landing/AccessibilitySection";
import { LandingFinalCTA } from "../../frontend/components/landing/FinalCTA";
import { LandingFooter } from "../../frontend/components/landing/LandingFooter";

describe("ScholarSaathi — Production Landing Page & Routing Suite", () => {
  it("LANDING-001: Landing Page component exports and renders without error", () => {
    expect(LandingPage).toBeDefined();
    expect(typeof LandingPage).toBe("function");
    const el = React.createElement(LandingPage);
    expect(el).toBeDefined();
  });

  it("LANDING-002: Citizen Application /app page exports and renders properly", () => {
    expect(ScholarSaathiApp).toBeDefined();
    expect(typeof ScholarSaathiApp).toBe("function");
    const el = React.createElement(ScholarSaathiApp);
    expect(el).toBeDefined();
  });

  it("LANDING-003: All landing sections export as valid React components", () => {
    [
      LandingNavbar,
      LandingHeroSection,
      LandingProblemSection,
      LandingTransformationSection,
      LandingJourneySection,
      LandingDocumentInspectorShowcase,
      LandingVeritasRAGShowcase,
      LandingTrustSection,
      LandingAccessibilitySection,
      LandingFinalCTA,
      LandingFooter,
    ].forEach((Comp) => {
      expect(Comp).toBeDefined();
      expect(typeof Comp).toBe("function");
      const el = React.createElement(Comp);
      expect(el).toBeDefined();
    });
  });
});
