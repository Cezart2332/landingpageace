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

        <div className="process-timeline" data-reveal-stagger>
          {process.items.map((item, index) => {
            const Icon = stepIcons[index]
            const step = stepNumbers[index]
            const isLast = index === process.items.length - 1

            return (
              <div key={step} className="process-timeline-entry">
                {/* ─── Step card ─────────────────────────────── */}
                <div className="process-card" data-reveal-child data-tilt-card>
                  <span className="process-step" aria-hidden="true">{step}</span>
                  <div className="process-icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={1.75} />
                  </div>
                  <h3 className="process-title">{item.title}</h3>
                  <p className="process-desc">{item.description}</p>
                </div>

                {/* ─── Connector arrow (not on last step) ──── */}
                {!isLast && (
                  <div className="process-connector" aria-hidden="true">
                    <div className="process-connector-line" />
                    <svg
                      className="process-connector-arrow"
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                    >
                      <path
                        d="M1 1L9 8L1 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
