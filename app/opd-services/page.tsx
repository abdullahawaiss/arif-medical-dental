import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'OPD Services',
  description: 'Walk-in and scheduled outpatient consultations at Arif Medical & Dental Complex — medical, dental, surgical and specialist care with no admission required.',
}

const SERVICES = [
  { title: 'Dental Care & Aesthetics',   desc: 'Teeth treatment and smile beautification' },
  { title: 'Pediatric Care',             desc: 'Medical care for babies and children' },
  { title: 'Medical Specialties',        desc: 'Expert doctors for different body conditions' },
  { title: 'Urology',                    desc: 'Treatment for kidney, bladder, and urinary problems' },
  { title: 'Pulmonology',               desc: 'Care for lung and breathing problems' },
  { title: 'Orthopedic',                desc: 'Treatment for bones, joints, and muscles' },
  { title: 'Skin Care & Specialities',   desc: 'Treatment for skin problems and beauty' },
  { title: 'Radiology',                 desc: 'X-rays and scans to see inside body' },
  { title: 'Laparoscopic Surgery',       desc: 'Small-cut surgery with faster recovery' },
  { title: 'Home Visits & Patient Care', desc: 'Doctor comes to treat you at home' },
  { title: 'ENT Specialties',           desc: 'Care for ear, nose, and throat' },
  { title: 'Trauma Management & Emergency', desc: 'Urgent care for injuries and emergencies' },
  { title: 'Pharmacy',                  desc: 'Medicines available for purchase and guidance' },
  { title: 'Optic Care',               desc: 'Eye checkups and vision treatment' },
  { title: 'Executive & General Checkup', desc: 'Comprehensive health screening and routine check-ups' },
  { title: 'Well Women Clinic',          desc: 'Dedicated health screening and care services for women' },
  { title: 'Physiotherapy',             desc: 'Rehabilitation and movement therapy' },
  { title: 'Dietitian',                desc: 'Personalised nutrition counselling' },
  { title: 'Vaccination',              desc: 'Routine and travel vaccinations for all ages' },
]

export default function OpdServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="OPD Services"
        title="Outpatient Services"
        subtitle="Walk-in and scheduled outpatient consultations across our medical and dental specialities — no admission required."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'OPD Services' }]}
      />
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #0b6e4f', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+enquire+about+OPD+Services" target="_blank" rel="noopener noreferrer" className="btn btn-red">Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
