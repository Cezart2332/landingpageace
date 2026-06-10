import { Lightbulb, Rocket, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  process: Translations['process']
}

const stepIcons: LucideIcon[] = [Search, Lightbulb, Rocket]

export default function ProcessSteps({ process }: Props) {
  return (
    <section id="process" className="section section-surface process-section">
      <div className="container">
        <SectionHeader
          label={process.label}
          title={process.title}
          description={process.description}
        />

        <div className="process-rail-wrap">
          <div className="process-rail-spine" aria-hidden="true">
            <div className="process-rail-spine-fill" />
          </div>
          <ol className="process-rail" data-reveal-stagger>
            {process.items.map((item, index) => {
              const Icon = stepIcons[index]
              const step = String(index + 1).padStart(2, '0')
              return (
                <li key={step} className="process-rail-item" data-reveal-child>
                  <div className="process-rail-track" aria-hidden="true">
                    <span className="process-rail-dot">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                  </div>
                  <article className="process-rail-panel">
                    <span className="process-rail-step">{step}</span>
                    <h3 className="process-rail-title">{item.title}</h3>
                    <p className="process-rail-desc">{item.description}</p>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
