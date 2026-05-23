export interface Project {
  _id: string
  fullName: string
  phone: string
  email: string
  businessName: string
  municipality: Municipality
  needType: NeedType
  description: string
  status: ProjectStatus
  assignedManhad: Manhad | null
  rejectionReason: string | null
  statusHistory: StatusHistoryEntry[]
  adminNotes: AdminNote[]
  createdAt: string
  updatedAt: string
}

export interface StatusHistoryEntry {
  status: ProjectStatus
  changedAt: string
  changedBy: { _id: string; name: string }
}

export interface AdminNote {
  _id: string
  text: string
  createdAt: string
  createdBy: { _id: string; name: string }
}

export type ProjectStatus =
  | 'pending'
  | 'approved'
  | 'in_development'
  | 'qa'
  | 'completed'
  | 'rejected'
  | 'cancelled'

export type NeedType =
  | 'landing_page'
  | 'showcase_site'
  | 'product_catalog'
  | 'site_upgrade'

export interface Municipality {
  _id: string
  name: string
}

export interface Manhad {
  _id: string
  name: string
  email: string
  phone: string
  municipalities: Municipality[]
}

export interface EmailTemplate {
  _id: string
  key: string
  name: string
  subject: string
  body: string
  availablePlaceholders: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
  details?: { field: string; message: string }[]
}
