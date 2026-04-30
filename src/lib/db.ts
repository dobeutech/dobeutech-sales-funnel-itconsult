import { neon } from '@neondatabase/serverless';

const dbUrl = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db'; // Provide a fallback so it doesn't break build without env var

export const sql = neon(dbUrl);
