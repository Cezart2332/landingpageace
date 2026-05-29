'use client'

import {
  Cloud,
  Code2,
  Headphones,
  Plug,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '@/i18n/LanguageProvider'

const solutionIcons: LucideIcon[] = [
  Code2,
  Cloud,
  Plug,
  Workflow,
  Headphones,
]

export default function SolutionsGrid() {
  const { t } = useLanguage()

  return (
    <section id="solutions" className="section section-soft">
      <div className="container">
        <SectionHeader
          label={t.solutions.label}
          title={t.solutions.title}
          description={t.solutions.description}
        />
        <ul className="solutions-grid" data-reveal-stagger>
          {t.solutions.items.map((item, index) => {
            const Icon = solutionIcons[index]
            return (
              <li
                key={item.title}
                className="solution-card"
                data-reveal-child
                data-tilt-card
              >
                <div className="solution-icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.75} />
                </div>
                <h3 className="solution-title">{item.title}</h3>
                <p className="solution-desc">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
