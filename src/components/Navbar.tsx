'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitch from './LanguageSwitch'
import RotatingText from './RotatingText'
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
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#why', label: t.nav.why },
    { href: '#process', label: t.nav.process },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="navbar" data-animate="nav">
      <nav className="navbar-inner" aria-label={t.a11y.mainNav}>

        {/* ─── Brand block (left) ──────────────────────── */}
        <a href="#hero" className="navbar-brand" aria-label="Ace Solutions - home">
          <span className="navbar-brand-name">
            <span className="navbar-brand-ace">ACE</span>
            <span className="navbar-brand-dot"> · </span>
            <span className="navbar-brand-solutions">Solutions</span>
          </span>
          <RotatingText items={t.hero.rotating} compact />
        </a>

        {/* ─── Mobile hamburger ────────────────────────── */}
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* ─── Nav links + CTA + lang switch ───────────── */}
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

          <div className="navbar-actions">
            <a href="#contact" className="btn btn-primary navbar-cta">
              {t.nav.bookCall}
            </a>
            <LanguageSwitch
              switchToRo={t.a11y.switchToRo}
              switchToEn={t.a11y.switchToEn}
            />
          </div>
        </div>

      </nav>
    </header>
  )
}
