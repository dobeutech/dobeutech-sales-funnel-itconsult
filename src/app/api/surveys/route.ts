import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM survey_responses ORDER BY submitted_at DESC`;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to get survey responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch survey responses' },
      { status: 500 }
    );
  }
}
