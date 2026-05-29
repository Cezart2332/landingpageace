'use client'

import '@/gsap/setup'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/gsap/setup'
import { useLandingAnimations } from '@/hooks/useLandingAnimations'
import type { Locale } from '@/i18n/types'
import type { Translations } from '@/i18n/translations'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsBand from '@/components/StatsBand'
import TrustBar from '@/components/TrustBar'
import SolutionsGrid from '@/components/SolutionsGrid'
import WhyUs from '@/components/WhyUs'
import ProcessSteps from '@/components/ProcessSteps'
import Testimonials from '@/components/Testimonials'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

const PageCanvas = dynamic(() => import('@/components/PageCanvas'), { ssr: false })

type LandingPageProps = {
  locale: Locale
  t: Translations
}

export default function LandingPage({ locale, t }: LandingPageProps) {
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
        <Navbar locale={locale} t={t} />
        <main className="site-main">
          <div className="over-canvas">
            <HeroSection hero={t.hero} />
            <StatsBand stats={t.stats} a11yLabel={t.a11y.metrics} />
          </div>
          <TrustBar label={t.trust.label} a11yLabel={t.a11y.companies} />
          <SolutionsGrid solutions={t.solutions} />
          <WhyUs why={t.why} />
          <ProcessSteps process={t.process} />
          <Testimonials testimonials={t.testimonials} a11yStars={t.a11y.stars} />
          <Faq faq={t.faq} />
          <CtaBanner cta={t.cta} />
          <ContactCTA contact={t.contact} />
          <Footer footer={t.footer} nav={t.nav} a11y={t.a11y} />
        </main>
      </div>
    </div>
  )
}
