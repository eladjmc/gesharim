import { useState } from 'react'
import type { Municipality } from '../../types'
import { ContactFormLayout } from './ContactFormLayout'

interface ContactFormFieldsProps {
  municipalities: Municipality[]
  onSubmit: (data: Record<string, string>) => void
  loading: boolean
  error: string
}

export function ContactFormFields({
  municipalities,
  onSubmit,
  loading,
  error,
}: ContactFormFieldsProps) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    municipality: '',
    needType: '',
    description: '',
  })

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const muniOptions = municipalities.map((m) => ({
    value: m._id,
    label: m.name,
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ContactFormLayout form={form} set={set} muniOptions={muniOptions} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-brand-cyan text-white rounded-xl font-semibold hover:bg-brand-cyan-hover transition-all hover:shadow-lg hover:shadow-brand-cyan/20 disabled:opacity-50"
      >
        {loading ? 'שולח...' : 'שליחת פנייה'}
      </button>
    </form>
  )
}
