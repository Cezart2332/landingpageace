import AnimatedStat from './AnimatedStat'
import type { Translations } from '@/i18n/translations'

type Props = {
  stats: Translations['stats']
  a11yLabel: string
}

export default function StatsBand({ stats, a11yLabel }: Props) {
  return (
    <section className="stats-band" aria-label={a11yLabel}>
      <div className="container">
        <ul className="stats-grid" data-reveal-stagger data-count-trigger>
          <AnimatedStat end={120} suffix="+" label={stats.projects} />
          <AnimatedStat end={98} suffix="%" label={stats.satisfaction} />
          <AnimatedStat end={8} suffix={stats.experienceSuffix} label={stats.experience} />
          <AnimatedStat end={24} suffix="/7" label={stats.support} />
        </ul>
      </div>
    </section>
  )
}
