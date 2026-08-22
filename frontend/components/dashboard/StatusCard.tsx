"use client";

import React from "react";
import { JourneyResolvedState, ScholarshipApplication } from "@/types";
import { Shield, Sparkles, Building2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StatusCardProps {
  journey: JourneyResolvedState;
  application: ScholarshipApplication;
}

export function StatusCard({ journey, application }: StatusCardProps) {
  const isDefective = application.currentState === "DEFECTIVE_INSTITUTE";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Top Meta info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-900 text-white">
            {application.schemeName.split("(")[0]}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {application.academicYear}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Current Desk: <strong className="text-slate-800">{application.currentDesk}</strong></span>
        </div>
      </div>

      {/* Main Status Diagnosis */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Plain-Language Status Diagnosis</span>
        </div>
        <h2 className="text-xl font-bold text-slate-950 tracking-tight mb-2">
          {journey.statusTitle}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {journey.statusExplanation}
        </p>
      </div>

      {/* Reassurance Banner */}
      <div
        className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
          isDefective
            ? "bg-amber-50/70 border-amber-200 text-amber-950"
            : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
        }`}
      >
        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-700" />
        <div className="text-xs font-medium leading-relaxed">
          <strong className="font-semibold block mb-0.5">
            {isDefective ? "Is your scholarship money safe?" : "Application Status Assurance"}
          </strong>
          {journey.moneyReassurance}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Last Updated: {formatDate(application.lastUpdated)}</span>
        <span>Days at Current Desk: {application.daysAtCurrentDesk} days</span>
      </div>
    </div>
  );
}
