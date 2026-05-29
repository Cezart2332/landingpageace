import React from 'react'

type Props = {
  label: string
  a11yLabel: string
}

const partners = [
  {
    name: 'Northline',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <polygon points="12 2 19 21 12 17 5 21 12 2" />
      </svg>
    ),
  },
  {
    name: 'Finova',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: 'CraftScale',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    name: 'DataPulse',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'Meridian',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: 'CloudNine',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.7, flexShrink: 0 }}>
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-3.64-6.36-5-7.5-1.36 1.14-5 4.71-5 7.5a3.5 3.5 0 0 0 3.5 3.5z" />
        <path d="M6.5 13A2.5 2.5 0 0 0 9 10.5c0-2-2.6-4.54-3.57-5.36C4.4 6 2.5 8.5 2.5 10.5A2.5 2.5 0 0 0 5 13z" />
      </svg>
    ),
  },
]

export default function TrustBar({ label, a11yLabel }: Props) {
  return (
    <section className="trust-bar section-solid" aria-label={a11yLabel}>
      <div className="container">
        <p className="trust-label" data-reveal>
          {label}
        </p>
        <ul className="trust-logos" data-reveal-stagger>
          {partners.map((partner) => (
            <li key={partner.name} className="trust-logo" data-reveal-child style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {partner.svg}
                <span>{partner.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
