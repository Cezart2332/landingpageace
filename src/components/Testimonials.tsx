import { Star } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  testimonials: Translations['testimonials']
  a11yStars: string
}

export default function Testimonials({ testimonials, a11yStars }: Props) {
  return (
    <section id="testimonials" className="section section-solid">
      <div className="container">
        <SectionHeader
          label={testimonials.label}
          title={testimonials.title}
          description={testimonials.description}
        />
        <ul className="testimonials-grid">
          {testimonials.items.map((item) => (
            <li key={item.name} className="testimonial-card">
              <div className="testimonial-stars" aria-label={a11yStars}>
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
