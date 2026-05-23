import type { Request, Response } from 'express';
import * as manhadService from '../services/manhad.service';
import { sendSuccess, sendError } from '../utils/apiResponse.util';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const manhadim = await manhadService.getAll();
  sendSuccess(res, manhadim);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const manhad = await manhadService.getById(req.params.id as string);
  if (!manhad) {
    sendError(res, 'מנה"ד not found', 404);
    return;
  }
  sendSuccess(res, manhad);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const manhad = await manhadService.create(req.body);
    sendSuccess(res, manhad, undefined, 201);
  } catch (error) {
    sendError(res, (error as Error).message);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const manhad = await manhadService.update(req.params.id as string, req.body);
  if (!manhad) {
    sendError(res, 'מנה"ד not found', 404);
    return;
  }
  sendSuccess(res, manhad);
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    await manhadService.remove(req.params.id as string);
    sendSuccess(res, null, 'מנה"ד deleted');
  } catch (error) {
    sendError(res, (error as Error).message);
  }
}
