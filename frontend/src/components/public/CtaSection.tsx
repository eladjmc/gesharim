import { FadeIn } from './FadeIn'

interface CtaSectionProps {
  onOpenForm: () => void
}

export function CtaSection({ onOpenForm }: CtaSectionProps) {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            מוכנים להתחיל?
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-lg mx-auto leading-relaxed">
            השאירו פנייה ואנחנו נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית לעסק שלכם
          </p>
          <button
            onClick={onOpenForm}
            className="h-14 px-10 bg-brand-cyan text-white font-bold text-lg rounded-full hover:bg-brand-cyan-hover transition-colors shadow-lg"
          >
            הגשת בקשה
          </button>
        </FadeIn>
      </div>
    </section>
  )
}
