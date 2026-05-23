import { env } from '../config';
import * as emailTemplateDal from '../dal/emailTemplate.dal';
import { renderTemplate } from '../utils/template.util';
import type { EmailTemplateKey } from '../types/enums';

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

  if (!env.BREVO_API_KEY) {
    console.log(`📧 [DEV] Email to: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body: ${body.substring(0, 100)}...`);
    return;
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
        to: [{ email: to }],
        subject,
        textContent: body,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`Failed to send email to ${to}: ${err}`);
    } else {
      console.log(`✅ Email sent to ${to}`);
    }
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}

export async function verifyConnection(): Promise<void> {
  if (!env.BREVO_API_KEY) {
    console.log('📧 Brevo API key not configured, skipping verification');
    return;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': env.BREVO_API_KEY },
    });
    if (res.ok) {
      console.log('✅ Brevo API key verified successfully');
    } else {
      console.error('❌ Brevo API key verification failed:', await res.text());
    }
  } catch (error) {
    console.error('❌ Brevo connection failed:', error);
  }
}
