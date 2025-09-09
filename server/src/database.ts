// server/src/database.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
import test from 'node:test';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * Test DB connection.
 * - If `log` is true (default) it prints success/failure or the error to console.
 * - Returns boolean: true on OK, false on failure.
 */
export async function testDb(log = true): Promise<boolean> {
  try {
    const { rows } = await pool.query('SELECT 1 as ok');
    const ok = !!(rows && rows[0] && rows[0].ok === 1);

    if (log) {
      if (ok) {
        console.log('Database connection successful');
      } else {
        console.error('Database connection failed');
      }
    }

    return ok;
  } catch (err) {
    if (log) {
      console.error('Database connection error:', err);
    }
    return false;
  }
}
