import { Search } from 'lucide-react'
import { NEED_TYPE_LABELS } from '../../utils/constants'
import { SearchableSelect } from '../common/SearchableSelect'

interface GalleryFiltersProps {
  search: string
  municipality: string
  needType: string
  municipalities: string[]
  onSearchChange: (val: string) => void
  onMunicipalityChange: (val: string) => void
  onNeedTypeChange: (val: string) => void
}

const sel =
  'h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all cursor-pointer'

export function GalleryFilters({
  search,
  municipality,
  needType,
  municipalities,
  onSearchChange,
  onMunicipalityChange,
  onNeedTypeChange,
}: GalleryFiltersProps) {
  const muniOptions = municipalities.map((m) => ({ value: m, label: m }))

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
      <div className="relative flex-1 min-w-[220px] max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="חיפוש פרויקט..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pr-10 pl-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
        />
      </div>
      <div className="w-44">
        <SearchableSelect
          options={muniOptions}
          value={municipality}
          onChange={onMunicipalityChange}
          placeholder="כל הרשויות"
          clearLabel="כל הרשויות"
        />
      </div>
      <select
        value={needType}
        onChange={(e) => onNeedTypeChange(e.target.value)}
        className={sel}
      >
        <option value="">כל הסוגים</option>
        {Object.entries(NEED_TYPE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
