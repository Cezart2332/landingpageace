'use client'

import { useRouter, useParams } from 'next/navigation'
import type { Locale } from '@/i18n/types'

type Props = {
  switchToRo: string
  switchToEn: string
}

const options: { value: Locale; label: string }[] = [
  { value: 'ro', label: 'RO' },
  { value: 'en', label: 'EN' },
]

export default function LanguageSwitch({ switchToRo, switchToEn }: Props) {
  const router = useRouter()
  const params = useParams()
  const currentLocale = (params?.locale as Locale) ?? 'ro'

  const handleSwitch = (locale: Locale) => {
    if (locale !== currentLocale) {
      router.push(`/${locale}`)
    }
  }

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={`${switchToRo} / ${switchToEn}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`lang-switch-btn ${currentLocale === option.value ? 'is-active' : ''}`}
          aria-pressed={currentLocale === option.value}
          aria-label={option.value === 'ro' ? switchToRo : switchToEn}
          onClick={() => handleSwitch(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
