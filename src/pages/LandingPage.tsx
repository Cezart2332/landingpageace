import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../gsap/setup'
import { useLandingAnimations } from '../hooks/useLandingAnimations'
import Navbar from '../components/Navbar'
import PageCanvas from '../components/PageCanvas'
import HeroSection from '../components/HeroSection'
import StatsBand from '../components/StatsBand'
import TrustBar from '../components/TrustBar'
import SolutionsGrid from '../components/SolutionsGrid'
import WhyUs from '../components/WhyUs'
import ProcessSteps from '../components/ProcessSteps'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true)
      ScrollTrigger.refresh()
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    window.addEventListener('hero-scene-ready', refresh)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('hero-scene-ready', refresh)
    }
  }, [])

  useLandingAnimations(pageRef, ready)

  return (
    <div ref={pageRef} className={`landing ${ready ? 'is-ready' : ''}`}>
      <div className="scene-layer" aria-hidden="true">
        <PageCanvas />
      </div>

      <div className="ui-layer">
        <Navbar />
        <main className="site-main">
          <div className="over-canvas">
            <HeroSection />
            <StatsBand />
          </div>
          <TrustBar />
          <SolutionsGrid />
          <WhyUs />
          <ProcessSteps />
          <Testimonials />
          <Faq />
          <CtaBanner />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
