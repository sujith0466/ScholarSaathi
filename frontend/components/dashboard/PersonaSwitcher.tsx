"use client";

import React from "react";
import { User, CheckCircle2, AlertCircle } from "lucide-react";

interface PersonaSwitcherProps {
  currentAppId: string;
  onSelectApp: (id: string) => void;
}

export function PersonaSwitcher({ currentAppId, onSelectApp }: PersonaSwitcherProps) {
  const personas = [
    {
      id: "RJ202425008912",
      name: "Priya Sharma",
      course: "B.Sc. Maths Yr 2",
      college: "Govt Degree College, Alwar",
      tag: "Action Required: Defective Bonafide",
      isDefective: true,
      scheme: "Post-Matric OBC",
    },
    {
      id: "UP202425091844",
      name: "Amit Verma",
      course: "B.Com Yr 2",
      college: "KN Govt PG College, Gyanpur",
      tag: "Disbursed via DBT",
      isDefective: false,
      scheme: "Post-Matric SC",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Demo Citizen Profiles (Select Scenario)
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Click to test live state resolution & diagnosis
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {personas.map((p) => {
          const isSelected = currentAppId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectApp(p.id)}
              className={`text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? "border-blue-900 bg-blue-50/50 ring-2 ring-blue-900/10 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                    {p.name}
                    <span className="text-xs font-normal text-slate-500">({p.course})</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-[220px]">
                    {p.college}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    App ID: {p.id}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                      p.isDefective
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {p.isDefective ? (
                      <AlertCircle className="w-3 h-3 text-amber-700" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    )}
                    {p.isDefective ? "Defect Scenario" : "Completed Scenario"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
