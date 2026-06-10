interface SectionHeaderProps {
  label: string
  title: string
  description: string
  align?: 'center' | 'left'
  /** Pill label — use sparingly (max ~1 per 3 sections) */
  showLabel?: boolean
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  showLabel = false,
}: SectionHeaderProps) {
  return (
    <header
      className={`section-intro ${align === 'left' ? 'section-intro--left' : ''}`}
      data-reveal
    >
      {showLabel ? <span className="section-label">{label}</span> : null}
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </header>
  )
}
