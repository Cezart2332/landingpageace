'use client'

import { useLanguage } from '@/i18n/LanguageProvider'
import type { Locale } from '@/i18n/types'

const options: { value: Locale; label: string }[] = [
  { value: 'ro', label: 'RO' },
  { value: 'en', label: 'EN' },
]

export default function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={`${t.a11y.switchToRo} / ${t.a11y.switchToEn}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`lang-switch-btn ${locale === option.value ? 'is-active' : ''}`}
          aria-pressed={locale === option.value}
          aria-label={
            option.value === 'ro' ? t.a11y.switchToRo : t.a11y.switchToEn
          }
          onClick={() => {
            if (locale !== option.value) setLocale(option.value)
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
