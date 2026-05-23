import { useState } from 'react'
import type { Project } from '../../../types'
import { STATUS_LABELS, STATUS_COLORS, NEED_TYPE_LABELS } from '../../../utils/constants'

const PER_PAGE = 10

interface ProjectTableProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

export function ProjectTable({ projects, onSelect }: ProjectTableProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(projects.length / PER_PAGE)
  const paginated = projects.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  if (projects.length === 0) {
    return (
      <p className="text-center text-[var(--color-muted)] py-8">
        אין פרויקטים להצגה
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-[var(--color-muted)]">
            <th className="py-3 px-3 text-right font-medium">שם העסק</th>
            <th className="py-3 px-3 text-right font-medium">רשות</th>
            <th className="py-3 px-3 text-right font-medium">סוג</th>
            <th className="py-3 px-3 text-right font-medium">סטטוס</th>
            <th className="py-3 px-3 text-right font-medium">מנה&quot;ד</th>
            <th className="py-3 px-3 text-right font-medium">תאריך</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((project) => (
            <tr
              key={project._id}
              onClick={() => onSelect(project)}
              className="border-b border-[var(--color-border)] hover:bg-gray-50
                         cursor-pointer transition-colors"
            >
              <td className="py-3 px-3 font-medium">{project.businessName}</td>
              <td className="py-3 px-3">{project.municipality?.name}</td>
              <td className="py-3 px-3">{NEED_TYPE_LABELS[project.needType]}</td>
              <td className="py-3 px-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}
                >
                  {STATUS_LABELS[project.status]}
                </span>
              </td>
              <td className="py-3 px-3">
                {project.assignedManhad?.name || '—'}
              </td>
              <td className="py-3 px-3 text-[var(--color-muted)]">
                {new Date(project.createdAt).toLocaleDateString('he-IL')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-40"
          >
            הקודם
          </button>
          <span className="text-sm text-slate-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-40"
          >
            הבא
          </button>
        </div>
      )}
    </div>
  )
}
