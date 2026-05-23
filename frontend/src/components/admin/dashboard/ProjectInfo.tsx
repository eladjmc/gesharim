import type { Project } from '../../../types'
import { STATUS_LABELS, STATUS_COLORS, NEED_TYPE_LABELS } from '../../../utils/constants'

interface ProjectInfoProps {
  project: Project
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}>
          {STATUS_LABELS[project.status]}
        </span>
        <span className="text-xs text-[var(--color-muted)]">
          {new Date(project.createdAt).toLocaleDateString('he-IL')}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <InfoRow label="שם מלא" value={project.fullName} />
        <InfoRow label="טלפון" value={project.phone} />
        <InfoRow label="אימייל" value={project.email} />
        <InfoRow label="רשות" value={project.municipality?.name} />
        <InfoRow label="סוג" value={NEED_TYPE_LABELS[project.needType]} />
        <InfoRow label="מנה&quot;ד" value={project.assignedManhad?.name || '—'} />
      </div>
      <div className="text-sm">
        <p className="font-medium mb-1">תיאור:</p>
        <p className="text-[var(--color-muted)]">{project.description}</p>
      </div>
      {project.rejectionReason && (
        <div className="text-sm bg-red-50 p-3 rounded-lg">
          <p className="font-medium text-red-700 mb-1">סיבת דחייה:</p>
          <p className="text-red-600">{project.rejectionReason}</p>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[var(--color-muted)]">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
