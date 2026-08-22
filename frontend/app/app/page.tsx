"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { PersonaSwitcher } from "@/components/dashboard/PersonaSwitcher";
import { HealthBadge } from "@/components/dashboard/HealthBadge";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { JourneyTimeline } from "@/components/dashboard/JourneyTimeline";
import { NextActionHero } from "@/components/dashboard/NextActionHero";
import { DocumentMismatchModal } from "@/components/modals/DocumentMismatchModal";
import { GroundedAIChatDrawer } from "@/components/ai/GroundedAIChatDrawer";
import { ScholarSaathiMotionBackground } from "@/components/background/ScholarSaathiMotionBackground";
import { ScholarshipApplication, JourneyResolvedState } from "@/types";
import { RefreshCw, CheckCircle2, SearchX, UserCheck } from "lucide-react";

export default function ScholarSaathiApp() {
  const [currentAppId, setCurrentAppId] = useState<string>("RJ202425008912");
  const [application, setApplication] = useState<ScholarshipApplication | null>(null);
  const [journey, setJourney] = useState<JourneyResolvedState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isMismatchModalOpen, setIsMismatchModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const fetchApplication = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const res = await fetch(`/api/applications/${id}`);
      const json = await res.json();

      if (res.status === 404) {
        setIsNotFound(true);
        setApplication(null);
        setJourney(null);
      } else if (json.success && json.data) {
        setApplication(json.data.application);
        setJourney(json.data.journey);
      } else {
        setError(json.error || "Failed to load application data.");
      }
    } catch {
      setError("Network connection issue. Could not reach ScholarSaathi backend.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplication(currentAppId);
  }, [currentAppId, fetchApplication]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await fetch("/api/applications/reset", { method: "POST" });
      await fetchApplication(currentAppId);
    } catch (err) {
      console.error("Reset failed:", err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleResubmitSuccess = () => {
    fetchApplication(currentAppId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* 1. Subtle Framer Motion Citizen Journey Background */}
      <ScholarSaathiMotionBackground currentState={application?.currentState} />

      {/* 2. Application Header */}
      <div className="relative z-20">
        <Header onReset={handleReset} isResetting={isResetting} />
      </div>

      {/* 3. State Transition Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-700"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <div>
            <div className="font-bold">Correction Successfully Submitted!</div>
            <div className="text-emerald-100 text-[11px] font-normal">
              State updated to Re-Submitted. College INO re-verification queued.
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Main Citizen Dashboard View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:px-6 space-y-6 relative z-10">
        {/* Scenario Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <PersonaSwitcher
            currentAppId={currentAppId}
            onSelectApp={(id) => setCurrentAppId(id)}
          />
        </motion.div>

        {/* Skeleton Loading State */}
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-56 bg-slate-200/70 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-20 bg-slate-200/70 rounded-2xl"></div>
                <div className="h-32 bg-slate-200/70 rounded-2xl"></div>
              </div>
            </div>
            <div className="h-28 bg-slate-200/70 rounded-2xl"></div>
            <div className="h-64 bg-slate-200/70 rounded-2xl"></div>
          </div>
        )}

        {/* Application Not Found State */}
        {isNotFound && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-2xl text-center space-y-3 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Application Not Found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No scholarship application with ID <code className="font-mono font-semibold">{currentAppId}</code> exists in the database.
            </p>
            <button
              onClick={() => setCurrentAppId("RJ202425008912")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" /> Load Priya Sharma Scenario
            </button>
          </motion.div>
        )}

        {/* Generic Error State */}
        {error && !isLoading && !isNotFound && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-red-50/90 backdrop-blur-xs border border-red-200 rounded-2xl text-center space-y-3"
          >
            <p className="text-sm text-red-800 font-semibold">{error}</p>
            <button
              onClick={() => fetchApplication(currentAppId)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-800 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Load
            </button>
          </motion.div>
        )}

        {/* Active Citizen Dashboard View (Driven 100% by MongoDB API) */}
        {!isLoading && !error && !isNotFound && application && journey && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Top Grid: Health Diagnostic Badge & Student Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <StatusCard journey={journey} application={application} />
              </div>

              <div className="space-y-4">
                <HealthBadge
                  category={journey.healthCategory}
                  score={journey.healthScore}
                />

                <div className="bg-white/90 backdrop-blur-xs border border-slate-200 rounded-2xl p-4 shadow-sm text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      Student Profile
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Synthetic Citizen Data</span>
                  </div>

                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Applicant</span>
                    <span className="font-semibold text-slate-800">{application.student.name}</span>
                  </div>

                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Course & Year</span>
                    <span className="font-medium text-slate-800">{application.student.courseName}</span>
                  </div>

                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Category</span>
                    <span className="font-semibold text-slate-800">{application.student.category}</span>
                  </div>

                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Institution</span>
                    <span className="font-medium text-slate-800 text-right truncate max-w-[170px]">{application.student.institutionName}</span>
                  </div>

                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-500">Bank Account</span>
                    <span className="font-mono text-slate-800">{application.student.maskedBankAccount}</span>
                  </div>

                  <div className="flex justify-between py-0.5 pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Aadhaar (Masked)</span>
                    <span className="font-mono text-slate-800">{application.student.maskedAadhaar}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Next Action Hero Card */}
            <NextActionHero
              journey={journey}
              onOpenMismatchModal={() => setIsMismatchModalOpen(true)}
            />

            {/* 5-Stage Verification Timeline */}
            <JourneyTimeline application={application} />
          </motion.div>
        )}
      </main>

      {/* Document Mismatch Modal */}
      <DocumentMismatchModal
        isOpen={isMismatchModalOpen}
        onClose={() => setIsMismatchModalOpen(false)}
        applicationId={currentAppId}
        onResubmitSuccess={handleResubmitSuccess}
      />

      {/* Grounded AI Assistant Drawer */}
      <GroundedAIChatDrawer applicationId={currentAppId} />

      {/* Civic Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-xs py-4 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ScholarSaathi (स्कॉलर साथी) — Build What Moves India Hackathon 2026</span>
          <span className="text-[11px] text-slate-400">
            Real MongoDB Persistence • Authoritative Journey Resolver • Veritas-RAG Grounding
          </span>
        </div>
      </footer>
    </div>
  );
}
