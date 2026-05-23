import type { Request, Response } from 'express';
import * as projectService from '../services/project.service';
import { sendSuccess, sendError } from '../utils/apiResponse.util';
import type { AuthRequest } from '../types/request.types';
import type { ProjectFilters } from '../dal/project.dal';

export async function submitProject(req: Request, res: Response): Promise<void> {
  try {
    const project = await projectService.submitProject(req.body);
    sendSuccess(res, project, 'הפנייה התקבלה בהצלחה', 201);
  } catch (error) {
    sendError(res, (error as Error).message, 500);
  }
}

export async function getProjects(req: AuthRequest, res: Response): Promise<void> {
  const { status, municipality, manhad, fromDate, toDate, page = '1', limit = '20' } = req.query;

  const filters: ProjectFilters = {};
  if (status) filters.status = status as ProjectFilters['status'];
  if (municipality) filters.municipality = municipality as string;
  if (manhad) filters.assignedManhad = manhad as string;
  if (fromDate) filters.fromDate = fromDate as string;
  if (toDate) filters.toDate = toDate as string;

  const result = await projectService.getProjects(
    filters,
    parseInt(page as string, 10),
    parseInt(limit as string, 10)
  );
  sendSuccess(res, result);
}

export async function getProjectById(req: AuthRequest, res: Response): Promise<void> {
  const project = await projectService.getProjectById(req.params.id as string);
  if (!project) {
    sendError(res, 'Project not found', 404);
    return;
  }
  sendSuccess(res, project);
}

export async function getStats(_req: AuthRequest, res: Response): Promise<void> {
  const stats = await projectService.getStats();
  sendSuccess(res, stats);
}

export async function changeStatus(req: AuthRequest, res: Response): Promise<void> {
  try {
    const project = await projectService.changeStatus(
      req.params.id as string,
      req.body,
      req.user!.userId
    );
    if (!project) {
      sendError(res, 'Project not found', 404);
      return;
    }
    sendSuccess(res, project);
  } catch (error) {
    sendError(res, (error as Error).message);
  }
}

export async function addNote(req: AuthRequest, res: Response): Promise<void> {
  const project = await projectService.addNote(
    req.params.id as string,
    req.body.text,
    req.user!.userId
  );
  if (!project) {
    sendError(res, 'Project not found', 404);
    return;
  }
  sendSuccess(res, project);
}

export async function deleteNote(req: AuthRequest, res: Response): Promise<void> {
  const project = await projectService.deleteNote(
    req.params.id as string,
    req.params.noteId as string
  );
  if (!project) {
    sendError(res, 'Project not found', 404);
    return;
  }
  sendSuccess(res, project);
}

export async function editNote(req: AuthRequest, res: Response): Promise<void> {
  const project = await projectService.editNote(
    req.params.id as string,
    req.params.noteId as string,
    req.body.text
  );
  if (!project) {
    sendError(res, 'Project not found', 404);
    return;
  }
  sendSuccess(res, project);
}
