import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.VITE_DATABASE_URL);

export interface Prospect {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  company_name: string;
  company_website: string;
  industry: string;
  city: string;
  state: string;
  seo_score: number;
  web_score: number;
  social_score: number;
  maps_score: number;
  overall_score: number;
  status: string;
  referral_code: string;
  social_connection_tier: number | null;
  apollo_contact_id: string | null;
  email_verified: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyResponse {
  id: string;
  prospect_id: string;
  typeform_response_id: string;
  answers: Record<string, unknown>;
  submitted_at: string;
}

export async function getProspects(status?: string): Promise<Prospect[]> {
  const query = status
    ? `SELECT * FROM prospects WHERE status = $1 ORDER BY overall_score DESC`
    : `SELECT * FROM prospects ORDER BY overall_score DESC`;
  const params = status ? [status] : [];
  const rows = await sql(query, params);
  return rows as Prospect[];
}

export async function getProspectById(id: string): Promise<Prospect | null> {
  const rows = await sql`SELECT * FROM prospects WHERE id = ${id}`;
  return (rows[0] as Prospect) || null;
}

export async function updateProspectStatus(id: string, status: string): Promise<void> {
  await sql`UPDATE prospects SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;
}

export async function getSurveyResponses(): Promise<SurveyResponse[]> {
  const rows = await sql`SELECT * FROM survey_responses ORDER BY submitted_at DESC`;
  return rows as SurveyResponse[];
}

export async function getProspectStats() {
  const rows = await sql`
    SELECT
      status,
      COUNT(*)::int as count,
      AVG(overall_score)::numeric(5,1) as avg_score
    FROM prospects
    GROUP BY status
    ORDER BY count DESC
  `;
  return rows;
}

export { sql };
