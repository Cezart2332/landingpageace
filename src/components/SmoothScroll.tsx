'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/gsap/setup'

/* Smooth scroll via Lenis, synced with GSAP ScrollTrigger.
   Runs Lenis inside gsap.ticker so all scroll-driven animations
   remain frame-perfect — no drift between Lenis and GSAP. */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      syncTouch: false,
    })

    /* Keep ScrollTrigger in sync with Lenis virtual scroll position */
    lenis.on('scroll', () => ScrollTrigger.update())

    /* Drive Lenis from GSAP's ticker (same rAF loop → no jank) */
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return null
}
