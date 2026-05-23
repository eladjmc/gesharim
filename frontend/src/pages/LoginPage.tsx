import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store'
import { api } from '../services/api'
import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.post<{ token: string }>('/auth/login', {
        email,
        password,
      })
      login(data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <LoginHeader />
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm
          email={email}
          password={password}
          error={error}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

function LoginHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
      <Link to="/" className="text-xl font-extrabold tracking-tight">
        <span className="text-brand-green">גשרים</span>{' '}
        <span className="text-brand-teal">לקהילה</span>
      </Link>
      <Link
        to="/"
        className="text-sm text-slate-500 hover:text-brand-cyan transition-colors"
      >
        חזרה לדף הבית
      </Link>
    </header>
  )
}
