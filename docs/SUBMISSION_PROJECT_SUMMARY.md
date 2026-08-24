# ScholarSaathi — Hackathon Project Summary

## Submission Summary

Every year, thousands of eligible Indian college students lose scholarship disbursements not because they were rejected, but because they couldn't understand what their application status actually meant. Codes like `DEFECTIVE_INSTITUTE` appear on portals with no plain-language explanation, no guidance on what to fix, and no reassurance that the scholarship is still within reach. First-generation students, often unfamiliar with bureaucratic systems, give up.

**ScholarSaathi** is a citizen-first scholarship status companion that transforms this experience. A student enters the dashboard, sees their application diagnosed in plain language, understands exactly which document is defective and why, inspects a side-by-side comparison of the defective and corrected versions, submits the corrected document, and immediately sees their application journey update.

The experience is backed by real MongoDB Atlas cloud persistence — state mutations are durable across sessions. A grounded AI assistant, Veritas-RAG, answers citizen questions using curated National Scholarship Portal policy knowledge with explicit citations and anti-hallucination sufficiency gates. It refuses to fabricate payment guarantees.

The AI layer uses OpenRouter free-model routing with deterministic grounded fallback. Codex was meaningfully involved throughout: architecture, domain resolver, MongoDB persistence, Veritas-RAG pipeline, testing (42/42 automated tests passing), accessibility hardening, deployment configuration, and documentation.

All student data is entirely synthetic. ScholarSaathi is an independent hackathon prototype with no government affiliation or official system integration.

---

## Word Count

**214 words**

---

## Submission Facts

| Field | Value |
| :--- | :--- |
| **Live URL** | https://scholar-saathi-woad.vercel.app/ |
| **Citizen Demo** | https://scholar-saathi-woad.vercel.app/app |
| **GitHub** | https://github.com/sujith0466/ScholarSaathi |
| **Hackathon** | Build What Moves India (2026) |
| **Product Status** | Feature-complete, production-deployed, browser QA verified |
| **AI Approach** | OpenRouter free-model routing with Veritas-RAG grounded retrieval and deterministic fallback synthesis |
| **Data Approach** | Entirely synthetic student personas; no real citizen data used |
| **Deployment** | Single full-stack Next.js 14 app on Vercel + MongoDB Atlas cloud persistence |
| **Codex Contribution** | Architecture, frontend, backend API routes, MongoDB persistence, Veritas-RAG AI pipeline, automated test suite, accessibility hardening, deployment configuration, documentation |

---

## Accuracy & Compliance Notes

| Requirement | Status | Notes |
| :--- | :---: | :--- |
| **Independent Prototype** | PASS | Explicitly disclosed in summary and on all application pages |
| **Synthetic Data** | PASS | All student identities (Priya Sharma, Amit Verma) are entirely fabricated; Aadhaar and bank details are masked mock values |
| **No Live Government Integration** | PASS | No connection to NSP, PFMS, UIDAI, NPCI, or any official government system |
| **OpenRouter Free-Model Inference** | PASS | Uses OPENROUTER_MODEL=openrouter/free; described accurately as OpenRouter free-model routing |
| **No OpenAI Model Claim** | PASS | Summary does not claim OpenAI authorship; modelProvenance.isOpenAIAuthored in API response is false |
| **Veritas-RAG Grounding** | PASS | Hybrid keyword/token retriever backed by curated NSP SOP knowledge corpus; sufficiency gates and source classification implemented |
| **Deterministic Fallback** | PASS | When OpenRouter is unavailable or returns unusable output, the deterministic grounding engine synthesizes a factual answer from retrieved policy chunks |
| **Meaningful Codex Contribution** | PASS | Codex authored the domain resolver, MongoDB layer, Veritas-RAG pipeline, all 9 test suites (42 tests), deployment configuration, and documentation |
| **No Government Endorsement** | PASS | No claims of partnership with, endorsement by, or affiliation with any Indian government agency |
| **No Production Adoption Overclaim** | PASS | Summary describes a prototype; no claims of active government or public deployment beyond this hackathon prototype |
