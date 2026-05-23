import { useState } from 'react'
import { useManhadim } from '../hooks/useManhadim'
import { ManhadTable } from '../components/admin/manhadim/ManhadTable'
import { ManhadFormModal } from '../components/admin/manhadim/ManhadFormModal'
import type { Manhad } from '../types'

export function ManhadimPage() {
  const { manhadim, municipalities, loading, createManhad, updateManhad, deleteManhad } =
    useManhadim()
  const [editing, setEditing] = useState<Manhad | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSave = async (data: {
    name: string; email: string; phone: string; municipalities: string[]
  }) => {
    if (editing) {
      await updateManhad(editing._id, data)
    } else {
      await createManhad(data)
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleEdit = (manhad: Manhad) => {
    setEditing(manhad)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('למחוק מנה"ד זה?')) return
    await deleteManhad(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ניהול מנה&quot;דים</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg
                     hover:bg-[var(--color-primary-dark)] transition-all text-sm"
        >
          + הוספת מנה&quot;ד
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-5">
        {loading ? (
          <p className="text-center py-8 text-[var(--color-muted)]">טוען...</p>
        ) : (
          <ManhadTable manhadim={manhadim} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <ManhadFormModal
        manhad={editing}
        municipalities={municipalities}
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        onSave={handleSave}
      />
    </div>
  )
}
