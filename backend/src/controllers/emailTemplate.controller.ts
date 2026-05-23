import type { Request, Response } from 'express';
import * as emailTemplateService from '../services/emailTemplate.service';
import { sendSuccess, sendError } from '../utils/apiResponse.util';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const templates = await emailTemplateService.getAll();
  sendSuccess(res, templates);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const template = await emailTemplateService.getById(req.params.id as string);
  if (!template) {
    sendError(res, 'Template not found', 404);
    return;
  }
  sendSuccess(res, template);
}

export async function update(req: Request, res: Response): Promise<void> {
  const template = await emailTemplateService.update(req.params.id as string, req.body);
  if (!template) {
    sendError(res, 'Template not found', 404);
    return;
  }
  sendSuccess(res, template);
}
