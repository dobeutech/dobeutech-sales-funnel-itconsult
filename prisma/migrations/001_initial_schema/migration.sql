-- Dobeu Tech Solutions Sales Funnel — Initial Schema
-- Migration: 001_initial_schema
-- Database: Neon Postgres (jolly-snow-79034315 / salesfunnel)

-- Enums
CREATE TYPE "prospect_status" AS ENUM (
  'DISCOVERED', 'ENRICHED', 'QUEUED', 'CONTACTED', 'REPLIED',
  'SURVEY_SENT', 'SURVEY_COMPLETE', 'MEETING_BOOKED', 'CLIENT',
  'UNSUBSCRIBED', 'BOUNCED', 'NOT_FIT'
);

CREATE TYPE "outreach_channel" AS ENUM ('EMAIL', 'LINKEDIN', 'SMS', 'PHONE');

CREATE TYPE "batch_status" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'SENT', 'COMPLETE');

-- Prospects
CREATE TABLE prospects (
  id                   TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  apollo_id            TEXT UNIQUE,
  first_name           TEXT NOT NULL,
  last_name            TEXT NOT NULL,
  email                TEXT,
  phone                TEXT,
  title                TEXT,
  company_name         TEXT NOT NULL,
  company_website      TEXT,
  industry             TEXT,
  employee_count       INTEGER,
  years_founded        INTEGER,
  city                 TEXT,
  state                TEXT,
  zip_code             TEXT,
  linkedin_url         TEXT,

  -- Enrichment scores (0–100)
  seo_score            INTEGER,
  web_score            INTEGER,
  social_score         INTEGER,
  maps_score           INTEGER,
  overall_score        INTEGER,

  -- Raw enrichment payloads
  semrush_data         JSONB,
  lighthouse_data      JSONB,
  social_data          JSONB,

  -- CRM state
  status               prospect_status NOT NULL DEFAULT 'DISCOVERED',
  referral_code        TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
  referred_by          TEXT,
  personal_connection  BOOLEAN NOT NULL DEFAULT FALSE,
  email_verified       BOOLEAN NOT NULL DEFAULT FALSE,
  notes                TEXT,

  -- External IDs for sync
  apollo_contact_id    TEXT,
  google_contact_id    TEXT,
  ms365_contact_id     TEXT,
  customerio_id        TEXT,

  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prospects_status        ON prospects(status);
CREATE INDEX idx_prospects_overall_score ON prospects(overall_score DESC NULLS LAST);
CREATE INDEX idx_prospects_zip_code      ON prospects(zip_code);
CREATE INDEX idx_prospects_industry      ON prospects(industry);

-- Outreach Log
CREATE TABLE outreach_log (
  id               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  prospect_id      TEXT NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  channel          outreach_channel NOT NULL,
  message_type     TEXT NOT NULL,
  subject          TEXT,
  body_snippet     TEXT,
  apollo_email_id  TEXT,
  sent_at          TIMESTAMPTZ NOT NULL,
  opened_at        TIMESTAMPTZ,
  clicked_at       TIMESTAMPTZ,
  replied_at       TIMESTAMPTZ,
  bounced_at       TIMESTAMPTZ,
  bounce_reason    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outreach_prospect_id ON outreach_log(prospect_id);
CREATE INDEX idx_outreach_sent_at     ON outreach_log(sent_at DESC);
CREATE INDEX idx_outreach_channel     ON outreach_log(channel);

-- Survey Responses
CREATE TABLE survey_responses (
  id                     TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  prospect_id            TEXT REFERENCES prospects(id) ON DELETE SET NULL,
  typeform_response_id   TEXT UNIQUE NOT NULL,
  referral_code          TEXT,
  referral_source        TEXT,
  free_service_choice    TEXT,

  -- Structured answers
  industry               TEXT,
  employee_count         TEXT,
  years_in_business      TEXT,
  repetitive_tasks       JSONB,
  current_tech_stack     JSONB,
  marketing_approach     TEXT,
  ai_openness            TEXT,
  foot_traffic_trend     TEXT,
  biggest_challenge      TEXT,
  raw_answers            JSONB,

  submitted_at           TIMESTAMPTZ NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_survey_prospect_id ON survey_responses(prospect_id);
CREATE INDEX idx_survey_submitted_at ON survey_responses(submitted_at DESC);

-- Analytics Events
CREATE TABLE analytics_events (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  prospect_id  TEXT,
  session_id   TEXT,
  event        TEXT NOT NULL,
  page         TEXT,
  channel      TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  utm_content  TEXT,
  utm_term     TEXT,
  referrer     TEXT,
  user_agent   TEXT,
  ip_hash      TEXT,
  value        NUMERIC,
  metadata     JSONB,
  ts           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analytics_prospect_id  ON analytics_events(prospect_id);
CREATE INDEX idx_analytics_event_ts     ON analytics_events(event, ts DESC);
CREATE INDEX idx_analytics_utm          ON analytics_events(utm_source, utm_campaign);
CREATE INDEX idx_analytics_session      ON analytics_events(session_id);

-- Weekly Batches
CREATE TABLE weekly_batches (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  week_of       TIMESTAMPTZ NOT NULL,
  status        batch_status NOT NULL DEFAULT 'PENDING_APPROVAL',
  prospect_ids  TEXT[] NOT NULL DEFAULT '{}',
  approved_at   TIMESTAMPTZ,
  sent_count    INTEGER NOT NULL DEFAULT 0,
  reply_count   INTEGER NOT NULL DEFAULT 0,
  survey_count  INTEGER NOT NULL DEFAULT 0,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_weekly_batches_updated_at
  BEFORE UPDATE ON weekly_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
