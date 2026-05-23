interface LoginFormProps {
  email: string
  password: string
  error: string
  loading: boolean
  onEmailChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm(props: LoginFormProps) {
  const { email, password, error, loading, onEmailChange, onPasswordChange, onSubmit } =
    props
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-6 text-center">
          <h1 className="text-xl font-bold text-white">כניסת מנהלים</h1>
        </div>
        <form onSubmit={onSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              אימייל
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
              placeholder="admin@gesharim.org"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-brand-cyan text-white rounded-xl font-semibold hover:bg-brand-cyan-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>
      </div>
    </div>
  )
}
