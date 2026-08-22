"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, XCircle, CheckCircle2, ShieldAlert, Sparkles, FileCheck } from "lucide-react";

export function LandingTransformationSection() {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200">
            The ScholarSaathi Transformation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            From cryptic error codes to actionable citizen clarity
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            See how ScholarSaathi transforms an intimidating portal defect code into a transparent, empathetic guidance experience.
          </p>
        </div>

        {/* Before vs After Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Before: Legacy Government Portal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-red-200/60">
                <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" /> BEFORE: Current Experience
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                  CONFUSING
                </span>
              </div>

              <div className="bg-white border border-red-200 rounded-xl p-4 space-y-3 font-mono text-xs shadow-inner">
                <div className="text-slate-500 text-[11px]">PORTAL VIEW:</div>
                <div className="text-red-700 font-bold text-sm">
                  STATUS: APPLICATION DEFECTIVE [INO_REV_402]
                </div>
                <div className="text-slate-600 text-xs font-sans">
                  "Application has been marked defective by INO. Candidate must rectify error."
                </div>
              </div>

              <div className="space-y-2 text-xs text-red-900/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>No indication of which document is defective</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>No visual preview of the error</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Student assumes their scholarship has been cancelled</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-100/60 rounded-xl text-red-900 text-xs font-medium text-center">
              Result: Citizen Panic, Helplessness, and Missed Deadlines
            </div>
          </motion.div>

          {/* After: ScholarSaathi */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border-2 border-blue-900 bg-blue-50/30 p-6 flex flex-col justify-between space-y-6 shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AFTER: ScholarSaathi Experience
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  CLEAR & EMPOWERING
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Action Required: Missing Institutional Seal</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Your College Nodal Officer noticed that your Bonafide Certificate is missing the required circular institutional seal. Your scholarship is not rejected.
                </p>
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
                  <span className="font-semibold">Next Action: Upload Stamped Bonafide</span>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded text-emerald-800 font-bold border border-emerald-200">
                    7-Day Re-Verification SLA
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Visual side-by-side mismatch comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Deterministic validation before resubmission</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Grounded AI answers backed by real policy evidence</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-900 text-white rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs">
              <span>Result: Citizen Understanding, Immediate Action, and Restored Peace of Mind</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
