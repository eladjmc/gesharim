import { NEED_TYPE_LABELS } from '../../utils/constants'

interface NeedTypeCheckboxesProps {
  value: string
  onChange: (v: string) => void
}

export function NeedTypeCheckboxes({ value, onChange }: NeedTypeCheckboxesProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">סוג הצורך</label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(NEED_TYPE_LABELS).map(([key, label]) => {
          const active = value === key
          return (
            <label
              key={key}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer text-sm transition-all ${
                active
                  ? 'border-brand-cyan bg-brand-cyan/5 text-brand-cyan font-medium ring-1 ring-brand-cyan/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onChange(key)}
                className="accent-[#00b4d8]"
              />
              {label}
            </label>
          )
        })}
      </div>
    </div>
  )
}
