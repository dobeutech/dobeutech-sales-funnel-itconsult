import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
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
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
