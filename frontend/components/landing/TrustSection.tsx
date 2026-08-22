"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileCheck2, Database, AlertCircle } from "lucide-react";

export function LandingTrustSection() {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: "Independent Citizen Prototype",
      desc: "ScholarSaathi is an independent public-interest prototype created for the Build What Moves India hackathon. We do not claim official government affiliation or endorsement.",
    },
    {
      icon: Lock,
      title: "Synthetic Privacy Protection",
      desc: "All demo personas (such as Priya Sharma) use 100% synthetic mock IDs, masked Aadhaar numbers, and test bank accounts. No real citizen data is collected or stored.",
    },
    {
      icon: FileCheck2,
      title: "Zero Hallucination Policy",
      desc: "Our Veritas-RAG AI assistant grounds every explanation in curated official public guidelines and refuses to make false promises about guaranteed approvals or payments.",
    },
    {
      icon: Database,
      title: "Deterministic State Decisions",
      desc: "AI never decides eligibility, document validity, or approval. All journey transitions and validations are governed by deterministic rule engines and real MongoDB persistence.",
    },
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
            Trust & Responsible AI
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Built to help citizens without pretending to be the government
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Honesty, transparency, and data integrity are built into every layer of the ScholarSaathi architecture.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustPoints.map((tp, idx) => {
            const Icon = tp.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-900 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-slate-900">{tp.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tp.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Civic Disclosure Callout */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>Public Service Disclaimer:</strong> ScholarSaathi is designed to sit alongside official portals like the National Scholarship Portal (NSP) as a clarifying guide, translating statuses and helping students resolve defects before official verification deadlines expire.
          </p>
        </div>
      </div>
    </section>
  );
}
