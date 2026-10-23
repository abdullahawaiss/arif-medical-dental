import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Laboratory',
  description: 'Diagnostic laboratory services at Arif Medical & Dental Complex — blood tests, urine analysis, cultures, and more in Jinnah Garden, Islamabad.',
}

const TESTS = [
  { title: 'Complete Blood Count (CBC)',  desc: 'Full blood panel including red cells, white cells, and platelets.' },
  { title: 'Blood Glucose',               desc: 'Fasting, random, and HbA1c testing for diabetes management.' },
  { title: 'Lipid Profile',              desc: 'Cholesterol, triglycerides, HDL, and LDL levels.' },
  { title: 'Liver Function Tests (LFTs)', desc: 'Assessment of liver enzymes and overall liver health.' },
  { title: 'Kidney Function Tests (KFTs)',desc: 'Creatinine, urea, and electrolytes for kidney assessment.' },
  { title: 'Thyroid Profile',            desc: 'TSH, T3, and T4 hormones for thyroid evaluation.' },
  { title: 'Urine Analysis',             desc: 'Routine urine examination and culture if required.' },
  { title: 'Culture & Sensitivity',      desc: 'Identification of infection-causing organisms.' },
  { title: 'ECG',                        desc: 'Electrocardiogram for heart rhythm and activity.' },
  { title: 'Serology & Virology',        desc: 'Hepatitis B/C, HIV, dengue, typhoid, and other markers.' },
  { title: 'Pregnancy Test',             desc: 'Urine and blood pregnancy confirmation.' },
  { title: 'Other Pathology Tests',      desc: 'Additional tests available — ask our team for details.' },
]

export default function LaboratoryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Diagnostics"
        title="Laboratory Services"
        subtitle="Accurate and timely diagnostic lab tests in our in-house laboratory — results available same day for most tests."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Laboratory' }]}
      />
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {TESTS.map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '22px 20px', border: '1px solid var(--line)', borderTop: '3px solid #6b3fa0', boxShadow: '0 2px 10px rgba(21,37,64,.05)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+enquire+about+Lab+tests" target="_blank" rel="noopener noreferrer" className="btn btn-red">Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
