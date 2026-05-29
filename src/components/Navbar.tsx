import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#why', label: 'Why us' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar" data-animate="nav">
      <nav className="navbar-inner" aria-label="Main navigation">
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          id="nav-menu"
          className={`navbar-menu ${open ? 'is-open' : ''}`}
        >
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar-link"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary navbar-cta">
            Book a call
          </a>
        </div>
      </nav>
    </header>
  )
}
