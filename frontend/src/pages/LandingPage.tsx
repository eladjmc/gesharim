import { useState } from 'react'
import { Header } from '../components/public/Header'
import { Hero } from '../components/public/Hero'
import { About } from '../components/public/About'
import { Stats } from '../components/public/Stats'
import { Gallery } from '../components/public/Gallery'
import { CtaSection } from '../components/public/CtaSection'
import { Footer } from '../components/public/Footer'
import { ContactFormModal } from '../components/public/ContactFormModal'

export function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const open = () => setIsFormOpen(true)

  return (
    <>
      <Header onOpenForm={open} />
      <Hero onOpenForm={open} />
      <About />
      <Stats />
      <Gallery onOpenForm={open} />
      <CtaSection onOpenForm={open} />
      <Footer />
      <ContactFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  )
}
