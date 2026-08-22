"use client";

import React from "react";
import { HealthCategory } from "@/types";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

interface HealthBadgeProps {
  category: HealthCategory;
  score: number;
}

export function HealthBadge({ category, score }: HealthBadgeProps) {
  const config = {
    ACTION_REQUIRED: {
      label: "Action Required",
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-900",
      badge: "bg-amber-500 text-white",
      icon: ShieldAlert,
    },
    ATTENTION_REQUIRED: {
      label: "Attention Needed",
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-900",
      badge: "bg-yellow-500 text-slate-950",
      icon: AlertTriangle,
    },
    HEALTHY: {
      label: "Healthy & On Track",
      bg: "bg-emerald-50",
      border: "border-emerald-300",
      text: "text-emerald-900",
      badge: "bg-emerald-600 text-white",
      icon: ShieldCheck,
    },
  }[category];

  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-between p-3.5 rounded-xl border ${config.bg} ${config.border} shadow-sm`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`p-2 rounded-lg ${config.badge}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Scholarship Health Check
          </div>
          <div className={`text-sm font-bold ${config.text}`}>{config.label}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-black text-slate-900">{score}<span className="text-xs text-slate-400 font-normal">/100</span></div>
        <div className="text-[10px] text-slate-500 font-medium">Diagnostic Index</div>
      </div>
    </div>
  );
}
