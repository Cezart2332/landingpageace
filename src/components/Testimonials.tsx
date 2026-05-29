'use client'

import { Star } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="section section-solid">
      <div className="container">
        <SectionHeader
          label={t.testimonials.label}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />
        <ul className="testimonials-grid">
          {t.testimonials.items.map((item) => (
            <li key={item.name} className="testimonial-card">
              <div className="testimonial-stars" aria-label={t.a11y.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="testimonial-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <div>
                  <cite className="testimonial-name">{item.name}</cite>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
