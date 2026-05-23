import * as projectDal from '../dal/project.dal';
import * as manhadDal from '../dal/manhad.dal';
import * as municipalityDal from '../dal/municipality.dal';
import * as emailService from './email.service';
import { ProjectStatus, NeedType, EmailTemplateKey, VALID_STATUS_TRANSITIONS } from '../types/enums';
import type { CreateProjectDto, ChangeStatusDto } from '../types/dto';
import type { IProject } from '../models/project.model';

const NEED_TYPE_LABELS: Record<NeedType, string> = {
  [NeedType.LANDING_PAGE]: 'דף נחיתה',
  [NeedType.SHOWCASE_SITE]: 'אתר תדמית',
  [NeedType.PRODUCT_CATALOG]: 'קטלוג מוצרים',
  [NeedType.SITE_UPGRADE]: 'שדרוג אתר קיים',
};

export async function submitProject(dto: CreateProjectDto): Promise<IProject> {
  const project = await projectDal.createProject({
    ...dto,
    statusHistory: [
      { status: ProjectStatus.PENDING, changedAt: new Date(), changedBy: 'system' },
    ],
  });

  // Send confirmation email
  const municipality = await municipalityDal.findMunicipalityById(dto.municipality);
  await emailService.sendTemplateEmail(dto.email, EmailTemplateKey.REQUEST_RECEIVED, {
    fullName: dto.fullName,
    businessName: dto.businessName,
    needType: NEED_TYPE_LABELS[dto.needType],
    municipalityName: municipality?.name || '',
  });

  return project;
}

export async function getProjects(
  filters: projectDal.ProjectFilters,
  page: number,
  limit: number
) {
  return projectDal.findProjects(filters, { page, limit });
}

export async function getProjectById(id: string): Promise<IProject | null> {
  return projectDal.findProjectById(id);
}

export async function getStats(): Promise<Record<string, number>> {
  return projectDal.getProjectStats();
}

export async function changeStatus(
  projectId: string,
  dto: ChangeStatusDto,
  adminUserId: string
): Promise<IProject | null> {
  const project = await projectDal.findProjectById(projectId);
  if (!project) throw new Error('Project not found');

  const currentStatus = project.status as ProjectStatus;
  const newStatus = dto.status as ProjectStatus;
  const allowed = VALID_STATUS_TRANSITIONS[currentStatus];

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Cannot transition from "${currentStatus}" to "${newStatus}"`
    );
  }

  // Validate required fields
  if (newStatus === ProjectStatus.APPROVED && !dto.assignedManhad) {
    throw new Error('Must assign a מנה"ד when approving');
  }
  if (newStatus === ProjectStatus.REJECTED && !dto.rejectionReason) {
    throw new Error('Must provide rejection reason');
  }

  const updated = await projectDal.updateProjectStatus(projectId, {
    status: newStatus,
    assignedManhad: dto.assignedManhad || undefined,
    rejectionReason: dto.rejectionReason || undefined,
    statusHistoryEntry: {
      status: newStatus,
      changedAt: new Date(),
      changedBy: adminUserId,
    },
  });

  if (!updated) return null;

  // Trigger emails based on new status
  await triggerStatusEmail(updated, newStatus, dto);

  return updated;
}

async function triggerStatusEmail(
  project: IProject,
  newStatus: ProjectStatus,
  dto: ChangeStatusDto
): Promise<void> {
  const municipalityName = (project.municipality as unknown as { name: string })?.name || '';
  const baseVars = {
    fullName: project.fullName,
    businessName: project.businessName,
    municipalityName,
    needType: NEED_TYPE_LABELS[project.needType],
  };

  switch (newStatus) {
    case ProjectStatus.APPROVED: {
      // Email to requester
      await emailService.sendTemplateEmail(
        project.email,
        EmailTemplateKey.REQUEST_APPROVED_REQUESTER,
        baseVars
      );
      // Email to מנה"ד
      if (dto.assignedManhad) {
        const manhad = await manhadDal.findManhadById(dto.assignedManhad);
        if (manhad) {
          await emailService.sendTemplateEmail(
            manhad.email,
            EmailTemplateKey.REQUEST_APPROVED_MANHAD,
            {
              ...baseVars,
              manhadName: manhad.name,
              description: project.description,
              phone: project.phone,
              email: project.email,
            }
          );
        }
      }
      break;
    }
    case ProjectStatus.REJECTED:
      await emailService.sendTemplateEmail(
        project.email,
        EmailTemplateKey.REQUEST_REJECTED,
        { ...baseVars, rejectionReason: dto.rejectionReason || '' }
      );
      break;
    case ProjectStatus.CANCELLED:
      await emailService.sendTemplateEmail(
        project.email,
        EmailTemplateKey.REQUEST_CANCELLED,
        baseVars
      );
      break;
  }
}

export async function addNote(
  projectId: string,
  text: string,
  userId: string
): Promise<IProject | null> {
  return projectDal.addProjectNote(projectId, {
    text,
    createdAt: new Date(),
    createdBy: userId,
  });
}

export async function deleteNote(
  projectId: string,
  noteId: string
): Promise<IProject | null> {
  return projectDal.deleteProjectNote(projectId, noteId);
}

export async function editNote(
  projectId: string,
  noteId: string,
  text: string
): Promise<IProject | null> {
  return projectDal.editProjectNote(projectId, noteId, text);
}
