import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import type { Project, Municipality, Manhad } from '../types'

interface ProjectsResponse {
  projects: Project[]
  total: number
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<Record<string, number>>({})
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [manhadim, setManhadim] = useState<Manhad[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    municipality: '',
    manhad: '',
  })

  const fetchProjects = useCallback(async () => {
    const params = new URLSearchParams()
    if (filters.status) params.set('status', filters.status)
    if (filters.municipality) params.set('municipality', filters.municipality)
    if (filters.manhad) params.set('manhad', filters.manhad)

    const data = await api.get<ProjectsResponse>(
      `/projects?${params.toString()}`,
    )
    setProjects(data.projects)
  }, [filters])

  const fetchStats = async () => {
    const data = await api.get<Record<string, number>>('/projects/stats')
    setStats(data)
  }

  const fetchMeta = async () => {
    const [munis, mans] = await Promise.all([
      api.get<Municipality[]>('/municipalities'),
      api.get<Manhad[]>('/admin/manhadim'),
    ])
    setMunicipalities(munis)
    setManhadim(mans)
  }

  const reload = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchProjects(), fetchStats()])
    setLoading(false)
  }, [fetchProjects])

  useEffect(() => {
    fetchMeta()
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const changeStatus = async (
    projectId: string,
    status: string,
    extra?: { rejectionReason?: string; assignedManhad?: string },
  ) => {
    await api.patch(`/projects/${projectId}/status`, { status, ...extra })
    await reload()
  }

  const addNote = async (projectId: string, text: string) => {
    await api.post(`/projects/${projectId}/notes`, { text })
    await reload()
  }

  const deleteNote = async (projectId: string, noteId: string) => {
    await api.delete(`/projects/${projectId}/notes/${noteId}`)
    await reload()
  }

  const editNote = async (projectId: string, noteId: string, text: string) => {
    await api.patch(`/projects/${projectId}/notes/${noteId}`, { text })
    await reload()
  }

  return {
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
  }
}
