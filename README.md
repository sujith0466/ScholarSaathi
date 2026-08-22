# ScholarSaathi (स्कॉलर साथी)

> **Citizen-First Scholarship Status Diagnosis & Document Correction Experience**  
> *Built for the **Build What Moves India (2026)** Hackathon*

---

## 1. What is ScholarSaathi?

**ScholarSaathi** is an independent, citizen-facing digital service designed to demystify complex government scholarship application statuses for Indian college students. Instead of presenting cryptic acronyms and unexplained defect notices, ScholarSaathi delivers plain-language diagnostics, actionable document-correction workflows, and grounded policy guidance.

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

## 3. Current Feature Set

- **Production Landing Page (`/`):** 11 responsive sections, signature animated *Citizen Journey Flow*, side-by-side defect diff showcase, and Veritas-RAG AI showcase.
- **Citizen Application Experience (`/app`):** Full interactive browser-to-database golden journey for synthetic applicant **Priya Sharma (`RJ202425008912`)**.
- **Deterministic Journey State Resolver:** Computes Diagnostic Health Score (45/100 ➔ 90/100), plain-language status explanations, reassurance messaging, and 5-stage verification timeline.
- **Document Mismatch Inspector:** Side-by-side visual diff comparing defective uploads against verified institutional standards (highlighting missing circular college seals).
- **Deterministic Validation & Resubmission:** Enforces valid document selection and executes atomic state transition to `RE_SUBMITTED_INSTITUTE` with 7-day college SLA.
- **Cloud Database Persistence:** Real persistence powered by MongoDB Atlas across 5 collections (`students`, `scholarshipApplications`, `applicationDocuments`, `applicationDefects`, `statusHistory`).
- **Veritas-RAG AI Assistant:** Grounded Q&A assistant backed by curated NSP scheme guidelines, source classification (`PUBLIC_OFFICIAL_SOURCE` vs `SYNTHETIC_PROTOTYPE_GUIDANCE`), hybrid keyword/token retrieval, sufficiency gates, and deterministic fallback synthesis.
- **Framer Motion Visual System:** Calm, accessible ambient background with native `useReducedMotion()` support.
- **Demo State Reset:** 1-click database reset restoring Priya Sharma to initial `DEFECTIVE_INSTITUTE` state for repeatable evaluation.

---

## 4. System Architecture

```text
Browser (Citizen / Judge)
  │
  ▼
Vercel Edge & Serverless Runtime (Single Next.js Full-Stack App)
  ├── Frontend Pages
  │     ├── /        (Master Production Landing Page)
  │     └── /app     (Interactive Citizen Application Dashboard)
  │
  ├── API Route Handlers (Server-Side Only)
  │     ├── GET  /api/applications/[id]          (Fetch & Resolve Journey State)
  │     ├── POST /api/applications/[id]/resubmit (Validate & Mutate State)
  │     ├── POST /api/applications/reset         (Re-seed MongoDB State)
  │     └── POST /api/ai/ask                     (Veritas-RAG + OpenRouter AI)
  │
  ├── Persistence Layer
  │     └── MongoDB Atlas Cloud Cluster (`scholarsaathi` database)
  │
  └── AI & Grounding Layer
        ├── Curated Knowledge Corpus (NSP SOPs & Desks)
        ├── Hybrid Keyword + Token Density Retriever
        └── OpenRouter Gateway (`openrouter/free`) with Grounded Synthesis Fallback
```

---

## 5. Technology Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Motion:** Tailwind CSS, Framer Motion, Lucide React
- **Database Engine:** MongoDB Native Node.js Driver (`mongodb: ^6.7.0`), MongoDB Atlas
- **AI / LLM Layer:** OpenAI SDK (`openai: ^4.52.0`), OpenRouter Free Tier Gateway, Veritas-RAG
- **Testing & Quality:** Vitest (`vitest: ^1.6.0`), TypeScript type validation

---

## 6. Repository Folder Structure

```
ScholarSaathi/
├── docs/                                 # Authoritative Project Documentation
│   ├── PRD.md                            # Product Requirements Document
│   ├── PPD.md                            # Product Problem Definition
│   ├── PRODUCT_BLUEPRINT.md              # Technical Architecture & Spec
│   ├── HACKATHON_MVP_TECHNICAL_SPEC.md   # Hackathon MVP Specification
│   ├── DEPLOYMENT.md                     # Single-App Vercel + Atlas Guide
│   └── SCHOLARSAATHI_IMPLEMENTATION_TRACKER.md # Live Milestone Tracker
├── frontend/                             # Next.js Full-Stack Application
│   ├── app/                              # Pages (/, /app) & API Routes (/api/*)
│   ├── components/                       # Landing, Dashboard, AI Drawer, Modals
│   ├── domain/                           # Deterministic Journey State Resolver
│   ├── lib/                              # MongoDB client, Repositories, Veritas-RAG, AI
│   ├── types/                            # Domain TypeScript Interfaces
│   └── public/                           # Static Assets & Synthetic Documents
├── tests/                                # Vitest Automated Test Suites (42/42 Tests)
│   └── unit/                             # API, DB, Landing, Motion, RAG, Resolver Tests
├── scripts/                              # Database Utilities
│   └── seed.ts                           # Atlas Seeding Script (`npm run seed:production`)
├── .env.example                          # Safe Environment Variable Template
├── .gitignore                            # Exclusion Rules (.env, .mongodb_data, .next)
├── package.json                          # NPM Scripts & Dependencies
├── vercel.json                           # Vercel Deployment Settings
└── README.md                             # Root Documentation
```

---

## 7. Environment Variables

Create a local `.env` file based on `.env.example`:

```env
# MongoDB Atlas Database URI (Server-Side Only)
MONGODB_URI=your_mongodb_atlas_connection_string_here
MONGODB_DB_NAME=scholarsaathi

# OpenRouter AI API Configuration (Server-Side Only)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
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
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Add your MONGODB_URI and OPENROUTER_API_KEY in .env
   ```

3. **Seed Database:**
   ```bash
   npm run seed:production
   ```

4. **Run Test Suite:**
   ```bash
   npm test
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) for the Landing Page or [http://localhost:3000/app](http://localhost:3000/app) for the Citizen Dashboard.

---

## 9. Production Build & Deployment

### Production Build Verification
```bash
npm run build
```

### Deploying to Vercel (Single Application)
ScholarSaathi deploys as a single Next.js application on Vercel:
1. Import the repository into Vercel.
2. Framework Preset: **Next.js** (Root directory: `.`).
3. Add Environment Variables:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME=scholarsaathi`
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL=openrouter/free`
   - `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`
4. Deploy and execute remote seed via `npm run seed:production` from your CI/local terminal.

Detailed deployment instructions are available in [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

---

## 10. What is Real vs Synthetic?

| Layer | Real / Authoritative | Synthetic / Simulated |
| :--- | :--- | :--- |
| **Database & State** | Real MongoDB Atlas cluster; physical writes, atomic mutations, audit history. | — |
| **Citizen Personas** | — | Synthetic student personas (Priya Sharma, Amit Verma). |
| **Documents** | Deterministic rule-based seal and field validation. | Mock Bonafide Certificates (PNG/PDF). |
| **Identity & Privacy** | — | Masked mock Aadhaar (`XXXX-XXXX-4819`) and bank info (`XXXXXX4012`). |
| **AI Guidance** | Curated official SOP knowledge base, hybrid retriever, OpenRouter free routing. | No live government API integrations. |

---

## 11. Current Project Status

- **Architecture & Golden Journey:** `100% COMPLETED`
- **MongoDB Atlas Cloud Database:** `CONNECTED & VERIFIED`
- **Automated Test Suites:** `42/42 TESTS PASSING`
- **Production Build:** `VERIFIED (0 Errors)`
- **Vercel Public Deployment:** `READY FOR DEPLOYMENT`

---

## 12. License & Attribution

Developed as an open-source prototype for the **Build What Moves India** Hackathon (2026).
