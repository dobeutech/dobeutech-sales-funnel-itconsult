import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    let rows;

    if (status) {
      rows = await sql`SELECT * FROM prospects WHERE status = ${status} ORDER BY overall_score DESC`;
    } else {
      rows = await sql`SELECT * FROM prospects ORDER BY overall_score DESC`;
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
