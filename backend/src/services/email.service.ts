import nodemailer from 'nodemailer';
import { env } from '../config';
import * as emailTemplateDal from '../dal/emailTemplate.dal';
import { renderTemplate } from '../utils/template.util';
import type { EmailTemplateKey } from '../types/enums';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }
  return transporter;
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

  if (!env.SMTP_HOST || !env.SMTP_USER) {
    console.log(`📧 [DEV] Email to: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body: ${body.substring(0, 100)}...`);
    return;
  }

  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"${env.SENDER_NAME}" <${env.SENDER_EMAIL}>`,
      to,
      subject,
      text: body,
    });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}

export async function verifyConnection(): Promise<void> {
  if (!env.SMTP_HOST || !env.SMTP_USER) {
    console.log('📧 SMTP not configured, skipping verification');
    return;
  }
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log('✅ SMTP connection verified successfully');
  } catch (error) {
    console.error('❌ SMTP verification failed:', error);
  }
}
