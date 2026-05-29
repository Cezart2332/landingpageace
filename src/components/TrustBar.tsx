const partners = [
  'Northline',
  'Finova',
  'CraftScale',
  'DataPulse',
  'Meridian',
  'CloudNine',
]

export default function TrustBar() {
  return (
    <section className="trust-bar section-solid" aria-label="Companies we work with">
      <div className="container">
        <p className="trust-label" data-reveal>
          Trusted by teams building modern software
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
