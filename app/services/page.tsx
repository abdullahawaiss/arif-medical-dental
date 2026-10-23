'use client'
import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'

const SERVICES = [
  {
    icon: '🏥',
    color: '#0b6e4f',
    title: 'OPD Services',
    tagline: 'Walk-in & Scheduled',
    desc: 'Out-patient consultations with experienced doctors across all major specialties. Get proper diagnosis, treatment plans and prescriptions at affordable rates.',
    features: ['General Medicine', 'Specialist Consultations', 'Follow-up Care', 'Prescription Services'],
  },
  {
    icon: '🛏️',
    color: '#0b4e8f',
    title: 'IPD Services',
    tagline: 'In-Patient Care',
    desc: 'In-patient ward facilities for patients who require admission, overnight stay, monitoring, and round-the-clock medical care by our dedicated nursing and doctor teams.',
    features: ['Patient Admission', 'Round-the-Clock Nursing', 'Doctor Rounds', 'Monitoring & Care'],
  },
  {
    icon: '🔬',
    color: '#6b3fa0',
    title: 'Laboratory',
    tagline: 'Fast & Accurate',
    desc: 'Full in-house pathology laboratory with fast turnaround on blood tests, urinalysis, lipid panels, glucose, CBC and a complete range of diagnostic panels.',
    features: ['Blood Tests & CBC', 'Urine Analysis', 'Lipid Profile', 'Blood Sugar & HbA1c'],
  },
  {
    icon: '📡',
    color: '#b5122d',
    title: 'Radiology',
    tagline: 'Same-Day Reports',
    desc: 'On-site diagnostic imaging including digital X-Ray and Ultrasound by trained radiologists, with same-day digital reports for rapid clinical decision-making.',
    features: ['Digital X-Ray', 'Abdominal Ultrasound', 'Pelvic & Obstetric Scan', 'Same-day Reports'],
  },
  {
    icon: '🚨',
    color: '#c45c00',
    title: '24 Hrs Services',
    tagline: 'Always Available',
    desc: 'Our emergency unit is always open and fully staffed around the clock, ready to respond immediately to any urgent medical situation — 365 days a year.',
    features: ['24/7 Coverage', 'Trained Emergency Staff', 'Rapid Assessment', 'Stabilization & Transfer'],
  },
  {
    icon: '➕',
    color: '#0b6e6e',
    title: 'Other Services',
    tagline: 'Full-Spectrum Care',
    desc: 'Additional services include an on-site pharmacy stocking all prescription and OTC medicines, a fully-equipped operation theater, and comprehensive dental care.',
    features: ['On-site Pharmacy', 'Operation Theater', 'Dental Care', 'Specialist Referrals'],
  },
]

function ServiceCard({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('svc-card-in')
        io.disconnect()
      }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${cx * 10}deg) rotateX(${-cy * 8}deg) translateY(-6px)`
    el.style.boxShadow = `${-cx * 12}px ${cy * 12 + 20}px 40px rgba(21,37,64,0.2)`
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={cardRef}
      className="svc-page-card"
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Top color strip */}
      <div className="svc-strip" style={{ background: s.color }} />

      {/* Icon */}
      <div style={{
        width: 60, height: 60, borderRadius: 14,
        background: `${s.color}18`,
        border: `1.5px solid ${s.color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 18, transition: 'transform .4s ease',
      }} className="svc-icon">
        {s.icon}
      </div>

      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color, marginBottom: 6, display: 'block' }}>
        {s.tagline}
      </span>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 12 }}>
        {s.title}
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.78, marginBottom: 20, flex: 1 }}>
        {s.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {s.features.map(f => (
          <span key={f} style={{
            fontSize: 11, fontWeight: 600, padding: '4px 11px', borderRadius: 20,
            background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}25`,
          }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="What We Offer"
        title="Our Services"
        subtitle="Comprehensive healthcare under one roof — from OPD and IPD to laboratory, radiology, 24-hour emergency, and more."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

        {/* Services grid */}
        <section style={{ background: 'var(--white)', padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
              {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontWeight: 600, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
              Ready to Book an Appointment?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 28, fontSize: '0.97rem' }}>
              Contact us via WhatsApp or call to schedule with any of our specialists.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment." target="_blank" rel="noopener noreferrer" className="btn btn-red">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a href="tel:0515148373" className="btn btn-outline-white">Call 051-5148373</a>
            </div>
          </div>
      </section>

      <style>{`
          .svc-page-card {
            background: var(--white);
            border: 1.5px solid var(--line);
            border-radius: 20px;
            padding: 0 0 28px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform .4s ease, box-shadow .4s ease;
            opacity: 0;
            transform: translateY(40px);
          }
          .svc-page-card.svc-card-in { opacity: 1; transform: translateY(0); transition: opacity .65s ease, transform .65s ease, box-shadow .4s ease; }
          .svc-strip { height: 4px; width: 100%; margin-bottom: 24px; transition: height .3s ease; }
          .svc-page-card:hover .svc-strip { height: 6px; }
          .svc-page-card > * { padding-left: 24px; padding-right: 24px; }
          .svc-page-card > .svc-strip { padding: 0; }
          .svc-page-card:hover .svc-icon { transform: scale(1.12) rotate(-4deg); }
      `}</style>
    </main>
  )
}
