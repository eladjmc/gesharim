import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryCard } from './GalleryCard'
import { CarouselNav } from './CarouselNav'
import type { MockProject } from '../../data/mockGallery'
import type { NeedType } from '../../types'

interface CarouselProps {
  projects: MockProject[]
}

const VISIBLE = 3
const INTERVAL = 5000

export function GalleryCarousel({ projects }: CarouselProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(projects.length / VISIBLE)

  useEffect(() => setPage(0), [projects])

  const next = useCallback(
    () => setPage((p) => (totalPages > 0 ? (p + 1) % totalPages : 0)),
    [totalPages],
  )
  const prev = () => setPage((p) => (totalPages > 0 ? (p - 1 + totalPages) % totalPages : 0))

  useEffect(() => {
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [next])

  const start = page * VISIBLE
  const visible = projects.slice(start, start + VISIBLE)

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visible.map((p) => (
              <GalleryCard
                key={p.id}
                name={p.name}
                municipality={p.municipality}
                needType={p.needType as NeedType}
                description={p.description}
                entityType={p.entityType}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <CarouselNav
        page={page}
        totalPages={totalPages}
        onPrev={prev}
        onNext={next}
        onDot={setPage}
      />
    </div>
  )
}
