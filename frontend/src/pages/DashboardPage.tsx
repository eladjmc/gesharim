import { useState, useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import { StatsCards } from '../components/admin/dashboard/StatsCards'
import { ProjectFilters } from '../components/admin/dashboard/ProjectFilters'
import { ProjectTable } from '../components/admin/dashboard/ProjectTable'
import { ProjectDetailModal } from '../components/admin/dashboard/ProjectDetailModal'
import type { Project } from '../types'

export function DashboardPage() {
  const {
    projects,
    stats,
    municipalities,
    manhadim,
    loading,
    filters,
    setFilters,
    changeStatus,
    addNote,
    deleteNote,
    editNote,
  } = useProjects()
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    if (selected) {
      const fresh = projects.find((p) => p._id === selected._id)
      if (fresh) setSelected(fresh)
    }
  }, [projects])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">לוח בקרה</h1>
      <StatsCards stats={stats} />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <ProjectFilters
          status={filters.status}
          municipality={filters.municipality}
          manhad={filters.manhad}
          municipalities={municipalities}
          manhadim={manhadim}
          onStatusChange={(v) => setFilters({ ...filters, status: v })}
          onMunicipalityChange={(v) => setFilters({ ...filters, municipality: v })}
          onManhadChange={(v) => setFilters({ ...filters, manhad: v })}
        />
        {loading ? (
          <p className="text-center py-8 text-slate-400">טוען...</p>
        ) : (
          <ProjectTable projects={projects} onSelect={setSelected} />
        )}
      </div>
      <ProjectDetailModal
        project={selected}
        manhadim={manhadim}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onStatusChange={changeStatus}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onEditNote={editNote}
      />
    </div>
  )
}
