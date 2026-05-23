import type { ProjectStatus } from '../types'

export const VALID_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  pending: ['approved', 'rejected'],
  approved: ['in_development', 'cancelled'],
  in_development: ['qa', 'cancelled'],
  qa: ['completed', 'cancelled'],
  completed: [],
  rejected: [],
  cancelled: [],
}
