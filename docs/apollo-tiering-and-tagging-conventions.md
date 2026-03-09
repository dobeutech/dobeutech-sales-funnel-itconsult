# Apollo Tiering & Universal Tagging Conventions

**Owner:** Jeremy Wilson — Dobeu Tech Solutions
**Purpose:** Single source of truth for how prospects are categorized across ALL platforms.
**Last updated:** 2026-03-08

---

## Tier System (Apollo + All Platforms)

### Tier A — Priority Targets (Social + ICP Match)
**Definition:** Meets ICP criteria AND has a verifiable social connection with Jeremy.

Social connection types (ranked best → weaker):
1. **Direct friend** on LinkedIn / Facebook / Instagram / other platform Jeremy is on
2. **Group overlap** — member of same Facebook group, LinkedIn group, Discord, or community Jeremy participates in
3. **Former colleague/coworker** — worked at same company at any overlapping time
4. **Alumni overlap** — same school, same industry event attendees, same local chamber

**Trigger rule:** If ANY social signal exists → Tier A (regardless of score)

Apollo sequence to use: **`SMB Local Outreach 07753 — v1 — Tier A`** (personalized touch, reference connection)

---

### Tier B — Strong Candidates (Score-Based)
**Definition:** ICP match + overall_score ≥ 70 + verified email + NO current social connection identified

**Trigger rule:** Score ≥ 70 + verified email + status = QUEUED

Apollo sequence to use: **`SMB Local Outreach 07753 — v1`** (observation-led, standard 3-touch)

---

### Tier C — Worth Trying (Moderate Score)
**Definition:** ICP match + overall_score 40–69 + verified email

**Trigger rule:** Score 40–69 + verified email + status = QUEUED

Apollo sequence to use: **`SMB Local Outreach 07753 — v1`** (same template, lower priority in batch order)

---

### Tier D — Monitor / Not Yet Ready
**Definition:** ICP match but: score < 40, extrapolated email, or missing key data

**Do NOT add to outreach sequences yet.** Re-evaluate in 90 days or if new data arrives.

---

## Universal Tag Taxonomy

These exact tag strings must be used identically across Apollo, Linear, Google Contacts, and Intercom.

> **Rule:** Tags are lowercase-hyphenated. No spaces. No camelCase. No ALL_CAPS.

---

### Category 1 — Tier Tags

| Tag | Meaning |
|-----|---------|
| `tier-a` | Social connection + ICP match |
| `tier-b` | Score 70+ + verified email |
| `tier-c` | Score 40-69 + verified email |
| `tier-d` | Monitor only — not ready for outreach |

---

### Category 2 — Source Tags

| Tag | Meaning |
|-----|---------|
| `source-apollo` | Discovered via Apollo.io |
| `source-referral` | Referred by another contact |
| `source-organic` | Inbound (website, social DM, Typeform) |
| `source-event` | Met in person or at event |
| `source-linkedin` | Found via LinkedIn search |

---

### Category 3 — Industry Tags (ICP Industries)

| Tag | Industry |
|-----|---------|
| `industry-trades` | Plumbing, electric, carpentry, general contracting |
| `industry-hvac` | Heating, cooling, mechanical |
| `industry-roofing` | Roofing companies |
| `industry-cleaning` | Janitorial, commercial cleaning |
| `industry-restaurant` | Food service |
| `industry-accounting` | Accounting, bookkeeping, CPA |
| `industry-medical` | Medical, dental, healthcare |
| `industry-pet` | Pet grooming, vet services |
| `industry-nonprofit` | Non-profit organizations |
| `industry-consulting` | Business consulting, professional services |
| `industry-facilities` | Facilities management, property maintenance |

---

### Category 4 — Funnel Stage Tags

| Tag | Meaning |
|-----|---------|
| `stage-discovered` | Found, not yet enriched |
| `stage-enriched` | Semrush/data enriched, awaiting approval |
| `stage-approved` | Jeremy approved — ready for outreach |
| `stage-contacted` | At least 1 touch sent |
| `stage-replied` | Prospect has responded |
| `stage-survey-sent` | Typeform survey link sent |
| `stage-survey-done` | Survey completed |
| `stage-meeting` | Discovery call booked |
| `stage-client` | Active paying client |
| `stage-not-fit` | Rejected — does not meet ICP |
| `stage-unsubscribed` | Opted out |

---

### Category 5 — Social Connection Tags

| Tag | Meaning |
|-----|---------|
| `social-tier-1` | Direct friend / 1st connection on ANY platform |
| `social-tier-2` | Shared group membership OR former colleague |
| `social-tier-3` | Weak tie (mutual friend, alumni, event) |
| `social-none` | No social connection identified |
| `social-linkedin` | Connection found on LinkedIn specifically |
| `social-facebook` | Connection found on Facebook specifically |
| `social-instagram` | Connection found on Instagram specifically |

---

### Category 6 — Score Band Tags

| Tag | Score Range |
|-----|------------|
| `score-high` | overall_score ≥ 70 |
| `score-mid` | overall_score 40–69 |
| `score-low` | overall_score < 40 |

---

### Category 7 — Email Confidence Tags

| Tag | Meaning |
|-----|---------|
| `email-verified` | Apollo/Hunter confirmed |
| `email-extrapolated` | Pattern-guessed (lower confidence) |
| `email-missing` | No email found |

---

### Category 8 — Engagement Tags (Added After First Contact)

| Tag | Meaning |
|-----|---------|
| `engaged-opened` | Opened at least 1 email |
| `engaged-clicked` | Clicked a link |
| `engaged-replied` | Sent a reply |
| `engaged-survey` | Completed Typeform survey |
| `engaged-intercom` | Active in Intercom conversation |
| `engaged-booked` | Booked a calendar slot |

---

### Category 9 — Batch Tags

| Tag | Meaning |
|-----|---------|
| `batch-2026-w10` | First batch — March 2026 |
| `batch-2026-w14` | (future) Week 14 batch |

Format: `batch-YYYY-wWW` — add new tag each batch week

---

## Apollo Custom Fields (Required for All Contacts)

| Field Name | Type | Example Value |
|------------|------|---------------|
| `funnel_source` | Text | `apollo_outreach` |
| `batch_week` | Text | `2026-W10` |
| `overall_score` | Number | `71.7` |
| `seo_score` | Number | `78` |
| `web_score` | Number | `80` |
| `social_score` | Number | `60` |
| `maps_score` | Number | `65` |
| `observation` | Text | Pre-written Semrush insight |
| `social_connection_tier` | Number | `1`, `2`, `3`, or blank |
| `neon_db_id` | Text | UUID from Neon `prospects` table |
| `referral_code` | Text | Unique code for Typeform tracking |

---

## Platform-Specific Application

### Apollo.io
- Tags: Apply all relevant tags from taxonomy above
- Lists: Create separate lists for Tier A, B, C
- Sequences: Tier A gets personalized first-touch referencing the social connection
- Custom fields: All fields above required before adding to sequence

### Linear.app (Central Hub)
- All prospect-related issues use tags as Linear labels
- Naming convention: `[TIER-A] Company Name — Contact Name`
- Label groups mirror the tag taxonomy (create label sets)
- One issue per approved prospect; sub-issues for each outreach touch

### Google Contacts
- Tags map to contact labels
- Group: `Dobeu — [Tier]` (e.g., "Dobeu — Tier A")
- Notes field: paste the `observation` text
- Custom field "Neon ID": store the db_id UUID

### Intercom
- Tags applied on contact creation from Make.com webhook
- Segments map to tier tags
- Conversations auto-tagged with batch + stage tags

### Make.com (Automation Rules)
- When Neon status → `QUEUED`: apply `stage-approved` tag in Apollo, Linear, Intercom, Google Contacts
- When Neon status → `NOT_FIT`: apply `stage-not-fit` tag in all platforms
- When Typeform survey submitted: apply `engaged-survey` + `stage-survey-done` in all platforms
- When Intercom conversation opened: apply `engaged-intercom` in Linear + Neon metadata

---

## Social Connection Enrichment Workflow

### Step 1 — Manual First Pass (Current method until API access is set up)
For each QUEUED prospect:
1. Search their full name + company on LinkedIn
2. Check if they are a 1st-degree connection (→ `social-tier-1`)
3. Check shared groups on LinkedIn / Facebook (→ `social-tier-2`)
4. Check if they appear in any group you're a member of
5. Search LinkedIn for former employers — compare with your own work history
6. If any match → update `social_connection_tier` in Neon + add tag in Apollo

### Step 2 — Future Automation (Phase 2)
When LinkedIn API access or Composio LinkedIn tools are available:
- Query LinkedIn connections for each prospect's name/company
- Auto-populate `social_connection_tier` field
- Trigger Tier A upgrade in Apollo if match found
- Create Linear label `social-tier-1` on the issue

### Step 3 — Priority Re-Sort
After social enrichment:
1. Tier A contacts move to TOP of outreach queue
2. First-touch email references the connection: *"I noticed we're both in the [Group Name] community..."*
3. Tier A contacts get a shorter sequence (2 touches, not 3) — higher trust, less nurturing needed

---

## Batch-001 Social Enrichment Checklist

For each QUEUED prospect from batch-001, manually check social connections:

| Prospect | Company | Check LinkedIn | Check Facebook Groups | Former Colleague? | Tier Set |
|----------|---------|---------------|-----------------------|-------------------|----------|
| Ryan Riegert | Asbury Accounting Advisors | ☐ | ☐ | ☐ | TBD |
| Avi Patel | Iconix Accounting | ☐ | ☐ | ☐ | TBD |
| Robert Butler | Jersey Mechanical | ☐ | ☐ | ☐ | TBD |
| Charles Kearns | 4 Seasons Roofing | ☐ | ☐ | ☐ | TBD |
| Carl Pizzo | Carl's Fencing | ☐ | ☐ | ☐ | TBD |
| Sam Friedman | Wayne's Roofing | ☐ | ☐ | ☐ | TBD |

After completing this table → update `social_connection_tier` in Neon, add tags in Apollo, re-sort Linear issues.

---

## Batch-001 Hit List — Top 3 Prospects Per Company

> Each approved company from batch-001 has only 1 identified prospect. Future batches should surface 3 individuals per company (owner + GM + department head). Below is the current state with notes on who to find next.

| Rank | Company | Current Prospect | Title | Score | Find Next |
|------|---------|-----------------|-------|-------|-----------|
| 1 | Asbury Accounting Advisors | Ryan Riegert ✅ | Founder & CPA | 71.7 | Find: office manager, bookkeeper |
| 2 | Iconix Accounting | Avi Patel ✅ | CEO & Founder | 71.7 | Solo firm — Avi is primary |
| 3 | Jersey Mechanical | Robert Butler ✅ | President/CEO | 62.8 | Find: ops manager, estimator |
| 4 | 4 Seasons Roofing | Charles Kearns ✅ | Owner Operator | 62.8 | Find: sales/office contact |
| 5 | Carl's Fencing | Carl Pizzo ✅ | CEO | 55.2 | Find: GM, office manager |
| 6 | Wayne's Roofing | Sam Friedman ✅ | Owner | 55.2 | Find: project manager |

**Next batch action:** For each company above, run `APOLLO_PEOPLE_SEARCH` filtered to the domain to find 2 additional contacts per firm (not the CEO). Target titles: Office Manager, General Manager, Operations Manager, Sales Manager, Estimator.

---

## Implementation Checklist

- [ ] Add `social_connection_tier` column to Neon `prospects` table (INTEGER, nullable)
- [ ] Complete batch-001 social enrichment checklist (manual LinkedIn/Facebook check)
- [ ] Update Apollo contacts with tier tags and custom fields
- [ ] Create Apollo contact lists: "Tier A — 2026-W10", "Tier B — 2026-W10"
- [ ] Create Linear label groups matching tag taxonomy
- [ ] Update Make.com webhook to write tags to Apollo + Google Contacts on Neon status change
- [ ] For batch-002: Run `APOLLO_PEOPLE_SEARCH` on approved company domains to find 2 additional contacts per firm
