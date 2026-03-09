# Make.com Webhook Specifications

## Webhook 1: Neon Status Change -> Pinecone Upsert

**Trigger:** Custom webhook (POST from Neon DB trigger or manual call)
**Purpose:** When a prospect's status changes to QUEUED or NOT_FIT, store the decision in Pinecone for ML scoring.

### Webhook URL Format
```
https://hook.us2.make.com/[YOUR_WEBHOOK_ID]
```

### Expected Payload
```json
{
  "prospect_id": "uuid",
  "decision": "approved|rejected",
  "industry": "trades_hvac_construction",
  "overall_score": 71.7,
  "seo_score": 78,
  "web_score": 80,
  "social_tier": 2,
  "company_age_years": 5,
  "email_verified": true,
  "city": "Red Bank",
  "company_name": "Iconix Accounting",
  "contact_name": "Avi Patel",
  "batch_week": "2026-W10"
}
```

### Make.com Scenario Flow
```
1. Webhook (Custom) - Receive prospect decision
2. HTTP Module - POST to Pinecone Inference API
   URL: https://api.pinecone.io/embed
   Headers: Api-Key: [PINECONE_API_KEY]
   Body: {
     "model": "multilingual-e5-large",
     "inputs": [{"text": "Industry: {{industry}}. Founded: ... Overall pain score: {{overall_score}}/100..."}],
     "parameters": {"input_type": "passage", "truncate": "END"}
   }
3. HTTP Module - POST to Pinecone Upsert
   URL: https://dobeu-prospect-signals-kwbjids.svc.aped-4627-b74a.pinecone.io/vectors/upsert
   Headers: Api-Key: [PINECONE_API_KEY]
   Body: {
     "vectors": [{
       "id": "prospect-{{prospect_id}}",
       "values": {{step2.data[0].values}},
       "metadata": { ... all fields from webhook payload ... }
     }],
     "namespace": "batch-001"
   }
```

### Required Make.com Connections
- Pinecone API Key (stored as Make.com connection or data store)

---

## Webhook 2: Typeform Survey -> Pinecone Update

**Trigger:** Typeform webhook (existing scenario 4458602)
**Purpose:** When prospect completes survey, update Pinecone metadata.

### Additional Step in Existing Scenario
Add after the current Typeform processing:
```
HTTP Module - POST to Pinecone
URL: https://dobeu-prospect-signals-kwbjids.svc.aped-4627-b74a.pinecone.io/vectors/update
Headers: Api-Key: [PINECONE_API_KEY]
Body: {
  "id": "prospect-{{prospect_id_from_referral_code}}",
  "setMetadata": {
    "survey_completed": true
  },
  "namespace": "batch-001"
}
```

---

## Webhook 3: Intercom Engagement -> Pinecone Update

**Trigger:** Intercom webhook (new conversation opened)
**Purpose:** When prospect engages via Intercom, mark in Pinecone.

### Make.com Scenario Flow
```
1. Webhook - Intercom conversation.created
2. Router - Check if contact exists in prospects
3. HTTP Module - POST to Pinecone /vectors/update
   Body: {
     "id": "prospect-{{neon_id}}",
     "setMetadata": {
       "intercom_engaged": true
     },
     "namespace": "batch-001"
   }
```

---

## Webhook 4: Client Conversion -> Pinecone Max Weight

**Trigger:** Neon status -> CLIENT
**Purpose:** Maximum reinforcement signal for ML scoring.

### Make.com Scenario Flow
```
1. Webhook - Neon status change to CLIENT
2. HTTP Module - POST to Pinecone /vectors/update
   Body: {
     "id": "prospect-{{prospect_id}}",
     "setMetadata": {
       "client_converted": true,
       "decision": "converted"
     },
     "namespace": "batch-001"
   }
```

---

## Pinecone Connection Details (for Make.com HTTP modules)

| Setting | Value |
|---------|-------|
| Index host | `dobeu-prospect-signals-kwbjids.svc.aped-4627-b74a.pinecone.io` |
| Namespace | `batch-001` |
| Embedding model | `multilingual-e5-large` (via Pinecone inference API) |
| Vector dimension | 1024 |
| Auth header | `Api-Key: [stored in Make.com data store]` |

## GitHub Actions Neon Integration

| Setting | Value |
|---------|-------|
| Project ID | `jolly-snow-79034315` (set as `NEON_PROJECT_ID` variable) |
| API Key | Set as `NEON_API_KEY` secret |
| Org ID | `org-square-dawn-32466313` |
| Workflow | `.github/workflows/neon-branch.yml` |
