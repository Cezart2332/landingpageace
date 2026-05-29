'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t, locale } = useLanguage()

  useEffect(() => {
    setOpenIndex(null)
  }, [locale])

  return (
    <section id="faq" className="section section-solid">
      <div className="container container-narrow">
        <SectionHeader
          label={t.faq.label}
          title={t.faq.title}
          description={t.faq.description}
        />
        <ul className="faq-list" data-reveal-stagger>
          {t.faq.items.map((item, index) => {
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
