import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { Municipality } from '../types'

export function useContactForm(onSuccess: () => void) {
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
      onSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { municipalities, loading, error, success, submit, setSuccess }
}
