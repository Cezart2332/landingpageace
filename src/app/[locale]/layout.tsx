import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { translations } from '@/i18n/translations'
import type { Locale } from '@/i18n/types'
import '@/app/globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700', '800'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const BASE_URL = 'https://acesolutions.com'

export function generateStaticParams() {
  return [{ locale: 'ro' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: Locale = locale === 'en' ? 'en' : 'ro'
  const t = translations[safeLocale]

  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${safeLocale}`,
      languages: {
        ro: `${BASE_URL}/ro`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${BASE_URL}/${safeLocale}`,
      siteName: 'ACE Technologies',
      locale: safeLocale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: '/favicon.svg',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const safeLocale: Locale = locale === 'en' ? 'en' : 'ro'
  const t = translations[safeLocale]

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACE Technologies',
    url: BASE_URL,
    description: t.meta.description,
    sameAs: [],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ACE Technologies',
    url: `${BASE_URL}/${safeLocale}`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <html lang={safeLocale} className={`${geist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {safeLocale === 'ro' ? 'Sari la conținut' : 'Skip to content'}
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
