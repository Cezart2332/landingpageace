'use client'

import { useState } from 'react'
import { ChevronDown, MessageSquare } from 'lucide-react'
import SectionHeader from './SectionHeader'
import type { Translations } from '@/i18n/translations'

type Props = {
  faq: Translations['faq']
}

export default function Faq({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section section-solid faq-section">
      <div className="container">
        <div className="faq-split-layout">
          {/* Left Column: Heading and Support CTA */}
          <div className="faq-sidebar">
            <SectionHeader
              align="left"
              label={faq.label}
              title={faq.title}
              description={faq.description}
            />
            <div className="faq-support-card" data-reveal>
              <div className="faq-support-icon" aria-hidden="true">
                <MessageSquare size={20} />
              </div>
              <h3 className="faq-support-title">
                {faq.label === 'Întrebări frecvente' ? 'Ai alte întrebări?' : 'Still have questions?'}
              </h3>
              <p className="faq-support-desc">
                {faq.label === 'Întrebări frecvente'
                  ? 'Nu găsești răspunsul pe care îl cauți? Scrie-ne direct.'
                  : "Can't find the answer you're looking for? Message us directly."}
              </p>
              <a href="#contact" className="btn btn-secondary btn-sm">
                {faq.label === 'Întrebări frecvente' ? 'Contactează-ne' : 'Get in touch'}
              </a>
            </div>
          </div>

          {/* Right Column: Accordions list */}
          <ul className="faq-list" data-reveal-stagger>
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <li key={index} className="faq-item" data-reveal-child>
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
                    className={`faq-answer-wrap ${isOpen ? 'is-open' : ''}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    aria-hidden={!isOpen}
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
      </div>
    </section>
  )
}
