"use client";

import React from "react";
import { ScholarshipApplication } from "@/types";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface JourneyTimelineProps {
  application: ScholarshipApplication;
}

export function JourneyTimeline({ application }: JourneyTimelineProps) {
  const steps = [
    {
      title: "1. Application Submitted",
      desk: "Student Online Portal Submission",
      stateKey: "SUBMITTED",
    },
    {
      title: "2. Institute Verification",
      desk: application.student.institutionName || "College Nodal Officer (INO)",
      stateKey: "INSTITUTE_VERIFICATION",
    },
    {
      title: "3. District Verification",
      desk: "District Welfare Officer (DNO)",
      stateKey: "DISTRICT_VERIFICATION",
    },
    {
      title: "4. State Verification",
      desk: "State Nodal Department (SNO)",
      stateKey: "STATE_VERIFICATION",
    },
    {
      title: "5. Disbursement",
      desk: "PFMS / Direct Benefit Transfer (DBT)",
      stateKey: "DISBURSED",
    },
  ];

  const getStepStatus = (index: number) => {
    const state = application.currentState;

    if (state === "DISBURSED") return "COMPLETED";

    // Step 0: Application Submitted
    if (index === 0) return "COMPLETED";

    // Step 1: Institute Verification
    if (index === 1) {
      if (state === "DEFECTIVE_INSTITUTE") return "DEFECTIVE";
      if (state === "RE_SUBMITTED_INSTITUTE") return "IN_PROGRESS";
      if (state === "DISTRICT_VERIFICATION" || state === "STATE_VERIFICATION") return "COMPLETED";
      return "IN_PROGRESS";
    }

    // Step 2: District Verification
    if (index === 2) {
      if (state === "STATE_VERIFICATION") return "COMPLETED";
      if (state === "DISTRICT_VERIFICATION") return "IN_PROGRESS";
      return "PENDING";
    }

    // Step 3: State Verification
    if (index === 3) {
      if (state === "STATE_VERIFICATION") return "IN_PROGRESS";
      return "PENDING";
    }

    // Step 4: Disbursement
    return "PENDING";
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Official Verification Timeline
          </h3>
          <p className="text-xs text-slate-500">
            Real-time stage tracking across institutional and government verification desks
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          App ID: {application.id}
        </span>
      </div>

      <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const status = getStepStatus(idx);

          let Icon = Clock;
          let iconColor = "text-slate-400 bg-white border-slate-300";
          let textColor = "text-slate-500";
          let badgeText = "Pending";
          let badgeClass = "bg-slate-100 text-slate-600 border border-slate-200";

          if (status === "COMPLETED") {
            Icon = CheckCircle2;
            iconColor = "text-white bg-emerald-600 border-emerald-600";
            textColor = "text-slate-900 font-semibold";
            badgeText = "Completed ✓";
            badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-200";
          } else if (status === "DEFECTIVE") {
            Icon = AlertTriangle;
            iconColor = "text-white bg-amber-500 border-amber-500 animate-pulse";
            textColor = "text-amber-950 font-bold";
            badgeText = "Action Required ⚠";
            badgeClass = "bg-amber-100 text-amber-900 border border-amber-300 font-bold";
          } else if (status === "IN_PROGRESS") {
            Icon = Clock;
            iconColor = "text-white bg-blue-900 border-blue-900 animate-pulse";
            textColor = "text-blue-950 font-semibold";
            badgeText = "In Active Review";
            badgeClass = "bg-blue-50 text-blue-900 border border-blue-200";
          }

          return (
            <div key={idx} className="relative group">
              {/* Step Circle */}
              <div
                className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-xs ${iconColor}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Step Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className={`text-sm ${textColor}`}>{step.title}</h4>
                  <p className="text-xs text-slate-500">{step.desk}</p>
                </div>
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${badgeClass}`}>
                    {badgeText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* History Log Snippet */}
      {application.timeline.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Audit Trail & Event Log
          </div>
          <div className="space-y-2">
            {application.timeline.slice(-2).map((item, i) => (
              <div
                key={i}
                className="text-xs text-slate-600 flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80"
              >
                <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 flex-shrink-0 mt-0.5">
                  {formatDate(item.timestamp)}
                </span>
                <div>
                  <span className="font-semibold text-slate-800">{item.title}:</span>{" "}
                  <span className="text-slate-600">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
