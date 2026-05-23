import { SearchableSelect } from '../common/SearchableSelect'
import { FormField } from './FormField'
import { NeedTypeCheckboxes } from './NeedTypeCheckboxes'

interface Option {
  value: string
  label: string
}

interface Props {
  form: Record<string, string>
  set: (field: string, value: string) => void
  muniOptions: Option[]
}

export function ContactFormLayout({ form, set, muniOptions }: Props) {
  return (
    <>
      <TopFields form={form} set={set} muniOptions={muniOptions} />
      <NeedTypeCheckboxes value={form.needType} onChange={(v) => set('needType', v)} />
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          תיאור קצר
        </label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className="w-full h-24 px-3 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
          placeholder="תארו בקצרה את הצורך שלכם"
          required
          minLength={10}
          maxLength={500}
        />
      </div>
    </>
  )
}

function TopFields({ form, set, muniOptions }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="שם מלא"
          value={form.fullName}
          onChange={(v) => set('fullName', v)}
          required
        />
        <FormField
          label="טלפון"
          value={form.phone}
          onChange={(v) => set('phone', v)}
          type="tel"
          required
        />
      </div>
      <FormField
        label="אימייל"
        value={form.email}
        onChange={(v) => set('email', v)}
        type="email"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="שם העסק"
          value={form.businessName}
          onChange={(v) => set('businessName', v)}
          required
        />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">רשות</label>
          <SearchableSelect
            options={muniOptions}
            value={form.municipality}
            onChange={(v: string) => set('municipality', v)}
            placeholder="בחר רשות..."
          />
        </div>
      </div>
    </>
  )
}
