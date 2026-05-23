import { useState } from 'react'
import type { Project, Manhad } from '../../../types'
import { Modal } from '../../common/Modal'
import { ProjectInfo } from './ProjectInfo'
import { ProjectActions } from './ProjectActions'
import { ProjectNotes } from './ProjectNotes'

interface ProjectDetailModalProps {
  project: Project | null
  manhadim: Manhad[]
  isOpen: boolean
  onClose: () => void
  onStatusChange: (
    projectId: string,
    status: string,
    extra?: { rejectionReason?: string; assignedManhad?: string },
  ) => void
  onAddNote: (projectId: string, text: string) => void
  onDeleteNote: (projectId: string, noteId: string) => void
  onEditNote: (projectId: string, noteId: string, text: string) => void
}

export function ProjectDetailModal({
  project,
  manhadim,
  isOpen,
  onClose,
  onStatusChange,
  onAddNote,
  onDeleteNote,
  onEditNote,
}: ProjectDetailModalProps) {
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  if (!project) return null

  const handleOpenReject = () => {
    setRejectOpen(true)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) return
    onStatusChange(project._id, 'rejected', { rejectionReason })
    setRejectOpen(false)
    setRejectionReason('')
    onClose()
  }

  const handleCloseReject = () => {
    setRejectOpen(false)
    setRejectionReason('')
  }

  return (
    <>
      <Modal isOpen={isOpen && !rejectOpen} onClose={onClose} title={project.businessName}>
        <div className="space-y-6">
          <ProjectInfo project={project} />
          <ProjectActions
            project={project}
            manhadim={manhadim}
            onStatusChange={onStatusChange}
            onReject={handleOpenReject}
          />
          <ProjectNotes
            project={project}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
          />
        </div>
      </Modal>
      <Modal isOpen={isOpen && rejectOpen} onClose={handleCloseReject} title="דחיית בקשה">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            דחיית הבקשה של <strong>{project.businessName}</strong>
          </p>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="סיבת הדחייה..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
            autoFocus
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCloseReject}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              ביטול
            </button>
            <button
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50 transition-all"
            >
              דחייה
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
