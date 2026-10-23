import { MetadataRoute } from 'next'

const BASE = 'https://arifmedicalanddental.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/specialists', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/doctors', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/opd-services', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ipd-services', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/laboratory', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/radiology', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/24-hour-services', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/other-services', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/gallery', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/careers', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.85, changeFrequency: 'monthly' as const },
  ]

  return routes.map(r => ({
    url: `${BASE}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
