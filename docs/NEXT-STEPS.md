# Next Steps — PR Review Action Items

Prioritized action plan based on the PR review of the sales funnel project setup.

## Priority 1: Critical Security (before any deployment)

### 1.1 Authentication Middleware
- [ ] Add `src/middleware.ts` with NextAuth.js or a custom JWT/session check
- [ ] Protect all `/dashboard/*` and `/admin/*` routes
- [ ] Protect sensitive API routes (everything except `/api/health`)
- [ ] Add CSRF protection for mutation endpoints

### 1.2 Environment Variable Discipline
- [ ] Audit every new env var: if it contains a secret, it must NOT use `NEXT_PUBLIC_` or `VITE_` prefix
- [ ] Database connection strings go in `DATABASE_URL` (server-only)
- [ ] Add a CI check / pre-commit hook that greps for `VITE_.*KEY`, `VITE_.*SECRET`, `VITE_.*PASSWORD`, `NEXT_PUBLIC_.*KEY` patterns

### 1.3 PII Data Handling
- [ ] Never commit prospect data, hit lists, or batch files to the repo
- [ ] `.gitignore` already blocks `*-batch-*.json` and `*-hit-list.*` patterns
- [ ] Store prospect data in database with proper access controls
- [ ] If documentation references real prospects, use anonymized/redacted examples

## Priority 2: Architecture (before adding features)

### 2.1 Single or Monorepo Decision
- [ ] **Recommended:** Keep a single Next.js app. Use the App Router for both the public site and admin dashboard (e.g., `/app/(dashboard)/` route group).
- [ ] **If Vite is required:** Set up npm workspaces or Turborepo with `apps/web` (Next.js) and `apps/admin` (Vite).
- [ ] Do NOT have two separate `package.json` roots without a workspace manager.

### 2.2 Database Integration
- [ ] Choose a database provider (Neon Postgres recommended — already available via MCP)
- [ ] Add Drizzle ORM or Prisma for type-safe database access
- [ ] Database client must only be imported in server-side code
- [ ] Create schema for: prospects, pipeline stages, invoices, deliverables

### 2.3 Brand Configuration
- [ ] Create `src/lib/config/brand.ts` with environment-driven URLs
- [ ] All external URLs (company site, social links, logos) pulled from env vars or a config file
- [ ] No hardcoded URLs in JSX components

## Priority 3: Documentation Hygiene

### 3.1 Infrastructure References
- [ ] If creating `CLAUDE.md` or webhook specs, use placeholder values (e.g., `<YOUR_PROJECT_ID>`)
- [ ] Reference `.env.example` for real values instead of embedding them in docs
- [ ] Add a `docs/architecture.md` describing the system design

### 3.2 README Expansion
- [ ] Add setup instructions, tech stack, and contributing guide to README
- [ ] Link to `SECURITY.md` and `docs/NEXT-STEPS.md`

## Priority 4: Code Quality

### 4.1 Pre-commit Hooks
- [ ] Add Husky + lint-staged for pre-commit linting
- [ ] Add a secret-scanning hook (e.g., `detect-secrets` or `gitleaks`)
- [ ] Enforce consistent formatting with Prettier

### 4.2 Testing
- [ ] Add integration tests for API routes
- [ ] Add E2E tests with Playwright for critical flows (once dashboard exists)
- [ ] Maintain >80% coverage on business logic

## Current State Assessment

| PR Review Concern | Current Status | Action Needed |
|---|---|---|
| VITE_ env var exposing DB creds | Not present (no Vite app) | Preventive guard in SECURITY.md |
| No auth on dashboard pages | No dashboard pages yet | Add middleware before creating them |
| PII in docs/ files | No docs/ data files | .gitignore blocks patterns proactively |
| Hardcoded infra in CLAUDE.md | No CLAUDE.md | Guideline in SECURITY.md |
| Two frontends without monorepo | Single Next.js app | Decision documented above |
| .gitignore VS Code handling | Fixed: `.vscode/` now ignored | Done |
| Hardcoded URL in brand.tsx | No brand.tsx | Guideline for when it's created |
| Health endpoint info leak | Hardened: suppresses details in prod | Done |
