'use client'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const BASE = 'https://www.arifmedicalanddental.com/img/'

const DOCTORS = [
  { name: 'Dr. Waqas Ahmad Rao',      specialty: 'Orthopedic Surgeon',           quals: 'MBBS, MS Orthopedic',                                       timing: 'Sun–Thu, 7:00 PM – 9:00 PM',   category: 'Surgical', img: BASE + 'img_1e815db6b83ae1ef7ba745b87b46b9ce.webp' },
  { name: 'Dr. Mehak Batool',          specialty: 'Dentist',                      quals: 'BDS, RDS',                                                  timing: 'Mon–Sat, 10:00 AM – 3:00 PM',  category: 'Dental',   img: BASE + 'img_56dc297c52d960c181a3413a4e9d191f.jpg'  },
  { name: 'Dr. Anum Sharif',           specialty: 'Skin Specialist',              quals: 'MBBS, MCPS (General Medicine), FCPS (Dermatology)',          timing: 'Mon–Thu, 7:00 PM – 9:00 PM',   category: 'Medical',  img: BASE + 'img_f859eba7bd22e3a8fc79782aa834c377.jpg'  },
  { name: 'Dr. Muhammad Usman',        specialty: 'Cardiologist',                 quals: 'MBBS, FCPS',                                                timing: 'Sat–Thu, 7:00 PM – 10:00 PM',  category: 'Medical',  img: BASE + 'img_d73be3e0b5f9f4bf91b2263905724148.jpg'  },
  { name: 'Dr. Inam Ullah',            specialty: 'General Surgeon',              quals: 'MBBS, FCPS',                                                timing: 'Mon–Sat, 7:00 PM – 9:30 PM',   category: 'Surgical', img: BASE + 'img_9d80ebf1a3103293dfb592d7ab3442fd.webp' },
  { name: 'LT. Col. Dr. Atia',         specialty: 'General Surgeon',              quals: 'MBBS, FCPS, MRCS, CHPE, FISR',                             timing: 'Mon–Thu, 4:00 PM – 7:00 PM',   category: 'Surgical', img: BASE + 'img_9426a9db276270d5923a9ce3d2a4310f.webp' },
  { name: 'Dr. Asad Shabbir',          specialty: 'Child Specialist',             quals: 'MBBS, FCPS, PGPN, CHPE, PhD',                              timing: 'Mon–Sat, 6:00 PM – 9:00 PM',   category: 'Medical',  img: BASE + 'img_8e8c5702b9740a547932052a68dec3f9.webp' },
  { name: 'Dr. Asad Ullah Khan',       specialty: 'ENT Specialist',               quals: 'MBBS, FCPS',                                                timing: 'Mon–Sat, 7:00 PM – 9:30 PM',   category: 'Surgical', img: BASE + 'img_dc394e6f02247bf6845cfccb4cb94863.webp' },
  { name: 'Dr. Jihad Ali',             specialty: 'General Physician',            quals: 'MBBS',                                                      timing: '24/7',                          category: 'Medical',  img: BASE + 'img_65cf8a4ac468c42de810c1cf9ec0e084.webp' },
  { name: 'Dr. Wajahat Shafi',         specialty: 'Medical Specialist',           quals: 'MBBS, FCPS',                                                timing: 'Sat–Thu, 7:00 PM – 10:00 PM',  category: 'Medical',  img: BASE + 'img_88aeb216981fa5d132b09476eaf2ac8e.webp' },
  { name: 'Dr. Gul-e-Raana',           specialty: 'Consultant Clinical Psychologist', quals: 'MS Clinical Psychology, PGDCP, ICTQual AB (UK)',       timing: 'Mon–Sat, On-Call',              category: 'Medical',  img: BASE + 'img_ac41c0370ebf01531a86d69750f72944.webp' },
  { name: 'Dr. Shams Haider',          specialty: 'Radiologist',                  quals: 'MBBS, MD, FCPS-II',                                         timing: 'Mon–Thu, 7:30 PM – 9:30 PM',   category: 'Medical',  img: BASE + 'img_e962ccdb8c49e679eab5c19302c482e6.webp' },
  { name: 'Dr. Sohaib Khalid',         specialty: 'Urologist',                    quals: 'MBBS, FCPS',                                                timing: 'Mon–Fri, 7:30 PM – 9:30 PM',   category: 'Surgical', img: BASE + 'img_e426bc0a11aebfd47d2383d550dbdb09.webp' },
  { name: 'Dr. Kishwar Aamir',         specialty: 'Gynaecologist',                quals: '',                                                          timing: 'Mon–Sat, 10:00 AM – 2:00 PM',  category: 'Surgical', img: BASE + 'img_b5c3913c8c305e1594f9bc5d379ff07f.webp' },
  { name: 'Dr. Abdullah Bin Khurram',  specialty: 'Pulmonologist',                quals: '',                                                          timing: 'By Appointment',                category: 'Medical',  img: BASE + 'img_5b8a84b51647d35db16e71c722da63b7.webp' },
]

const TABS = [
  { label: 'All',      count: 15, value: 'All'     },
  { label: 'Medical',  count: 8,  value: 'Medical'  },
  { label: 'Dental',   count: 1,  value: 'Dental'   },
  { label: 'Surgical', count: 6,  value: 'Surgical' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Medical:  '#2563eb',
  Dental:   '#000b35',
  Surgical: '#dc2626',
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function DoctorsPage() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = DOCTORS
    .filter(d => active === 'All' || d.category === active)
    .filter(d => !search.trim() || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <PageHeader
        eyebrow="Our Team"
        title="Meet Our Doctors"
        subtitle="Experienced specialists across general medicine, dentistry and surgery — all under one roof in Jinnah Garden, Islamabad."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Doctors' }]}
      />

      <section style={{ background: 'var(--white)', padding: '64px 0 80px' }}>
        <div className="container">

          {/* Search bar */}
          <div style={{ maxWidth: 520, margin: '0 auto 28px', position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'var(--muted-2)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search doctor by name or specialty…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 16px 13px 46px',
                border: '2px solid var(--line)',
                borderRadius: 12,
                fontSize: '0.95rem',
                color: 'var(--ink)',
                background: 'var(--white)',
                outline: 'none',
                fontFamily: 'inherit',
                boxShadow: '0 2px 8px rgba(21,37,64,.06)',
                transition: 'border-color .2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-2)', fontSize: 18, lineHeight: 1,
              }}>×</button>
            )}
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
            {TABS.map(t => (
              <button
                key={t.value}
                onClick={() => setActive(t.value)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 100,
                  border: active === t.value ? '2px solid var(--navy)' : '2px solid var(--line)',
                  background: active === t.value ? 'var(--navy)' : 'transparent',
                  color: active === t.value ? '#fff' : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all .18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                {t.label}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22, height: 22,
                  borderRadius: '50%',
                  background: active === t.value ? 'rgba(255,255,255,.2)' : 'var(--paper)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: active === t.value ? '#fff' : 'var(--muted)',
                }}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
              <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--navy)', marginBottom: 6 }}>No doctors found</p>
              <p style={{ fontSize: '0.88rem' }}>Try a different name or specialty</p>
            </div>
          )}

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {filtered.map(doc => (
              <div key={doc.name} className="card" style={{ overflow: 'hidden', borderRadius: 16, padding: 0, transition: 'box-shadow .2s, transform .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(21,37,64,.14)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
              >
                {/* Photo */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'var(--paper)', overflow: 'hidden' }}>
                  <img
                    src={doc.img}
                    alt={`${doc.name} — ${doc.specialty}`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  />
                  {/* Category badge */}
                  <span style={{
                    position: 'absolute', top: 12, right: 12,
                    background: CATEGORY_COLORS[doc.category] || 'var(--navy)',
                    color: '#fff',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 100,
                  }}>
                    {doc.category}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: '20px 22px 22px' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 4, lineHeight: 1.2 }}>
                    {doc.name}
                  </p>
                  <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--red)', marginBottom: doc.quals ? 8 : 10 }}>
                    {doc.specialty}
                  </p>
                  {doc.quals && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>
                      {doc.quals}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted-2)', fontSize: '0.8rem' }}>
                    <ClockIcon />
                    <span>{doc.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 56, textAlign: 'center', padding: '44px 28px', borderRadius: 16, background: 'var(--navy)' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#fff', marginBottom: 8 }}>
              Book an appointment with our specialists
            </p>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '0.9rem', marginBottom: 24 }}>
              Call or WhatsApp us to confirm your doctor&apos;s availability.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment." target="_blank" rel="noopener noreferrer" className="btn btn-red">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book via WhatsApp
              </a>
              <a href="tel:0515148373" className="btn btn--outline-white">
                Call 051 5148373
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
