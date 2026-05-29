import { Lightbulb, Rocket, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  process: Translations['process']
}

const stepIcons: LucideIcon[] = [Search, Lightbulb, Rocket]
const stepNumbers = ['01', '02', '03']

export default function ProcessSteps({ process }: Props) {
  return (
    <section id="process" className="section section-solid">
      <div className="container">
        <SectionHeader
          label={process.label}
          title={process.title}
          description={process.description}
        />
        <ol className="process-steps" data-reveal-stagger>
          {process.items.map((item, index) => {
            const Icon = stepIcons[index]
            const step = stepNumbers[index]
            return (
              <li key={step} className="process-card" data-reveal-child>
                <span className="process-step">{step}</span>
                <div className="process-icon" aria-hidden="true">
                  <Icon size={32} strokeWidth={1.75} />
                </div>
                <h3 className="process-title">{item.title}</h3>
                <p className="process-desc">{item.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
