import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import RevealInit from './components/RevealInit'
import DemoAlert from './components/DemoAlert'

export const metadata: Metadata = {
  metadataBase: new URL('https://arifmedicalanddental.com'),
  title: {
    default: 'Arif Medical & Dental Complex | Jinnah Garden, Islamabad',
    template: '%s | Arif Medical & Dental Complex',
  },
  description:
    'Premium medical and dental care in Jinnah Garden, Islamabad. 15+ specialist doctors, 24/7 emergency, OPD, IPD, Lab & Radiology. Book appointment via WhatsApp.',
  keywords: [
    'Arif Medical Dental Complex',
    'hospital Jinnah Garden Islamabad',
    'dentist Islamabad',
    'medical clinic Islamabad',
    'doctor Jinnah Garden',
    'emergency hospital Islamabad',
    '24 hour clinic Islamabad',
    'specialist doctors Islamabad',
    'dental clinic Islamabad',
    'OPD Islamabad',
  ],
  authors: [{ name: 'Arif Medical & Dental Complex' }],
  creator: 'Arif Medical & Dental Complex',
  publisher: 'Arif Medical & Dental Complex',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://arifmedicalanddental.com',
    siteName: 'Arif Medical & Dental Complex',
    title: 'Arif Medical & Dental Complex | Jinnah Garden, Islamabad',
    description:
      'Complete medical & dental care under one roof. 15+ specialists, 24/7 emergency, Jinnah Garden Islamabad.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Arif Medical & Dental Complex' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arif Medical & Dental Complex | Islamabad',
    description: 'Complete medical & dental care under one roof. Jinnah Garden, Islamabad.',
  },
  icons: {
    icon: [
      { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230b2545'/%3E%3Cpath d='M32 18v28M18 32h28' stroke='%23b5122d' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E", type: 'image/svg+xml' },
    ],
    apple: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230b2545'/%3E%3Cpath d='M32 18v28M18 32h28' stroke='%23b5122d' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E",
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://arifmedicalanddental.com',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020814',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230b2545'/%3E%3Cpath d='M32 18v28M18 32h28' stroke='%23b5122d' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Jost = headings (NEUTRA-style geometric), DM Sans = body (CERA PRO-style) */}
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalClinic',
              name: 'Arif Medical & Dental Complex',
              description:
                'Providing premium healthcare & advanced dental services in the heart of Jinnah Garden, Islamabad.',
              url: 'https://arifmedicalanddental.com',
              telephone: '051-5148373',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Plaza 8c, Street 60, Near Masjid Noor-e-Mustafa',
                addressLocality: 'Jinnah Garden, Islamabad',
                addressCountry: 'PK',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 33.6844,
                longitude: 73.0479,
              },
              openingHours: 'Mo-Sa 11:00-20:00',
              medicalSpecialty: ['General Practice', 'Dentistry', 'Surgery', 'Cardiology', 'Orthopedics'],
              hasMap: 'https://maps.google.com/?q=Arif+Medical+Dental+Complex+Jinnah+Garden+Islamabad',
              sameAs: ['https://www.facebook.com/people/Arif-Medical-And-Dental-Complex/61572566256803/'],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ScrollProgress />
        <RevealInit />
        <DemoAlert />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
