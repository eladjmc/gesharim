export enum UserRole {
  ADMIN = 'admin',
  MANHAD = 'manhad',
}

export enum ProjectStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  IN_DEVELOPMENT = 'in_development',
  QA = 'qa',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum NeedType {
  LANDING_PAGE = 'landing_page',
  SHOWCASE_SITE = 'showcase_site',
  PRODUCT_CATALOG = 'product_catalog',
  SITE_UPGRADE = 'site_upgrade',
}

export enum EmailTemplateKey {
  REQUEST_RECEIVED = 'request_received',
  REQUEST_APPROVED_REQUESTER = 'request_approved_requester',
  REQUEST_APPROVED_MANHAD = 'request_approved_manhad',
  REQUEST_REJECTED = 'request_rejected',
  REQUEST_CANCELLED = 'request_cancelled',
}

export const VALID_STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  [ProjectStatus.PENDING]: [ProjectStatus.APPROVED, ProjectStatus.REJECTED],
  [ProjectStatus.APPROVED]: [ProjectStatus.IN_DEVELOPMENT, ProjectStatus.CANCELLED],
  [ProjectStatus.IN_DEVELOPMENT]: [ProjectStatus.QA, ProjectStatus.CANCELLED],
  [ProjectStatus.QA]: [ProjectStatus.COMPLETED, ProjectStatus.CANCELLED],
  [ProjectStatus.COMPLETED]: [],
  [ProjectStatus.REJECTED]: [],
  [ProjectStatus.CANCELLED]: [],
};
