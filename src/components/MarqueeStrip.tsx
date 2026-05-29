import type { Translations } from '@/i18n/translations'

type Props = {
  marquee: Translations['marquee']
}

export default function MarqueeStrip({ marquee }: Props) {
  const items = marquee.items

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-list">
            {items.map((item, i) => (
              <li key={`${copy}-${i}`} className="marquee-item">
                <span className="marquee-dot" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
