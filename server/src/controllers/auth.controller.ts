import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { getUserByEmail, createUser } from '../services/auth.service.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { signJwt } from '../utils/jwt.js';
import type { PublicUser } from '../types.js';

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.format() });
    }

    const { username, email, password } = parsed.data;
    const exists = await getUserByEmail(email);
    if (exists) return res.status(409).json({ error: 'User already exists' });

    const pwdHash = await hashPassword(password);
    // createUser should return a PublicUser (without password)
    const user: PublicUser = await createUser(username, email, pwdHash);

    const token = signJwt({ sub: String(user.id), email: user.email });

    return res.status(201).json({ token, user });
  } catch (err: any) {
    console.error('Register error:', err);
    // Example: Postgres unique_violation code 23505 -> return 409
    if (err?.code === '23505' || /already exists/i.test(err?.message)) {
      return res.status(409).json({ error: 'User already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.format() });
    }

    const { email, password } = parsed.data;
    const userDb = await getUserByEmail(email);
    if (!userDb) return res.status(401).json({ error: 'Invalid credentials' });

    // now typed: userDb.password_hash exists per DbUser type
    const ok = await comparePassword(password, userDb.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signJwt({ sub: String(userDb.id), email: userDb.email });

    const publicUser: PublicUser = {
      id: userDb.id,
      username: userDb.username,
      email: userDb.email,
      created_at: userDb.created_at
    };

    return res.json({ token, user: publicUser });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
