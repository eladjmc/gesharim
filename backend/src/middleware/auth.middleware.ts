import type { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { sendError } from '../utils/apiResponse.util';
import type { AuthRequest } from '../types/request.types';

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Access denied. No token provided.', 401);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    sendError(res, 'Invalid or expired token.', 401);
  }
}
