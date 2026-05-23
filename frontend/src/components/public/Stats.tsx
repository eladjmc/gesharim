import { FadeIn } from './FadeIn'

const STATS = [
  { value: '150+', label: 'פרויקטים שהושלמו' },
  { value: '37+', label: 'רשויות מקומיות' },
  { value: '98%', label: 'שביעות רצון' },
  { value: '30', label: 'ממוצע ימים למסירה' },
]

export function Stats() {
  return (
    <section className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-l from-brand-cyan to-brand-teal bg-clip-text text-transparent mb-2">
                {s.value}
              </p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
