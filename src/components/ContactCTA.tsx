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
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({})

  const validateField = (name: string, value: string) => {
    if (name === 'name') {
      return !value.trim()
    }
    if (name === 'email') {
      const email = value.trim()
      return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    if (name === 'message') {
      return !value.trim()
    }
    return false
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const hasError = validateField(name, value)
    setFieldErrors((prev) => ({ ...prev, [name]: hasError }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      const hasError = validateField(name, value)
      setFieldErrors((prev) => ({ ...prev, [name]: hasError }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    const nameVal = (data.get('name') as string) ?? ''
    const emailVal = (data.get('email') as string) ?? ''
    const messageVal = (data.get('message') as string) ?? ''

    const errors = {
      name: validateField('name', nameVal),
      email: validateField('email', emailVal),
      message: validateField('message', messageVal),
    }

    setFieldErrors(errors)

    if (errors.name || errors.email || errors.message) {
      if (!nameVal.trim() || !emailVal.trim() || !messageVal.trim()) {
        setError(contact.errorRequired)
      } else {
        setError(contact.errorEmail)
      }
      return
    }

    setSubmitted(true)
    form.reset()
    setFieldErrors({})
  }

  return (
    <section id="contact" className="section section-inset contact-section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <SectionHeader
              align="left"
              label={contact.label}
              title={contact.title}
              description={contact.description}
              showLabel
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
                    className={fieldErrors.name ? 'input-error' : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    className={fieldErrors.email ? 'input-error' : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    className={fieldErrors.message ? 'input-error' : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
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
