interface SectionHeaderProps {
  label: string
  title: string
  description: string
  align?: 'center' | 'left'
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <header
      className={`section-header ${align === 'left' ? 'section-header-left' : ''}`}
      data-reveal
    >
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </header>
  )
}
