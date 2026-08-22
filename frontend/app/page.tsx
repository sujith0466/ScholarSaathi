"use client";

import React from "react";
import { LandingNavbar } from "@/components/landing/Navbar";
import { LandingHeroSection } from "@/components/landing/HeroSection";
import { LandingProblemSection } from "@/components/landing/ProblemSection";
import { LandingTransformationSection } from "@/components/landing/TransformationSection";
import { LandingJourneySection } from "@/components/landing/JourneySection";
import { LandingDocumentInspectorShowcase } from "@/components/landing/DocumentInspectorShowcase";
import { LandingVeritasRAGShowcase } from "@/components/landing/VeritasRAGShowcase";
import { LandingTrustSection } from "@/components/landing/TrustSection";
import { LandingAccessibilitySection } from "@/components/landing/AccessibilitySection";
import { LandingFinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ScholarSaathiMotionBackground } from "@/components/background/ScholarSaathiMotionBackground";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Reusable Subtle Citizen Journey Motion Background */}
      <ScholarSaathiMotionBackground />

      {/* 2. Sticky Glassmorphic Navbar */}
      <LandingNavbar />

      {/* 3. Main Landing Narrative Flow */}
      <main className="relative z-10 flex-1">
        {/* Section 1: Hero */}
        <LandingHeroSection />

        {/* Section 2: The Citizen Confusion Problem */}
        <LandingProblemSection />

        {/* Section 3: The Before / After Transformation */}
        <LandingTransformationSection />

        {/* Section 4: 5-Step Citizen Journey */}
        <LandingJourneySection />

        {/* Section 5: Document Mismatch Inspector Showcase */}
        <LandingDocumentInspectorShowcase />

        {/* Section 6: Veritas-RAG Evidence-Grounded AI Showcase */}
        <LandingVeritasRAGShowcase />

        {/* Section 7: Trust, Ethics & Limitations */}
        <LandingTrustSection />

        {/* Section 8: Real India Accessibility & Low-Friction Design */}
        <LandingAccessibilitySection />

        {/* Section 9: Final Call to Action */}
        <LandingFinalCTA />
      </main>

      {/* 4. Civic Footer */}
      <LandingFooter />
    </div>
  );
}
