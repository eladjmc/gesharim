import { GalleryCard } from './GalleryCard'
import { FadeIn } from './FadeIn'
import type { MockProject } from '../../data/mockGallery'
import type { NeedType } from '../../types'

interface GalleryHeaderProps {
  onOpenForm?: () => void
}

export function GalleryHeader({ onOpenForm }: GalleryHeaderProps) {
  return (
    <FadeIn className="text-center mb-14">
      <p className="text-sm font-semibold text-brand-cyan tracking-widest uppercase mb-3">
        הפרויקטים שלנו
      </p>
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
        פרויקטים שבוצעו בקהילה
      </h2>
      <p className="text-slate-500 max-w-xl mx-auto mb-8">
        דוגמאות לפרויקטים שביצענו עבור עסקים ברשויות שונות
      </p>
      {onOpenForm && (
        <button
          onClick={onOpenForm}
          className="h-11 px-8 bg-brand-cyan text-white text-sm font-semibold rounded-full hover:bg-brand-cyan-hover transition-colors"
        >
          השאירו פנייה
        </button>
      )}
    </FadeIn>
  )
}

export function GalleryGrid({ filtered }: { filtered: MockProject[] }) {
  if (filtered.length === 0)
    return <p className="text-center text-slate-400 mt-12">לא נמצאו פרויקטים מתאימים</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((p, i) => (
        <FadeIn key={p.id} delay={i * 0.05}>
          <GalleryCard
            key={p.id}
            name={p.name}
            municipality={p.municipality}
            needType={p.needType as NeedType}
            description={p.description}
            entityType={p.entityType}
          />
        </FadeIn>
      ))}
    </div>
  )
}
