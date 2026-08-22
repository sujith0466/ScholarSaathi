"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ApplicationState } from "@/types";

interface ScholarSaathiMotionBackgroundProps {
  currentState?: ApplicationState;
}

export function ScholarSaathiMotionBackground({
  currentState = "DEFECTIVE_INSTITUTE",
}: ScholarSaathiMotionBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDefective = currentState === "DEFECTIVE_INSTITUTE";
  const isResubmitted = currentState === "RE_SUBMITTED_INSTITUTE";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-50/80"
    >
      {/* 1. Ambient Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100/60" />

      {/* 2. Soft Ambient Drift Shapes */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"
            animate={{
              x: [0, 40, -20, 0],
              y: [0, 30, -10, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-amber-100/25 blur-3xl"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 40, -20, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-indigo-100/20 blur-3xl"
            animate={{
              x: [0, 25, -25, 0],
              y: [0, -30, 15, 0],
            }}
            transition={{
              duration: 36,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* 3. Subtle Citizen Journey Flow SVG Curves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="journeyPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="stampRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Journey Primary Route Path */}
        <motion.path
          d="M -100 250 C 300 150, 600 400, 1100 220 S 1600 350, 1600 350"
          fill="none"
          stroke="url(#journeyPathGrad)"
          strokeWidth="2"
          strokeDasharray="6 6"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  strokeDashoffset: [0, -120],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Journey Secondary Route Path */}
        <motion.path
          d="M -50 480 C 400 620, 800 320, 1200 560 S 1550 420, 1550 420"
          fill="none"
          stroke="#94a3b8"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  strokeDashoffset: [0, 80],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* 4. Abstract Document Motifs & Checkpoint Nodes */}
        {/* Checkpoint 1: Submission */}
        <circle cx="280" cy="205" r="4" fill="#1e3a8a" fillOpacity="0.3" />
        <circle cx="280" cy="205" r="9" fill="none" stroke="#1e3a8a" strokeOpacity="0.15" strokeWidth="1" />

        {/* Checkpoint 2: Institute Verification (Active stage emphasis) */}
        <circle cx="650" cy="350" r="5" fill={isDefective ? "#d97706" : "#2563eb"} fillOpacity="0.5" />
        <motion.circle
          cx="650"
          cy="350"
          r="12"
          fill="none"
          stroke={isDefective ? "#d97706" : "#2563eb"}
          strokeOpacity="0.25"
          strokeWidth="1.5"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  r: [10, 16, 10],
                  opacity: [0.3, 0.6, 0.3],
                }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Checkpoint 3: District Verification */}
        <circle cx="980" cy="245" r="4" fill="#64748b" fillOpacity="0.25" />
        <circle cx="980" cy="245" r="8" fill="none" stroke="#64748b" strokeOpacity="0.12" strokeWidth="1" />

        {/* Checkpoint 4: Disbursement */}
        <circle cx="1320" cy="320" r="4" fill="#64748b" fillOpacity="0.2" />

        {/* Abstract Document Stamp Ring Motif */}
        <g transform="translate(1150, 620)">
          <circle cx="0" cy="0" r="48" fill="none" stroke="url(#stampRingGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="38" fill="none" stroke="#1e3a8a" strokeOpacity="0.08" strokeWidth="1" />
          {/* Subtle document line representation */}
          <line x1="-18" y1="-8" x2="18" y2="-8" stroke="#94a3b8" strokeOpacity="0.15" strokeWidth="1" />
          <line x1="-18" y1="0" x2="12" y2="0" stroke="#94a3b8" strokeOpacity="0.15" strokeWidth="1" />
          <line x1="-18" y1="8" x2="16" y2="8" stroke="#94a3b8" strokeOpacity="0.15" strokeWidth="1" />
        </g>
      </svg>

      {/* 5. Minimal Soft Floating Particles (Restrained to 8 subtle dots) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {[
            { top: "18%", left: "15%", delay: 0, duration: 16 },
            { top: "45%", left: "85%", delay: 2, duration: 20 },
            { top: "72%", left: "28%", delay: 4, duration: 18 },
            { top: "30%", left: "70%", delay: 1, duration: 22 },
            { top: "82%", left: "65%", delay: 3, duration: 19 },
            { top: "55%", left: "8%", delay: 5, duration: 24 },
          ].map((pt, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-slate-400/20"
              style={{ top: pt.top, left: pt.left }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: pt.duration,
                delay: pt.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
