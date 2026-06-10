import {
  Cloud,
  Code2,
  Headphones,
  Plug,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  solutions: Translations['solutions']
}

const solutionIcons: LucideIcon[] = [Code2, Cloud, Plug, Workflow, Headphones]

export default function SolutionsGrid({ solutions }: Props) {
  return (
    <section id="solutions" className="section section-surface solutions-section">
      <div className="container">
        <SectionHeader
          label={solutions.label}
          title={solutions.title}
          description={solutions.description}
        />
        <ul className="solutions-zigzag" data-reveal-stagger>
          {solutions.items.map((item, index) => {
            const Icon = solutionIcons[index]
            const reverse = index % 2 === 1
            return (
              <li
                key={item.title}
                className={`solution-row${reverse ? ' solution-row--reverse' : ''}`}
                data-reveal-child
              >
                <div className="solution-row-visual" aria-hidden="true">
                  <span className="solution-row-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="solution-row-icon">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="solution-row-body">
                  <h3 className="solution-row-title">{item.title}</h3>
                  <p className="solution-row-desc">{item.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
