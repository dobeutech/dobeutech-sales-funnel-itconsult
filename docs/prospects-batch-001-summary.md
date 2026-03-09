# Prospects Batch 001 — Approval Sheet

**Batch:** 2026-W10 | **Enriched:** 2026-03-08 | **Status: AWAITING YOUR APPROVAL**

> Scores are pain-based (0–100): higher = more digital opportunity. 40–69 = worth outreach. 70+ = strong candidate.

---

## Approval Table — Top Priority First

Mark each as ✅ Approve / ❌ Skip before adding to Apollo sequence.

| # | Name | Company | Score | Email | Key Finding | Action |
|---|------|---------|-------|-------|-------------|--------|
| 1 | **Ryan Riegert** | Asbury Accounting Advisors | **71.7** ⭐⭐ | ryan@asburyaccounting.com | Authority 2, 1 keyword, brand new firm in Asbury Park | ✅ Approve |
| 2 | **Avi Patel** | Iconix Accounting (Red Bank) | **71.7** ⭐⭐ | alpesh@iconixaccounting.com | Authority 2, 42K spam backlinks hurting rankings | ✅ Approve |
| 3 | **Robert Butler** | Jersey Mechanical Contractors | **62.8** ⭐ | rcbutler@jerseymechanicalcontractors.com | Ranks #7 for main keyword — top 3 is achievable | ✅ Approve |
| 4 | **Charles Kearns** | 4 Seasons Roofing | **62.8** ⭐ | c.kearns@4seasonsroofingco.com | Founded 2022, invisible in local search | ✅ Approve |
| 5 | **Bashir Hadib** | Accounting Tax USA | **62.8** ⭐ | bashir@usataxaccounting.com | All keywords pos 99+, authority 7 | ☐ Approve | 
| 6 | **Shannon Prato** | SMG Facilities (est. 1996) | **59.0** | shannonprato@smgholdingsllc.com | 30-yr NJ business, zero search traffic | ☐ Approve | ❌not approved - to large of a firm not specific enough to the area
| 7 | **Carl Pizzo** | Carl's Fencing (est. 1999) | **55.2** | carl@bycarls.com | 1,668 referring domains, all keywords pos 99 | ✅ Approve |
| 8 | **Sam Friedman** | Wayne's Roofing Co. | **55.2** | sam@waynemgmt.com | Keywords at pos 99, missing Monmouth County traffic | ✅ Approve |
| 9 | Gene Waddy | Alpha Business Solutions | ~21 (no Semrush) | gwaddy@alphambe.com | No Semrush data — enrich alphambe.com first | ❌ Skip |
| 10 | Doug Andersen | Pierce (Holmdel) | ~21 (no Semrush) | doug.andersen@pierce.com | Verify employee count — may be >50 | ❌ Skip |
| 11 | John Roy | Pierce | extrapolated | jroy@pierce.com | Same company as #10, extrapolated email | ❌ Skip |

---

## Pre-Written Observations (copy into Apollo custom field)

These go in the Apollo `observation` field before Touch 1 fires.

**Ryan Riegert — Asbury Accounting Advisors**
> "asburyaccounting.com ranks for just one keyword and has an authority score of 2 — a brand-new firm with almost zero search visibility in Asbury Park"

**Avi Patel — Iconix Accounting**
> "iconixaccounting.com has 42,000+ backlinks but an authority score of only 2 — a classic sign of low-quality links that may be suppressing your Google rankings"

**Robert Butler — Jersey Mechanical Contractors**
> "jerseymechanicalcontractors.com actually ranks #7 for 'new jersey mechanical contractors' — a small SEO push could put you in the top 3 and significantly increase inbound calls"

**Charles Kearns — 4 Seasons Roofing**
> "4seasonsroofingcompany.com founded 2022 — currently invisible in local search despite 163 referring domains, meaning your competitors are capturing every inbound roofing search in the area"

**Bashir Hadib — Accounting Tax USA**
> "accountingtaxusa.com has all keywords stuck at position 99+ with an authority score of 7 — the site exists but isn't ranking for any local search terms"

**Shannon Prato — SMG Facilities**
> "smgfacilities.com has authority 13 and 131 referring domains but every keyword sits at position 99 — some targeted local content could unlock real search traffic for a 30-year-old NJ business"

**Carl Pizzo — Carl's Fencing**
> "bycarls.com has 1,668 referring domains but every keyword is stuck at position 98–99, meaning zero organic traffic is coming through — a well-built site that's invisible in search"

**Sam Friedman — Wayne's Roofing**
> "waynesroofing.com ranks for roofing keywords in Toms River but all at position 98–99, meaning customers searching 'roofer near me' in Monmouth County aren't finding you"

---

## How to Approve

**Option A — Prisma Studio (easiest)**
```bash
npm run db:studio
# Open Prospects table → change status DISCOVERED → APPROVED
```

**Option B — Direct SQL**
```sql
-- Approve all 8 scored prospects at once (review list above first)
UPDATE prospects
SET status = 'APPROVED', updated_at = NOW()
WHERE id IN (
  '36359ecf-525f-40ce-b483-d087049f6e45',  -- Ryan Riegert
  'a2f22ad5-a5a3-4375-936d-7f215cf75762',  -- Avi Patel
  'cb250e85-d179-4a94-9bae-de8902a18737',  -- Robert Butler
  'a9982420-ea28-44b5-9df3-ae6ae9879f7b',  -- Charles Kearns
  '00e148d1-2798-4fb9-be24-f78a34ece4cb',  -- Bashir Hadib
  'c7145fe4-3456-431b-9e1a-c37611c7b4df',  -- Shannon Prato
  'e15cb05a-61b7-4fd9-839b-485b630544b5',  -- Carl Pizzo
  '0d80fac3-3f98-4034-af31-801e24fb7579'   -- Sam Friedman
);
```

---

## After Approval — Apollo Sequence Steps

Per `docs/apollo-sequence-setup-guide.md`:

1. Go to Apollo.io → Sequences → `SMB Local Outreach 07753 — v1`
2. Add approved contacts (filter: email verified, NJ, 1–49 employees)
3. Paste observation above into each contact's `observation` custom field
4. Set `batch_week` = `2026-W10` and `funnel_source` = `apollo_outreach`
5. **Do not activate sequence until Typeform survey link is ready**

---

*Semrush enrichment used 8 × ~200 units = ~1,600 of 50,000 available. 48,400 remaining for future batches.*
