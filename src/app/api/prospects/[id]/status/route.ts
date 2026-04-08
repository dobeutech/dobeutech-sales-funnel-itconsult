import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not configured');
    }

    const sql = neon(dbUrl);

    await sql`UPDATE prospects SET status = ${status}, updated_at = NOW() WHERE id = ${params.id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update prospect status:', error);
    return NextResponse.json(
      { error: 'Failed to update prospect status' },
      { status: 500 }
    );
  }
}
