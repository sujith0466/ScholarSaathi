"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  Stamp,
} from "lucide-react";

export function LandingHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Build What Moves India 2026 • Citizen Guidance Prototype</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]"
            >
              Your scholarship shouldn’t be a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-800 to-amber-700">
                mystery.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              ScholarSaathi turns confusing scholarship statuses into plain-language explanations, specific next actions, and an audit trail you can actually understand.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Try the Citizen Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#journey"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 shadow-2xs transition-colors text-center"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Micro Trust Bullet Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Hallucinations (Veritas-RAG)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                <span>Real MongoDB Persistence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Interactive Defect Diff</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Signature Citizen Journey Flow Interactive Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-xl space-y-4 relative"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Live Journey Resolution
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  RJ202425008912
                </span>
              </div>

              {/* Journey Step Sequence */}
              <div className="space-y-2.5 text-xs">
                {/* 1. Submitted */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">1. Application Submitted</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Completed ✓
                  </span>
                </div>

                {/* 2. Institute Verification Defect */}
                <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-bounce" />
                      <span className="font-bold text-amber-900">2. Institute Verification</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                      Action Required ⚠
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900/90 leading-snug pl-6">
                    Bonafide Certificate flagged: <strong className="underline">Circular institutional stamp missing</strong>.
                  </p>
                </div>

                {/* 3. Document Inspector Diff */}
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                      <Stamp className="w-3.5 h-3.5 text-blue-900" /> Document Mismatch Inspector
                    </span>
                    <span className="text-[10px] text-blue-800 font-mono">1 Click Fix</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 text-[10px]">
                    <span className="text-red-700 line-through">Unstamped.pdf</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="text-emerald-700 font-bold">Stamped_Verified.pdf ✓</span>
                  </div>
                </div>

                {/* 4. Resolved State */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <div>
                      <span className="font-bold">3. Re-Submitted to College</span>
                      <p className="text-[10px] text-emerald-800 font-normal">Health: 90/100 (7-day re-verification SLA)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Queued
                  </span>
                </div>
              </div>

              {/* Persona Tag */}
              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100">
                <span>Applicant: Priya Sharma (B.Sc. Year 2)</span>
                <span>Govt. Degree College, Alwar</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
