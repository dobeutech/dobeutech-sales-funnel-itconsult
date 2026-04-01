import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

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
    console.error('Error fetching prospect stats:', error);
    return NextResponse.json({ error: 'Failed to fetch prospect stats' }, { status: 500 });
  }
}
