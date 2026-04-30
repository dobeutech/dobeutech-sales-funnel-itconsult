import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const rows = await sql`SELECT * FROM prospects WHERE id = ${params.id}`;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Failed to get prospect:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prospect' },
      { status: 500 }
    );
  }
}
