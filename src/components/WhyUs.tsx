import { Layers, Shield, Zap } from 'lucide-react'
import SectionHeader from './SectionHeader'

const pillars = [
  {
    icon: Zap,
    title: 'Ship faster',
    description:
      'Lean delivery cycles and clear milestones so you see progress every week—not months from now.',
  },
  {
    icon: Shield,
    title: 'Built to last',
    description:
      'Security, testing, and maintainable architecture are part of every build—not an afterthought.',
  },
  {
    icon: Layers,
    title: 'Full-stack clarity',
    description:
      'One team owns design through deployment. No handoff gaps, no vendor finger-pointing.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="section section-solid">
      <div className="container">
        <SectionHeader
          label="Why ACE Technologies"
          title="Partnership, not just code"
          description="We work as an extension of your team—transparent, responsive, and focused on outcomes that matter to your business."
        />
        <ul className="pillars-grid" data-reveal-stagger>
          {pillars.map((item) => {
            const Icon = item.icon
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
