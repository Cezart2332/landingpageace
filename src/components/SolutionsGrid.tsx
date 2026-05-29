import {
  Cloud,
  Code2,
  Headphones,
  Plug,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'

interface Solution {
  icon: LucideIcon
  title: string
  description: string
}

const solutions: Solution[] = [
  {
    icon: Code2,
    title: 'Custom Applications',
    description:
      'Tailored web and mobile apps built around your workflows, not the other way around.',
  },
  {
    icon: Cloud,
    title: 'Cloud & SaaS',
    description:
      'Scalable cloud architecture, multi-tenant SaaS products, and reliable deployments.',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    description:
      'Connect CRMs, ERPs, payment gateways, and third-party tools into one seamless flow.',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description:
      'Reduce manual work with intelligent pipelines, bots, and process automation.',
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    description:
      'Ongoing monitoring, updates, and dedicated support so your software stays sharp.',
  },
]

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="section section-soft">
      <div className="container">
        <SectionHeader
          label="What we build"
          title="Solutions that scale with you"
          description="From MVP to enterprise, we deliver software that fits your business goals and technical reality."
        />
        <ul className="solutions-grid" data-reveal-stagger>
          {solutions.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.title} className="solution-card" data-reveal-child data-tilt-card>
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
