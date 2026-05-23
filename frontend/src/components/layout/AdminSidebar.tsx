import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store'

const navItems = [
  { path: '/admin/dashboard', label: 'לוח בקרה' },
  { path: '/admin/manhadim', label: 'מנה"דים' },
  { path: '/admin/municipalities', label: 'רשויות' },
  { path: '/admin/email-templates', label: 'תבניות מייל' },
]

interface AdminSidebarProps {
  onNavigate?: () => void
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const { logout } = useAuthStore()

  return (
    <aside className="w-64 h-full bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-lg font-bold">
          <span className="text-brand-green">גשרים</span>{' '}
          <span className="text-brand-teal">לקהילה</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">ניהול מערכת</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-brand-cyan text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full px-4 py-2.5 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all"
        >
          התנתקות
        </button>
      </div>
    </aside>
  )
}
