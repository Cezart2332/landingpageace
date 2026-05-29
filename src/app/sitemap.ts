import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://acesolutions.com'
  const lastModified = new Date()

  return [
    {
      url: `${BASE_URL}/ro`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ro: `${BASE_URL}/ro`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          ro: `${BASE_URL}/ro`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ]
}
