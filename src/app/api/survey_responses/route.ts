import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const rows = await sql`SELECT * FROM survey_responses ORDER BY submitted_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json({ error: 'Failed to fetch survey responses' }, { status: 500 });
  }
}
