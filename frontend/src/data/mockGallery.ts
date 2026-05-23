import type { NeedType } from '../types'
import { mockGalleryExtra } from './mockGalleryExtra'
import { mockGalleryMore } from './mockGalleryMore'

export interface MockProject {
  id: string
  name: string
  municipality: string
  needType: NeedType
  description: string
  entityType: string
}

const base: MockProject[] = [
  {
    id: '1',
    name: 'מסעדת השף הירושלמי',
    municipality: 'ירושלים',
    needType: 'landing_page',
    description: 'דף נחיתה למסעדה מקומית עם תפריט ואפשרות הזמנה',
    entityType: 'עסק מקומי',
  },
  {
    id: '2',
    name: 'סטודיו לצילום חיפה',
    municipality: 'חיפה',
    needType: 'showcase_site',
    description: 'אתר תדמית עם גלריית עבודות וטופס יצירת קשר',
    entityType: 'עסק מקומי',
  },
  {
    id: '3',
    name: 'חנות הספרים של דימונה',
    municipality: 'דימונה',
    needType: 'product_catalog',
    description: 'קטלוג מוצרים דיגיטלי עם חיפוש וסינון',
    entityType: 'עסק מקומי',
  },
  {
    id: '4',
    name: 'מרפאת שיניים ערד',
    municipality: 'ערד',
    needType: 'site_upgrade',
    description: 'שדרוג אתר קיים עם מערכת תורים אונליין',
    entityType: 'עמותה',
  },
  {
    id: '5',
    name: 'קייטרינג הנגב',
    municipality: 'באר שבע',
    needType: 'landing_page',
    description: 'דף נחיתה עם גלריית אירועים וטופס הצעת מחיר',
    entityType: 'עסק מקומי',
  },
  {
    id: '6',
    name: 'בית מלאכה לנגרות',
    municipality: 'אשקלון',
    needType: 'showcase_site',
    description: 'אתר תדמית המציג עבודות נגרות בהתאמה אישית',
    entityType: 'עסק מקומי',
  },
  {
    id: '7',
    name: 'חוות הירקות של טבריה',
    municipality: 'טבריה',
    needType: 'product_catalog',
    description: 'קטלוג ירקות אורגניים עם משלוחים לאזור',
    entityType: 'מוסד חינוכי',
  },
  {
    id: '8',
    name: 'מכון כושר שדרות',
    municipality: 'שדרות',
    needType: 'landing_page',
    description: 'דף נחיתה עם מנויים, לוח חוגים ומידע על המאמנים',
    entityType: 'עמותה',
  },
]

export const mockGalleryProjects: MockProject[] = [
  ...base,
  ...mockGalleryExtra,
  ...mockGalleryMore,
]
