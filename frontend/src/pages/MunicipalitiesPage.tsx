import { useState, useMemo } from 'react'
import { useMunicipalities } from '../hooks/useMunicipalities'
import { Modal } from '../components/common/Modal'

const PER_PAGE = 10

export function MunicipalitiesPage() {
  const { municipalities, loading, createMunicipality, updateMunicipality, deleteMunicipality } =
    useMunicipalities()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return municipalities
    return municipalities.filter((m) =>
      m.name.includes(search.trim()),
    )
  }, [municipalities, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleAdd = () => {
    setEditingId(null)
    setName('')
    setShowForm(true)
  }

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id)
    setName(currentName)
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await updateMunicipality(editingId, name)
    } else {
      await createMunicipality(name)
    }
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('למחוק רשות זו?')) return
    await deleteMunicipality(id)
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ניהול רשויות</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg
                     hover:bg-[var(--color-primary-dark)] transition-all text-sm"
        >
          + הוספת רשות
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-5">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="חיפוש רשות..."
          className="w-full mb-4 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm"
        />
        {loading ? (
          <p className="text-center py-8 text-[var(--color-muted)]">טוען...</p>
        ) : paginated.length === 0 ? (
          <p className="text-center text-[var(--color-muted)] py-8">
            לא נמצאו רשויות
          </p>
        ) : (
          <>
            <ul className="divide-y divide-[var(--color-border)]">
              {paginated.map((m) => (
                <li key={m._id} className="flex justify-between items-center py-3">
                  <span className="font-medium">{m.name}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(m._id, m.name)}
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      עריכה
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      מחיקה
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-40"
                >
                  הקודם
                </button>
                <span className="text-sm text-slate-600">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-40"
                >
                  הבא
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? 'עריכת רשות' : 'הוספת רשות'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">שם הרשות</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[var(--color-border)]
                         rounded-lg text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg
                       hover:bg-[var(--color-primary-dark)] transition-all"
          >
            {editingId ? 'עדכון' : 'הוספה'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
