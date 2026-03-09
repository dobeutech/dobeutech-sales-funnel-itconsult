# Apollo.io Sequence Setup Guide

**Status:** Manual setup required — the Composio API key is non-master and cannot create/manage sequences via API.
**Estimated time:** 20 minutes in Apollo.io web UI

---

## Pre-Requisite: Email Account

Before creating sequences, verify your sending email is connected in Apollo:

1. Go to [Apollo.io](https://app.apollo.io) → Settings → Mailboxes
2. Confirm your sending address (jeremyw@dobeu.net or similar) is connected and warmed up
3. **SPF/DKIM must be set** on your sending domain before sequences go live

---

## Sequence 1: SMB Local Outreach — 3-Touch

### Create the Sequence

1. Go to **Sequences** → **New Sequence**
2. Name: `SMB Local Outreach 07753 — v1`
3. Settings:
   - Stop on reply: **Yes**
   - Stop on email open: **No**
   - Schedule: Weekdays only, 9am–5pm ET
   - Bounce handling: Stop sequence on bounce

---

### Touch 1 — Day 1 (Email)

**Subject:** `Quick note from a neighbor in {{city}}`

**Body:**
```
Hi {{first_name}},

Hope this finds you well. My name is Jeremy — I've been living near the Monmouth County area since 2017, and over the years I've seen a lot of great local businesses like {{company_name}} doing incredible work.

I've spent most of my career in corporate supply chain, but lately I've been focusing on something closer to home: helping small businesses like yours leverage the kind of AI and automation tools that used to be reserved for large enterprises — without the enterprise price tag or complexity.

I noticed {{company_name}}'s [website / Google presence / social pages] and had a few ideas that I think could make a real difference with very little time on your end.

I'm not here to pitch you anything — I put together a short survey (5 minutes max) for local business owners to share what's working, what isn't, and what they wish could run itself. The first 50 people who complete it get a free service on me — could be an SEO tune-up, a one-page website refresh, or a free tech evaluation. No strings attached.

{{typeform_link}}

Would love to hear your perspective. Either way, happy to connect.

Jeremy Williams
Dobeu Tech Solutions
{{phone_number}}
https://linkedin.com/in/jswilliamstu
```

---

### Touch 2 — Day 4 (Email)

**Subject:** `Re: Quick note from a neighbor`

**Body:**
```
Hi {{first_name}},

Just circling back on my note from earlier this week.

I did a quick look at {{company_website}} and noticed {{observation}}. It's a small thing, but it's the kind of gap that can quietly cost you visibility — and it's usually a quick fix.

The survey I mentioned takes about 5 minutes and there's still space in the first 50 for the free service. No pitch on my end, just genuinely trying to see where I can add value.

{{typeform_link}}

Either way, appreciate what you're building.

Jeremy
```

**Note:** The `{{observation}}` field should be personalized per prospect using the enrichment data from Semrush/Lighthouse. Apollo's custom fields can hold this.

---

### Touch 3 — Day 8 (Email)

**Subject:** `Last note — free offer expires soon`

**Body:**
```
Hi {{first_name}},

I'll keep this short — last note, I promise.

The "first 50 free service" offer I mentioned is filling up. If you've been curious at all, now's the time.

{{typeform_link}}

No hard sell, no follow-up pitch. Just a chance to get something useful at zero cost and tell me what would actually help your business.

Thanks for your time either way.

Jeremy
```

---

## Custom Field Setup in Apollo

Before launching the sequence, add these custom contact fields in Apollo:
1. Go to Settings → Custom Fields → Contacts
2. Add:
   - `referral_code` (text) — unique code pre-populated in Typeform link
   - `observation` (text) — personalized enrichment observation (1–2 sentences)
   - `free_service_assigned` (text) — filled after survey completion
   - `funnel_source` (dropdown: apollo_outreach, website_inbound, referral)
   - `batch_week` (text) — e.g., "2026-W11" for tracking

---

## Apollo Contact Filters for the Sequence

When adding contacts to this sequence:
- Status: **New** or **Enriched** in your Apollo pipeline
- Email verified: **Yes** (hard filter — no unverified)
- Location: NJ, within Monmouth/Ocean/Middlesex counties
- Company size: 1–49
- Title includes: owner, president, founder, CEO, general manager

---

## Sequence 2: LinkedIn Connection (Manual for now)

LinkedIn automation via Apollo requires LinkedIn Sales Navigator connection.
Short-term: send connection requests manually after touch 1 email.

**Connection note template (300 char max):**
```
Hi {{first_name}} — I'm a local tech consultant in the Monmouth County area helping SMBs with simple AI/automation solutions. Would love to connect and learn more about {{company_name}}.
```

---

## Next Steps After Sequence is Live

1. Add first approved batch (top 20 from `docs/prospects-batch-001.json`) to sequence
2. Monitor open rates daily for first week
3. Adjust `{{observation}}` for each contact before sequence fires (can batch-edit in Apollo)
4. Report bounces to `outreach_log` table in Neon (via Make.com webhook on bounce event)
