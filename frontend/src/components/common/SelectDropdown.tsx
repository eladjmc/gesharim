interface Option {
  value: string
  label: string
}

interface DropdownProps {
  items: Option[]
  value: string
  search: string
  onSearch: (v: string) => void
  onSelect: (v: string) => void
  clearLabel?: string
}

export function SelectDropdown({
  items,
  value,
  search,
  onSearch,
  onSelect,
  clearLabel,
}: DropdownProps) {
  return (
    <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="חפש..."
        autoFocus
        className="w-full px-3 py-2 border-b border-slate-100 text-sm sticky top-0 bg-white focus:outline-none"
      />
      {clearLabel && value && !search && (
        <button
          type="button"
          onClick={() => onSelect('')}
          className="w-full px-3 py-2 text-right text-sm text-slate-400 hover:bg-slate-50 transition-colors"
        >
          {clearLabel}
        </button>
      )}
      {items.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`w-full px-3 py-2 text-right text-sm hover:bg-slate-50 transition-colors ${opt.value === value ? 'bg-brand-cyan/5 text-brand-cyan font-medium' : ''}`}
        >
          {opt.label}
        </button>
      ))}
      {items.length === 0 && (
        <p className="px-3 py-2 text-sm text-slate-400">לא נמצאו תוצאות</p>
      )}
    </div>
  )
}
