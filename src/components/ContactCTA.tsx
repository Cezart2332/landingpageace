'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function ContactCTA() {
  const { t } = useLanguage()
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
      setError(t.contact.errorRequired)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.contact.errorEmail)
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
              label={t.contact.label}
              title={t.contact.title}
              description={t.contact.description}
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
                <span>{t.contact.location}</span>
              </li>
            </ul>
          </div>

          <div className="contact-form-wrap" data-reveal>
            {submitted ? (
              <div className="contact-success" role="status">
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successMessage}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <label htmlFor="name">{t.contact.formName}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t.contact.placeholderName}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">{t.contact.formEmail}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t.contact.placeholderEmail}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">{t.contact.formMessage}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t.contact.placeholderMessage}
                  />
                </div>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-full">
                  <Send size={18} aria-hidden="true" />
                  {t.contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
