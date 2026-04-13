import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not configured');
    }

    const sql = neon(dbUrl);

    const [statsRows, recentRows] = await Promise.all([
      sql`
        SELECT
          COUNT(*)::int as total_prospects,
          COUNT(*) FILTER (WHERE status = 'QUEUED')::int as queued,
          COUNT(*) FILTER (WHERE status = 'CONTACTED')::int as contacted,
          COUNT(*) FILTER (WHERE status = 'REPLIED')::int as replied,
          COUNT(*) FILTER (WHERE status = 'CLIENT')::int as clients,
          AVG(overall_score)::numeric(5,1) as avg_score,
          (SELECT COUNT(*)::int FROM survey_responses) as surveys_completed
        FROM prospects
      `,
      sql`
        SELECT id, first_name, last_name, company_name, status, overall_score, updated_at
        FROM prospects
        ORDER BY updated_at DESC
        LIMIT 10
      `,
    ]);

    return NextResponse.json({
      stats: statsRows[0],
      recent: recentRows,
    });
  } catch (error) {
    console.error('Failed to get weekly stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly stats' },
      { status: 500 }
    );
  }
}
