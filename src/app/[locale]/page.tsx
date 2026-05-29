import LandingPage from '@/landing/LandingPage'
import { translations } from '@/i18n/translations'
import type { Locale } from '@/i18n/types'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'ro' }, { locale: 'en' }]
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params
  const safeLocale: Locale = locale === 'en' ? 'en' : 'ro'
  const t = translations[safeLocale]

  return <LandingPage locale={safeLocale} t={t} />
}
