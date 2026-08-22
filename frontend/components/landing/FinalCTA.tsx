"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function LandingFinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full border border-blue-400/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full border border-amber-400/20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Ready to Experience the Citizen Journey?
        </span>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Stop decoding scholarship statuses.
          <br />
          <span className="text-amber-400">Start knowing what to do next.</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Test the interactive Priya Sharma defect resolution journey, inspect synthetic documents, and query the Veritas-RAG AI assistant in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Citizen Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
          >
            Explore the 5-Step Journey
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-4">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free & Open Prototype
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Real MongoDB Backend
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Sign-up Required
          </span>
        </div>
      </div>
    </section>
  );
}
