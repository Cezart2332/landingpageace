import { Layers, Shield, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  why: Translations['why']
}

const pillarIcons: LucideIcon[] = [Zap, Shield, Layers]

export default function WhyUs({ why }: Props) {
  return (
    <section id="why" className="section section-surface why-section">
      <div className="container">
        <SectionHeader
          label={why.label}
          title={why.title}
          description={why.description}
          showLabel
        />
        <ul className="why-strip" data-reveal-stagger>
          {why.items.map((item, index) => {
            const Icon = pillarIcons[index]
            return (
              <li key={item.title} className="why-strip-item" data-reveal-child>
                <div className="why-strip-head">
                  <span className="why-strip-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="why-strip-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="why-strip-title">{item.title}</h3>
                <p className="why-strip-desc">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
