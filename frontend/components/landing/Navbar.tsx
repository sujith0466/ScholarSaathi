"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Menu, X, ShieldCheck } from "lucide-react";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-800 transition-colors">
            <GraduationCap className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                ScholarSaathi
              </span>
              <span className="text-xs font-semibold text-blue-900">
                (स्कॉलर साथी)
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block">
              Citizen Scholarship Journey & Defect Guide
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
          <a
            href="#problem"
            className="hover:text-blue-900 transition-colors"
          >
            The Problem
          </a>
          <a
            href="#journey"
            className="hover:text-blue-900 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#inspector"
            className="hover:text-blue-900 transition-colors"
          >
            Document Inspector
          </a>
          <a
            href="#rag"
            className="hover:text-blue-900 transition-colors"
          >
            Veritas-RAG
          </a>
          <a
            href="#trust"
            className="hover:text-blue-900 transition-colors"
          >
            Trust & Safety
          </a>
        </nav>

        {/* Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Try Citizen Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile navigation menu"
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 text-xs font-medium text-slate-700">
            <a
              href="#problem"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-50"
            >
              The Problem
            </a>
            <a
              href="#journey"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-50"
            >
              How It Works
            </a>
            <a
              href="#inspector"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-50"
            >
              Document Inspector
            </a>
            <a
              href="#rag"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-50"
            >
              Veritas-RAG AI Assistant
            </a>
            <a
              href="#trust"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-50"
            >
              Trust & Safety
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/app"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 text-white font-semibold text-xs shadow-sm"
            >
              <span>Try Citizen Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
