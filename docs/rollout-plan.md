# Rollout Plan — Dobeu Tech Solutions Sales Funnel

| Field | Value |
|-------|-------|
| **Project** | Dobeu Tech Solutions — IT Consulting Sales Funnel |
| **Owner** | Jeremy Williams |
| **Date** | 2026-03-08 |
| **Status** | IN PROGRESS |

---

## Executive Summary

Dobeu Tech Solutions is building a semi-automated outbound sales funnel to identify, engage, and convert small local businesses near Monmouth County, NJ into IT consulting clients. The system combines Apollo-powered prospect discovery with Semrush-based enrichment scoring, a Typeform intake survey tied to a free-service offer, and a multi-touch email sequence managed through Customer.io and Apollo sequences. The goal is a repeatable weekly process that surfaces 20 pre-scored prospects for Jeremy's approval, executes outreach automatically upon approval, and tracks outcomes end-to-end in a Neon database — with minimal manual overhead after initial setup.

---

## Tech Stack

| Layer | Tool(s) |
|-------|---------|
| Frontend | Next.js (admin dashboard), Netlify (hosting) |
| Database | Neon (primary DB, project: jolly-snow-79034315) + Prisma (ORM) |
| Automation | Make.com (team 315584, Dobeu Tech Solutions) + Composio (100+ app connections) |
| Prospecting | Apollo.io (search, sequences, LinkedIn) |
| Survey | Typeform (info@dobeu.net account) |
| Email Drip | Customer.io (welcome series + follow-up drips) |
| SMS | Twilio (via Make.com only) |
| Analytics | Google Analytics 4, PostHog, Mixpanel, Facebook Pixel |
| CRM | Apollo.io + Google Contacts + MS365 Contacts |

---

## Phase Roadmap

| Phase | Description | Status | Key Output |
|-------|-------------|--------|------------|
| 0 | Tool inventory and connection verification | COMPLETE | `tools-inventory.md` |
| 1 | Database schema design and deployment | COMPLETE | Neon DB live, `prisma/schema.prisma` |
| 2 | Prospect discovery pipeline | IN PROGRESS | `docs/prospects-batch-001.json` (being built) |
| 3 | Apollo outreach sequences | PENDING | 3-touch sequence configured in Apollo |
| 4 | Typeform survey + webhook integration | PENDING | Live form + Neon webhook handler |
| 5 | Personal brand website | PENDING | Netlify site live |
| 6 | Follow-up automation | PENDING | Customer.io drip series + Twilio SMS |
| 7 | Business profile updates | PENDING | LinkedIn, Google Business Profile, Facebook updated |
| 8 | Weekly dashboard | PENDING | Make.com weekly report + admin page |

---

## Target Prospect Profile

| Criteria | Specification |
|----------|--------------|
| **Geography** | 50-mile radius of 07753 (Monmouth County, NJ) |
| **Company size** | Fewer than 50 W2 employees |
| **Business age** | 2.5+ years in operation |
| **Industries** | Skilled trades, HVAC, general contractors, roofing, cleaning services, restaurants, non-profits, accounting/bookkeeping, medical/dental offices, pet grooming, independent consulting, mechanical/auto services |
| **Decision maker** | Owner or key decision maker with 1+ year tenure at company |
| **Weak online presence** | SEO issues (Semrush flagged), Google Maps listing mismatch, inconsistent or absent social profiles |

---

## Service Offering Menu

These are the free first-service options presented to prospects in the survey and outreach. Each is designed to be fast to deliver and demonstrate immediate value.

| Service | Description | Delivery Effort |
|---------|-------------|----------------|
| SEO Optimization | Audit and fix top 3-5 on-page SEO issues on their existing site | Low — mostly automated via Semrush |
| 1-Page Website Redesign | Rebuild a single landing page with modern design and clear CTA | Medium |
| Mailer/Flyer Creation | Design a print-ready or digital mailer for their business | Low-Medium |
| Free Tech Evaluation / Consultation | 30-minute video call to assess their tech stack and surface quick wins | Low |

Prospect selects preferred service via Typeform. Assignment is recorded in Neon and used to personalize the follow-up drip sequence.

---

## Weekly Repeatable Process

1. Orchestrator (Make.com scenario) runs Apollo people/company search using saved filters for the target prospect profile
2. Results are enriched via Semrush site audit; each prospect is scored on SEO weakness, social inconsistency, Maps mismatch, and business fit
3. Top 20 scored prospects are queued in Neon and an approval email is sent to Jeremy with the ranked list
4. Jeremy approves the batch by replying "go" or annotating adjustments (e.g., "skip #4 — already a client")
5. Apollo sequence is triggered for the approved batch; LinkedIn connection requests are staggered by 1-2 days
6. Typeform survey responses are tracked in real time; free service is assigned and Customer.io welcome drip starts immediately
7. End-of-week report is generated: contacts reached, email replies, survey submissions, consultations booked, and conversions logged to Google Sheet

---

## Key Decisions Pending

- [ ] **Typeform form strategy:** One universal intake form for all prospects, or separate niche-specific forms (e.g., one for trades, one for medical/dental)? Niche forms allow more personalized language but add maintenance overhead.
- [ ] **Personal brand site domain:** Build on a subdomain of dobeu.net (e.g., jeremy.dobeu.net) or register a separate personal domain? Consider SEO authority consolidation vs brand separation.
- [ ] **Weekly dashboard:** Build a custom Next.js admin page (already in the stack) vs using a no-code option like Notion or Airtable for faster setup?

---

## Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Semrush trial expires in ~6 days | HIGH | Run prospect enrichment immediately; batch all candidate companies now before trial ends |
| Apollo credit exhaustion | MEDIUM | Cap outreach at 20 contacts per week; prioritize email verification over phone lookup |
| Email deliverability (dobeu.net) | HIGH | Verify SPF and DKIM records on dobeu.net before activating any Apollo or Customer.io sequences |
| Customer.io API 401 errors | MEDIUM | Validate Customer.io API key and site ID in environment config before building drip sequences |
| LinkedIn rate limiting | LOW | Cap connection requests at 20/week; do not automate in burst; stagger sends through Make.com |
| Neon DB cold start latency | LOW | Use connection pooling via Prisma; avoid serverless cold-start conflicts during high-volume webhook ingestion |
