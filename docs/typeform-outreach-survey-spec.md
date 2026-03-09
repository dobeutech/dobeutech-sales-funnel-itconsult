# Typeform Outreach Survey — Build Spec

**Purpose:** The survey CTA linked from outreach emails. Lighter and more personal than the existing inbound form.
**Existing inbound form:** `KiSz0R6o` (dobeunet-mainpage-customer-interest-form) — keep as-is for website
**New form to create:** Outreach campaign survey — create manually at typeform.com/create

---

## Form Title
`Dobeu Tech — Local Business Quick Survey`

## URL slug
`dobeu.typeform.com/local-survey` (or similar)

## Hidden fields to configure (pre-populated via URL params)
- `referral_code` — unique code per prospect (from Neon prospects table)
- `first_name` — pre-fill greeting
- `utm_source`, `utm_medium`, `utm_campaign` — tracking

## Form Structure (7 screens, ~5 min)

---

### Welcome Screen
```
Hi {{hidden:first_name}} 👋

Thanks for taking a moment. This is a 5-minute survey — no pitch, no spam.

I'm Jeremy, a local IT consultant in the Monmouth County area. I built this to better understand what actually challenges local business owners day-to-day.

The first 50 people who complete this get a free service from me — SEO tune-up, 1-page website refresh, mailer design, or a free tech evaluation. You pick.
```

---

### Question 1 — Contact Info
Type: **contact_info**
Fields: First name, Last name, Email, Phone, Business name
Required: All

---

### Question 2 — Business Type
Title: `What type of business do you run?`
Type: **multiple_choice** (single select)
Choices (add "Other" option):
- Skilled trades (plumbing, electric, carpentry)
- HVAC / Heating & Cooling
- General contracting / Roofing
- Restaurant / Food service
- Cleaning / Janitorial
- Accounting / Bookkeeping
- Medical / Dental / Healthcare
- Pet grooming / Vet services
- Non-profit
- Consulting / Professional services
- Retail
- Other

---

### Question 3 — Team Size + Years in Business
Type: **short_text** (two separate questions)

Q3a: `Roughly how many people work at your business?`
(Placeholder: e.g., "just me", "3-5", "10-20")

Q3b: `How many years have you been in business?`
(Placeholder: e.g., "8 years")

---

### Question 4 — Repetitive Tasks (KEY QUESTION)
Title: `What's one thing your business does every week that feels repetitive or time-consuming?`
Type: **long_text**
Helper text: "Think about tasks you or your team do regularly that feel like they could run themselves — invoicing, scheduling, follow-ups, data entry, social posts, etc."
Required: Yes

---

### Question 5 — Online Presence Check
Title: `Do you currently have a website or Google Business listing?`
Type: **multiple_choice** (multi-select)
Choices:
- Yes, we have a website
- Yes, we're on Google Business / Maps
- We're on Facebook / Instagram
- We're on Yelp
- None of the above — not really online yet

---

### Question 6 — AI / Technology Openness
Title: `How do you feel about using AI or automation tools in your business?`
Type: **multiple_choice** (single select)
Choices:
- Very open — already exploring it
- Curious but not sure where to start
- Skeptical but willing to learn
- Not interested right now

---

### Question 7 — Referral
Title: `Were you referred by someone? (Optional)`
Type: **short_text**
Helper text: "If a friend sent you this survey, enter their name here — and thank them! 😊"
Required: No
Hidden field: `referral_code` (auto-populated)

---

### Question 8 — Free Service Pick
Title: `Which free service would be most useful to you?`
Type: **multiple_choice** (single select)
Helper text: "The first 50 respondents get one of these at no cost. Choose what would help most."
Choices:
- SEO tune-up (we fix issues hurting your Google ranking)
- 1-page website refresh (clean, modern, mobile-friendly update)
- Mailer or flyer design (digital or print)
- Free tech evaluation (we review your current tools and suggest improvements)

---

### Ending Screen
Title: `You're all set!`
Message:
```
Thank you, {{field:first_name}}!

I'll personally review your answers and be in touch within 2 business days.

If you want to talk sooner, feel free to book a quick 15-min call directly:
[Calendar link here]

And if you know another local business owner who could use a free service, share your referral link:
https://dobeu.typeform.com/local-survey#referral_code={{hidden:referral_code}}
```

---

## After Building the Form

Once the form is live, share the **form ID** (from the URL) and I will:
1. Set up the Typeform webhook → Neon DB via Make.com
2. Connect the Make.com "Typeform Lead Processing with AI" scenario or build a new one
3. Configure Customer.io welcome email trigger on submission
4. Set up Google Calendar booking link on the ending screen

---

## Technical Notes

- Enable **partial responses** in form settings (so we capture dropoffs)
- Add UTM hidden fields: utm_source, utm_medium, utm_campaign
- Embed GA4 tracking ID: **G-MMGCRB1ZMH** (same as existing form)
- GTM container: **GTM-M97GN5T7**
- Set `referral_code` as a hidden field populated from URL param
