import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from './SectionHeader'

const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'We build custom web apps, SaaS platforms, integrations, and automation systems—from greenfield MVPs to modernizing legacy systems.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'MVPs often ship in 8–14 weeks. Larger platforms are delivered in phased milestones so you get value early and often.',
  },
  {
    q: 'Do you work with existing teams?',
    a: 'Yes. We embed alongside your engineers and designers, or operate as a standalone squad depending on what you need.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We choose the stack per project—commonly React, TypeScript, Node, cloud-native services on AWS or Azure, and proven API patterns.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section section-solid">
      <div className="container container-narrow">
        <SectionHeader
          label="FAQ"
          title="Common questions"
          description="Quick answers before you reach out. We're happy to go deeper on a discovery call."
        />
        <ul className="faq-list" data-reveal-stagger>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <li key={item.q} className="faq-item" data-reveal-child>
                <button
                  type="button"
                  className="faq-question"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${isOpen ? 'is-open' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer-wrap"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
