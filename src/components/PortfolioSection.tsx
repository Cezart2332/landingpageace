'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PortfolioModal, { type PortfolioItem } from './PortfolioModal'
import type { Translations } from '@/i18n/translations'

type Props = {
  portfolio: Translations['portfolio']
  prevLabel: string
  nextLabel: string
  openProjectLabel: string
  closeModalLabel: string
}

/* One full rotation = 25 s. Step = 25s / n cards. */
const LOOP_MS = 25_000

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function PortfolioSection({
  portfolio,
  prevLabel,
  nextLabel,
  openProjectLabel,
  closeModalLabel,
}: Props) {
  const trackRef = useRef<HTMLUListElement>(null)
  const animRef = useRef<Animation | null>(null)
  const navRafRef = useRef<number>(0)
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  const n = portfolio.items.length
  const modalOpen = selected !== null

  /* ─── Start Web Animations API loop ───────────────────────
     translateX(-50%) on a track with 2 equal copies always
     moves exactly one copy width — no JS measurement needed. */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const anim = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: LOOP_MS, iterations: Infinity, easing: 'linear' },
    )
    animRef.current = anim
    return () => {
      anim.cancel()
      if (navRafRef.current) cancelAnimationFrame(navRafRef.current)
    }
  }, [])

  /* Pause carousel while modal is open */
  useEffect(() => {
    const anim = animRef.current
    if (!anim) return
    if (modalOpen) anim.pause()
    else anim.play()
  }, [modalOpen])

  const pause = () => {
    if (!modalOpen) animRef.current?.pause()
  }
  const resume = () => {
    if (!modalOpen) animRef.current?.play()
  }

  const openProject = (item: PortfolioItem) => {
    animRef.current?.pause()
    setSelected(item)
  }

  const closeProject = () => setSelected(null)

  /* ─── Arrow nav: smooth step via currentTime easing ───── */
  const navigate = (dir: 'prev' | 'next') => {
    const anim = animRef.current
    if (!anim || modalOpen) return

    if (navRafRef.current) cancelAnimationFrame(navRafRef.current)

    anim.pause()

    const stepMs = LOOP_MS / n
    const raw = (anim.currentTime as number) ?? 0
    const current = ((raw % LOOP_MS) + LOOP_MS) % LOOP_MS
    let target = dir === 'next' ? current + stepMs : current - stepMs
    if (target >= LOOP_MS) target -= LOOP_MS
    if (target < 0) target += LOOP_MS

    let delta = target - current
    if (delta > LOOP_MS / 2) delta -= LOOP_MS
    if (delta < -LOOP_MS / 2) delta += LOOP_MS

    const startWall = performance.now()
    const duration = 480

    const tick = (now: number) => {
      const t = Math.min((now - startWall) / duration, 1)
      const newTime =
        (((current + delta * easeInOut(t)) % LOOP_MS) + LOOP_MS) % LOOP_MS
      anim.currentTime = newTime
      if (t < 1) {
        navRafRef.current = requestAnimationFrame(tick)
      }
    }
    navRafRef.current = requestAnimationFrame(tick)
  }

  const doubled = [...portfolio.items, ...portfolio.items]

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container portfolio-header section-intro section-intro--left">
        <h2 className="section-title">{portfolio.title}</h2>
      </div>

      <div
        className="portfolio-carousel-wrap"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <button
          type="button"
          className="portfolio-nav prev"
          aria-label={prevLabel}
          onClick={() => navigate('prev')}
          disabled={modalOpen}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div className="portfolio-scroll-area">
          <ul className="portfolio-track" ref={trackRef}>
            {doubled.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="portfolio-card"
                aria-hidden={index >= n}
              >
                <button
                  type="button"
                  className="portfolio-card-trigger"
                  aria-label={`${openProjectLabel}: ${item.title}`}
                  tabIndex={index >= n ? -1 : 0}
                  onClick={() => openProject(item)}
                >
                  <div className="portfolio-card-inner">
                    <div className="portfolio-card-body">
                      <div className="portfolio-meta">
                        <span className="portfolio-category">{item.category}</span>
                        <span className="portfolio-year">{item.year}</span>
                      </div>
                      <h3 className="portfolio-title">{item.title}</h3>
                      <span className="portfolio-tag">{item.tag}</span>
                    </div>

                    <div className="portfolio-card-arrow">
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="portfolio-nav next"
          aria-label={nextLabel}
          onClick={() => navigate('next')}
          disabled={modalOpen}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="container portfolio-footer">
        <a href="#contact" className="btn btn-secondary portfolio-cta">
          {portfolio.viewAll}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <PortfolioModal
        item={selected}
        closeLabel={closeModalLabel}
        visitLabel={portfolio.visitSite}
        onClose={closeProject}
      />
    </section>
  )
}
