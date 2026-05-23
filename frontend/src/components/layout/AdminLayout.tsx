import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { AdminSidebar } from './AdminSidebar'

export function AdminLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
