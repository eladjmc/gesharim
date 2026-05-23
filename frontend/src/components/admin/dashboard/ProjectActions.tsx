import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project, Manhad } from '../../../types'
import { VALID_TRANSITIONS } from '../../../utils/statusTransitions'

interface ProjectActionsProps {
  project: Project
  manhadim: Manhad[]
  onStatusChange: (
    projectId: string,
    status: string,
    extra?: { rejectionReason?: string; assignedManhad?: string },
  ) => Promise<void> | void
  onReject?: () => void
}

export function ProjectActions({
  project,
  manhadim,
  onStatusChange,
  onReject,
}: ProjectActionsProps) {
  const defaultManhad = manhadim.find((m) =>
    m.municipalities.some((muni) => muni._id === project.municipality._id),
  )?._id || ''
  const [selectedManhad, setSelectedManhad] = useState(defaultManhad)
  const [loading, setLoading] = useState(false)

  const transitions = VALID_TRANSITIONS[project.status] || []

  if (transitions.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)] italic">
        אין פעולות זמינות (סטטוס סופי)
      </p>
    )
  }

  const handleApprove = async () => {
    if (!selectedManhad) return
    setLoading(true)
    await onStatusChange(project._id, 'approved', { assignedManhad: selectedManhad })
    setLoading(false)
  }

  const handleAdvance = async (status: string) => {
    setLoading(true)
    await onStatusChange(project._id, status)
    setLoading(false)
  }

  return (
    <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
      <h4 className="font-medium text-sm">פעולות</h4>

      {project.status === 'pending' && (
        <>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-[var(--color-muted)]">
                שיבוץ מנה&quot;ד
              </label>
              <ManhadSelect
                manhadim={manhadim}
                value={selectedManhad}
                onChange={setSelectedManhad}
              />
            </div>
            <button
              onClick={handleApprove}
              disabled={!selectedManhad || loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm
                         hover:bg-green-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'מעבד...' : 'אישור'}
            </button>
          </div>
          {onReject && (
            <button
              onClick={onReject}
              className="text-sm text-red-600 hover:underline"
            >
              דחיית הבקשה
            </button>
          )}
        </>
      )}

      {project.status !== 'pending' && (
        <div className="flex flex-wrap gap-2">
          {transitions
            .filter((s) => s !== 'cancelled')
            .map((status) => (
              <button
                key={status}
                onClick={() => handleAdvance(status)}
                disabled={loading}
                className="px-3 py-1.5 bg-[var(--color-primary)] text-white
                           rounded-lg text-sm hover:bg-[var(--color-primary-dark)]
                           disabled:opacity-50 transition-all"
              >
                {loading ? 'מעבד...' : `העבר ל${getStatusActionLabel(status)}`}
              </button>
            ))}
          {transitions.includes('cancelled') && (
            <button
              onClick={() => handleAdvance('cancelled')}
              className="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-sm
                         hover:bg-gray-600 transition-all"
            >
              ביטול
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function getStatusActionLabel(status: string): string {
  const labels: Record<string, string> = {
    in_development: 'פיתוח',
    qa: 'בקרת איכות',
    completed: 'הושלם',
  }
  return labels[status] || status
}

function ManhadSelect({
  manhadim,
  value,
  onChange,
}: {
  manhadim: Manhad[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const selected = manhadim.find((m) => m._id === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
    setOpen(!open)
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleToggle}
        className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm text-right bg-white"
      >
        {selected?.name || 'בחר מנה"ד...'}
      </button>
      {open && createPortal(
        <div
          ref={ref}
          style={{ top: pos.top, left: pos.left, width: pos.width }}
          className="fixed bg-white border border-slate-200 rounded-lg shadow-xl z-[100] max-h-52 overflow-y-auto"
        >
          <div
            onClick={() => { onChange(''); setOpen(false) }}
            className="px-3 py-2 text-sm text-slate-400 hover:bg-slate-50 cursor-pointer"
          >
            בחר מנה&quot;ד...
          </div>
          {manhadim.map((m) => (
            <div
              key={m._id}
              onClick={() => { onChange(m._id); setOpen(false) }}
              className={`px-3 py-2 cursor-pointer hover:bg-slate-50 ${m._id === value ? 'bg-brand-cyan/5' : ''}`}
            >
              <span className="text-sm font-medium">{m.name}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {m.municipalities.map((muni) => (
                  <span
                    key={muni._id}
                    className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green-dark"
                  >
                    {muni.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </div>
  )
}
