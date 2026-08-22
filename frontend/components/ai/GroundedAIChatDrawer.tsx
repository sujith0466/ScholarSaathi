"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { GroundedAnswerResponse, GroundedEvidenceItem } from "@/types";

interface GroundedAIChatDrawerProps {
  applicationId: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: string[];
  evidence?: GroundedEvidenceItem[];
  confidenceScore?: number;
  isGrounded?: boolean;
  isSufficient?: boolean;
}

export function GroundedAIChatDrawer({ applicationId }: GroundedAIChatDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init_1",
      role: "assistant",
      content:
        "Namaste Priya! I am your Veritas-RAG Grounded Scholarship Assistant. I answer questions about your application status, verification desks, and document requirements using verified guidance. What would you like to know?",
      citations: ["NSP Guidelines: Verification SOP"],
      evidence: [
        {
          id: "KB_001",
          title: "Institute Defect Verification Window & 7-Day Re-Verification SLA",
          sourceType: "PUBLIC_OFFICIAL_SOURCE",
          sourceName: "National Scholarship Portal Institute Manual",
          section: "Defect Verification SLA & Timeline",
          clauseReference: "NSP Institute Manual: Defect Re-verification SLA",
          content: "When an application is marked DEFECTIVE by the Institute Nodal Officer (INO), the applicant is given a defect correction window. Once uploaded, INO re-verifies within 7 working days.",
          relevanceScore: 0.95,
        },
      ],
      confidenceScore: 0.95,
      isGrounded: true,
      isSufficient: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading]);

  const suggestedQuestions = [
    "Why is my application stuck?",
    "What was wrong with my bonafide certificate?",
    "What happens after I resubmit?",
    "Who verifies my application next?",
    "How long does verification take?",
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: q.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.trim(),
          applicationId,
        }),
      });

      const data: { success: boolean; data: GroundedAnswerResponse } = await res.json();

      if (data.success && data.data) {
        const assistantMsg: Message = {
          id: `ast_${Date.now()}`,
          role: "assistant",
          content: data.data.answer,
          citations: data.data.citations,
          evidence: data.data.evidence,
          confidenceScore: data.data.confidenceScore,
          isGrounded: data.data.isGrounded,
          isSufficient: data.data.isSufficient,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: "assistant",
            content: "We couldn't retrieve verified guidance right now. Please consult your College Nodal Officer.",
            citations: ["ScholarSaathi General Citizen Advisory"],
            confidenceScore: 0.4,
            isGrounded: false,
            isSufficient: false,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: "Failed to connect to the Veritas-RAG service. Please retry in a moment.",
          citations: [],
          confidenceScore: 0,
          isGrounded: false,
          isSufficient: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Veritas-RAG Grounded AI Assistant Drawer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-900 text-white font-semibold text-xs sm:text-sm shadow-xl hover:bg-blue-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-blue-700"
      >
        <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
        <span>Ask Veritas-RAG Assistant</span>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ScholarSaathi Grounded AI Assistant"
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-900 text-white" aria-hidden="true">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900">
                      ScholarSaathi Assistant
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Veritas-RAG
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Grounded in Verified Guidance • Zero Hallucinations
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant drawer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Non-Government Disclosure in Chat */}
            <div className="bg-amber-50/70 border-b border-amber-200/50 px-4 py-1.5 text-[10px] text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" aria-hidden="true" />
              <span>Independent hackathon prototype — AI explains policy, does not decide eligibility.</span>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-blue-900 text-white rounded-br-none"
                        : "bg-slate-50 text-slate-900 border border-slate-200 rounded-bl-none shadow-xs"
                    }`}
                  >
                    <p>{m.content}</p>

                    {/* Grounded Evidence Box */}
                    {m.role === "assistant" && m.evidence && m.evidence.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10px] space-y-2">
                        <div className="font-semibold text-slate-700 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-blue-900" aria-hidden="true" />
                          <span>Retrieved Evidence & Citations:</span>
                        </div>

                        {m.evidence.map((ev, i) => (
                          <div
                            key={i}
                            className="bg-white p-2 rounded-lg border border-slate-200 space-y-1"
                          >
                            <div className="flex items-center justify-between gap-1 flex-wrap">
                              <span className="font-bold text-slate-900 text-[10px]">
                                {ev.sourceName}
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                                  ev.sourceType === "PUBLIC_OFFICIAL_SOURCE"
                                    ? "bg-blue-50 text-blue-800 border border-blue-200"
                                    : "bg-amber-50 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {ev.sourceType === "PUBLIC_OFFICIAL_SOURCE"
                                  ? "Public Policy Source"
                                  : "Prototype Guidance"}
                              </span>
                            </div>
                            {ev.section && (
                              <div className="text-slate-600 text-[9px] font-mono">
                                Section: {ev.section}
                              </div>
                            )}
                            <p className="text-slate-600 text-[9px] line-clamp-2">
                              {ev.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {m.role === "assistant" && m.confidenceScore !== undefined && m.confidenceScore > 0 && (
                    <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1 pl-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                      <span>Veritas-RAG Grounded Confidence: {Math.round(m.confidenceScore * 100)}%</span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 max-w-[80%] animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-blue-900 animate-spin" aria-hidden="true" />
                  <span>Retrieving scheme guidelines & verifying grounding...</span>
                </div>
              )}
            </div>

            {/* Suggested Chips & Input */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
              {/* Quick suggestion chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                <HelpCircle className="w-3 h-3 text-slate-400 flex-shrink-0" aria-hidden="true" />
                {suggestedQuestions.map((sq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sq)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-medium transition-colors shadow-2xs"
                  >
                    {sq}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a scholarship rule or SLA question..."
                  aria-label="Scholarship question input"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 shadow-inner"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!query.trim() || isLoading}
                  aria-label="Send question"
                  className="p-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
