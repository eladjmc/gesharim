import { useState, useRef, useEffect } from 'react'
import { SelectDropdown } from './SelectDropdown'

interface Option {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onChange: (val: string) => void
  placeholder?: string
  clearLabel?: string
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'בחר...',
  clearLabel,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedLabel = options.find((o) => o.value === value)?.label || ''
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-right focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
      >
        {selectedLabel || <span className="text-slate-400">{placeholder}</span>}
      </button>
      {isOpen && (
        <SelectDropdown
          items={filtered}
          value={value}
          search={search}
          onSearch={setSearch}
          onSelect={handleSelect}
          clearLabel={clearLabel}
        />
      )}
    </div>
  )
}
