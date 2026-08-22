"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 py-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                ScholarSaathi <span className="text-amber-400 font-normal">(स्कॉलर साथी)</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              An intelligent, citizen-first scholarship journey prototype turning opaque portal defect codes into transparent explanations and actionable fixes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Explore ScholarSaathi
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#problem" className="hover:text-amber-400 transition-colors">
                  The Problem
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-amber-400 transition-colors">
                  5-Step Journey
                </a>
              </li>
              <li>
                <a href="#inspector" className="hover:text-amber-400 transition-colors">
                  Document Inspector
                </a>
              </li>
              <li>
                <a href="#rag" className="hover:text-amber-400 transition-colors">
                  Veritas-RAG AI Assistant
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-amber-400 transition-colors">
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>

          {/* Citizen App Link */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Interactive Prototype
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Experience the complete browser-to-database golden journey with live MongoDB persistence.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs transition-colors"
            >
              <span>Launch Citizen Demo (/app)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Hackathon Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>Built for the <strong>Build What Moves India Hackathon 2026</strong>.</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Independent prototype • Not an official government website • 100% Synthetic Demo Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
