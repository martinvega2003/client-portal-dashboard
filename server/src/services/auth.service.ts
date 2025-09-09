import { pool } from '../database.js';
import type { DbUser, PublicUser } from '../types.js';

// Return user with password_hash (for authentication)
export const getUserByEmail = async (email: string): Promise<DbUser | null> => {
  const result = await pool.query<DbUser>( // <DbUser> defines the type of rows returned (result.rows = DbUser[])
    'SELECT id, username, email, password_hash, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] ?? null;
};

// Create user and return public row (without password_hash)
export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
): Promise<PublicUser> => {
  try {
    const result = await pool.query<Pick<DbUser, 'id' | 'username' | 'email' | 'created_at'>>( // only select the fields that will be returned
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, passwordHash]
    );

    const row = result.rows[0];
    if (!row) throw new Error('Failed to create user');

     // map to return type without password_hash
    const publicUser: PublicUser = {
      id: row.id,
      username: row.username,
      email: row.email,
      created_at: row.created_at
    };
    return publicUser;
  } catch (err: any) {
    // Basic catching: if unique constraint (email) is violated, throw a specific error
    if (err?.code === '23505') {
      // 23505 is unique_violation in Postgres
      throw new Error('User with this email already exists');
    }
    throw err; // re-throw other errors
  }
};
