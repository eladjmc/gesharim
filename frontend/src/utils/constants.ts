import type { NeedType, ProjectStatus } from '../types'

export const NEED_TYPE_LABELS: Record<NeedType, string> = {
  landing_page: 'דף נחיתה',
  showcase_site: 'אתר תדמית',
  product_catalog: 'קטלוג מוצרים',
  site_upgrade: 'שדרוג אתר קיים',
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  pending: 'ממתין לאישור',
  approved: 'מאושר',
  in_development: 'בפיתוח',
  qa: 'בקרת איכות',
  completed: 'הושלם',
  rejected: 'נדחה',
  cancelled: 'בוטל',
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-blue-100 text-blue-800',
  in_development: 'bg-purple-100 text-purple-800',
  qa: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}
