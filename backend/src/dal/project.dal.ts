import { Project, IProject } from '../models/project.model';
import { ProjectStatus } from '../types/enums';

export interface ProjectFilters {
  status?: ProjectStatus;
  municipality?: string;
  assignedManhad?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export async function createProject(data: {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  municipality: string;
  needType: string;
  description: string;
  statusHistory: { status: string; changedAt: Date; changedBy: string }[];
}): Promise<IProject> {
  return Project.create(data);
}

export async function findProjects(
  filters: ProjectFilters,
  pagination: PaginationOptions
): Promise<{ projects: IProject[]; total: number }> {
  const query: Record<string, unknown> = {};

  if (filters.status) query.status = filters.status;
  if (filters.municipality) query.municipality = filters.municipality;
  if (filters.assignedManhad) query.assignedManhad = filters.assignedManhad;
  if (filters.fromDate || filters.toDate) {
    query.createdAt = {};
    if (filters.fromDate) (query.createdAt as Record<string, unknown>).$gte = new Date(filters.fromDate);
    if (filters.toDate) (query.createdAt as Record<string, unknown>).$lte = new Date(filters.toDate);
  }

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .populate('municipality')
    .populate('assignedManhad')
    .sort({ createdAt: -1 })
    .skip((pagination.page - 1) * pagination.limit)
    .limit(pagination.limit);

  return { projects, total };
}

export async function findProjectById(id: string): Promise<IProject | null> {
  return Project.findById(id)
    .populate('municipality')
    .populate('assignedManhad')
    .populate('adminNotes.createdBy', 'name');
}

export async function updateProjectStatus(
  id: string,
  update: {
    status: ProjectStatus;
    assignedManhad?: string | null;
    rejectionReason?: string | null;
    statusHistoryEntry: { status: string; changedAt: Date; changedBy: string };
  }
): Promise<IProject | null> {
  const setFields: Record<string, unknown> = { status: update.status };
  if (update.assignedManhad !== undefined) setFields.assignedManhad = update.assignedManhad;
  if (update.rejectionReason !== undefined) setFields.rejectionReason = update.rejectionReason;

  return Project.findByIdAndUpdate(
    id,
    {
      $set: setFields,
      $push: { statusHistory: update.statusHistoryEntry },
    },
    { new: true }
  )
    .populate('municipality')
    .populate('assignedManhad');
}

export async function addProjectNote(
  id: string,
  note: { text: string; createdAt: Date; createdBy: string }
): Promise<IProject | null> {
  return Project.findByIdAndUpdate(
    id,
    { $push: { adminNotes: note } },
    { new: true }
  );
}

export async function deleteProjectNote(
  projectId: string,
  noteId: string
): Promise<IProject | null> {
  return Project.findByIdAndUpdate(
    projectId,
    { $pull: { adminNotes: { _id: noteId } } },
    { new: true }
  );
}

export async function editProjectNote(
  projectId: string,
  noteId: string,
  text: string
): Promise<IProject | null> {
  return Project.findOneAndUpdate(
    { _id: projectId, 'adminNotes._id': noteId },
    { $set: { 'adminNotes.$.text': text } },
    { new: true }
  );
}

export async function getProjectStats(): Promise<Record<string, number>> {
  const results = await Project.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  const stats: Record<string, number> = {};
  for (const r of results) {
    stats[r._id] = r.count;
  }
  return stats;
}

export async function countProjectsByMunicipality(municipalityId: string): Promise<number> {
  return Project.countDocuments({
    municipality: municipalityId,
    status: { $nin: [ProjectStatus.COMPLETED, ProjectStatus.REJECTED, ProjectStatus.CANCELLED] },
  });
}

export async function countProjectsByManhad(manhadId: string): Promise<number> {
  return Project.countDocuments({
    assignedManhad: manhadId,
    status: { $nin: [ProjectStatus.COMPLETED, ProjectStatus.REJECTED, ProjectStatus.CANCELLED] },
  });
}
