import { useEffect } from 'react'
import HeroScene from '../three/HeroScene'
import { ScrollTrigger } from '../gsap/setup'

export default function PageCanvas() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('hero-scene-ready', refresh)
    return () => window.removeEventListener('hero-scene-ready', refresh)
  }, [])

  return (
    <div className="page-canvas">
      <div className="page-canvas-inner">
        <HeroScene />
        <div className="page-canvas-glow" />
      </div>
    </div>
  )
}
