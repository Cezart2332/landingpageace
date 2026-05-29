'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

const partners = [
  'Northline',
  'Finova',
  'CraftScale',
  'DataPulse',
  'Meridian',
  'CloudNine',
]

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="trust-bar section-solid" aria-label={t.a11y.companies}>
      <div className="container">
        <p className="trust-label" data-reveal>
          {t.trust.label}
        </p>
        <ul className="trust-logos" data-reveal-stagger>
          {partners.map((name) => (
            <li key={name} className="trust-logo" data-reveal-child>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
