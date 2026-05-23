import { useState, useMemo } from 'react'
import { mockGalleryProjects } from '../../data/mockGallery'
import { GalleryCarousel } from './GalleryCarousel'
import { GalleryFilters } from './GalleryFilters'
import { GalleryHeader, GalleryGrid } from './GalleryParts'

interface GalleryProps {
  onOpenForm?: () => void
}

export function Gallery({ onOpenForm }: GalleryProps) {
  const [search, setSearch] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [needType, setNeedType] = useState('')

  const municipalities = useMemo(
    () => [...new Set(mockGalleryProjects.map((p) => p.municipality))],
    [],
  )

  const filtered = useMemo(() => {
    return mockGalleryProjects.filter((p) => {
      const s = !search || p.name.includes(search)
      const m = !municipality || p.municipality === municipality
      const t = !needType || p.needType === needType
      return s && m && t
    })
  }, [search, municipality, needType])

  return (
    <section id="projects" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <GalleryHeader onOpenForm={onOpenForm} />
        <GalleryFilters
          search={search}
          municipality={municipality}
          needType={needType}
          municipalities={municipalities}
          onSearchChange={setSearch}
          onMunicipalityChange={setMunicipality}
          onNeedTypeChange={setNeedType}
        />
        {search ? (
          <GalleryGrid filtered={filtered} />
        ) : (
          <GalleryCarousel projects={filtered} />
        )}
      </div>
    </section>
  )
}
