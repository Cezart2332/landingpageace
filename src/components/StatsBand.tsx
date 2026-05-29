import AnimatedStat from './AnimatedStat'

export default function StatsBand() {
  return (
    <section className="stats-band" aria-label="Company metrics">
      <div className="container">
        <ul className="stats-grid" data-reveal-stagger data-count-trigger>
          <AnimatedStat end={120} suffix="+" label="Projects delivered" />
          <AnimatedStat end={98} suffix="%" label="Client satisfaction" />
          <AnimatedStat end={8} suffix=" yrs" label="Industry experience" />
          <AnimatedStat end={24} suffix="/7" label="Support coverage" />
        </ul>
      </div>
    </section>
  )
}
