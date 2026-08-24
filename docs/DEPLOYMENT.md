# ScholarSaathi Deployment Guide

> **Production Deployment Architecture & Verification Runbook**  
> *Single-Application Full-Stack Next.js 14 on Vercel with MongoDB Atlas Persistence*

---

## 🌐 Live Production Deployment

| Resource | URL | Status |
| :--- | :--- | :---: |
| 🚀 **Production Application** | [https://scholar-saathi-woad.vercel.app/](https://scholar-saathi-woad.vercel.app/) | ✅ `LIVE` |
| 🎓 **Citizen Demo Experience** | [https://scholar-saathi-woad.vercel.app/app](https://scholar-saathi-woad.vercel.app/app) | ✅ `LIVE` |
| 💻 **GitHub Repository** | [https://github.com/sujith0466/ScholarSaathi](https://github.com/sujith0466/ScholarSaathi) | ✅ `SYNCED` |

---

## 1. System Architecture

ScholarSaathi is deployed as **one unified full-stack application** on Vercel:

```text
User Browser (Citizen / Judge)
    │
    ▼
Vercel Edge & Serverless Runtime
    ├── Landing Page (/)
    ├── Citizen Application (/app)
    └── Server API Route Handlers (/api/*)
           ├── MongoDB Atlas (`scholarsaathi` database cluster)
           └── OpenRouter Free-Model Gateway (`openrouter/free`)
```

*There is NO separate backend service. All frontend, API routes, Veritas-RAG retrieval, and database persistence run inside the same Next.js App Router project.*

---

## 2. Vercel Project Settings

- **Framework Preset:** `Next.js`
- **Root Directory:** `./` (Repository root)
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (Configured via `distDir: '../.next'` in `frontend/next.config.mjs`)
- **Node.js Version:** `18.x` or `20.x`

---

## 3. Environment Variables

Configured in Vercel Project Settings (Settings ➔ Environment Variables):

### Production Configuration

```env
# MongoDB Atlas Database URI (Server-Side Only)
MONGODB_URI=your_mongodb_atlas_connection_string_here
MONGODB_DB_NAME=scholarsaathi

# OpenRouter AI API Configuration (Server-Side Only)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free

# Application Public URL
NEXT_PUBLIC_APP_URL=https://scholar-saathi-woad.vercel.app/
```

> [!WARNING]
> `MONGODB_URI` and `OPENROUTER_API_KEY` are **server-side only** and must NEVER be given a `NEXT_PUBLIC_` prefix or exposed to client components.

---

## 4. MongoDB Atlas Cloud Database Setup & Seeding

1. **Atlas Cluster:** Created M0/Serverless cluster with network access enabled for Vercel deployment.
2. **Database:** `scholarsaathi`
3. **Collections Initialized (5 Collections):**
   - `students`
   - `scholarshipApplications`
   - `applicationDocuments`
   - `applicationDefects`
   - `statusHistory`
4. **Strict Remote Seeding Command:**
   ```bash
   npm run seed:production
   ```
   *Strict seed mode enforces a valid non-local Atlas URI before applying schema indexes and seeding synthetic demo data.*

---

## 5. OpenRouter Free-Model Integration & AI Fallback

- `openrouter/free` is an **OpenRouter free-model routing alias** that routes among active zero-cost models.
- **Model Provenance:** Every response from `/api/ai/ask` includes structured `modelProvenance` metadata detailing requested model, actual model, provider, and fallback status.
- **Deterministic Veritas-RAG Fallback:** If OpenRouter encounters high latency, rate limits, or unavailability, the deterministic synthesis engine generates grounded answers backed by official NSP knowledge chunks and citation cards without downtime.

---

## 6. Production Verification & QA Checklist

Tested and verified against the live production deployment:

- [x] **Landing Page (`GET /`):** HTTP 200 OK — Visual motion, problem section, diff showcase, and CTA button.
- [x] **Citizen App (`GET /app`):** HTTP 200 OK — Loads Priya Sharma (`RJ202425008912`) in `DEFECTIVE_INSTITUTE`.
- [x] **Document Inspector:** Side-by-side diff circles missing circular Principal seal in red.
- [x] **Resubmission API (`POST /api/applications/[id]/resubmit`):** State updates to `RE_SUBMITTED_INSTITUTE` in MongoDB Atlas; Health Score updates from 45 to 90.
- [x] **Grounded AI (`POST /api/ai/ask`):** Answers scheme and defect questions with evidence citations.
- [x] **Anti-Hallucination Gate:** Safely refuses unsupported payment guarantee questions.
- [x] **Demo State Reset (`POST /api/applications/reset`):** Restores initial defect state for repeat evaluations.
- [x] **Responsive Mobile QA:** Verified layout at 390px, 412px, 768px, and 1440px with zero horizontal clipping.

---

## 7. Security Rules

- **Synthetic Data Only:** 100% simulated student records with masked Aadhaar (`XXXX-XXXX-4819`) and bank info.
- **Zero Government Integrations:** No live connection to NSP, PFMS, or UIDAI production systems.
- **Credential Protection:** `.env`, `.env.local`, `.mongodb_data/`, `.next/`, and `node_modules/` are strictly gitignored.
- **Prototype Transparency:** Prominent non-government disclaimer banners displayed across all pages.

---

## 8. Rollback & Recovery Runbook

- **Vercel Instant Rollback:** In the Vercel Dashboard, select Deployments ➔ previous deployment ➔ "Promote to Production".
- **Atlas Database State Recovery:** Run `npm run seed:production` from your terminal or trigger `POST https://scholar-saathi-woad.vercel.app/api/applications/reset`.
