'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <span className="logo-mark">ACE</span>
            <span className="logo-text">Technologies</span>
          </a>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>
        <nav className="footer-col" aria-label={t.a11y.siteNav}>
          <h3 className="footer-col-title">{t.footer.site}</h3>
          <a href="#solutions">{t.nav.solutions}</a>
          <a href="#why">{t.nav.why}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <nav className="footer-col" aria-label={t.a11y.companyNav}>
          <h3 className="footer-col-title">{t.footer.company}</h3>
          <a href="#testimonials">{t.footer.clients}</a>
          <a href="#contact">{t.nav.contact}</a>
          <a href="mailto:hello@acesolutions.com">hello@acesolutions.com</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p className="footer-copy">
          &copy; {year} ACE Technologies. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
