import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Other Services',
  description: 'Additional healthcare services at Arif Medical & Dental Complex — physiotherapy, dietitian, vaccination, executive checkup, and more.',
}

const SERVICES = [
  { title: 'Executive & General Checkup', desc: 'Comprehensive health screening and routine check-ups for early detection and peace of mind.' },
  { title: 'Well Women Clinic',           desc: 'Dedicated health screening and care services designed for women at every stage of life.' },
  { title: 'Physiotherapy',              desc: 'Rehabilitation and movement therapy to restore strength, mobility, and function.' },
  { title: 'Dietitian',                  desc: 'Personalised nutrition counselling to support your health and wellness goals.' },
  { title: 'Vaccination',               desc: 'Routine and travel vaccinations for children and adults, administered safely.' },
  { title: 'Home Visits',               desc: 'Our doctor comes to your home for consultation and basic procedures.' },
  { title: 'Clinical Psychology',        desc: 'Mental health consultations with Dr. Gul-e-Raana, Consultant Clinical Psychologist.' },
  { title: 'Pharmacy',                  desc: 'Wide range of medicines available for purchase with guidance from our pharmacist.' },
]

export default function OtherServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Additional Services"
        title="Other Services"
        subtitle="A range of additional health and wellness services available at our complex."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Other Services' }]}
      />
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #0b6e6e', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+enquire+about+your+services" target="_blank" rel="noopener noreferrer" className="btn btn-red">Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
