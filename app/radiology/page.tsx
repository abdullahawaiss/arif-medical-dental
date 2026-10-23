import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Radiology',
  description: 'Radiology and imaging services at Arif Medical & Dental Complex — X-rays, ultrasound, and diagnostic scans in Jinnah Garden, Islamabad.',
}

const SERVICES = [
  { title: 'X-Ray',           desc: 'Digital X-ray for bones, chest, and other structures.' },
  { title: 'Ultrasound',      desc: 'Abdominal, pelvic, and obstetric ultrasound scanning.' },
  { title: 'Dental X-Ray',    desc: 'Periapical and OPG dental imaging.' },
  { title: 'ECG',             desc: 'Electrocardiogram for cardiac assessment.' },
  { title: 'Doppler Studies', desc: 'Blood flow assessment using Doppler ultrasound.' },
  { title: 'Consultation',    desc: 'Radiology report interpretation by Dr. Shams Haider (MBBS, MD, FCPS-II).' },
]

export default function RadiologyPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Imaging"
        title="Radiology Services"
        subtitle="X-rays and diagnostic scans to support accurate diagnosis — reported by our consultant radiologist."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Radiology' }]}
      />
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #b5122d', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+a+radiology+scan" target="_blank" rel="noopener noreferrer" className="btn btn-red">Book on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
