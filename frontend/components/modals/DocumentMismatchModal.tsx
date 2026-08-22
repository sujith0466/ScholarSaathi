"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Upload,
  FileText,
  Stamp,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  XCircle,
} from "lucide-react";

interface DocumentMismatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  onResubmitSuccess: () => void;
}

export function DocumentMismatchModal({
  isOpen,
  onClose,
  applicationId,
  onResubmitSuccess,
}: DocumentMismatchModalProps) {
  const [documentOption, setDocumentOption] = useState<"CORRECTED" | "DEFECTIVE">("CORRECTED");
  const [checklist, setChecklist] = useState({
    nameRoll: true,
    academicYear: true,
    principalSeal: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Accessibility: Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const isDocumentValid = documentOption === "CORRECTED";
  const canSubmit = isDocumentValid && checklist.nameRoll && checklist.academicYear && checklist.principalSeal;

  const handleSubmit = async () => {
    if (!isDocumentValid) {
      setErrorMsg("Cannot submit defective document. Please select a valid Bonafide Certificate with the official circular seal.");
      return;
    }

    if (!checklist.nameRoll || !checklist.academicYear || !checklist.principalSeal) {
      setErrorMsg("Please verify all 3 mandatory verification criteria before resubmitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const fileName = documentOption === "CORRECTED"
        ? "Priya_Bonafide_Stamped_Verified.pdf"
        : "Priya_Bonafide_Unstamped_Defective.pdf";

      const res = await fetch(`/api/applications/${applicationId}/resubmit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          fileUrl: "/synthetic/bonafide_valid.png",
          isSealVerified: isDocumentValid,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onResubmitSuccess();
        onClose();
      } else {
        setErrorMsg(data.error || "Resubmission rejected by verification authority.");
      }
    } catch {
      setErrorMsg("Failed to communicate with the ScholarSaathi server. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-mismatch-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col focus:outline-none">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800" aria-hidden="true">
              <Stamp className="w-5 h-5" />
            </div>
            <div>
              <h3 id="document-mismatch-title" className="font-bold text-slate-900 text-base sm:text-lg">
                Document Mismatch Inspector
              </h3>
              <p className="text-xs text-slate-500">
                Resolving Verification Defect for Application <span className="font-mono font-semibold">#{applicationId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close document inspector dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* Defect Diagnosis Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs text-amber-950 space-y-1">
              <strong className="block font-bold text-sm text-amber-900">
                Official Defect Notice: Circular Institutional Seal Missing
              </strong>
              <p className="leading-relaxed">
                Govt. Degree College Nodal Officer flagged that your uploaded Bonafide Certificate contains student details, but lacks the mandatory circular stamp of the institution. Under NSP Section 4.2, an unsealed certificate cannot be verified.
              </p>
            </div>
          </div>

          {/* Side-by-Side Visual Comparison */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Visual Comparison & Defect Diff</span>
              <span className="text-[10px] text-slate-400 font-normal">Synthetic Demo Documents</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Flawed Upload */}
              <div className="border-2 border-red-200 bg-red-50/40 rounded-xl p-4 relative space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-red-100">
                  <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" /> 1. Current Defective Upload
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                    Defective ✗
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3 text-[11px] text-slate-700 space-y-2 shadow-inner font-mono">
                  <div className="text-center font-bold text-slate-900 border-b pb-1 text-[10px]">
                    GOVT. DEGREE COLLEGE, ALWAR
                  </div>
                  <div>Student: Priya Sharma</div>
                  <div>Course: B.Sc. Maths (Year 2)</div>
                  <div>Roll No: ALW-2023-BSC-089</div>
                  <div className="pt-2 flex justify-between items-center text-slate-500 border-t border-slate-100">
                    <span>Sign: Priya</span>
                    <span className="border-2 border-dashed border-red-500 bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-bold animate-pulse">
                      [STAMP MISSING]
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-red-700 font-medium">
                  ✗ Reason: Round seal missing from bottom right.
                </p>
              </div>

              {/* Required Standard */}
              <div className="border-2 border-emerald-300 bg-emerald-50/40 rounded-xl p-4 relative space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> 2. Expected Official Standard
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Accepted ✓
                  </span>
                </div>

                <div className="bg-white border border-emerald-200 rounded-lg p-3 text-[11px] text-slate-700 space-y-2 shadow-inner font-mono">
                  <div className="text-center font-bold text-slate-900 border-b pb-1 text-[10px]">
                    GOVT. DEGREE COLLEGE, ALWAR
                  </div>
                  <div>Student: Priya Sharma</div>
                  <div>Course: B.Sc. Maths (Year 2)</div>
                  <div>Roll No: ALW-2023-BSC-089</div>
                  <div className="pt-2 flex justify-between items-center text-slate-500 border-t border-slate-100">
                    <span>Sign: Priya</span>
                    <span className="border-2 border-emerald-600 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      [ROUND SEAL + SIGN]
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-800 font-medium">
                  ✓ Valid: Official college circular seal & principal signature present.
                </p>
              </div>
            </div>
          </div>

          {/* Document Selection & Deterministic Validation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
              Select Replacement File to Upload
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Valid Stamped */}
              <button
                type="button"
                onClick={() => {
                  setDocumentOption("CORRECTED");
                  setErrorMsg("");
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                  documentOption === "CORRECTED"
                    ? "border-blue-900 bg-blue-50/50 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" /> Stamped Bonafide (Corrected)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      VALID
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    Priya_Bonafide_Stamped_Verified.pdf
                  </p>
                </div>
                <div className="text-[10px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Principal Round Seal & Signature Verified
                </div>
              </button>

              {/* Option 2: Unstamped Defective */}
              <button
                type="button"
                onClick={() => {
                  setDocumentOption("DEFECTIVE");
                  setErrorMsg("Cannot submit defective document. Please select the stamped certificate.");
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                  documentOption === "DEFECTIVE"
                    ? "border-red-500 bg-red-50/50 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-600" aria-hidden="true" /> Unstamped Copy (Defective)
                    </span>
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                      INVALID
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    Priya_Bonafide_Unstamped_Defective.pdf
                  </p>
                </div>
                <div className="text-[10px] text-red-700 font-medium mt-2 flex items-center gap-1">
                  <X className="w-3 h-3" aria-hidden="true" /> Missing Institutional Stamp
                </div>
              </button>
            </div>
          </div>

          {/* Mandatory Confirmation Checklist */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Mandatory Confirmation Checklist
            </div>
            <div className="space-y-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.nameRoll}
                  onChange={(e) => setChecklist({ ...checklist, nameRoll: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-900 w-4 h-4"
                />
                <span>Student name (Priya Sharma) and Roll No (ALW-2023-BSC-089) match portal records</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.academicYear}
                  onChange={(e) => setChecklist({ ...checklist, academicYear: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-900 w-4 h-4"
                />
                <span>Academic Year specified as 2024-25</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.principalSeal}
                  onChange={(e) => setChecklist({ ...checklist, principalSeal: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-900 w-4 h-4"
                />
                <span className="font-semibold text-slate-900">
                  Principal circular official seal and authorized signature are clearly visible
                </span>
              </label>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
          >
            {isSubmitting ? (
              <span>Persisting Resubmission to MongoDB...</span>
            ) : (
              <>
                <span>Submit Corrected Document to College</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
