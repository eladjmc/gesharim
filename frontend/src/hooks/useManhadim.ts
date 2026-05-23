import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import type { Manhad, Municipality } from '../types'

export function useManhadim() {
  const [manhadim, setManhadim] = useState<Manhad[]>([])
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [mans, munis] = await Promise.all([
      api.get<Manhad[]>('/admin/manhadim'),
      api.get<Municipality[]>('/municipalities'),
    ])
    setManhadim(mans)
    setMunicipalities(munis)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const createManhad = async (data: Omit<Manhad, '_id' | 'municipalities'> & { municipalities: string[] }) => {
    await api.post('/admin/manhadim', data)
    await fetchAll()
  }

  const updateManhad = async (id: string, data: { name: string; email: string; phone: string; municipalities: string[] }) => {
    await api.put(`/admin/manhadim/${id}`, data)
    await fetchAll()
  }

  const deleteManhad = async (id: string) => {
    await api.delete(`/admin/manhadim/${id}`)
    await fetchAll()
  }

  return { manhadim, municipalities, loading, createManhad, updateManhad, deleteManhad }
}
