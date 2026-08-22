# ScholarSaathi Deployment Guide

## Architecture

Deploy ScholarSaathi as one Vercel-hosted Next.js application:

```text
Browser
  -> Vercel Next.js application
     -> Landing page (/)
     -> Citizen demo (/app)
     -> API route handlers
     -> Veritas-RAG retrieval and deterministic fallback
     -> MongoDB repository
        -> MongoDB Atlas
     -> OpenRouter
```

There is no separate backend server.

## Vercel Project Settings

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: Vercel-managed Next.js output
- Project root: repository root

## Environment Variables

Configure these in Vercel. Do not expose secrets with `NEXT_PUBLIC_`.

### Production

```env
MONGODB_URI=<MongoDB Atlas connection string>
MONGODB_DB_NAME=scholarsaathi
OPENROUTER_API_KEY=<OpenRouter server-side API key>
OPENROUTER_MODEL=openrouter/free
NEXT_PUBLIC_APP_URL=<production Vercel URL>
```

### Preview

Use a separate MongoDB Atlas database or cluster namespace if previews may mutate demo state.

```env
MONGODB_URI=<MongoDB Atlas preview connection string>
MONGODB_DB_NAME=scholarsaathi_preview
OPENROUTER_API_KEY=<OpenRouter server-side API key>
OPENROUTER_MODEL=openrouter/free
NEXT_PUBLIC_APP_URL=<preview URL when known>
```

### Development

Local development may use local MongoDB or a development Atlas database.

```env
MONGODB_URI=<local MongoDB URI or development Atlas URI>
MONGODB_DB_NAME=scholarsaathi
OPENROUTER_API_KEY=<OpenRouter server-side API key>
OPENROUTER_MODEL=openrouter/free
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## MongoDB Atlas Setup

1. Create an Atlas project and cluster.
2. Create a database user with least privilege for the `scholarsaathi` database.
3. Add the Vercel deployment egress range or a temporary restricted access rule according to the deployment policy.
4. Store the Atlas connection string only in Vercel environment variables and local `.env`.
5. Run strict synthetic seed verification:

```bash
npm run seed:production
```

Strict seed mode rejects blank, placeholder, localhost, or `127.0.0.1` MongoDB URIs.

## OpenRouter And Model Provenance

`openrouter/free` is a free routing alias, not a fixed model. It must not be cited as OpenAI-model evidence.

The API response includes `data.modelProvenance` with requested model, actual model when metadata is present, provider, free-inference inference, OpenAI-authorship inference, and deterministic fallback status.

If OpenAI-model provenance is required, configure an explicit eligible OpenAI model and verify real `POST /api/ai/ask` responses. Do not silently switch to a paid model.

## Local Verification Commands

```bash
npm install
npm run seed
npm test
npm run build
```

## Production API Checks

After deployment, verify:

- `GET /api/applications/RJ202425008912`
- `POST /api/applications/RJ202425008912/resubmit`
- `POST /api/applications/reset`
- `POST /api/ai/ask`

Check valid, invalid, malformed, duplicate, and unsupported requests. No response should leak secrets.

## Public QA Checklist

Test the public URL at 390px, 412px, 768px, 1024px, and 1440px:

- Open `/`
- Click into `/app`
- Load Priya Sharma
- Inspect status diagnosis and document mismatch
- Submit a corrected document
- Refresh and confirm MongoDB-backed persistence
- Ask a grounded AI question
- Ask an unsupported guarantee question and confirm refusal
- Reset the demo
- Repeat on mobile touch and keyboard navigation

## Security Rules

- Synthetic demo data only.
- No live government integrations.
- No Aadhaar, PAN, OTP, payment, password, or real bank data.
- No secrets in source, docs, client components, or `NEXT_PUBLIC_*`.
- `.env`, `.env.local`, `.env.*.local`, `.mongodb_data/`, `.next/`, and `node_modules/` must remain ignored.

## Rollback And Recovery

- Vercel rollback: promote the previous successful deployment.
- Atlas recovery: rerun `npm run seed:production` to restore synthetic demo state.
- OpenRouter outage or rate limit: the deterministic Veritas-RAG fallback keeps the citizen journey functional, but OpenAI/model provenance remains unverified during fallback.
