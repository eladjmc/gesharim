import type { Manhad } from '../../../types'

interface ManhadTableProps {
  manhadim: Manhad[]
  onEdit: (manhad: Manhad) => void
  onDelete: (id: string) => void
}

export function ManhadTable({ manhadim, onEdit, onDelete }: ManhadTableProps) {
  if (manhadim.length === 0) {
    return (
      <p className="text-center text-[var(--color-muted)] py-8">
        לא נמצאו מנה&quot;דים
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-[var(--color-muted)]">
            <th className="py-3 px-3 text-right font-medium">שם</th>
            <th className="py-3 px-3 text-right font-medium">אימייל</th>
            <th className="py-3 px-3 text-right font-medium">טלפון</th>
            <th className="py-3 px-3 text-right font-medium">רשויות</th>
            <th className="py-3 px-3 text-right font-medium">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {manhadim.map((m) => (
            <tr key={m._id} className="border-b border-[var(--color-border)]">
              <td className="py-3 px-3 font-medium">{m.name}</td>
              <td className="py-3 px-3">{m.email}</td>
              <td className="py-3 px-3">{m.phone}</td>
              <td className="py-3 px-3">
                {m.municipalities.map((mu) => mu.name).join(', ')}
              </td>
              <td className="py-3 px-3">
                <button
                  onClick={() => onEdit(m)}
                  className="text-[var(--color-primary)] hover:underline ml-3"
                >
                  עריכה
                </button>
                <button
                  onClick={() => onDelete(m._id)}
                  className="text-red-600 hover:underline"
                >
                  מחיקה
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
