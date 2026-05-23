import { useState } from 'react'
import { useEmailTemplates } from '../hooks/useEmailTemplates'
import { TemplateEditorModal } from '../components/admin/email-templates/TemplateEditorModal'
import type { EmailTemplate } from '../types'

export function EmailTemplatesPage() {
  const { templates, loading, updateTemplate } = useEmailTemplates()
  const [editing, setEditing] = useState<EmailTemplate | null>(null)

  const handleSave = async (id: string, data: { subject: string; body: string }) => {
    await updateTemplate(id, data)
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">תבניות מייל</h1>
      <div className="bg-white rounded-xl shadow-sm p-5">
        {loading ? (
          <p className="text-center py-8 text-[var(--color-muted)]">טוען...</p>
        ) : templates.length === 0 ? (
          <p className="text-center text-[var(--color-muted)] py-8">
            לא נמצאו תבניות
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {templates.map((t) => (
              <li key={t._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{t.subject}</p>
                </div>
                <button
                  onClick={() => setEditing(t)}
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  עריכה
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <TemplateEditorModal
        template={editing}
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  )
}
