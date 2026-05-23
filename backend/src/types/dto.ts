import { z } from 'zod';
import { NeedType, ProjectStatus } from './enums';

const phoneSchema = z.string()
  .transform(v => v.replace(/[-\s]/g, ''))
  .pipe(z.string().regex(/^0[2-9]\d{7,8}$/, 'Invalid Israeli phone number'));

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6),
});

export const createProjectSchema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  phone: phoneSchema,
  email: z.string().email().toLowerCase().trim(),
  businessName: z.string().min(2).max(100).trim(),
  municipality: z.string().length(24, 'Invalid municipality ID'),
  needType: z.nativeEnum(NeedType),
  description: z.string().min(10).max(500).trim(),
});

export const changeStatusSchema = z.object({
  status: z.enum([
    ProjectStatus.APPROVED,
    ProjectStatus.IN_DEVELOPMENT,
    ProjectStatus.QA,
    ProjectStatus.COMPLETED,
    ProjectStatus.REJECTED,
    ProjectStatus.CANCELLED,
  ]),
  rejectionReason: z.string().min(5).max(500).optional(),
  assignedManhad: z.string().length(24).optional(),
});

export const createManhadSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: phoneSchema,
  municipalities: z.array(z.string().length(24)).min(1),
});

export const updateManhadSchema = createManhadSchema;

export const municipalitySchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

export const addNoteSchema = z.object({
  text: z.string().min(1).max(1000).trim(),
});

export const updateEmailTemplateSchema = z.object({
  subject: z.string().min(1).max(200).trim(),
  body: z.string().min(1).max(5000).trim(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type ChangeStatusDto = z.infer<typeof changeStatusSchema>;
export type CreateManhadDto = z.infer<typeof createManhadSchema>;
export type MunicipalityDto = z.infer<typeof municipalitySchema>;
export type AddNoteDto = z.infer<typeof addNoteSchema>;
export type UpdateEmailTemplateDto = z.infer<typeof updateEmailTemplateSchema>;
