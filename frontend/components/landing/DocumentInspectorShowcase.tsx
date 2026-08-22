"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stamp, ShieldCheck, FileText, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export function LandingDocumentInspectorShowcase() {
  return (
    <section id="inspector" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
            Interactive Defect Diff Technology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Document Mismatch Inspector
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminate rejection cycles by visually comparing defective uploads with verified institutional standards before resubmitting.
          </p>
        </div>

        {/* Interactive Side-by-Side Diff Showcase */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Stamp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Bonafide Certificate Verification Diff
                </h3>
                <p className="text-xs text-slate-500">
                  Govt. Degree College, Alwar • Roll No: ALW-2023-BSC-089
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-white text-slate-500 px-3 py-1 rounded-full border border-slate-200">
              Synthetic Demonstration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defective Document View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="border-2 border-red-200 bg-red-50/40 rounded-2xl p-5 space-y-3 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-red-100">
                <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> 1. Uploaded Copy (Defective)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                  Defective ✗
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 shadow-inner font-mono">
                <div className="text-center font-bold text-slate-900 border-b pb-1 text-[11px]">
                  GOVT. DEGREE COLLEGE, ALWAR
                </div>
                <div>Student: Priya Sharma</div>
                <div>Course: B.Sc. Maths (Year 2)</div>
                <div className="pt-2 flex justify-between items-center text-slate-500 border-t border-slate-100">
                  <span>Sign: Priya</span>
                  <span className="border-2 border-dashed border-red-500 bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                    [CIRCULAR STAMP MISSING]
                  </span>
                </div>
              </div>

              <p className="text-xs text-red-700 font-medium">
                ✗ Reason: College nodal officer flagged missing official round seal.
              </p>
            </motion.div>

            {/* Expected Standard Document View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="border-2 border-emerald-300 bg-emerald-50/40 rounded-2xl p-5 space-y-3 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 2. Expected Standard (Verified)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Accepted ✓
                </span>
              </div>

              <div className="bg-white border border-emerald-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 shadow-inner font-mono">
                <div className="text-center font-bold text-slate-900 border-b pb-1 text-[11px]">
                  GOVT. DEGREE COLLEGE, ALWAR
                </div>
                <div>Student: Priya Sharma</div>
                <div>Course: B.Sc. Maths (Year 2)</div>
                <div className="pt-2 flex justify-between items-center text-slate-500 border-t border-slate-100">
                  <span>Sign: Priya</span>
                  <span className="border-2 border-emerald-600 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    [ROUND SEAL + SIGN] ✓
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-800 font-medium">
                ✓ Valid: Principal circular seal and signature verified.
              </p>
            </motion.div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Deterministic validation blocks defective resubmissions before reaching college desks.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
