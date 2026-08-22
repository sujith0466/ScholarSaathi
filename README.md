# ScholarSaathi

ScholarSaathi is a citizen-first scholarship status diagnosis and document-correction prototype for the Build What Moves India hackathon. It focuses on one real public-service problem: students often see confusing scholarship statuses, document defects, and verification delays without a plain-language explanation of what to do next.

This is an independent hackathon prototype. It is not affiliated with, endorsed by, or connected to any government department, scholarship portal, Aadhaar/PAN service, payment system, or live citizen database.

## Citizen Journey

The demo follows Priya Sharma, a synthetic student persona:

1. Open the public landing page at `/`.
2. Enter the citizen experience at `/app`.
3. Understand why the application is stuck.
4. Inspect the defective bonafide certificate.
5. Compare defective and expected document standards.
6. Submit a corrected synthetic document.
7. Verify the MongoDB-backed state change.
8. Ask grounded scholarship-process questions through Veritas-RAG.
9. Reset the demo state.

## Architecture

ScholarSaathi deploys as one Next.js application:

```text
Browser
  -> Vercel
     -> Next.js App Router
        -> /
        -> /app
        -> /api/*
        -> Veritas-RAG
        -> MongoDB repository
           -> MongoDB Atlas
        -> OpenRouter server-side AI call
```

There is no separate backend service.

## Tech Stack

- Next.js 14, React 18, TypeScript
- Tailwind CSS, Framer Motion, Lucide React
- MongoDB native Node.js driver
- OpenRouter free-model inference via the OpenAI SDK compatibility API
- Veritas-RAG grounded retrieval with deterministic fallback
- Vitest

## AI Behavior

The AI stack is described honestly as OpenRouter free-model inference with deterministic Veritas-RAG fallback. `openrouter/free` is a routing alias, not a fixed model and not proof of OpenAI-model provenance. If OpenRouter is unavailable or rate-limited, ScholarSaathi returns a deterministic grounded answer or a safe refusal using local evidence and citations.

## Required Environment Variables

Copy `.env.example` to `.env` for local development and configure only server-side secrets in `.env`.

```env
MONGODB_URI=
MONGODB_DB_NAME=scholarsaathi

OPENROUTER_API_KEY=
OPENROUTER_MODEL=openrouter/free

NEXT_PUBLIC_APP_URL=
```

`MONGODB_URI` and `OPENROUTER_API_KEY` must never use a `NEXT_PUBLIC_` prefix.

## Local Development

```bash
npm install
npm run seed
npm test
npm run dev
```

Open `http://localhost:3000` for the landing page and `http://localhost:3000/app` for the citizen demo.

## Production Deployment

Deploy the repository as one Vercel Next.js application:

- Install command: `npm install`
- Build command: `npm run build`
- Runtime: Vercel-managed Next.js runtime

Configure MongoDB Atlas and Vercel environment variables before public testing. Seed production only with the strict Atlas-aware seed command:

```bash
npm run seed:production
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for the Vercel, MongoDB Atlas, environment, rollback, and public QA checklist.

## Verification

```bash
npm install
npm run seed
npm test
npm run build
```

Expected current local result: 42/42 Vitest tests passing and successful Next.js production build.

## Safety Rules

- Synthetic demo data only.
- No live government integrations.
- No real Aadhaar, PAN, OTP, payment, password, or bank identifiers.
- Secrets remain server-side.
- AI answers must be grounded in the local scholarship corpus or safely refuse/fallback.
- Independent prototype disclosure must remain visible.

## Current Limitations

- OpenAI model usage is not claimed.
- `openrouter/free` can resolve to varying free models and may be rate-limited.
- MongoDB Atlas must be configured before public deployment.
- Public Vercel QA must be completed before hackathon submission.
