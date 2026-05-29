import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeader from './SectionHeader'

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string)?.trim()
    const email = (data.get('email') as string)?.trim()
    const message = (data.get('message') as string)?.trim()

    if (!name || !email || !message) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="contact" className="section section-solid contact-section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <SectionHeader
              align="left"
              label="Get in touch"
              title="Ready to build something great?"
              description="Tell us about your project. We typically respond within one business day."
            />
            <ul className="contact-details">
              <li>
                <Mail size={18} aria-hidden="true" />
                <a href="mailto:hello@acesolutions.com">hello@acesolutions.com</a>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>Remote-first · Worldwide delivery</span>
              </li>
            </ul>
          </div>

          <div className="contact-form-wrap" data-reveal>
            {submitted ? (
              <div className="contact-success" role="status">
                <h3>Thank you!</h3>
                <p>
                  We&apos;ve received your message and will be in touch soon.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project, timeline, and goals..."
                  />
                </div>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-full">
                  <Send size={18} aria-hidden="true" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
