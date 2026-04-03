import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM prospects WHERE id = ${id}`;
    return NextResponse.json(rows[0] || null);
  } catch (error) {
    console.error('Failed to fetch prospect:', error);
    return NextResponse.json({ error: 'Failed to fetch prospect' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`UPDATE prospects SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update prospect:', error);
    return NextResponse.json({ error: 'Failed to update prospect' }, { status: 500 });
  }
}
