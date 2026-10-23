'use client'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const JOBS = [
  {
    title: 'Dental Assistant',
    dept: 'Dental Team',
    type: 'Full-time',
    location: 'Jinnah Garden',
    desc: 'Supports the dental team with chair-side assistance, sterilisation, and patient care. Prior clinic experience is preferred.',
  },
  {
    title: 'Front Desk Receptionist',
    dept: 'Administration',
    type: 'Full-time',
    location: 'Jinnah Garden',
    desc: 'Greets patients, manages appointments, and handles calls and WhatsApp enquiries. The role calls for someone friendly and organised who is fluent in Urdu and English.',
  },
]

const POSITIONS = [
  'Dental Assistant',
  'Front Desk Receptionist',
  'General Physician',
  'Nurse / Ward Staff',
  'Medical Technician (Lab)',
  'Radiologist / X-Ray Tech',
  'Pharmacist',
  'Cleaning / Support Staff',
  'Other / Open Application',
]

const PERKS = [
  { icon: '🏥', title: 'Professional Environment', desc: 'Work in a modern, hygienic, well-maintained clinic.' },
  { icon: '📈', title: 'Growth Opportunities', desc: 'Learn and grow alongside experienced practitioners.' },
  { icon: '🤝', title: 'Supportive Team', desc: 'Join a friendly team that values every member.' },
  { icon: '📍', title: 'Prime Location', desc: 'Easy to reach in Phase 1, Jinnah Garden, Islamabad.' },
]

function WaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function CareersPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', position: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pos = form.position || 'Open Application'
    const msg = encodeURIComponent(
      `Hi, I am ${form.name} and I would like to apply for the position of: *${pos}*.\n\n` +
      `📞 Phone: ${form.phone}\n` +
      `📧 Email: ${form.email}\n\n` +
      (form.message ? `About me: ${form.message}\n\n` : '') +
      `I will attach my CV in this chat. Please let me know the next steps. Thank you!`
    )
    window.open(`https://wa.me/923439282179?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const inp = (field: keyof typeof form) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value })),
  })

  return (
    <main>
      <PageHeader
        eyebrow="Join Our Team"
        title="Build Your Career With Us"
        subtitle="We are always glad to hear from caring, qualified professionals who want to make a real difference in patient care."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      />

      {/* ── CV Upload / Apply Section ── MAIN FOCUS ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* BG decoration */}
        <div style={{ position: 'absolute', top: -120, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,22,52,.2) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

            {/* Left: Info */}
            <div>
              <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 16 }}>
                <span style={{ width: 28, height: 2, background: 'var(--red)', display: 'inline-block' }} />
                Apply Now
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                Send Your CV and Join Our Team
              </h2>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.97rem', lineHeight: 1.8, marginBottom: 36 }}>
                Fill the form and we will reach out to you. Attach your CV directly in WhatsApp after submission — we review every application and reply within 2–3 days.
              </p>

              {/* Perks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {PERKS.map(p => (
                  <div key={p.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {p.icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '.9rem', color: '#fff', marginBottom: 3 }}>{p.title}</p>
                      <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ padding: '36px 0' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: 10 }}>Application Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.9rem', lineHeight: 1.7 }}>
                    WhatsApp has opened. Please attach your CV there and we will get back to you within 2–3 days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: 4 }}>
                    Apply for a Position
                  </h3>
                  <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', marginBottom: 8 }}>
                    Fill in your details and we will contact you on WhatsApp.
                  </p>

                  <div className="cv-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={labelStyle}>Full Name *</label>
                      <input required placeholder="Your full name" style={inputStyle} {...inp('name')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={labelStyle}>Phone / WhatsApp *</label>
                      <input required type="tel" placeholder="03XX-XXXXXXX" style={inputStyle} {...inp('phone')} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" placeholder="your@email.com" style={inputStyle} {...inp('email')} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={labelStyle}>Position You Are Applying For *</label>
                    <select required style={{ ...inputStyle, cursor: 'pointer', background: 'var(--navy)', colorScheme: 'dark' }} {...inp('position')}>
                      <option value="">Select a position…</option>
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={labelStyle}>Brief Introduction</label>
                    <textarea
                      placeholder="Tell us a little about yourself, your experience, and why you want to join us…"
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      {...inp('message')}
                    />
                  </div>

                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.6 }}>
                    * After clicking Apply, WhatsApp will open. Please attach your CV file there as well.
                  </p>

                  <button type="submit" className="btn btn-red" style={{ justifyContent: 'center', fontSize: '1rem', padding: '14px', marginTop: 4 }}>
                    <WaIcon size={18} /> Apply on WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section style={{ background: 'var(--white)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ marginBottom: 40 }}>
            <p className="eyebrow">Open Roles</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Current Openings</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.75 }}>
              Apply for an open role directly via WhatsApp. We review every application and get back within a few days.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {JOBS.map(job => (
              <div key={job.title} style={{ borderBottom: '1px solid var(--line)', padding: '26px 0', background: 'var(--white)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={badgeStyle('#edf2f8', 'var(--navy)')}>{job.dept}</span>
                      <span style={badgeStyle('rgba(196,22,52,.07)', 'var(--red)')}>{job.type}</span>
                      <span style={badgeStyle('rgba(21,37,64,.04)', 'var(--muted-2)')}>📍 {job.location}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+apply+for+the+${encodeURIComponent(job.title)}+position.`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-red btn-sm" style={{ flexShrink: 0 }}
                  >
                    <WaIcon size={14} /> Apply Now
                  </a>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.72 }}>{job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        input, select, textarea {
          transition: border-color .2s, box-shadow .2s;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-bottom-color: var(--red) !important;
          box-shadow: none !important;
        }
        @media (max-width: 720px) {
          .cv-grid { grid-template-columns: 1fr !important; }
          .cv-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.55)', letterSpacing: '.04em',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 2px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,.2)',
  borderRadius: 0, fontSize: 14, color: '#fff',
  fontFamily: 'var(--font-sans)',
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  fontSize: 11, fontWeight: 700, padding: '3px 10px',
  borderRadius: 100, background: bg, color,
})
