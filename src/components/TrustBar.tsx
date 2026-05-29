type Props = {
  label: string
  a11yLabel: string
}

const partners = [
  'Northline',
  'Finova',
  'CraftScale',
  'DataPulse',
  'Meridian',
  'CloudNine',
]

export default function TrustBar({ label, a11yLabel }: Props) {
  return (
    <section className="trust-bar section-solid" aria-label={a11yLabel}>
      <div className="container">
        <p className="trust-label" data-reveal>
          {label}
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
