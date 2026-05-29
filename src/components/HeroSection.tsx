'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

export default function HeroSection() {
  const { t } = useLanguage()
  const headlineWords = t.hero.headline

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <span className="hero-badge hero-reveal">{t.hero.badge}</span>
        <h1 className="hero-title">
          {headlineWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`hero-word ${i >= 3 ? 'hero-word-accent' : ''}`}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-reveal">{t.hero.sub}</p>
        <div className="hero-actions hero-reveal">
          <a href="#contact" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#solutions" className="btn btn-secondary">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
