# ML Feedback Loop — Prospect Scoring Intelligence

**Purpose:** Learn Jeremy's approval preferences over time, factor in Typeform + Intercom signals, and surface better prospects with each batch.

---

## Architecture Overview

```
Apollo Discovery
      ↓
Feature Extraction (domain, score, industry, age, location, social_tier)
      ↓
┌─────────────────────────────────────┐
│  PINECONE — Labeled Prospect Store  │  ← Jeremy's approve/reject decisions
│  Vectors: prospect feature embeddings│  ← Typeform completion signal
│  Metadata: decision, score, signals  │  ← Intercom engagement signal
└─────────────────────────────────────┘
      ↓
Claude API Few-Shot Scorer
(retrieves top-5 similar past decisions → scores new prospect)
      ↓
Ranked prospect list with confidence score
```

---

## Signal Sources

### Signal 1 — Human Approval (Primary)
- **Event:** Jeremy marks QUEUED / NOT_FIT in Neon DB
- **Features stored:**
  - `industry`, `overall_score`, `seo_score`, `web_score`, `authority_score`
  - `company_founded_year`, `employee_count`, `city`, `state`
  - `social_connection_tier` (1=direct, 2=group/colleague, 3=cold)
  - `email_status` (verified/extrapolated)
  - `rejection_reason` (free text from notes field)
- **Decision label:** `approved` | `rejected` | `undecided`

### Signal 2 — Typeform Response (Positive reinforcement)
- **Event:** Prospect submits survey (webhook → Make.com scenario 4458602)
- **Features added:** `survey_completed=true`, `free_service_pick`, `ai_openness`, `repetitive_tasks`
- **Effect:** Boost similarity weight for prospects like this one

### Signal 3 — Intercom Engagement
- **Event:** Prospect opens a conversation, replies, or is tagged in Intercom
- **Features added:** `intercom_engaged=true`, `intercom_sentiment`, `conversation_count`
- **Effect:** Marks as high-quality lead; future similar prospects get higher priority

### Signal 4 — Client Conversion (Ultimate reinforcement)
- **Event:** Status → CLIENT in Neon DB
- **Effect:** Maximum weight boost — prospects matching this profile are top priority forever

---

## Pinecone Index Design

**Index name:** `dobeu-prospect-signals`
**Dimension:** 1536 (text-embedding-3-small or Claude embeddings)
**Metric:** cosine

### Record Schema
```json
{
  "id": "prospect-{neon_db_id}",
  "values": [/* embedding of feature text */],
  "metadata": {
    "neon_id": "uuid",
    "decision": "approved|rejected|converted",
    "industry": "accounting",
    "overall_score": 71.7,
    "social_tier": 2,
    "company_age_years": 1,
    "email_verified": true,
    "survey_completed": false,
    "intercom_engaged": false,
    "client_converted": false,
    "rejection_reason": "",
    "batch_week": "2026-W10"
  }
}
```

### Feature Text Template (for embedding)
```
Industry: {industry}. Founded: {founded_year}. Employees: {employees}.
City: {city}, NJ. SEO score: {seo_score}/100. Web authority: {authority_score}.
Overall pain score: {overall_score}/100. Email: {email_status}.
Social connection tier: {social_tier} (1=direct, 2=network, 3=cold).
Keywords ranking: {keyword_count} keywords, best position {best_position}.
Survey completed: {survey_completed}. Intercom engaged: {intercom_engaged}.
```

---

## Scorer Implementation

**File:** `src/lib/prospect-scorer.ts`

```typescript
// Pseudo-code — full implementation in Phase 6
async function scoreProspect(prospect: Prospect): Promise<ScoringResult> {
  // 1. Embed the prospect's features
  const featureText = buildFeatureText(prospect)
  const embedding = await embed(featureText)  // Anthropic or OpenAI embeddings

  // 2. Retrieve top-5 similar labeled examples from Pinecone
  const similar = await pinecone.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
    filter: { decision: { $in: ['approved', 'rejected', 'converted'] } }
  })

  // 3. Claude few-shot scoring
  const prompt = buildScoringPrompt(prospect, similar.matches)
  const result = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',  // Fast + cheap for scoring
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  })

  // 4. Return structured score + reasoning
  return parseScore(result)
}
```

---

## Make.com Integration Points

| Trigger | Scenario | Action |
|---------|----------|--------|
| Neon status → QUEUED | New Make.com webhook | Store in Pinecone as `approved` |
| Neon status → NOT_FIT | New Make.com webhook | Store in Pinecone as `rejected` |
| Typeform survey submitted | Scenario 4458602 (existing) | Update Pinecone metadata: `survey_completed=true` |
| Intercom convo opened | New scenario | Update Pinecone metadata: `intercom_engaged=true` |
| Neon status → CLIENT | New Make.com webhook | Update Pinecone: `client_converted=true`, weight=10x |

---

## MLOps Platform Options (Recommended)

| Option | Fit | Why |
|--------|-----|-----|
| **Anthropic API + Pinecone** | ✅ Best for now | Already connected, no new infra, few-shot learning, scales to thousands of examples |
| Vertex AI AutoML | Medium | Overkill until 500+ labeled examples |
| AWS SageMaker | Low | Too heavy for 1-person operation |
| Hugging Face + fine-tune | Future | Once 1,000+ labeled decisions exist |

**Recommendation:** Anthropic API + Pinecone for 0–500 decisions, then evaluate fine-tuning.

---

## Implementation Phases

### Phase A (Now — Week 2026-W10)
- [ ] Create Pinecone index `dobeu-prospect-signals`
- [ ] Store 11 batch-001 decisions (6 approved, 4 not_fit, 1 undecided)
- [ ] Add Make.com webhook: Neon status change → Pinecone upsert

### Phase B (After first survey responses)
- [ ] Typeform webhook updates Pinecone metadata
- [ ] Add `survey_completed` boost to scoring logic

### Phase C (After first Intercom conversation)
- [ ] Intercom webhook updates Pinecone metadata
- [ ] Build batch scorer that auto-ranks next week's Apollo results

### Phase D (After first client conversion)
- [ ] CLIENT signal triggers max-weight update
- [ ] Scorer used in weekly batch automation (no manual ranking needed)
