import { KnowledgeDocument } from "@/types";

export const scholarshipKnowledgeCorpus: KnowledgeDocument[] = [
  {
    id: "KB_001",
    schemeKey: "POST_MATRIC_ALL",
    category: "DEFECT_RESOLUTION",
    sourceType: "PUBLIC_OFFICIAL_SOURCE",
    sourceName: "National Scholarship Portal Institute Manual",
    section: "Defect Verification SLA & Timeline",
    clauseReference: "NSP Institute Manual: Defect Re-verification SLA",
    topic: "Institute Re-Verification Timeline",
    title: "Institute Defect Verification Window & 7-Day Re-Verification SLA",
    content: "When an application is marked DEFECTIVE by the Institute Nodal Officer (INO), the applicant is given a defect correction window. Once the student uploads the corrected document, the Institute Nodal Officer is expected to re-verify the application within 7 working days before system escalation alerts are triggered.",
    keywords: [
      "defective", "ino", "how long", "time", "days", "re-verify", "resubmit",
      "timeline", "window", "escalate", "deadline", "college verify",
      "stopped", "stuck", "hold", "paused", "verification take", "how many days", "sla"
    ],
  },
  {
    id: "KB_002",
    schemeKey: "POST_MATRIC_ALL",
    category: "VERIFICATION_SOP",
    sourceType: "PUBLIC_OFFICIAL_SOURCE",
    sourceName: "National Scholarship Portal Guidelines",
    section: "Mandatory Bonafide Certificate Standards",
    clauseReference: "NSP Guidelines: Bonafide Certificate Requirements",
    topic: "Bonafide Certificate Requirements",
    title: "Mandatory Bonafide Certificate Verification Standards",
    content: "A valid Institute Bonafide Certificate must contain: (1) Student's full registered name, (2) Current course name, academic year, and roll number, (3) Official circular institution seal / round stamp, and (4) Signature and designation of the College Principal or authorized Nodal Officer. Uploads without the official institutional circular seal are marked defective.",
    keywords: [
      "bonafide", "seal", "stamp", "principal", "signature", "college",
      "mandatory", "requirements", "document", "why need seal", "why need stamp",
      "rejected", "defective bonafide", "wrong with bonafide", "certificate defect",
      "why was my scholarship application stopped", "stopped"
    ],
  },
  {
    id: "KB_003",
    schemeKey: "POST_MATRIC_ALL",
    category: "VERIFICATION_SOP",
    sourceType: "PUBLIC_OFFICIAL_SOURCE",
    sourceName: "Centrally Sponsored Post-Matric Scholarship Scheme Guidelines",
    section: "Multi-Level Verification Hierarchy",
    clauseReference: "Post-Matric Guidelines: Verification Hierarchy",
    topic: "Scholarship Verification Stages",
    title: "Multi-Tier Verification Workflow & Subsequent Desks",
    content: "The scholarship verification workflow follows a sequential hierarchy: Level 1: Institute Nodal Officer (INO) verifies enrollment and bonafide. Level 2: District Welfare / Nodal Officer (DNO) verifies district quotas and domicile certificates. Level 3: State Nodal Department (SNO) prepares state sanction orders. Level 4: PFMS / Ministry verifies bank Aadhaar seeding on the NPCI mapper and executes Direct Benefit Transfer (DBT).",
    keywords: [
      "hierarchy", "tiers", "stages", "ino", "dno", "sno", "pfms", "steps",
      "process", "after college", "next stage", "levels", "who verifies next",
      "next desk", "after resubmit", "what happens after i resubmit", "who verifies my application next"
    ],
  },
  {
    id: "KB_004",
    schemeKey: "POST_MATRIC_OBC",
    category: "ELIGIBILITY",
    sourceType: "PUBLIC_OFFICIAL_SOURCE",
    sourceName: "Ministry of Social Justice & Empowerment Guidelines",
    section: "Income Criteria for Post-Matric OBC Scheme",
    clauseReference: "Ministry Guidelines: OBC Income Ceiling",
    topic: "OBC Scheme Income Limits",
    title: "Post-Matric OBC Income Ceiling & Executive Certification",
    content: "For the Post-Matric Scholarship Scheme for OBC Students, the total annual family income from all sources must not exceed ₹2,50,000 (Two Lakh Fifty Thousand Rupees). The income certificate must be issued by a competent revenue authority (such as a Tehsildar or SDM) and remain valid for the current academic session.",
    keywords: [
      "income", "limit", "ceiling", "2.5 lakh", "obc", "eligibility", "tehsildar",
      "certificate", "family income", "income criteria", "annual income"
    ],
  },
  {
    id: "KB_005",
    schemeKey: "DBT_PFMS",
    category: "DBT_PAYMENT",
    sourceType: "PUBLIC_OFFICIAL_SOURCE",
    sourceName: "PFMS Direct Benefit Transfer Advisory",
    section: "Aadhaar Seeding vs NPCI Mapping",
    clauseReference: "PFMS Advisory: NPCI DBT Mapping Requirements",
    topic: "DBT Bank Account Verification",
    title: "Aadhaar Seeding on NPCI Mapper for Government Grants",
    content: "Linking Aadhaar to a bank account for SMS alerts (basic KYC) is not sufficient for receiving government scholarships. The bank account must be actively seeded on the NPCI (National Payments Corporation of India) mapper for Aadhaar Enabled Direct Benefit Transfer (DBT). Students can verify their status via the UIDAI Resident Portal or by submitting an NPCI DBT Mandate Form at their home bank branch.",
    keywords: [
      "npci", "aadhaar", "bank", "dbt", "pfms", "seeding", "payment failed",
      "utr", "money not received", "mapper", "disbursement failed", "bank account", "aadhaar seeding"
    ],
  },
  {
    id: "KB_006",
    schemeKey: "POST_MATRIC_ALL",
    category: "DEFECT_RESOLUTION",
    sourceType: "SYNTHETIC_PROTOTYPE_GUIDANCE",
    sourceName: "ScholarSaathi Prototype Guidance",
    section: "Simulated Defect Resubmission Flow",
    clauseReference: "ScholarSaathi Prototype: Defect Correction Guide",
    topic: "Citizen Next Steps for Defective Documents",
    title: "How to Correct and Re-Upload a Defective Document in ScholarSaathi",
    content: "In the ScholarSaathi prototype, if your document is marked defective: (1) Click 'Inspect Defect' on your dashboard to view the highlighted defect, (2) Ensure the official circular college seal is affixed, (3) Confirm the verification checklist, and (4) Click 'Submit Correction' to immediately re-queue your file for Institute Nodal Officer review.",
    keywords: [
      "how to fix", "how to resubmit", "resubmit", "correct document",
      "fix bonafide", "what should i do", "what to do next", "action required",
      "how to correct", "resubmission steps"
    ],
  },
];
