import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import type { EmailTemplate } from '../types'

export function useEmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const data = await api.get<EmailTemplate[]>('/admin/email-templates')
    setTemplates(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const updateTemplate = async (id: string, data: { subject: string; body: string }) => {
    await api.put(`/admin/email-templates/${id}`, data)
    await fetchAll()
  }

  return { templates, loading, updateTemplate }
}
