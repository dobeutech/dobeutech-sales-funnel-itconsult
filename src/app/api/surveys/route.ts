import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let limit = parseInt(searchParams.get('limit') || '50', 10);
    let offset = parseInt(searchParams.get('offset') || '0', 10);

    if (isNaN(limit) || limit <= 0) limit = 50;
    if (limit > 100) limit = 100; // Hard cap limit to prevent DoS
    if (isNaN(offset) || offset < 0) offset = 0;

    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not configured');
    }

    const sql = neon(dbUrl);
    // Sentinel fix: Added LIMIT and OFFSET to prevent unbounded collection retrieval DoS
    const rows = await sql`SELECT * FROM survey_responses ORDER BY submitted_at DESC LIMIT ${limit} OFFSET ${offset}`;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to get survey responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch survey responses' },
      { status: 500 }
    );
  }
}
