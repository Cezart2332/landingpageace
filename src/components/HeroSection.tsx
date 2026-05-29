import type { Translations } from '@/i18n/translations'

type Props = {
  hero: Translations['hero']
}

export default function HeroSection({ hero }: Props) {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          {hero.headline.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`hero-word ${i >= 3 ? 'hero-word-accent' : ''}`}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-reveal">{hero.sub}</p>
        <div className="hero-actions hero-reveal">
          <a href="#contact" className="btn btn-primary">
            {hero.ctaPrimary}
          </a>
          <a href="#solutions" className="btn btn-secondary">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
