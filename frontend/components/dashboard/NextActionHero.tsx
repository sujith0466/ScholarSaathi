"use client";

import React from "react";
import { JourneyResolvedState } from "@/types";
import { ArrowRight, AlertCircle, FileSearch, CheckCircle2 } from "lucide-react";

interface NextActionHeroProps {
  journey: JourneyResolvedState;
  onOpenMismatchModal: () => void;
}

export function NextActionHero({ journey, onOpenMismatchModal }: NextActionHeroProps) {
  const { nextAction, isActionRequired } = journey;

  return (
    <div
      className={`rounded-2xl p-5 border shadow-sm transition-all ${
        isActionRequired
          ? "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white border-amber-400"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                isActionRequired
                  ? "bg-slate-950/25 text-amber-100"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {isActionRequired ? "Recommended Next Step" : "Active Stage"}
            </span>
            {nextAction.deadlineDaysRemaining && (
              <span className="text-xs font-semibold text-amber-100 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {nextAction.deadlineDaysRemaining} Days Remaining
              </span>
            )}
          </div>

          <h3 className={`text-lg font-bold ${isActionRequired ? "text-white" : "text-slate-900"}`}>
            {nextAction.title}
          </h3>

          <p className={`text-xs leading-relaxed ${isActionRequired ? "text-amber-50" : "text-slate-600"}`}>
            {nextAction.description}
          </p>
        </div>

        <div>
          {nextAction.actionType === "FIX_DEFECT_BONAFIDE" ? (
            <button
              onClick={onOpenMismatchModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-900 font-semibold text-sm shadow-lg transition-transform active:scale-95"
            >
              <FileSearch className="w-4 h-4 text-amber-400" />
              <span>{nextAction.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Action Needed Today</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
