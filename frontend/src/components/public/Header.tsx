import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onOpenForm: () => void
}

export function Header({ onOpenForm }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bg = scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}
    >
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-brand-green">גשרים</span>{' '}
          <span className="text-brand-teal">לקהילה</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/admin/login"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            כניסת מנהלים
          </Link>
          <button
            onClick={onOpenForm}
            className="h-9 px-5 bg-brand-cyan text-white text-sm font-semibold rounded-full hover:bg-brand-cyan-hover transition-colors"
          >
            הגשת בקשה
          </button>
        </nav>
      </div>
    </header>
  )
}
