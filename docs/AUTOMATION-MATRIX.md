# Automation Matrix — Dobeu Tech Solutions Sales Funnel

**Last Updated:** 2026-03-08
**Owner:** Jeremy Williams

---

## Priority Key

| Priority | Meaning |
|----------|---------|
| HIGH | Core to weekly prospect pipeline; blocks revenue |
| MEDIUM | Multiplies reach or reduces manual effort |
| LOW | Nice-to-have; can defer without blocking pipeline |

## Status Key

| Status | Meaning |
|--------|---------|
| READY | All tools connected; automation can run now |
| NEEDS-CONFIG | Tools connected but scenario/webhook/key not wired |
| PLANNED | Not yet built; dependencies identified |

---

## Automations

### 1. Prospect Enrichment Pipeline

| Field | Value |
|-------|-------|
| **Name** | Apollo → Semrush Enrichment → Score → Neon DB |
| **Trigger** | Orchestrator runs Apollo people/company search (scheduled or manual) |
| **Tools** | Apollo.io (search + export), Semrush (site audit), Neon DB (upsert scored record), Make.com (orchestration) |
| **Priority** | HIGH |
| **Status** | READY |

**Notes:** Semrush trial expires in ~6 days. Run enrichment on all candidate batches immediately. Score factors: SEO issues flagged by Semrush, Google Maps mismatch, missing/outdated social profiles, business age, employee count.

---

### 2. Weekly Batch Approval Email to Jeremy

| Field | Value |
|-------|-------|
| **Name** | Weekly Prospect Approval Email |
| **Trigger** | Weekly schedule (e.g., Monday 8 AM) — top 20 scored prospects pulled from Neon |
| **Tools** | Neon DB (query), Make.com (scenario), MS365/Outlook or Customer.io (send email) |
| **Priority** | HIGH |
| **Status** | NEEDS-CONFIG |

**Notes:** Email contains prospect list with scores, recommended outreach message, and a reply prompt (reply "go" or annotate adjustments). Make.com scenario needs to be built; query and email template to be configured.

---

### 3. Apollo 3-Touch Email Sequence

| Field | Value |
|-------|-------|
| **Name** | Apollo Outreach Sequence — 3-Touch Email |
| **Trigger** | Jeremy approves batch; contacts added to Apollo sequence |
| **Tools** | Apollo.io (sequences), Customer.io (optional drip fallback) |
| **Priority** | HIGH |
| **Status** | READY |

**Notes:** Touch 1: initial cold outreach with free service offer. Touch 2 (Day 3): follow-up with social proof. Touch 3 (Day 7): breakup email with calendar link. SPF/DKIM on dobeu.net must be verified before activating.

---

### 4. Typeform Submission → Full Intake Flow

| Field | Value |
|-------|-------|
| **Name** | Typeform Submission → Neon → Customer.io Welcome → Google Calendar Booking |
| **Trigger** | Typeform form submitted (info@dobeu.net account) |
| **Tools** | Typeform (form), Neon DB (contact upsert + free service assignment), Customer.io (welcome + drip), Google Calendar (booking link or auto-event) |
| **Priority** | HIGH |
| **Status** | READY |

**Notes:** Assigns free service based on survey answers. Welcome email sent immediately; drip sequence starts Day 1. Booking link included in welcome email for consultation scheduling.

---

### 5. Inbound Email Intake — New Sender Routing

| Field | Value |
|-------|-------|
| **Name** | MS365 Mailbox — New Sender → Multi-CRM Sync |
| **Trigger** | New inbound email from unknown sender to MS365 mailbox |
| **Tools** | MS365/Outlook (trigger), Neon DB (contact upsert), Google Contacts (create/update), MS365 Contacts (create/update), Google Sheets (log row) |
| **Priority** | MEDIUM |
| **Status** | NEEDS-CONFIG |

**Notes:** Deduplication logic needed (match on email address). Google Sheet acts as lightweight audit log. Make.com scenario to be built.

---

### 6. LinkedIn Connection Request

| Field | Value |
|-------|-------|
| **Name** | LinkedIn Connection Request via Apollo/Make.com |
| **Trigger** | Prospect approved and added to active outreach batch |
| **Tools** | Apollo.io (LinkedIn field), Make.com (LinkedIn module) |
| **Priority** | MEDIUM |
| **Status** | READY |

**Notes:** Personalized connection note referencing local area or industry. Rate-limit to 20/week to stay within LinkedIn limits. Do not send same day as cold email — stagger by 1-2 days.

---

### 7. Weekly Analytics Report

| Field | Value |
|-------|-------|
| **Name** | Weekly Analytics Digest — Email + Google Sheet |
| **Trigger** | Weekly schedule (e.g., Sunday 6 PM) |
| **Tools** | Google Analytics 4 (site metrics), PostHog (product events), Mixpanel (funnel data), Make.com (aggregation), MS365/Outlook or Customer.io (email), Google Sheets (append row) |
| **Priority** | MEDIUM |
| **Status** | PLANNED |

**Notes:** Report includes: site visits, form submissions, email open/click rates, sequence reply rates, consultations booked, conversions. Google Sheet tab acts as running weekly log.

---

### 8. Social Media Post Automation

| Field | Value |
|-------|-------|
| **Name** | Google Business + LinkedIn + Facebook Post (Weekly Content) |
| **Trigger** | Weekly schedule or manual trigger; reuses existing "Daily Blog Creation" Make.com scenario |
| **Tools** | Make.com ("Daily Blog Creation" scenario — currently inactive), Google Business Profile, LinkedIn, Facebook |
| **Priority** | MEDIUM |
| **Status** | READY — scenario exists but inactive |

**Notes:** Activate and reconfigure existing Make.com scenario. Post content: local IT tips, case study snippets, free offer announcements. Frequency: 1-2x per week per platform. Scenario needs activation and possibly content source update.

---

### 9. Bounce Detection → Blacklist

| Field | Value |
|-------|-------|
| **Name** | Email Bounce Detection → Blacklist in Neon |
| **Trigger** | Hard bounce event from Apollo or Customer.io |
| **Tools** | Apollo.io (bounce webhook), Customer.io (bounce event), Neon DB (update contact status = blacklisted), Make.com (webhook listener) |
| **Priority** | HIGH |
| **Status** | NEEDS-CONFIG |

**Notes:** Critical for deliverability. Blacklisted contacts must be suppressed from all future sequences automatically. Webhook endpoints need to be configured in both Apollo and Customer.io.

---

### 10. Survey Referral Code Tracking

| Field | Value |
|-------|-------|
| **Name** | Survey Referral Code → Neon → Customer.io Referral Thank-You |
| **Trigger** | Typeform submission includes a referral code field |
| **Tools** | Typeform (referral code field), Neon DB (log referral relationship), Customer.io (referral thank-you email to referrer) |
| **Priority** | MEDIUM |
| **Status** | PLANNED |

**Notes:** Referral code stored on contact record. Referrer receives thank-you email when referred contact submits form. Future: track referral conversion chain in Neon for incentive tracking.

---

### 11. SMS Confirmation After Consultation Booked

| Field | Value |
|-------|-------|
| **Name** | SMS Confirmation via Twilio/Make.com — Consultation Booked |
| **Trigger** | Consultation booking confirmed (Google Calendar event created or booking webhook) |
| **Tools** | Google Calendar (event trigger), Make.com (orchestration), Twilio (SMS send via Make.com connection) |
| **Priority** | LOW |
| **Status** | READY — Make.com + Twilio connected |

**Notes:** SMS includes: date/time, duration, video link or address, and a simple "reply CONFIRM to confirm" prompt. Twilio is not a standalone Composio connection — must route through Make.com.

---

### 12. Semrush Weekly Site Audit

| Field | Value |
|-------|-------|
| **Name** | Semrush Weekly Audit — dobeu.net + Personal Brand Site |
| **Trigger** | Weekly schedule (post-trial: manual or API if plan allows) |
| **Tools** | Semrush (site audit API), Make.com (schedule + report delivery), Google Sheets (append audit results) |
| **Priority** | LOW |
| **Status** | PLANNED |

**Notes:** 7-day Semrush trial is active — prioritize prospect enrichment over audit scheduling. Once trial ends, evaluate whether Semrush plan justifies ongoing cost vs one-time enrichment batch. Audit results appended to Google Sheet for trend tracking.

---

## Summary Table

| # | Automation Name | Priority | Status |
|---|----------------|----------|--------|
| 1 | Apollo → Semrush → Score → Neon | HIGH | READY |
| 2 | Weekly Batch Approval Email | HIGH | NEEDS-CONFIG |
| 3 | Apollo 3-Touch Email Sequence | HIGH | READY |
| 4 | Typeform → Neon → Customer.io → Calendar | HIGH | READY |
| 9 | Bounce Detection → Blacklist Neon | HIGH | NEEDS-CONFIG |
| 5 | MS365 Inbound → Multi-CRM Sync | MEDIUM | NEEDS-CONFIG |
| 6 | LinkedIn Connection Request | MEDIUM | READY |
| 7 | Weekly Analytics Report | MEDIUM | PLANNED |
| 8 | Social Post Automation (existing scenario) | MEDIUM | READY (inactive) |
| 10 | Survey Referral Code Tracking | MEDIUM | PLANNED |
| 11 | SMS Confirmation via Twilio/Make.com | LOW | READY |
| 12 | Semrush Weekly Site Audit | LOW | PLANNED |
