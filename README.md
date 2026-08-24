# ScholarSaathi (स्कॉलर साथी)

> **Citizen-First Scholarship Status Diagnosis & Document Correction Experience**  
> *Built for the **Build What Moves India (2026)** Hackathon*

---

## 🌐 Live Production Links

| Resource | URL |
| :--- | :--- |
| 🚀 **Production Landing Page** | [https://scholar-saathi-woad.vercel.app/](https://scholar-saathi-woad.vercel.app/) |
| 🎓 **Live Citizen Demo Experience** | [https://scholar-saathi-woad.vercel.app/app](https://scholar-saathi-woad.vercel.app/app) |
| 💻 **GitHub Repository** | [https://github.com/sujith0466/ScholarSaathi](https://github.com/sujith0466/ScholarSaathi) |
| 🎥 **Final Demo Video** | [https://drive.google.com/file/d/11qxcqH8o_uh-pEQgRMj7v-_5r1_-T0lP/view?usp=sharing](https://drive.google.com/file/d/11qxcqH8o_uh-pEQgRMj7v-_5r1_-T0lP/view?usp=sharing) |

---

## 1. What is ScholarSaathi?

**ScholarSaathi** is an independent, citizen-facing digital service designed to demystify complex government scholarship application statuses for Indian college students. Instead of presenting cryptic acronyms (`DEFECTIVE_INSTITUTE`) and unexplained defect hold-ups, ScholarSaathi delivers plain-language diagnostics, actionable document-correction workflows, and grounded policy guidance.

> [!IMPORTANT]
> **Independent Hackathon Prototype Disclosure:**  
> ScholarSaathi is an independent prototype developed for the *Build What Moves India* hackathon. It is **not affiliated with, endorsed by, or connected to any official government department**, National Scholarship Portal (NSP), State Welfare Portal, UIDAI Aadhaar, Income Tax PAN, PFMS, or NPCI system. All student identities and documents demonstrated are entirely synthetic.

---

## 2. The Problem It Solves

Every year, thousands of eligible first-generation students in India face delayed or rejected scholarship disbursements due to:
- **Opaque Defect Codes:** Statuses like `DEFECTIVE_INSTITUTE` provide zero contextual explanation of what document is defective or why.
- **Missing Seal Ambiguities:** Documents uploaded without official circular institution stamps cause silent administrative hold-ups.
- **Confusion Between Rejection & Correction:** Students fear their scholarship has been canceled when it is merely in a defect-correction window.
- **Unreachable Support:** Lack of plain-language guidance explaining who verifies the application next (`INO`, `DNO`, `SNO`) and associated SLAs.

**ScholarSaathi transforms this experience into a 5-step journey:**  
`UNDERSTAND` ➔ `DIAGNOSE` ➔ `EXPLAIN` ➔ `ACT` ➔ `TRACK`

---

## 3. The Interactive Golden Journey (Try the Demo)

You can experience the complete browser-to-database golden journey live at [https://scholar-saathi-woad.vercel.app/app](https://scholar-saathi-woad.vercel.app/app):

```text
Landing Page (/)
    │  Click "Try Citizen Demo"
    ▼
Citizen Dashboard (/app)
    │  Loads synthetic applicant: Priya Sharma (RJ202425008912)
    ▼
Initial State: DEFECTIVE_INSTITUTE (Health Score 45/100)
    │  Plain-language diagnosis: "Your application is not rejected. One document needs correction."
    ▼
Inspect Defect (Document Mismatch Modal)
    │  Side-by-side visual diff circles missing circular Principal seal in red
    ▼
Select Verified Replacement
    │  Choose "Priya_Bonafide_Stamped_Verified.pdf" with circular institutional seal
    ▼
Submit Correction
    │  Deterministic pre-submission guard passes; triggers POST /api/applications/[id]/resubmit
    ▼
MongoDB Atlas State Mutation
    │  Application state updates atomically to RE_SUBMITTED_INSTITUTE in MongoDB
    ▼
Updated Dashboard (Health Score 90/100)
    │  Timeline advances to "College Re-Verification"; Next Action updates to 7-Day INO SLA
    ▼
Ask Veritas-RAG AI Assistant
    │  Ask "Why was my application marked defective?" or "How long does verification take?"
    │  Returns grounded answer backed by official NSP manual citations & evidence cards
    ▼
Reset Demo
    │  Click "Reset Demo State" in banner to re-seed MongoDB Atlas for repeat evaluations
```

---

## 4. Completed Feature Inventory

1. **Production Landing Page (`/`):** 11 responsive sections, signature animated *Citizen Journey Flow*, side-by-side defect diff showcase, and Veritas-RAG AI showcase.
2. **Citizen Application Experience (`/app`):** Full interactive browser-to-database golden journey for synthetic applicant **Priya Sharma (`RJ202425008912`)**.
3. **Deterministic Journey State Resolver:** Computes Diagnostic Health Score (45/100 ➔ 90/100), plain-language status explanations, reassurance messaging, and 5-stage verification timeline.
4. **Document Mismatch Inspector:** Side-by-side visual diff comparing defective uploads against verified institutional standards (highlighting missing circular college seals).
5. **Deterministic Validation & Resubmission:** Enforces valid document selection and executes atomic state transition to `RE_SUBMITTED_INSTITUTE` with 7-day college SLA.
6. **Cloud Database Persistence:** Real persistence powered by MongoDB Atlas across 5 collections (`students`, `scholarshipApplications`, `applicationDocuments`, `applicationDefects`, `statusHistory`).
7. **Veritas-RAG AI Assistant:** Grounded Q&A assistant backed by curated NSP scheme guidelines, source classification (`PUBLIC_OFFICIAL_SOURCE` vs `SYNTHETIC_PROTOTYPE_GUIDANCE`), hybrid keyword/token retrieval, sufficiency gates, and deterministic fallback synthesis.
8. **Anti-Hallucination Safeguards:** Refuses to fabricate unsupported payment guarantees, false approval claims, or out-of-domain answers.
9. **OpenRouter Free Model Routing:** Connects to available free models via `OPENROUTER_MODEL=openrouter/free` with deterministic grounded fallback.
10. **Framer Motion Visual System:** Calm, accessible ambient background with native `useReducedMotion()` support.
11. **Mobile-First Accessibility:** Optimized for 390px/412px viewports, keyboard Escape listener, ARIA modal dialogs, and high-contrast typography.
12. **Demo State Reset:** 1-click database reset restoring Priya Sharma to initial `DEFECTIVE_INSTITUTE` state for repeatable evaluation.

---

## 5. System Architecture

ScholarSaathi runs as **one unified full-stack Next.js 14 application on Vercel** with direct connection to MongoDB Atlas and OpenRouter:

```text
User Browser (Citizen / Judge)
  │
  ▼
Vercel Edge & Serverless Runtime (Single Next.js Full-Stack App)
  ├── Frontend Pages
  │     ├── /        (Master Production Landing Page)
  │     └── /app     (Interactive Citizen Application Dashboard)
  │
  ├── API Route Handlers (Server-Side Only)
  │     ├── GET  /api/applications/[id]          (Fetch & Resolve Journey State)
  │     ├── POST /api/applications/[id]/resubmit (Validate & Mutate State in Atlas)
  │     ├── POST /api/applications/reset         (Re-seed Atlas Demo State)
  │     └── POST /api/ai/ask                     (Veritas-RAG + OpenRouter AI)
  │
  ├── Persistence Layer
  │     └── MongoDB Atlas Cloud Cluster (`scholarsaathi` database)
  │
  └── AI & Grounding Layer
        ├── Curated Knowledge Corpus (Official NSP SOPs & Desks)
        ├── Hybrid Keyword + Token Density Retriever
        └── OpenRouter Free-Model Gateway with Grounded Synthesis Fallback
```

---

## 6. Technology Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Motion:** Tailwind CSS, Framer Motion, Lucide React
- **Database Engine:** MongoDB Native Node.js Driver (`mongodb: ^6.7.0`), MongoDB Atlas Cloud
- **AI / LLM Layer:** OpenAI SDK (`openai: ^4.52.0`), OpenRouter Free Model Routing, Veritas-RAG
- **Testing & Quality:** Vitest (`vitest: ^1.6.0`), TypeScript type validation
- **Hosting & CDN:** Vercel Global Edge Network

---

## 7. Environment Variables

Server-side configuration required for development and production:

```env
# MongoDB Atlas Database URI (Server-Side Only)
MONGODB_URI=your_mongodb_atlas_connection_string_here
MONGODB_DB_NAME=scholarsaathi

# OpenRouter AI API Configuration (Server-Side Only)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free

# Application URL
NEXT_PUBLIC_APP_URL=https://scholar-saathi-woad.vercel.app/
```

> [!WARNING]
> `MONGODB_URI` and `OPENROUTER_API_KEY` are **server-side only** and must NEVER be given a `NEXT_PUBLIC_` prefix or exposed to client components.

---

## 8. Local Setup & Execution

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Quickstart

1. **Clone & Install Dependencies:**
   ```bash
   git clone https://github.com/sujith0466/ScholarSaathi.git
   cd ScholarSaathi
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Add your MONGODB_URI and OPENROUTER_API_KEY in .env
   ```

3. **Seed Database (Local or Atlas):**
   ```bash
   npm run seed:production
   ```

4. **Run Test Suite (42/42 Tests):**
   ```bash
   npm test
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) for the Landing Page or [http://localhost:3000/app](http://localhost:3000/app) for the Citizen Dashboard.

---

## 9. What is Real vs Synthetic?

| Layer | Real / Authoritative | Synthetic / Simulated |
| :--- | :--- | :--- |
| **Database & State** | Real MongoDB Atlas cluster; physical writes, atomic mutations, audit history. | — |
| **Citizen Personas** | — | Synthetic student personas (Priya Sharma, Amit Verma). |
| **Documents** | Deterministic rule-based seal and field validation. | Mock Bonafide Certificates (PNG/PDF). |
| **Identity & Privacy** | — | Masked mock Aadhaar (`XXXX-XXXX-4819`) and bank info (`XXXXXX4012`). |
| **AI Guidance** | Curated official SOP knowledge base, hybrid retriever, OpenRouter free routing. | No live government API integrations. |

---

## 10. Verification & Test Evidence

- **Unit Test Suite:** **42/42 tests passing** across 9 Vitest suites (`npm test`).
- **Production Build:** Compiled cleanly with zero errors (`npm run build`).
- **Database Seeding:** Verified across 5 collections in MongoDB Atlas (`npm run seed:production`).
- **Public URL Verification:** Both `/` and `/app` verified returning HTTP 200 on `https://scholar-saathi-woad.vercel.app/`.

---

## 11. Current Project Status

| Component | Status |
| :--- | :---: |
| **Architecture & Golden Journey** | ✅ `COMPLETED` |
| **MongoDB Atlas Cloud Database** | ✅ `CONNECTED & VERIFIED` |
| **Automated Test Suites** | ✅ `42/42 TESTS PASSING` |
| **Production Build** | ✅ `VERIFIED (0 Errors)` |
| **Vercel Public Deployment** | ✅ `LIVE IN PRODUCTION` |
| **Public Browser & Mobile QA** | ✅ `COMPLETED` |
| **Project Summary (214 words)** | ✅ `COMPLETED` |
| **Demo Video Recording** | ✅ `COMPLETED` |
| **Hackathon Registration** | ✅ `COMPLETED` |
| **Final Submission Form** | ⏳ `PENDING` |

---

## 12. 🎥 Final Demo Video

**2-minute demonstration (citizen journey + architecture):**

[https://drive.google.com/file/d/11qxcqH8o_uh-pEQgRMj7v-_5r1_-T0lP/view?usp=sharing](https://drive.google.com/file/d/11qxcqH8o_uh-pEQgRMj7v-_5r1_-T0lP/view?usp=sharing)

The video covers:
- **Minute 1 (Citizen Experience):** Priya Sharma's complete golden journey — diagnosis, document inspection, resubmission, and Veritas-RAG grounded AI assistant — on the live production deployment.
- **Minute 2 (Architecture & Design Decisions):** Next.js App Router, MongoDB Atlas real state mutations, Veritas-RAG anti-hallucination pipeline, and hackathon implementation scope.

---

## 13. Codex Contribution

Codex was meaningfully involved throughout the entire ScholarSaathi implementation:

1. **Architectural Scaffolding:** Modular 4-tier structure (`docs/`, `frontend/`, `tests/`, `scripts/`).
2. **Domain Resolver:** Deterministic `resolveJourneyState` mapping raw statuses to plain-language diagnoses, health scores, and timelines.
3. **MongoDB Persistence:** Native MongoDB client provider with connection caching and Atlas `mongodb+srv://` compatibility.
4. **Interactive Document Inspector:** Side-by-side visual diff modal with deterministic seal validation.
5. **Veritas-RAG AI Pipeline:** Hybrid keyword/token density retriever, source classification taxonomy, and anti-hallucination sufficiency gates.
6. **Visual Motion System:** 5-layer Framer Motion background with `useReducedMotion()` accessibility support.
7. **Test Engineering:** 42 automated tests across 9 Vitest suites ensuring 100% regression safety.
8. **Atlas Migration & Release Hygiene:** Remote database seeding, secret scanning, and deployment configuration.
9. **GitHub Release Integration:** Origin remote configuration and clean upstream branch tracking on `main`.
10. **Vercel Deployment Resolution:** Resolved `.next` output directory alignment enabling live cloud deployment.

---

## 14. License & Attribution

Developed as an open-source prototype for the **Build What Moves India** Hackathon (2026).
