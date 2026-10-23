import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'IPD Services',
  description: 'Inpatient Department services at Arif Medical & Dental Complex — admitted care, surgical procedures, and round-the-clock monitoring.',
}

const SERVICES = [
  { title: 'Medical Admissions',    desc: 'Supervised inpatient care for medical conditions requiring monitoring.' },
  { title: 'Surgical Procedures',   desc: 'Planned and emergency surgical operations by our specialist surgeons.' },
  { title: 'Post-Op Recovery',      desc: 'Close monitoring and care following surgical procedures.' },
  { title: 'ICU / Critical Care',   desc: 'Intensive care for seriously ill patients requiring constant attention.' },
  { title: 'Maternity & Gynaecology', desc: 'Inpatient care for women during pregnancy, delivery, and post-partum.' },
  { title: 'Paediatric Admission',  desc: 'Inpatient treatment and monitoring for children and infants.' },
  { title: 'Orthopaedic Admission', desc: 'Surgical and non-surgical management of bone and joint conditions.' },
  { title: 'IV Infusion Therapy',   desc: 'Controlled intravenous medication and fluid therapy.' },
]

export default function IpdServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="IPD Services"
        title="Inpatient Services"
        subtitle="Admitted care with round-the-clock monitoring by our experienced medical and surgical team."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'IPD Services' }]}
      />
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #0b4e8f', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+enquire+about+IPD+Services" target="_blank" rel="noopener noreferrer" className="btn btn-red">Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
