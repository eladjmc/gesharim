import { Resend } from 'resend';
import { env } from '../config';
import * as emailTemplateDal from '../dal/emailTemplate.dal';
import { renderTemplate } from '../utils/template.util';
import type { EmailTemplateKey } from '../types/enums';

let resend: Resend | null = null;

function getClient(): Resend {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendTemplateEmail(
  to: string,
  templateKey: EmailTemplateKey,
  variables: Record<string, string>
): Promise<void> {
  const template = await emailTemplateDal.findTemplateByKey(templateKey);
  if (!template) {
    console.error(`Email template not found: ${templateKey}`);
    return;
  }

  const subject = renderTemplate(template.subject, variables);
  const body = renderTemplate(template.body, variables);

  if (!env.RESEND_API_KEY) {
    console.log(`📧 [DEV] Email to: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body: ${body.substring(0, 100)}...`);
    return;
  }

  try {
    const client = getClient();
    await client.emails.send({
      from: `${env.SENDER_NAME} <${env.SENDER_EMAIL}>`,
      to,
      subject,
      text: body,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}

export async function verifyConnection(): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.log('📧 Resend API key not configured, skipping verification');
    return;
  }
  console.log('✅ Resend API key configured');
}
