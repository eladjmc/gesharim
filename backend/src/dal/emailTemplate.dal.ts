import { EmailTemplate, IEmailTemplate } from '../models/emailTemplate.model';

export async function findAllTemplates(): Promise<IEmailTemplate[]> {
  return EmailTemplate.find().sort({ key: 1 });
}

export async function findTemplateById(id: string): Promise<IEmailTemplate | null> {
  return EmailTemplate.findById(id);
}

export async function findTemplateByKey(key: string): Promise<IEmailTemplate | null> {
  return EmailTemplate.findOne({ key });
}

export async function updateTemplate(
  id: string,
  data: { subject: string; body: string }
): Promise<IEmailTemplate | null> {
  return EmailTemplate.findByIdAndUpdate(id, data, { new: true });
}

export async function createTemplate(data: {
  key: string;
  name: string;
  subject: string;
  body: string;
  availablePlaceholders: string[];
}): Promise<IEmailTemplate> {
  return EmailTemplate.create(data);
}

export async function countTemplates(): Promise<number> {
  return EmailTemplate.countDocuments();
}
