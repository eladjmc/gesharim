interface FormFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}

export function FormField({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
      />
    </div>
  )
}
