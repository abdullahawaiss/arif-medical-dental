import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: '24 Hrs Services',
  description: 'Round-the-clock emergency and 24-hour services at Arif Medical & Dental Complex, Jinnah Garden, Islamabad.',
}

const SERVICES = [
  { title: 'Emergency Care',         desc: 'Immediate treatment for accidents, injuries, and acute medical events.' },
  { title: 'General Physician OPD',  desc: 'Dr. Jihad Ali available 24/7 for general medical consultations.' },
  { title: 'IV Drip & Injections',   desc: 'Round-the-clock IV therapy and injection administration.' },
  { title: 'Dressing & First Aid',   desc: 'Wound care, dressings, and minor procedures any time.' },
  { title: 'Pharmacy',               desc: 'Medicines available around the clock for patients.' },
  { title: 'ECG Monitoring',         desc: '24-hour ECG and cardiac monitoring when required.' },
  { title: 'Observation Ward',       desc: 'Short-stay monitoring for patients under observation.' },
  { title: 'WhatsApp Triage',        desc: 'Message us anytime — our team will guide you on what to do next.' },
]

export default function TwentyFourHourPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Always Open"
        title="24-Hour Services"
        subtitle="We are open around the clock — because emergencies don't keep office hours."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: '24 Hrs Services' }]}
      />

      {/* Emergency badge */}
      <section style={{ background: 'var(--red)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Open 24/7 — Including Weekends &amp; Holidays</p>
          <a href="tel:0515148373" style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.18)', borderRadius: 100, color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>Call 051 5148373</a>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #c45c00', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:0515148373" className="btn btn--outline-navy">Call 051 5148373</a>
            <a href="https://wa.me/923439282179?text=Hi%2C+I+need+urgent+help+" target="_blank" rel="noopener noreferrer" className="btn btn-red">WhatsApp Emergency</a>
          </div>
        </div>
      </section>
    </main>
  )
}
