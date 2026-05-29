'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

export default function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="cta-banner" data-reveal>
      <div className="container cta-banner-inner">
        <div className="cta-banner-copy">
          <h2 className="cta-banner-title">{t.cta.title}</h2>
          <p className="cta-banner-desc">{t.cta.description}</p>
        </div>
        <a href="#contact" className="btn btn-primary btn-lg">
          {t.cta.button}
        </a>
      </div>
    </section>
  )
}
