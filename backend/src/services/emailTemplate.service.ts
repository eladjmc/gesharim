import * as emailTemplateDal from '../dal/emailTemplate.dal';
import type { IEmailTemplate } from '../models/emailTemplate.model';
import type { UpdateEmailTemplateDto } from '../types/dto';

export async function getAll(): Promise<IEmailTemplate[]> {
  return emailTemplateDal.findAllTemplates();
}

export async function getById(id: string): Promise<IEmailTemplate | null> {
  return emailTemplateDal.findTemplateById(id);
}

export async function update(
  id: string,
  dto: UpdateEmailTemplateDto
): Promise<IEmailTemplate | null> {
  return emailTemplateDal.updateTemplate(id, dto);
}
