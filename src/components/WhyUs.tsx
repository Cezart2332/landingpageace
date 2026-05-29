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
    <section id="why" className="section section-solid">
      <div className="container">
        <SectionHeader
          label={why.label}
          title={why.title}
          description={why.description}
        />
        <ul className="pillars-grid" data-reveal-stagger>
          {why.items.map((item, index) => {
            const Icon = pillarIcons[index]
            return (
              <li key={item.title} className="pillar-card" data-reveal-child>
                <div className="pillar-icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
