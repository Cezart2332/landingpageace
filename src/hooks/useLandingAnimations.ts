import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../gsap/setup'

function isInView(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

function revealStaggerList(list: Element) {
  if (list.getAttribute('data-reveal-done') === 'true') return
  const children = list.querySelectorAll('[data-reveal-child]')
  if (!children.length) return
  list.setAttribute('data-reveal-done', 'true')

  gsap.fromTo(
    children,
    { opacity: 0, y: 80, scale: 0.9, x: 0 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      overwrite: true,
      clearProps: 'transform',
    },
  )

  list.querySelectorAll('.solution-row-icon, .why-strip-icon, .process-rail-dot').forEach(
    (icon, i) => {
      gsap.fromTo(
        icon,
        { scale: 0, rotation: -45 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: i * 0.1 + 0.2,
          ease: 'back.out(2.5)',
        },
      )
    },
  )
}

function syncInViewStaggers(root: HTMLElement) {
  root.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
    if (isInView(el)) revealStaggerList(el)
  })
}

function syncInViewReveals(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getAttribute('data-reveal-done') === 'true') return
    if (!isInView(el)) return
    el.setAttribute('data-reveal-done', 'true')
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', overwrite: true })
  })
}

function setupCountUp(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.countEnd ?? '0')
    const suffix = el.dataset.countSuffix ?? ''
    const prefix = el.dataset.countPrefix ?? ''
    const decimals = parseInt(el.dataset.countDecimals ?? '0', 10)
    const counter = { value: 0 }

    ScrollTrigger.create({
      trigger: el.closest('[data-count-trigger]') ?? el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: end,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            const n =
              decimals > 0
                ? counter.value.toFixed(decimals)
                : Math.round(counter.value).toString()
            el.textContent = `${prefix}${n}${suffix}`
          },
        })
        gsap.fromTo(
          el,
          { scale: 0.5, opacity: 0.2 },
          { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2.5)' },
        )
      },
    })
  })
}

function setupBelowFoldMotion(root: HTMLElement) {
  root.querySelectorAll('.solution-row-visual').forEach((visual) => {
    gsap.fromTo(
      visual,
      { scale: 0.92, opacity: 0.7 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: visual,
          start: 'top 88%',
          end: 'top 45%',
          scrub: 1.2,
        },
      },
    )
  })

  const spineFill = root.querySelector('.process-rail-spine-fill')
  const processWrap = root.querySelector('.process-rail-wrap')
  if (spineFill && processWrap) {
    gsap.fromTo(
      spineFill,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: processWrap,
          start: 'top 78%',
          end: 'bottom 62%',
          scrub: 1,
        },
      },
    )
  }

  const ctaBand = root.querySelector('.cta-band-inner')
  if (ctaBand) {
    gsap.fromTo(
      ctaBand,
      { scale: 0.97 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.cta-band',
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1.5,
        },
      },
    )
  }
}

function setupSceneScrollDepth(root: HTMLElement) {
  const main = root.querySelector('.site-main')
  if (!main) return

  gsap.to('.page-canvas-inner', {
    yPercent: 5,
    scale: 1.035,
    ease: 'none',
    scrollTrigger: {
      trigger: main,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
    },
  })

}

function setupCursorGlow() {
  const glow = document.querySelector<HTMLElement>('.cursor-glow')
  if (!glow) return

  const xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' })
  const yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' })

  const onMove = (e: PointerEvent) => {
    xTo(e.clientX)
    yTo(e.clientY)
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  return () => window.removeEventListener('pointermove', onMove)
}

export function useLandingAnimations(
  pageRef: RefObject<HTMLDivElement | null>,
  ready: boolean,
) {
  useGSAP(
    () => {
      if (!pageRef.current || !ready) return

      const root = pageRef.current
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.scene-layer', { opacity: 1 })
        gsap.set(root.querySelectorAll('[data-reveal-child]'), {
          opacity: 0,
          y: 80,
          scale: 0.9,
          x: 0,
        })
        gsap.set(root.querySelectorAll('[data-reveal]'), { opacity: 0, y: 40 })
        gsap.set(root.querySelectorAll('[data-reveal-child].testimonial-card'), {
          opacity: 0,
          y: 80,
          scale: 0.9,
          x: 0,
        })

        gsap.set('[data-animate="nav"]', { y: -20, opacity: 0 })

        /* ─── Entrance timeline ───────────────────────────────── */
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to('[data-animate="nav"]', { y: 0, opacity: 1, duration: 0.6 })
          .from(
            '.hero-word',
            {
              opacity: 0,
              y: 60,
              rotateX: 40,
              transformOrigin: '50% 50% -30px',
              duration: 0.8,
              stagger: 0.07,
              ease: 'power3.out',
            },
            '-=0.3',
          )
          .from(
            '.hero-reveal',
            { opacity: 0, y: 28, duration: 0.6, stagger: 0.1 },
            '-=0.4',
          )
          .from(
            '.hero-actions .btn',
            {
              opacity: 0,
              y: 20,
              scale: 0.95,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.5)',
            },
            '-=0.4',
          )

        /* ─── Hero parallax on scroll ─────────────────────────── */
        gsap.to('.hero-content', {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        /* ─── Scene fade: full opacity in hero → ambient in rest ── */
        gsap.to('.scene-layer', {
          opacity: 0.22,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'bottom 70%',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        setupBelowFoldMotion(root)
        setupSceneScrollDepth(root)

        setupCountUp(root)

        /* ─── [data-reveal] scroll batch ─────────────────────── */
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: true,
              },
            )
          },
        })

        /* ─── [data-reveal-stagger] scroll batch ──────────────── */
        ScrollTrigger.batch('[data-reveal-stagger]', {
          start: 'top bottom',
          once: true,
          onEnter: (batch) => {
            batch.forEach((el) => revealStaggerList(el))
          },
        })

        const onScrollSync = () => {
          syncInViewStaggers(root)
          syncInViewReveals(root)
        }
        ScrollTrigger.addEventListener('scrollEnd', onScrollSync)

        /* ─── CTA banner ──────────────────────────────────────── */
        gsap.fromTo(
          '.cta-band-inner',
          { opacity: 0, y: 48, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cta-band',
              start: 'top 85%',
              once: true,
            },
          },
        )

        /* ─── Contact ─────────────────────────────────────────── */
        gsap.fromTo(
          '.contact-form-wrap, .contact-info .section-header',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.contact-layout',
              start: 'top 82%',
              once: true,
            },
          },
        )

        /* ─── Portfolio header ────────────────────────────────── */
        gsap.fromTo(
          '.portfolio-header .section-label, .portfolio-header .section-title',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.portfolio-section',
              start: 'top 82%',
              once: true,
            },
          },
        )

        /* ─── Portfolio cards slide in from right ─────────────── */
        const portfolioCards = root.querySelectorAll('.portfolio-card')
        if (portfolioCards.length) {
          gsap.fromTo(
            portfolioCards,
            { opacity: 0, x: 60, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.portfolio-scroll-area',
                start: 'top 85%',
                once: true,
              },
            },
          )
        }

        /* ─── Navbar scrolled state ───────────────────────────── */
        ScrollTrigger.create({
          start: 80,
          end: 'max',
          onUpdate: (self) => {
            const nav = root.querySelector('.navbar')
            if (!nav) return
            nav.classList.toggle('navbar-scrolled', self.scroll() > 80)
          },
        })

        /* ─── Card hover spotlight & dynamic elevate ─────────── */
        const cards = root.querySelectorAll<HTMLElement>(
          '.process-rail-panel, .testimonial-card, .faq-item'
        )

        const onCardMouseMove = (e: MouseEvent) => {
          const card = e.currentTarget as HTMLElement
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          card.style.setProperty('--mouse-x', `${x}px`)
          card.style.setProperty('--mouse-y', `${y}px`)
        }

        const onEnter = (e: Event) => {
          const card = e.currentTarget as HTMLElement
          gsap.to(card, {
            y: -8,
            boxShadow: '0 16px 36px rgba(37, 99, 235, 0.14), var(--shadow-tinted)',
            borderColor: 'var(--color-accent-border)',
            duration: 0.35,
            ease: 'power2.out',
          })
        }
        const onLeave = (e: Event) => {
          const card = e.currentTarget as HTMLElement
          gsap.to(card, {
            y: 0,
            boxShadow: 'var(--shadow-tinted)',
            borderColor: 'var(--color-border)',
            duration: 0.35,
            ease: 'power2.out',
          })
        }

        cards.forEach((card) => {
          card.addEventListener('mousemove', onCardMouseMove)
          card.addEventListener('mouseenter', onEnter)
          card.addEventListener('mouseleave', onLeave)
        })

        /* ─── Cursor glow ─────────────────────────────────────── */
        const destroyCursor = setupCursorGlow()

        ScrollTrigger.refresh()
        syncInViewStaggers(root)
        syncInViewReveals(root)
        const delayedSyncId = window.setTimeout(() => {
          ScrollTrigger.refresh()
          syncInViewStaggers(root)
          syncInViewReveals(root)
        }, 200)

        return () => {
          window.clearTimeout(delayedSyncId)
          ScrollTrigger.removeEventListener('scrollEnd', onScrollSync)
          cards.forEach((card) => {
            card.removeEventListener('mousemove', onCardMouseMove)
            card.removeEventListener('mouseenter', onEnter)
            card.removeEventListener('mouseleave', onLeave)
          })
          destroyCursor?.()
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        root.querySelectorAll('[data-count]').forEach((el) => {
          const html = el as HTMLElement
          const end = html.dataset.countEnd ?? '0'
          const suffix = html.dataset.countSuffix ?? ''
          const prefix = html.dataset.countPrefix ?? ''
          html.textContent = `${prefix}${end}${suffix}`
        })
        gsap.set(
          root.querySelectorAll(
            '[data-animate="nav"], .scene-layer, .hero-reveal, .hero-word, .hero-actions .btn, [data-reveal], [data-reveal-child], .cta-band-inner',
          ),
          { clearProps: 'all' },
        )
      })

      return () => mm.revert()
    },
    { scope: pageRef, dependencies: [ready], revertOnUpdate: true },
  )
}
