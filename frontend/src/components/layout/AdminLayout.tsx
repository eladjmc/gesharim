import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { AdminSidebar } from './AdminSidebar'
import { Menu } from 'lucide-react'

export function AdminLayout() {
  const { isAuthenticated } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 p-2 rounded-lg bg-slate-900 text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Outlet />
      </main>
    </div>
  )
}
