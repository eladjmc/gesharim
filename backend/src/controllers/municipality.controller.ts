import type { Request, Response } from 'express';
import * as municipalityService from '../services/municipality.service';
import { sendSuccess, sendError } from '../utils/apiResponse.util';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const municipalities = await municipalityService.getAll();
  sendSuccess(res, municipalities);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const municipality = await municipalityService.create(req.body.name);
    sendSuccess(res, municipality, undefined, 201);
  } catch (error) {
    sendError(res, (error as Error).message);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const municipality = await municipalityService.update(req.params.id as string, req.body.name);
  if (!municipality) {
    sendError(res, 'Municipality not found', 404);
    return;
  }
  sendSuccess(res, municipality);
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    await municipalityService.remove(req.params.id as string);
    sendSuccess(res, null, 'Municipality deleted');
  } catch (error) {
    sendError(res, (error as Error).message);
  }
}
