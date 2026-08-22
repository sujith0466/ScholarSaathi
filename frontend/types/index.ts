export type ApplicationState = 
  | "DRAFT"
  | "SUBMITTED"
  | "INSTITUTE_VERIFICATION"
  | "DEFECTIVE_INSTITUTE"
  | "RE_SUBMITTED_INSTITUTE"
  | "DISTRICT_VERIFICATION"
  | "STATE_VERIFICATION"
  | "DISBURSED";

export type HealthCategory = "HEALTHY" | "ATTENTION_REQUIRED" | "ACTION_REQUIRED";

export type DeskAuthority = "COLLEGE_INO" | "DISTRICT_DNO" | "STATE_SNO" | "PFMS_DBT" | "COMPLETED";

export type DocumentType = "BONAFIDE_CERTIFICATE" | "INCOME_CERTIFICATE" | "PREVIOUS_MARKSHEET" | "FEE_RECEIPT";

export interface Student {
  id: string; // "STUDENT_001"
  name: string; // "Priya Sharma"
  category: "OBC" | "SC" | "ST" | "GENERAL_EWS";
  stateOfDomicile: string; // "Rajasthan"
  institutionName: string; // "Govt. Degree College, Alwar"
  courseName: string; // "B.Sc. Mathematics (Year 2)"
  rollNumber: string; // "ALW-2023-BSC-089"
  maskedAadhaar: string; // "XXXX-XXXX-4819"
  maskedBankAccount: string; // "SBI - XXXX8912"
}

export interface ApplicationDefect {
  id: string; // "DEF_001"
  documentId: string; // "DOC_BONAFIDE_001"
  documentType: DocumentType;
  officialCode: string; // "INO_REJ_SEAL_MISSING"
  officialReason: string; // "Institution Seal / Principal Signature Missing"
  plainExplanation: string; // "Your college clerk noted that the uploaded Bonafide Certificate does not have the official round stamp of the Principal."
  correctionInstructions: string; // "Get the Bonafide stamped by the College Admin Office and re-upload."
  isResolved: boolean;
  flaggedAt: string; // ISO Timestamp
  resolvedAt?: string; // ISO Timestamp
}

export interface ApplicationDocument {
  id: string; // "DOC_BONAFIDE_001"
  applicationId: string;
  type: DocumentType;
  fileName: string; // "Priya_Bonafide_Unstamped.pdf"
  fileUrl: string;
  uploadDate: string;
  isDefective: boolean;
  defectDetails?: ApplicationDefect;
}

export interface StatusHistoryEntry {
  id: string;
  state: ApplicationState;
  desk: DeskAuthority;
  title: string;
  description: string;
  timestamp: string | null;
  isCompleted: boolean;
}

export interface ScholarshipApplication {
  id: string; // "RJ202425008912"
  studentId: string;
  student: Student;
  schemeName: string; // "Post-Matric Scholarship Scheme for OBC Students"
  academicYear: string; // "2024-2025"
  submissionDate: string;
  lastUpdated: string;
  currentState: ApplicationState;
  currentDesk: DeskAuthority;
  daysAtCurrentDesk: number;
  slaMaxDays: number;
  defects: ApplicationDefect[];
  documents: ApplicationDocument[];
  timeline: StatusHistoryEntry[];
}

export interface JourneyResolvedState {
  applicationId: string;
  currentState: ApplicationState;
  currentDesk: DeskAuthority;
  healthCategory: HealthCategory;
  healthScore: number; // 0 - 100
  statusTitle: string;
  statusExplanation: string;
  moneyReassurance: string;
  isActionRequired: boolean;
  nextAction: {
    actionType: "FIX_DEFECT_BONAFIDE" | "WAIT_VERIFICATION" | "NONE";
    title: string;
    description: string;
    ctaLabel: string;
    deadlineDaysRemaining?: number;
  };
}

export type KnowledgeSourceType = "PUBLIC_OFFICIAL_SOURCE" | "SYNTHETIC_PROTOTYPE_GUIDANCE";

export interface KnowledgeDocument {
  id: string;
  schemeKey: string;
  category: "ELIGIBILITY" | "VERIFICATION_SOP" | "DEFECT_RESOLUTION" | "DBT_PAYMENT";
  sourceType: KnowledgeSourceType;
  sourceName: string;
  sourceUrl?: string;
  section?: string;
  clauseReference: string;
  topic: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface GroundedEvidenceItem {
  id: string;
  title: string;
  sourceType: KnowledgeSourceType;
  sourceName: string;
  section?: string;
  clauseReference: string;
  content: string;
  relevanceScore: number;
}

export interface GroundedAnswerResponse {
  answer: string;
  citations: string[];
  evidence: GroundedEvidenceItem[];
  confidenceScore: number;
  suggestedFollowUps: string[];
  isGrounded: boolean;
  isSufficient: boolean;
  isFallback: boolean;
  modelUsed?: string;
  modelProvenance?: ModelProvenance;
}

export interface ModelProvenance {
  requestedModel: string;
  actualModel: string | null;
  provider: string | null;
  modelId: string | null;
  routeStrategy: string | null;
  isFreeInference: boolean | null;
  isOpenAIAuthored: boolean;
  responseGeneratedByExternalModel: boolean;
  deterministicFallbackUsed: boolean;
  metadataAvailable: boolean;
  notes: string[];
}
