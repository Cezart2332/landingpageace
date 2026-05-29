import { ArrowUpRight } from 'lucide-react'
import type { Translations } from '@/i18n/translations'

type Props = {
  portfolio: Translations['portfolio']
}

export default function PortfolioSection({ portfolio }: Props) {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container portfolio-header">
        <span className="section-label">{portfolio.label}</span>
        <h2 className="section-title">{portfolio.title}</h2>
      </div>

      <div className="portfolio-scroll-area">
        <ul className="portfolio-track" data-portfolio-track>
          {portfolio.items.map((item) => (
            <li
              key={item.id}
              className="portfolio-card"
              data-reveal-child
            >
              <div className="portfolio-card-inner">
                <span className="portfolio-number">{item.id}</span>

                <div className="portfolio-card-body">
                  <div className="portfolio-meta">
                    <span className="portfolio-category">{item.category}</span>
                    <span className="portfolio-year">{item.year}</span>
                  </div>
                  <h3 className="portfolio-title">{item.title}</h3>
                  <span className="portfolio-tag">{item.tag}</span>
                </div>

                <div className="portfolio-card-arrow">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="container portfolio-footer">
        <a href="#contact" className="btn btn-secondary portfolio-cta">
          {portfolio.viewAll}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
