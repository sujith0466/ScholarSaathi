"use client";

import React from "react";
import { GraduationCap, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  isResetting?: boolean;
}

export function Header({ onReset, isResetting }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Non-Government Disclosure Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-inner">
        <AlertTriangle className="w-3.5 h-3.5 text-slate-950 flex-shrink-0" />
        <span>
          PROTOTYPE SIMULATION — Uses Synthetic Data for Citizen Education. Not an Official Government Portal.
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-900 to-amber-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                ScholarSaathi <span className="text-sm font-medium text-amber-600">स्कॉलर साथी</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                <ShieldCheck className="w-3 h-3 text-blue-600" /> Veritas-RAG Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Citizen-First Scholarship Journey & Diagnosis Assistant
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            disabled={isResetting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-50"
            title="Reset to Initial Demo State"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
