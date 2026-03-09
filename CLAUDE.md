# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**dobeutech-sales-funnel-itconsult** — Automated customer sourcing and prospecting platform for Dobeu Tech Solutions (NJ-based IT/SEO consulting). Pipeline: Apollo discovery → Semrush enrichment → scoring → human approval → 3-touch email sequence → Typeform survey → follow-up.

## Architecture

Two separate applications in one repo:

### Root (`/`) — Next.js 15 backend (planned, not yet built)
- Next.js 15 + React 19, intended to deploy to Netlify
- Prisma ORM → Neon Postgres (`prisma/schema.prisma`)
- `package.json` scripts exist but no `app/` or `pages/` directory yet
- Spec/requirements live in `prompt/*.docx` (gitignored)

### `my-neon-app/` — Vite React dashboard (deployed)
- Vite 7 + React 19 + TypeScript + react-router-dom
- Deployed to Netlify at `https://dts-prospect-dashboard.netlify.app`
- `netlify.toml` configures SPA routing (all paths → `/index.html`)
- **DB access**: `@neondatabase/serverless` with raw SQL (NOT Prisma) via `src/lib/db.ts`
- **Auth**: `@neondatabase/neon-js` — imports are `AuthView`, `AccountView`, `useAuthData`, `NeonAuthUIProvider` from `@neondatabase/neon-js/auth/react`
- **Routes**: `/` brand page, `/admin` auth home, `/dashboard` prospects, `/weekly` report, `/auth/:pathname`, `/account/:pathname`
- **Env vars** (prefixed `VITE_`): `VITE_DATABASE_URL`, `VITE_NEON_AUTH_URL`

## Commands

### Root project (Next.js / Prisma)
```bash
npm run dev              # Next.js dev server
npm run build            # Production build
npm run lint             # ESLint
npm run type-check       # tsc --noEmit
npm run db:generate      # Prisma client codegen
npm run db:migrate       # Prisma migrate deploy
npm run db:push          # Prisma db push (schema sync without migration)
npm run db:studio        # Prisma Studio GUI
npm run db:seed          # tsx prisma/seed.ts
```

### Dashboard app (`my-neon-app/`)
```bash
cd my-neon-app
npm run dev              # Vite dev server
npm run build            # tsc -b && vite build
npm run lint             # ESLint
npm run preview          # Vite preview of production build
```

## Database

**Neon Postgres** (serverless) — project `jolly-snow-79034315`
- Host: `ep-jolly-mouse-adt6tiw6.c-2.us-east-1.aws.neon.tech`
- Database: `salesfunnel` | Region: `aws-us-east-1`
- Env: `DATABASE_URL` (pooled) + `DATABASE_URL_UNPOOLED` (direct) — see `.env.example`
- Tables: `prospects`, `outreach_log`, `survey_responses`, `analytics_events`, `weekly_batches`
- Scoring: `overall_score = (seo_score * 0.3) + (web_score * 0.25) + (social_score * 0.2) + (maps_score * 0.25)`
- Schema uses `@@map()` — Prisma model names are PascalCase but DB tables are snake_case

The dashboard app (`my-neon-app/src/lib/db.ts`) uses raw SQL via `@neondatabase/serverless`, not Prisma. Keep both in sync when modifying schema.

## CI/CD

- **GitHub Actions**: `.github/workflows/neon-branch.yml` — auto-creates/deletes Neon preview branches on PRs
  - Secrets: `NEON_API_KEY` (secret), `NEON_PROJECT_ID` (variable)
- **Netlify**: `my-neon-app/` deploys from `dist/` via `npm run build`

## External Services & Tool Routing

| Task | Use | Avoid |
|------|-----|-------|
| Apollo contact search | Composio `APOLLO_SEARCH_CONTACTS` | Apollo MCP (non-master key) |
| Apollo people discovery | `mcp__claude_ai_Apollo_io__apollo_mixed_people_api_search` | — |
| Apollo sequences | Apollo.io web UI (master key required) | Composio |
| Twilio SMS | Make.com (team 315584) | Composio (DNS issue) |
| Customer.io email | Make.com (if Composio DNS fails) | — |
| Typeform | Composio `TYPEFORM_*` | — |
| Neon DB queries | Prisma or psycopg2 via Composio Remote Workbench | — |

**Make.com scenarios** (extend, don't rebuild):
- 4458602 — Typeform Lead Processing with AI
- 4459868 — Weekly Organizer SMS Notification (Twilio)
- 4459818 — Contact Duplicate Detection & Merge
- 4603226 — DTS Survey Response to Neon + Pinecone (webhook: `https://hook.us1.make.com/le75xd3ieza5iajwyvwsxtf9gorj87wj`)

## Prospecting Rules

- Geography: 50-mile radius of ZIP 07753 (Neptune/Asbury Park, NJ)
- Company size: <50 employees, 2.5+ years old
- Industries: skilled trades, HVAC, contractors, roofing, cleaning, restaurants, non-profits, accounting, medical/dental, pet grooming, consulting, mechanical
- Contact: decision-maker (owner/president/founder/CEO/GM), 1+ year tenure
- **STOP at HUMAN APPROVAL** — never queue outreach without Jeremy's explicit approval
- Outreach tone: personal, local, non-pushy; always include one specific observation per prospect

## Git

- Branch strategy: `main` (stable) / feature branches
- Working branch: `dev-local`
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`

## Session State

`.agent/progress.md` — tracks session notes. Update at end of each session.

## Key Documentation

- `docs/CONNECTIONS-AND-INTEGRATIONS-INDEX.md` — master integration docs index
- `docs/AUTOMATION-MATRIX.md` — all 12 automations prioritized
- `docs/outreach-templates.md` — 3-touch email templates
- `docs/apollo-tiering-and-tagging-conventions.md` — full Apollo tag taxonomy
- `docs/batch-001-hit-list.md` — 7 approved prospects with social check results
- `docs/ml-feedback-loop-spec.md` — Pinecone ML loop spec (index: `dobeu-prospect-signals`)
- `tools-inventory.md` — all connected services and their status
