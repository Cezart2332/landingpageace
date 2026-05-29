'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Locale } from './types'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from './types'
import { translations, type Translations } from './translations'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored === 'en' || stored === 'ro' ? stored : DEFAULT_LOCALE
}

function applyLocaleToDocument(locale: Locale) {
  document.documentElement.lang = locale
  document.title = translations[locale].meta.title
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const userSelectedRef = useRef(false)

  useEffect(() => {
    if (userSelectedRef.current) return
    const stored = readStoredLocale()
    setLocaleState(stored)
    applyLocaleToDocument(stored)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    userSelectedRef.current = true
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
    applyLocaleToDocument(next)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
