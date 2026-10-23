import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Arif Medical & Dental Complex — a trusted clinic in Jinnah Garden, Islamabad offering general medical and complete dental care under one roof.',
}

const FEATURES = [
  { num: '01', title: 'Qualified Practitioners', desc: 'Experienced medical & dental professionals with postgraduate qualifications.' },
  { num: '02', title: 'Clean & Modern Clinic',   desc: 'Hygienic, well-equipped treatment rooms maintained to proper standards.' },
  { num: '03', title: 'Family Friendly',          desc: 'Compassionate care for every age group — children, adults and seniors.' },
  { num: '04', title: 'Easy to Reach',            desc: 'Located in Phase 1, Jinnah Garden — call or WhatsApp anytime.' },
]

const VALUES = [
  {
    title: 'Patient-First',
    desc: 'Clear communication, honest advice, and treatment plans built around your needs and comfort.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Hygiene & Safety',
    desc: 'Sterilised instruments and clean treatment rooms maintained to proper medical standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Accessible Care',
    desc: 'Affordable, walk-in-friendly treatment so healthcare is never out of reach for local families.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 28, height: 28 }}>
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Who We Are"
        title="About Arif Medical & Dental Complex"
        subtitle="A trusted medical and dental clinic in Jinnah Garden — built to make quality healthcare simple, close to home, and family-friendly."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Who We Are */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 56, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', boxShadow: '0 20px 56px rgba(21,37,64,.16)' }}>
                <Image src="https://www.arifmedicalanddental.com/images/front.webp" alt="Arif Medical & Dental Complex — clinic entrance in Jinnah Garden, Islamabad" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized />
              </div>
              <div style={{ position: 'absolute', bottom: -16, right: -16, background: 'var(--navy)', borderRadius: 12, padding: '18px 24px', boxShadow: '0 12px 32px rgba(21,37,64,.3)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>15+</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Specialists</p>
              </div>
            </div>

            <div>
              <p className="eyebrow">Complete Care, Under One Roof</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,2.8vw,2.2rem)', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.18, marginBottom: 16 }}>
                Medical &amp; Dental Care,<br />All in One Place
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.82, marginBottom: 14, fontSize: '0.95rem' }}>
                Arif Medical &amp; Dental Complex was built to make quality healthcare simple and accessible for the local community — offering general medical consultations alongside complete dental treatment in one welcoming clinic.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.82, marginBottom: 32, fontSize: '0.95rem' }}>
                Our team focuses on attentive, patient-first care in a clean, well-equipped environment, so you and your family can get the treatment you need without running between different clinics.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {FEATURES.map(f => (
                  <div key={f.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'rgba(181,18,45,0.2)', lineHeight: 1, flexShrink: 0, minWidth: 28 }}>{f.num}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 2 }}>{f.title}</p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.55 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment" target="_blank" rel="noopener noreferrer" className="btn btn-red" style={{ display: 'inline-flex' }}>Book an Appointment</a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '72px 0', background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Our Values</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: 'var(--navy)' }}>What Guides Our Care</h2>
            <p style={{ color: 'var(--muted)', marginTop: 10, maxWidth: 500, margin: '10px auto 0' }}>The principles that shape every consultation and treatment at our complex.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, marginTop: 48 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: 'var(--white)', borderRadius: 16, padding: '32px 28px', border: '1px solid var(--line)', boxShadow: '0 4px 16px rgba(21,37,64,.06)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--navy-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)', marginBottom: 18 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Have a question?</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: '#fff', marginBottom: 10 }}>Message us on WhatsApp</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>We&apos;re happy to help with any questions about our services or team.</p>
          <a href="https://wa.me/923439282179" target="_blank" rel="noopener noreferrer" className="btn btn-red">WhatsApp Us</a>
        </div>
      </section>
    </main>
  )
}
