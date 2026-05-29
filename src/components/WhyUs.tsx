'use client'

import { Layers, Shield, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '@/i18n/LanguageProvider'

const pillarIcons: LucideIcon[] = [Zap, Shield, Layers]

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section id="why" className="section section-solid">
      <div className="container">
        <SectionHeader
          label={t.why.label}
          title={t.why.title}
          description={t.why.description}
        />
        <ul className="pillars-grid" data-reveal-stagger>
          {t.why.items.map((item, index) => {
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
