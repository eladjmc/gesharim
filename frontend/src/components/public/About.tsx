import { FileText, Users, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FadeIn } from './FadeIn'

const STEPS: { icon: LucideIcon; title: string; text: string; num: string }[] = [
  {
    icon: FileText,
    num: '01',
    title: 'הגשת בקשה',
    text: 'מלאו טופס קצר עם פרטי העסק והצורך הדיגיטלי שלכם',
  },
  {
    icon: Users,
    num: '02',
    title: 'בחינה ושיבוץ',
    text: 'צוות התיאום בוחן את הבקשה ומשבץ מנהל מקצועי מתאים',
  },
  {
    icon: Rocket,
    num: '03',
    title: 'ביצוע ומסירה',
    text: 'הפרויקט מפותח, עובר בקרת איכות ונמסר לשימושכם',
  },
]

export function About() {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-cyan tracking-widest uppercase mb-3">
            התהליך שלנו
          </p>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">איך זה עובד?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            שלושה שלבים פשוטים מהגשת הבקשה ועד קבלת המוצר המוגמר
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <StepCard {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ icon: Icon, num, title, text }: (typeof STEPS)[0]) {
  return (
    <div className="relative bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 hover:border-brand-cyan/30 hover:shadow-lg transition-all duration-300 group">
      <span className="absolute top-4 left-4 text-xs font-bold text-slate-300 group-hover:text-brand-cyan transition-colors">
        {num}
      </span>
      <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-brand-cyan/10 flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
        <Icon className="w-7 h-7 text-brand-cyan" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
    </div>
  )
}
