import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config';
import type { AuthPayload } from '../types/request.types';

export function signToken(payload: AuthPayload): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as unknown as number };
  return jwt.sign(
    { userId: payload.userId, email: payload.email, role: payload.role },
    env.JWT_SECRET,
    options
  );
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, env.JWT_SECRET) as AuthPayload;
}
