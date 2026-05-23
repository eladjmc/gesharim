import type { Municipality, Manhad } from '../../../types'
import { STATUS_LABELS } from '../../../utils/constants'
import { SearchableSelect } from '../../common/SearchableSelect'

interface ProjectFiltersProps {
  status: string
  municipality: string
  manhad: string
  municipalities: Municipality[]
  manhadim: Manhad[]
  onStatusChange: (val: string) => void
  onMunicipalityChange: (val: string) => void
  onManhadChange: (val: string) => void
}

export function ProjectFilters({
  status,
  municipality,
  manhad,
  municipalities,
  manhadim,
  onStatusChange,
  onMunicipalityChange,
  onManhadChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
      >
        <option value="">כל הסטטוסים</option>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <SearchableSelect
        options={municipalities.map((m) => ({ value: m._id, label: m.name }))}
        value={municipality}
        onChange={onMunicipalityChange}
        placeholder="כל הרשויות"
        clearLabel="כל הרשויות"
      />
      <select
        value={manhad}
        onChange={(e) => onManhadChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
      >
        <option value="">כל המנה&quot;דים</option>
        {manhadim.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  )
}
