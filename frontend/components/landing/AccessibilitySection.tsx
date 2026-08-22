"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Sparkles, Languages, EyeOff, ShieldCheck, HeartHandshake } from "lucide-react";

export function LandingAccessibilitySection() {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First (390px+)",
      desc: "Engineered specifically for low-cost Android smartphones and fluctuating 4G networks common across rural and semi-urban India.",
    },
    {
      icon: Languages,
      title: "Zero Bureaucratic Jargon",
      desc: "INO, DNO, SNO, and PFMS are translated into plain-language concepts like 'College Verification Desk' and 'District Welfare Office'.",
    },
    {
      icon: EyeOff,
      title: "Reduced Motion & A11y",
      desc: "Full keyboard accessibility, high-contrast color ratios, semantic ARIA roles, and native support for prefers-reduced-motion.",
    },
    {
      icon: HeartHandshake,
      title: "Empathetic Reassurance",
      desc: "Eliminates anxiety by explicitly clarifying whether a defect means a scholarship is cancelled (it's not) and protecting the student's peace of mind.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-900 border border-indigo-200">
            Real India Inclusive Design
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Designed for the way people actually use public digital services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Public services must work for first-generation college students, slower connections, and mobile devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-2xs hover:bg-slate-100/50 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-blue-900 w-fit">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
