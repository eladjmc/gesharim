import { useState, useEffect } from 'react'
import type { EmailTemplate } from '../../../types'
import { Modal } from '../../common/Modal'

interface TemplateEditorModalProps {
  template: EmailTemplate | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, data: { subject: string; body: string }) => void
}

export function TemplateEditorModal({
  template,
  isOpen,
  onClose,
  onSave,
}: TemplateEditorModalProps) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (template) {
      setSubject(template.subject)
      setBody(template.body)
    }
  }, [template, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!template) return
    onSave(template._id, { subject, body })
  }

  if (!template) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`עריכת תבנית: ${template.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">נושא</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[var(--color-border)]
                       rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">תוכן</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={10}
            className="w-full px-3 py-2 border border-[var(--color-border)]
                       rounded-lg text-sm font-mono resize-none"
          />
        </div>
        <div>
          <p className="text-xs text-[var(--color-muted)] mb-1">
            משתנים זמינים:
          </p>
          <div className="flex flex-wrap gap-1">
            {template.availablePlaceholders.map((p) => (
              <code
                key={p}
                className="text-xs bg-gray-100 px-1.5 py-0.5 rounded"
              >
                {`{{${p}}}`}
              </code>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg
                     hover:bg-[var(--color-primary-dark)] transition-all"
        >
          שמירה
        </button>
      </form>
    </Modal>
  )
}
