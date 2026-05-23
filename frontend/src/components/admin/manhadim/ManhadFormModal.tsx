import { useState, useEffect } from 'react'
import type { Manhad, Municipality } from '../../../types'
import { Modal } from '../../common/Modal'

interface ManhadFormModalProps {
  manhad: Manhad | null
  municipalities: Municipality[]
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    name: string
    email: string
    phone: string
    municipalities: string[]
  }) => void
}

export function ManhadFormModal({
  manhad,
  municipalities,
  isOpen,
  onClose,
  onSave,
}: ManhadFormModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedMunis, setSelectedMunis] = useState<string[]>([])

  useEffect(() => {
    if (manhad) {
      setName(manhad.name)
      setEmail(manhad.email)
      setPhone(manhad.phone)
      setSelectedMunis(manhad.municipalities.map((m) => m._id))
    } else {
      setName('')
      setEmail('')
      setPhone('')
      setSelectedMunis([])
    }
  }, [manhad, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, email, phone, municipalities: selectedMunis })
  }

  const toggleMuni = (id: string) => {
    setSelectedMunis((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={manhad ? 'עריכת מנה"ד' : 'הוספת מנה"ד'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="שם" value={name} onChange={setName} />
        <FormField label="אימייל" value={email} onChange={setEmail} type="email" />
        <FormField label="טלפון" value={phone} onChange={setPhone} type="tel" />
        <div>
          <label className="text-sm font-medium block mb-1">רשויות</label>
          <div className="max-h-32 overflow-y-auto border border-[var(--color-border)]
                          rounded-lg p-2 space-y-1">
            {municipalities.map((m) => (
              <label key={m._id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedMunis.includes(m._id)}
                  onChange={() => toggleMuni(m._id)}
                />
                {m.name}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg
                     hover:bg-[var(--color-primary-dark)] transition-all"
        >
          {manhad ? 'עדכון' : 'הוספה'}
        </button>
      </form>
    </Modal>
  )
}

function FormField({
  label, value, onChange, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm"
      />
    </div>
  )
}
