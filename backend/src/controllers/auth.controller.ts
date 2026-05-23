import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/apiResponse.util';

export async function login(req: Request, res: Response): Promise<void> {
  const result = await authService.login(req.body);
  if (!result) {
    sendError(res, 'Invalid email or password', 401);
    return;
  }
  sendSuccess(res, result);
}
