import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { Project } from '../../../types'

interface ProjectNotesProps {
  project: Project
  onAddNote: (projectId: string, text: string) => void
  onDeleteNote: (projectId: string, noteId: string) => void
  onEditNote: (projectId: string, noteId: string, text: string) => void
}

export function ProjectNotes({
  project,
  onAddNote,
  onDeleteNote,
  onEditNote,
}: ProjectNotesProps) {
  const [noteText, setNoteText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleAdd = () => {
    if (!noteText.trim()) return
    onAddNote(project._id, noteText.trim())
    setNoteText('')
  }

  const startEdit = (noteId: string, text: string) => {
    setEditingId(noteId)
    setEditText(text)
  }

  const handleEdit = () => {
    if (!editingId || !editText.trim()) return
    onEditNote(project._id, editingId, editText.trim())
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="border-t border-[var(--color-border)] pt-4">
      <h4 className="font-medium text-sm mb-3">הערות פנימיות</h4>
      <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
        {project.adminNotes.length === 0 && (
          <p className="text-xs text-[var(--color-muted)] italic">אין הערות</p>
        )}
        {project.adminNotes.map((note) => (
          <div key={note._id} className="bg-gray-50 p-2 rounded-lg text-sm group">
            {editingId === note._id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                  className="flex-1 px-2 py-1 border border-slate-200 rounded text-sm"
                  autoFocus
                />
                <button
                  onClick={handleEdit}
                  className="text-xs text-green-600 hover:underline"
                >
                  שמור
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-xs text-slate-400 hover:underline"
                >
                  ביטול
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start gap-2">
                  <p className="flex-1">{note.text}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={() => startEdit(note._id, note.text)}
                      className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(project._id, note._id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  {new Date(note.createdAt).toLocaleDateString('he-IL')} —{' '}
                  {note.createdBy?.name}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="הוסף הערה..."
          className="flex-1 px-3 py-2 border border-[var(--color-border)]
                     rounded-lg text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!noteText.trim()}
          className="px-3 py-2 bg-[var(--color-primary)] text-white rounded-lg
                     text-sm disabled:opacity-50 transition-all"
        >
          הוסף
        </button>
      </div>
    </div>
  )
}
