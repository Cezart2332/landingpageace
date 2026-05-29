'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  contact: Translations['contact']
}

export default function ContactCTA({ contact }: Props) {
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
      setError(contact.errorRequired)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(contact.errorEmail)
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
              label={contact.label}
              title={contact.title}
              description={contact.description}
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
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>

          <div className="contact-form-wrap" data-reveal>
            {submitted ? (
              <div className="contact-success" role="status">
                <h3>{contact.successTitle}</h3>
                <p>{contact.successMessage}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  {contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <label htmlFor="name">{contact.formName}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={contact.placeholderName}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">{contact.formEmail}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={contact.placeholderEmail}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">{contact.formMessage}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={contact.placeholderMessage}
                  />
                </div>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-full">
                  <Send size={18} aria-hidden="true" />
                  {contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
