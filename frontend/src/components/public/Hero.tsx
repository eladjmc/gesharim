import { motion } from 'framer-motion'

interface HeroProps {
  onOpenForm: () => void
}

export function Hero({ onOpenForm }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <HeroBg />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 w-full py-24">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-8"
          >
            <span className="text-white">פתרונות דיגיטליים</span>
            <br />
            <span className="bg-gradient-to-l from-brand-cyan to-brand-teal bg-clip-text text-transparent">
              לעסקים בקהילה
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            מחברים בין צרכי הקהילה לבין יכולות מקצועיות — דרך פרויקטים דיגיטליים בשירות
            הרשויות והעסקים המקומיים
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button
              onClick={onOpenForm}
              className="h-14 px-10 bg-brand-cyan text-white font-bold text-lg rounded-full hover:bg-brand-cyan-hover transition-colors shadow-lg"
            >
              הגשת בקשה
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-brand-teal/5" />
    </div>
  )
}
