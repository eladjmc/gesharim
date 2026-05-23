import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { Municipality } from '../types'

export function useContactForm() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    api.get<Municipality[]>('/municipalities').then(setMunicipalities).catch(() => {})
  }, [])

  const submit = async (data: Record<string, string>) => {
    setLoading(true)
    setError('')
    try {
      await api.post('/projects', data)
      setSuccess(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { municipalities, loading, error, success, submit, setSuccess }
}
