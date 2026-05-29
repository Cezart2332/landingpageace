export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <span className="logo-mark">ACE</span>
            <span className="logo-text">Technologies</span>
          </a>
          <p className="footer-tagline">
            Custom software, cloud platforms, and integrations for teams that
            need to move fast without cutting corners.
          </p>
        </div>
        <nav className="footer-col" aria-label="Site">
          <h3 className="footer-col-title">Site</h3>
          <a href="#solutions">Solutions</a>
          <a href="#why">Why us</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <nav className="footer-col" aria-label="Company">
          <h3 className="footer-col-title">Company</h3>
          <a href="#testimonials">Clients</a>
          <a href="#contact">Contact</a>
          <a href="mailto:hello@acesolutions.com">hello@acesolutions.com</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p className="footer-copy">
          &copy; {year} ACE Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
