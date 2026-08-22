"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, AlertCircle, HelpCircle as Question, XCircle, ArrowDown } from "lucide-react";

export function LandingProblemSection() {
  const confusionQuestions = [
    { q: "What actually went wrong?", desc: "The portal displays 'DEFECTIVE_INSTITUTE' with zero guidance." },
    { q: "Which document was flagged?", desc: "Was it the income certificate, marksheet, or bonafide letter?" },
    { q: "Who needs to fix it?", desc: "Does the student upload a file, or does the college registrar take action?" },
    { q: "What happens after I resubmit?", desc: "Does the application start over from scratch or resume review?" },
    { q: "How long will verification take?", desc: "Is there a deadline or service level agreement before rejection?" },
  ];

  return (
    <section id="problem" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            The Public Digital Service Gap
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            When a status says <span className="text-amber-400 font-mono">“Defective”</span>, what are you supposed to do?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every year, thousands of Indian students lose access to scholarship disbursements not because they are ineligible, but because cryptic status codes leave them stranded with unanswered questions.
          </p>
        </div>

        {/* Confusing Portal Mock vs Citizen Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Legacy Bureaucratic Code Card */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="md:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-mono text-slate-400">Current Portal Status</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-800">
                OPAQUE
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="text-slate-500 text-[10px]">APPLICATION_STATUS:</div>
              <div className="text-amber-400 font-bold text-sm tracking-wide">
                DEFECTIVE_INSTITUTE_L1
              </div>
              <div className="text-slate-500 text-[11px] pt-1">
                REMARKS: DOC_VERIF_FAIL_CODE_402
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic">
              “No explanation of which document failed, what needs fixing, or how many days remain before permanent closure.”
            </p>
          </motion.div>

          {/* Right: The 5 Questions the Student Asks */}
          <div className="md:col-span-7 space-y-2.5">
            {confusionQuestions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-amber-500/30">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {item.q}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Lesson Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-800/40 border border-slate-700 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
            💡 <strong>The Core Realization:</strong> The challenge in public digital services isn’t merely submitting an application — it is understanding what happened after something goes wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
