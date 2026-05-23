import type { Response } from 'express';

export function sendSuccess(res: Response, data: unknown = null, message?: string, statusCode = 200): void {
  const body: Record<string, unknown> = { success: true, data };
  if (message) body.message = message;
  res.status(statusCode).json(body);
}

export function sendError(res: Response, error: string, statusCode = 400, details?: unknown): void {
  const body: Record<string, unknown> = { success: false, error };
  if (details) body.details = details;
  res.status(statusCode).json(body);
}
