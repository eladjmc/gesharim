import { Monitor, Palette, Package, Zap, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NeedType } from '../../types'
import { NEED_TYPE_LABELS } from '../../utils/constants'

const TYPE_CONFIG: Record<NeedType, { icon: LucideIcon; color: string; bg: string }> = {
  landing_page: { icon: Monitor, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  showcase_site: { icon: Palette, color: 'text-brand-teal', bg: 'bg-sky-50' },
  product_catalog: { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
  site_upgrade: { icon: Zap, color: 'text-violet-600', bg: 'bg-violet-50' },
}

interface GalleryCardProps {
  name: string
  municipality: string
  needType: NeedType
  description: string
  entityType?: string
}

export function GalleryCard({
  name,
  municipality,
  needType,
  description,
  entityType,
}: GalleryCardProps) {
  const { icon: Icon, color, bg } = TYPE_CONFIG[needType]
  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-brand-cyan/30 hover:shadow-xl transition-all duration-300 h-[220px] flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-bold text-slate-900 truncate">{name}</h4>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{municipality}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
        {description}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className={`text-xs font-semibold ${color}`}>
          {NEED_TYPE_LABELS[needType]}
        </span>
        {entityType && <span className="text-xs text-slate-400">{entityType}</span>}
      </div>
    </div>
  )
}
