import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  const sql = neon(process.env.DATABASE_URL!);
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const rows = status
      ? await sql`SELECT * FROM prospects WHERE status = ${status} ORDER BY overall_score DESC`
      : await sql`SELECT * FROM prospects ORDER BY overall_score DESC`;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return NextResponse.json({ error: 'Failed to fetch prospects' }, { status: 500 });
  }
}
