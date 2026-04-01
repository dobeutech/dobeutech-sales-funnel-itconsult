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
  const url = status ? `/api/prospects?status=${encodeURIComponent(status)}` : '/api/prospects';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch prospects');
  return response.json();
}

export async function getProspectById(id: string): Promise<Prospect | null> {
  const response = await fetch(`/api/prospects/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error('Failed to fetch prospect');
  return response.json();
}

export async function updateProspectStatus(id: string, status: string): Promise<void> {
  const response = await fetch(`/api/prospects/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update prospect status');
}

export async function getSurveyResponses(): Promise<SurveyResponse[]> {
  const response = await fetch('/api/survey_responses');
  if (!response.ok) throw new Error('Failed to fetch survey responses');
  return response.json();
}

export async function getProspectStats() {
  const response = await fetch('/api/prospects/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export async function getWeeklyStats() {
  const response = await fetch('/api/prospects/weekly');
  if (!response.ok) throw new Error('Failed to fetch weekly stats');
  return response.json();
}
