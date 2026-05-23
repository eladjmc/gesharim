import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import type { Municipality } from '../types'

export function useMunicipalities() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const data = await api.get<Municipality[]>('/municipalities')
    setMunicipalities(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const createMunicipality = async (name: string) => {
    await api.post('/admin/municipalities', { name })
    await fetchAll()
  }

  const updateMunicipality = async (id: string, name: string) => {
    await api.put(`/admin/municipalities/${id}`, { name })
    await fetchAll()
  }

  const deleteMunicipality = async (id: string) => {
    await api.delete(`/admin/municipalities/${id}`)
    await fetchAll()
  }

  return { municipalities, loading, createMunicipality, updateMunicipality, deleteMunicipality }
}
