import { STATUS_LABELS, STATUS_COLORS } from '../../../utils/constants'
import type { ProjectStatus } from '../../../types'

interface StatsCardsProps {
  stats: Record<string, number>
}

const statusOrder: ProjectStatus[] = [
  'pending',
  'approved',
  'in_development',
  'qa',
  'completed',
]

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statusOrder.map((status) => (
        <div
          key={status}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <p className="text-3xl font-bold text-slate-900">{stats[status] || 0}</p>
          <p
            className={`text-xs px-2 py-0.5 rounded-full inline-block mt-2 ${STATUS_COLORS[status]}`}
          >
            {STATUS_LABELS[status]}
          </p>
        </div>
      ))}
    </div>
  )
}
