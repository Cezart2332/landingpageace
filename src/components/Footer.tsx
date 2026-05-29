import type { Translations } from '@/i18n/translations'

type Props = {
  footer: Translations['footer']
  nav: Translations['nav']
  a11y: Translations['a11y']
}

export default function Footer({ footer, nav, a11y }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <span className="logo-mark">ACE</span>
            <span className="logo-text">Technologies</span>
          </a>
          <p className="footer-tagline">{footer.tagline}</p>
        </div>
        <nav className="footer-col" aria-label={a11y.siteNav}>
          <h3 className="footer-col-title">{footer.site}</h3>
          <a href="#solutions">{nav.solutions}</a>
          <a href="#why">{nav.why}</a>
          <a href="#process">{nav.process}</a>
          <a href="#faq">{nav.faq}</a>
        </nav>
        <nav className="footer-col" aria-label={a11y.companyNav}>
          <h3 className="footer-col-title">{footer.company}</h3>
          <a href="#testimonials">{footer.clients}</a>
          <a href="#contact">{nav.contact}</a>
          <a href="mailto:hello@acesolutions.com">hello@acesolutions.com</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p className="footer-copy">
          &copy; {year} ACE Technologies. {footer.rights}
        </p>
      </div>
    </footer>
  )
}
