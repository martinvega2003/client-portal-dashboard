import jwt from 'jsonwebtoken';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET!
if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Set process.env.JWT_SECRET for secure tokens.');
}

export const signJwt = (payload: object, expiresIn: string | number = '1h'): string => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not set in environment');
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions); // This is correct!
}

export function verifyJwt(token: string): any {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not set in environment');
  return jwt.verify(token, JWT_SECRET);
}
