import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const rows = await sql`SELECT * FROM prospects WHERE id = ${params.id}`;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error('Error fetching prospect by ID:', err);
    return NextResponse.json({ error: 'Failed to fetch prospect' }, { status: 500 });
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });
    }

    await sql`UPDATE prospects SET status = ${body.status}, updated_at = NOW() WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating prospect status:', err);
    return NextResponse.json({ error: 'Failed to update prospect' }, { status: 500 });
  }
}
