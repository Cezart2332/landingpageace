'use client'

import AnimatedStat from './AnimatedStat'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function StatsBand() {
  const { t } = useLanguage()

  return (
    <section className="stats-band" aria-label={t.a11y.metrics}>
      <div className="container">
        <ul className="stats-grid" data-reveal-stagger data-count-trigger>
          <AnimatedStat end={120} suffix="+" label={t.stats.projects} />
          <AnimatedStat end={98} suffix="%" label={t.stats.satisfaction} />
          <AnimatedStat
            end={8}
            suffix={t.stats.experienceSuffix}
            label={t.stats.experience}
          />
          <AnimatedStat end={24} suffix="/7" label={t.stats.support} />
        </ul>
      </div>
    </section>
  )
}
