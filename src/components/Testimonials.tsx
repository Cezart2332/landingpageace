import { Star } from 'lucide-react'
import SectionHeader from './SectionHeader'

const testimonials = [
  {
    quote:
      'ACE Technologies delivered our platform ahead of schedule. Their team understood our domain from day one.',
    name: 'Sarah Mitchell',
    role: 'CTO, Northline Logistics',
    initials: 'SM',
  },
  {
    quote:
      'The integration work alone saved us hundreds of hours. Clean code, clear communication, real results.',
    name: 'James Okonkwo',
    role: 'Operations Director, Finova',
    initials: 'JO',
  },
  {
    quote:
      'We went from spreadsheet chaos to a unified dashboard in three months. Could not recommend them more.',
    name: 'Elena Vasquez',
    role: 'Founder, CraftScale',
    initials: 'EV',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section-solid">
      <div className="container">
        <SectionHeader
          label="Client stories"
          title="Trusted by teams who ship"
          description="Partners across logistics, fintech, and SaaS rely on ACE Technologies for software that performs."
        />
        <ul className="testimonials-grid">
          {testimonials.map((item) => (
            <li key={item.name} className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
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
