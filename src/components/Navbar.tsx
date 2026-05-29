'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitch from './LanguageSwitch'
import type { Translations } from '@/i18n/translations'
import type { Locale } from '@/i18n/types'

type Props = {
  locale: Locale
  t: Translations
}

export default function Navbar({ t }: Props) {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#solutions', label: t.nav.solutions },
    { href: '#why', label: t.nav.why },
    { href: '#process', label: t.nav.process },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="navbar" data-animate="nav">
      <nav className="navbar-inner" aria-label={t.a11y.mainNav}>
        <div className="navbar-lang-slot">
          <LanguageSwitch
            switchToRo={t.a11y.switchToRo}
            switchToEn={t.a11y.switchToEn}
          />
        </div>

        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
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
            {t.nav.bookCall}
          </a>
        </div>
      </nav>
    </header>
  )
}
