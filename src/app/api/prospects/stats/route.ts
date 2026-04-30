import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {

    const rows = await sql`
      SELECT
        status,
        COUNT(*)::int as count,
        AVG(overall_score)::numeric(5,1) as avg_score
      FROM prospects
      GROUP BY status
      ORDER BY count DESC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to get prospect stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prospect stats' },
      { status: 500 }
    );
  }
}
