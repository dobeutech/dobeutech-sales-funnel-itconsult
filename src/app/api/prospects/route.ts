import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
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
    let rows;

    // Sentinel fix: Added LIMIT and OFFSET to prevent unbounded collection retrieval DoS
    if (status) {
      rows = await sql`SELECT * FROM prospects WHERE status = ${status} ORDER BY overall_score DESC LIMIT ${limit} OFFSET ${offset}`;
    } else {
      rows = await sql`SELECT * FROM prospects ORDER BY overall_score DESC LIMIT ${limit} OFFSET ${offset}`;
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to get prospects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prospects' },
      { status: 500 }
    );
  }
}
