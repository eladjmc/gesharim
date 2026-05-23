import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselNavProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  onDot: (i: number) => void
}

export function CarouselNav({
  page,
  totalPages,
  onPrev,
  onNext,
  onDot,
}: CarouselNavProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={onPrev}
        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === page ? 'bg-brand-cyan w-6' : 'bg-slate-300 w-2.5'
            }`}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </button>
    </div>
  )
}
