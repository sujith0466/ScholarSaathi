"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, ShieldCheck, MessageSquare, AlertCircle, ArrowRight } from "lucide-react";

export function LandingVeritasRAGShowcase() {
  return (
    <section id="rag" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Anti-Hallucination AI Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Veritas-RAG: Answers grounded strictly in verified policy
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ScholarSaathi does not let language models guess rules or fabricate guarantees. Every answer is backed by verifiable public guidelines.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Architecture Flow */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              The 5-Stage Reliability Pipeline
            </h3>

            {[
              { num: "1", title: "Citizen Query", desc: "Citizen asks 'What happens after I resubmit?' in natural language." },
              { num: "2", title: "Intent & Domain Guard", desc: "Normalizes terms and checks if the question is in-domain." },
              { num: "3", title: "Hybrid Veritas-RAG Retrieval", desc: "Retrieves curated official SOP chunks with keyword & token alignment." },
              { num: "4", title: "Sufficiency Verification Gate", desc: "If evidence is insufficient (e.g. asking for false payment guarantees), refuses to hallucinate." },
              { num: "5", title: "Grounded Synthesis", desc: "Generates plain-language explanation with interactive evidence cards." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-xs"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5 border border-blue-500/40">
                  {step.num}
                </div>
                <div>
                  <div className="font-bold text-white">{step.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Live Chat Interaction Simulation */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Veritas-RAG Assistant</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Grounded
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Live RAG Engine</span>
              </div>

              {/* Chat Dialogue */}
              <div className="space-y-3 text-xs">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-900 text-white px-3.5 py-2.5 rounded-2xl rounded-br-none max-w-[80%]">
                    "What happens after I resubmit my Bonafide certificate?"
                  </div>
                </div>

                {/* Assistant Response */}
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none max-w-[95%] space-y-3">
                    <p className="leading-relaxed text-[11px]">
                      Once you upload your stamped Bonafide Certificate, your application returns to your College Nodal Officer (INO) in <strong className="text-amber-300">RE_SUBMITTED_INSTITUTE</strong> status. Under official guidelines, the college re-verifies within 7 working days before forwarding to the District Welfare Officer (DNO).
                    </p>

                    {/* Evidence Card */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-emerald-400" />
                          National Scholarship Portal Institute Manual
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                          Public Policy Source
                        </span>
                      </div>
                      <div className="text-slate-500 font-mono text-[9px]">
                        Section: Defect Verification SLA & Timeline
                      </div>
                      <p className="text-slate-400 italic">
                        “When an application is marked DEFECTIVE by INO, the applicant is given a defect correction window. Once uploaded, INO re-verifies within 7 working days.”
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-emerald-400 pt-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Veritas-RAG Grounded Confidence: 95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
