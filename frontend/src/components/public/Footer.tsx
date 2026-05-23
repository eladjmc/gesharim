import { Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-14">
          <FooterBrand />
          <FooterNav />
          <FooterContact />
        </div>
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} גשרים לקהילה — כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterBrand() {
  return (
    <div>
      <p className="text-xl font-extrabold mb-3">
        <span className="text-brand-green">גשרים</span>{' '}
        <span className="text-brand-teal">לקהילה</span>
      </p>
      <p className="text-sm text-slate-400 leading-relaxed">
        פתרונות דיגיטליים לעסקים ולארגונים בקהילה. מחברים בין צרכים מקצועיים ליכולות
        טכנולוגיות.
      </p>
    </div>
  )
}

function FooterNav() {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">ניווט מהיר</h4>
      <ul className="space-y-2 text-sm text-slate-400">
        <li>
          <a href="#about" className="hover:text-brand-cyan transition-colors">
            איך זה עובד
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-brand-cyan transition-colors">
            פרויקטים
          </a>
        </li>
      </ul>
    </div>
  )
}

function FooterContact() {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">יצירת קשר</h4>
      <ul className="space-y-2 text-sm text-slate-400">
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4" /> info@gesharim.org.il
        </li>
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4" /> 08-1234567
        </li>
      </ul>
    </div>
  )
}
