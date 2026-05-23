import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ManhadimPage } from './pages/ManhadimPage'
import { MunicipalitiesPage } from './pages/MunicipalitiesPage'
import { EmailTemplatesPage } from './pages/EmailTemplatesPage'
import { AdminLayout } from './components/layout/AdminLayout'
import { PublicLayout } from './components/layout/PublicLayout'
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="manhadim" element={<ManhadimPage />} />
          <Route path="municipalities" element={<MunicipalitiesPage />} />
          <Route path="email-templates" element={<EmailTemplatesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
