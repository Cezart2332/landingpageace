import { Lightbulb, Rocket, Search } from 'lucide-react'
import SectionHeader from './SectionHeader'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Discover',
    description:
      'We map your goals, users, and constraints—then define a clear roadmap and scope.',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Build',
    description:
      'Agile delivery with transparent milestones, modern stack, and quality baked in.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Ship',
    description:
      'Launch, monitor, and iterate. We stay with you through rollout and beyond.',
  },
]

export default function ProcessSteps() {
  return (
    <section id="process" className="section section-solid">
      <div className="container">
        <SectionHeader
          label="How we work"
          title="A process built for clarity"
          description="No black boxes. You get visibility at every stage—from discovery to production."
        />
        <ol className="process-steps" data-reveal-stagger>
          {steps.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.step} className="process-card" data-reveal-child>
                <span className="process-step">{item.step}</span>
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
