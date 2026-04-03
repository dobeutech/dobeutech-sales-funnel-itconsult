import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sql = neon(process.env.DATABASE_URL!);

    if (status) {
      const rows = await sql`SELECT * FROM prospects WHERE status = ${status} ORDER BY overall_score DESC`;
      return NextResponse.json(rows);
    } else {
      const rows = await sql`SELECT * FROM prospects ORDER BY overall_score DESC`;
      return NextResponse.json(rows);
    }
  } catch (error) {
    console.error('Failed to fetch prospects:', error);
    return NextResponse.json({ error: 'Failed to fetch prospects' }, { status: 500 });
  }
}
