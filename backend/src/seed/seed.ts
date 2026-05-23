import * as emailTemplateDal from '../dal/emailTemplate.dal';
import { EmailTemplateKey } from '../types/enums';

const templates = [
  {
    key: EmailTemplateKey.REQUEST_RECEIVED,
    name: 'אישור קבלת פנייה',
    subject: 'פנייתך התקבלה — גשרים לקהילה',
    body: `שלום {{fullName}},

פנייתך בנושא "{{businessName}}" התקבלה בהצלחה במערכת גשרים לקהילה.
צוות התיאום שלנו יבחן את הבקשה ויחזור אליך בהקדם.

פרטי הפנייה:
- סוג הצורך: {{needType}}
- רשות: {{municipalityName}}

תודה רבה,
צוות גשרים לקהילה`,
    availablePlaceholders: ['fullName', 'businessName', 'needType', 'municipalityName'],
  },
  {
    key: EmailTemplateKey.REQUEST_APPROVED_REQUESTER,
    name: 'אישור פרויקט — לפונה',
    subject: 'פנייתך אושרה — גשרים לקהילה',
    body: `שלום {{fullName}},

שמחים לעדכן שפנייתך בנושא "{{businessName}}" אושרה!
צוות מנה"ד מקצועי ילווה את הפרויקט שלך.

נהיה איתך בקשר בהמשך התהליך.

בברכה,
צוות גשרים לקהילה`,
    availablePlaceholders: ['fullName', 'businessName', 'municipalityName', 'needType'],
  },
  {
    key: EmailTemplateKey.REQUEST_APPROVED_MANHAD,
    name: 'משימה חדשה — למנה"ד',
    subject: 'משימה חדשה — {{businessName}} | {{municipalityName}}',
    body: `שלום {{manhadName}},

שובצת לפרויקט חדש:

פרטי הפרויקט:
- שם העסק: {{businessName}}
- רשות: {{municipalityName}}
- סוג הצורך: {{needType}}
- תיאור: {{description}}

פרטי הפונה:
- שם: {{fullName}}
- טלפון: {{phone}}
- אימייל: {{email}}

אנא צור/צרי קשר עם הפונה להתחלת התהליך.

בהצלחה,
צוות גשרים לקהילה`,
    availablePlaceholders: [
      'manhadName', 'businessName', 'municipalityName',
      'needType', 'description', 'fullName', 'phone', 'email',
    ],
  },
  {
    key: EmailTemplateKey.REQUEST_REJECTED,
    name: 'דחיית פנייה',
    subject: 'עדכון לגבי פנייתך — גשרים לקהילה',
    body: `שלום {{fullName}},

הפרויקט שלך בנושא "{{businessName}}" נבחן על ידי צוות התיאום שלנו ונמצא שכרגע לא נוכל להתקדם איתו.

הסיבה שניתנה היא:
{{rejectionReason}}

אנו מזמינים אותך לפנות אלינו שוב בעתיד.

תודה רבה,
בברכה, צוות גשרים לקהילה`,
    availablePlaceholders: ['fullName', 'businessName', 'rejectionReason', 'municipalityName', 'needType'],
  },
  {
    key: EmailTemplateKey.REQUEST_CANCELLED,
    name: 'ביטול פרויקט',
    subject: 'הפרויקט בוטל — גשרים לקהילה',
    body: `שלום {{fullName}},

לצערנו, הפרויקט "{{businessName}}" בוטל.

במידה ויש לך שאלות, אל תהסס/י לפנות אלינו.

בברכה,
צוות גשרים לקהילה`,
    availablePlaceholders: ['fullName', 'businessName', 'municipalityName', 'needType'],
  },
];

export async function seedEmailTemplates(): Promise<void> {
  const count = await emailTemplateDal.countTemplates();
  if (count >= templates.length) return;

  for (const template of templates) {
    const existing = await emailTemplateDal.findTemplateByKey(template.key);
    if (!existing) {
      await emailTemplateDal.createTemplate(template);
    }
  }
  console.log('✅ Email templates seeded');
}
