# Outreach Templates — Dobeu Tech Solutions

Three-touch email sequence plus a LinkedIn connection note. All templates are for Jeremy Williams, IT consultant near Asbury Park, NJ.

**Placeholders to replace before sending:**
- `[FIRST_NAME]` — prospect's first name
- `[COMPANY]` — company name
- `[CITY]` — prospect's city
- `[OBSERVATION]` — one specific, concrete detail observed from their website, Google Maps listing, or social profile (required — never leave generic)
- `[SURVEY_LINK]` — Typeform survey URL

---

## Touch 1 — Day 1 — Personal Intro

**Subject:** Quick note from a neighbor in [CITY]

---

Hi [FIRST_NAME],

My name is Jeremy — I live out in the Howell/Asbury Park area and have been here since 2017. My wife's mom owns a small business over in Asbury Park, so I have a lot of respect for what it takes to run a local operation day to day.

I've been exploring ways to help small businesses in the area with AI and automation — things like automating the repetitive stuff, cleaning up their online presence, or just figuring out what technology might actually be worth their time (and what isn't). No big agency stuff, just practical help from someone local.

I came across [COMPANY] and noticed [OBSERVATION]. Thought it might be worth reaching out.

I put together a short, free survey — takes about 3 minutes — to help me understand what challenges local businesses are actually running into. No sales pitch at the end, just me trying to learn. The first 50 businesses that complete it get a free service on me (website audit, SEO report, or a basic automation — your choice).

If you have a moment: [SURVEY_LINK]

No pressure at all — I know you're busy. Happy to answer any questions if you want to reply here.

Jeremy Williams
IT Consultant — Dobeu Tech Solutions
Howell, NJ | dobeu.net

---

## Touch 2 — Day 4 — Soft Follow-Up

**Subject:** Re: Quick note from a neighbor in [CITY]

---

Hi [FIRST_NAME],

Just circling back on the note I sent a few days ago. No worries if it got buried — I know how it goes.

I was looking at [COMPANY] again and also noticed [OBSERVATION]. Figured it was worth one more try.

If you haven't had a chance to look at the survey yet, here it is again: [SURVEY_LINK]

It's completely free, takes about 3 minutes, and the first 50 businesses that complete it still get a free service. No strings attached.

If this isn't the right time or it's not relevant, totally understand — just let me know and I won't bother you again.

Jeremy Williams
IT Consultant — Dobeu Tech Solutions
dobeu.net

---

## Touch 3 — Day 8 — Final Touch

**Subject:** Last note — free offer wrapping up

---

Hi [FIRST_NAME],

I'll keep this short — I know you're running a business and your time matters.

This is my last note. I reached out because I genuinely think there might be some quick wins for [COMPANY], and I wanted to offer something useful before I closed out my initial list.

The free service offer (website audit, SEO report, or automation consult — first 50 respondents) is almost filled up. If you've been meaning to check it out: [SURVEY_LINK]

If the timing isn't right or it's just not a fit, no hard feelings at all. Wishing you a good rest of the season either way.

Jeremy Williams
IT Consultant — Dobeu Tech Solutions
Howell, NJ | dobeu.net

---

## LinkedIn Connection Request Note

*50 characters max. Personal, local angle. No pitch.*

> Hey [FIRST_NAME] — fellow NJ local, love what you're building.

*(46 characters — within limit)*

**Alternate version (if they're in a specific trade):**
> [FIRST_NAME] — local NJ guy, big fan of local trades.

*(54 characters — trim "local" from one instance if needed)*

---

## Usage Notes

- Touch 1 goes out on the day outreach is approved for a batch.
- Touch 2 fires automatically via Customer.io drip if no reply or survey click detected after 3 days.
- Touch 3 fires automatically via Customer.io drip if still no engagement after 7 days from Touch 1.
- If the prospect clicks the survey link or replies at any point, suppress remaining touches immediately.
- The `[OBSERVATION]` field must be populated before sending — Customer.io template variable pulled from `prospects.observation_note` (populate during enrichment step).
- LinkedIn notes are manual — Jeremy sends these separately, not automated.
