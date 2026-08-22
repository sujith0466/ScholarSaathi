"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Stethoscope, MessageSquareText, Zap, Compass, CheckCircle2 } from "lucide-react";

export function LandingJourneySection() {
  const steps = [
    {
      num: "01",
      title: "UNDERSTAND",
      subtitle: "Plain-Language Status",
      desc: "Instantly know where your application stands across the 5-stage verification hierarchy without parsing bureaucratic portal terminology.",
      icon: Eye,
      color: "bg-blue-100 text-blue-900",
    },
    {
      num: "02",
      title: "DIAGNOSE",
      subtitle: "Root Cause Detection",
      desc: "Pinpoint the exact reason for an institutional defect down to the missing seal, mismatched roll number, or unverified income slab.",
      icon: Stethoscope,
      color: "bg-amber-100 text-amber-900",
    },
    {
      num: "03",
      title: "EXPLAIN",
      subtitle: "Veritas-RAG Guidance",
      desc: "Get answers to 'What happens next?' and 'Who verifies next?' strictly grounded in official guidelines with zero false promises.",
      icon: MessageSquareText,
      color: "bg-indigo-100 text-indigo-900",
    },
    {
      num: "04",
      title: "ACT",
      subtitle: "Single Clear Action",
      desc: "Follow one clear next step with pre-submission validation so you never submit an incomplete document twice.",
      icon: Zap,
      color: "bg-emerald-100 text-emerald-900",
    },
    {
      num: "05",
      title: "TRACK",
      subtitle: "Real Audit Trail",
      desc: "Watch real-time state transitions and SLA timelines update in MongoDB as your application advances back to verification.",
      icon: Compass,
      color: "bg-purple-100 text-purple-900",
    },
  ];

  return (
    <section id="journey" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-200">
            The 5-Step Citizen Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            How ScholarSaathi guides every applicant
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From initial confusion to successful verification, each stage provides actionable guidance.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono text-slate-400">
                      {step.num}
                    </span>
                    <div className={`p-2 rounded-xl ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                      {step.title}
                    </h3>
                    <h4 className="text-sm font-semibold text-blue-950 mt-0.5">
                      {step.subtitle}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Citizen Guaranteed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
