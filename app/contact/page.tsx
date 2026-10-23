'use client'
import { useState } from 'react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const CONTACT_CARDS = [
  {
    icon: <Phone style={{ width: 22, height: 22 }} />,
    color: 'var(--navy)',
    colorBg: 'var(--navy-tint)',
    label: 'Phone',
    lines: [
      <a key="p1" href="tel:0515148373" style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', display: 'block', marginBottom: 4 }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--navy)')}>051-5148373</a>,
      <a key="p2" href="tel:03439282179" style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', display: 'block' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--navy)')}>0343-9282179</a>,
    ],
  },
  {
    icon: <MapPin style={{ width: 22, height: 22 }} />,
    color: 'var(--navy)',
    colorBg: 'var(--navy-tint)',
    label: 'Address',
    lines: [
      <p key="a1" style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.65 }}>
        Street 60, near Noor-E-Mustafa Masjid<br />
        Jinnah Gardens, Phase 1, Islamabad
      </p>,
    ],
  },
  {
    icon: <Clock style={{ width: 22, height: 22 }} />,
    color: '#16a34a',
    colorBg: 'rgba(22,163,74,.08)',
    label: 'Hours',
    lines: [
      <div key="h1">
        <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', marginBottom: 4 }}>Monday – Saturday</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#16a34a' }}>11:00 AM – 8:00 PM</p>
        <p style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 4 }}>Closed on Sundays and Public Holidays</p>
      </div>,
    ],
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', dept: '', date: '', msg: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hi, I would like to book an appointment.\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\n` +
      (form.dept ? `Department: ${form.dept}\n` : '') +
      (form.date ? `Preferred Date: ${form.date}\n` : '') +
      (form.msg ? `\nMessage: ${form.msg}` : '')
    )
    window.open(`https://wa.me/923439282179?text=${text}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const inp = (f: keyof typeof form) => ({
    value: form[f],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [f]: e.target.value })),
  })

  return (
    <main style={{ background: 'var(--white)' }}>

      {/* ── Hero ── */}
      <section className="ct-hero">
        {/* Real hospital reception / hallway photo */}
        <div className="ct-hero-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=2400&q=90&auto=format&fit=crop&crop=center')` }}/>
        <div className="ct-hero-overlay"/>
        {/* Dot grid */}
        <div className="ct-hero-grid"/>
        {/* Red orb */}
        <div className="ct-hero-orb"/>

        <div className="container ct-hero-inner">
          {/* Lower-third accent (21st.dev style) */}
          <div className="ct-lt-bar">
            <span className="ct-lt-line"/>
            <span className="ct-lt-text">GET IN TOUCH · JINNAH GARDEN, ISLAMABAD</span>
          </div>

          {/* Animated headline words pop in */}
          <h1 className="ct-hero-h1">
            <span className="ct-w" style={{animationDelay:'.08s'}}>We&apos;re</span>{' '}
            <span className="ct-w" style={{animationDelay:'.18s'}}>Here</span>{' '}
            <span className="ct-w ct-w-red" style={{animationDelay:'.28s'}}>For&nbsp;You</span>
          </h1>

          <p className="ct-hero-sub">
            Walk in or book ahead — Mon–Sat, 11 AM to 8 PM.<br/>
            Our team responds within minutes on WhatsApp.
          </p>

          {/* CTA row */}
          <div className="ct-hero-ctas">
            <a href="tel:0515148373" className="ct-btn-outline">
              <Phone style={{width:14,height:14,flexShrink:0}}/> 051-5148373
            </a>
            <a href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment." target="_blank" rel="noopener noreferrer" className="ct-btn-red">
              <WaIcon size={14}/> Book on WhatsApp
              <span className="ct-shine"/>
            </a>
          </div>

          {/* Floating info chips */}
          <div className="ct-chips">
            <span className="ct-chip"><span style={{width:7,height:7,borderRadius:'50%',background:'#22c55e',display:'inline-block',flexShrink:0}}/>Open Now · Mon–Sat</span>
            <span className="ct-chip">📍 Jinnah Garden Phase 1</span>
            <span className="ct-chip">⚡ Emergency 24/7</span>
          </div>
        </div>

        <style>{`
          @keyframes ctWordPop {
            from{opacity:0;transform:translateY(24px) scale(.94)}
            to{opacity:1;transform:translateY(0) scale(1)}
          }
          @keyframes ctLtSlide {
            from{opacity:0;transform:translateX(-14px)}
            to{opacity:1;transform:translateX(0)}
          }
          @keyframes ctLineGrow {
            from{width:0}to{width:100%}
          }
          @keyframes ctChipIn {
            from{opacity:0;transform:translateY(10px)}
            to{opacity:1;transform:translateY(0)}
          }
          @keyframes ctShine {
            0%{left:-100%}40%{left:140%}100%{left:140%}
          }
          @keyframes ctBgPan {
            from{transform:scale(1.05) translateX(0)}
            to{transform:scale(1.08) translateX(1%)}
          }
          .ct-hero {
            position:relative;height:480px;display:flex;align-items:center;
            overflow:hidden;isolation:isolate;
          }
          .ct-hero-bg {
            position:absolute;inset:-6%;z-index:0;
            background-size:cover;background-position:center;
            animation:ctBgPan 18s ease-in-out infinite alternate;
            filter:saturate(.85);
          }
          .ct-hero-overlay {
            position:absolute;inset:0;z-index:1;
            background:linear-gradient(118deg,rgba(21,37,64,.93) 0%,rgba(21,37,64,.76) 55%,rgba(21,37,64,.52) 100%);
          }
          .ct-hero-grid { display:none; }
          .ct-hero-orb {
            position:absolute;top:-120px;right:-100px;z-index:2;
            width:440px;height:440px;border-radius:50%;
            background:radial-gradient(circle,rgba(196,22,52,.22) 0%,transparent 60%);
            filter:blur(70px);pointer-events:none;
          }
          .ct-hero-inner {
            position:relative;z-index:3;padding:80px 28px 60px;width:100%;
          }
          /* Lower-third accent */
          .ct-lt-bar {
            display:flex;align-items:center;gap:10px;margin-bottom:22px;
            animation:ctLtSlide .55s cubic-bezier(.22,1,.36,1) both;
          }
          .ct-lt-line {
            display:block;width:28px;height:2.5px;border-radius:2px;
            background:var(--red);flex-shrink:0;
            animation:ctLineGrow .5s ease .1s both;
          }
          .ct-lt-text {
            font-size:10px;font-weight:700;letter-spacing:.22em;
            text-transform:uppercase;color:rgba(255,255,255,.42);
          }
          .ct-hero-h1 {
            font-family:var(--font-serif);
            font-size:clamp(2.4rem,5vw,4rem);
            font-weight:300;letter-spacing:.02em;
            color:#fff;line-height:1.08;margin:0 0 20px;
          }
          .ct-w {
            display:inline-block;
            animation:ctWordPop .6s cubic-bezier(.22,1,.36,1) both;
          }
          .ct-w-red { color:var(--red) }
          .ct-hero-sub {
            color:rgba(255,255,255,.6);font-size:1rem;line-height:1.8;
            max-width:500px;margin:0 0 30px;
            animation:ctWordPop .6s cubic-bezier(.22,1,.36,1) .4s both;
          }
          .ct-hero-ctas {
            display:flex;flex-wrap:wrap;gap:12px;margin-bottom:28px;
            animation:ctWordPop .6s cubic-bezier(.22,1,.36,1) .5s both;
          }
          .ct-btn-red,.ct-btn-outline {
            display:inline-flex;align-items:center;gap:8px;
            padding:12px 22px;border-radius:9px;font-size:.88rem;
            font-weight:700;cursor:pointer;text-decoration:none;
            position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;
          }
          .ct-btn-red:hover,.ct-btn-outline:hover{transform:translateY(-2px)}
          .ct-btn-red {
            background:var(--red);color:#fff;
            box-shadow:0 4px 18px rgba(196,22,52,.38);
          }
          .ct-btn-red:hover{box-shadow:0 8px 28px rgba(196,22,52,.55)}
          .ct-shine {
            position:absolute;top:0;left:-100%;width:55%;height:100%;
            background:linear-gradient(120deg,transparent,rgba(255,255,255,.25),transparent);
            animation:ctShine 3.5s ease-in-out infinite 1s;
          }
          .ct-btn-outline {
            background:rgba(255,255,255,.09);color:#fff;
            border:1.5px solid rgba(255,255,255,.22);
          }
          .ct-btn-outline:hover{background:rgba(255,255,255,.18)}
          .ct-chips {
            display:flex;flex-wrap:wrap;gap:8px;
            animation:ctChipIn .6s cubic-bezier(.22,1,.36,1) .65s both;
          }
          .ct-chip {
            display:inline-flex;align-items:center;gap:6px;
            font-size:11px;font-weight:600;color:rgba(255,255,255,.55);
            padding:5px 12px;background:rgba(255,255,255,.07);
            border:1px solid rgba(255,255,255,.12);border-radius:100px;
          }
          @media(max-width:640px){
            .ct-hero{height:400px}
            .ct-hero-inner{padding:60px 20px 44px}
            .ct-hero-h1{font-size:2.1rem}
          }
          @media(max-width:390px){
            .ct-hero{height:340px}
            .ct-hero-h1{font-size:1.7rem}
            .ct-hero-sub{font-size:.88rem}
          }
        `}</style>
      </section>

      {/* ── Contact Info + Map (side by side) ── */}
      <section style={{ background: 'var(--white)', padding: '72px 0 64px' }}>
        <div className="container">
          <div className="ct-main-grid">

            {/* Left: Contact info + Social */}
            <div>
              <p className="eyebrow">Contact Info</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 600, color: 'var(--navy)', marginBottom: 28, lineHeight: 1.2 }}>
                Find Us and Get in Touch
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {CONTACT_CARDS.map(c => (
                  <div key={c.label} className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: c.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--red)', marginBottom: 6 }}>{c.label}</p>
                      {c.lines}
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment." target="_blank" rel="noopener noreferrer"
                className="btn btn-red" style={{ width: '100%', justifyContent: 'center', fontSize: '.92rem', marginBottom: 24 }}>
                <WaIcon size={16} /> Book Appointment on WhatsApp
              </a>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { href: 'https://www.facebook.com/people/Arif-Medical-And-Dental-Complex/61572566256803/', hover: '#1877f2', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                  { href: 'https://www.instagram.com/arif.medical.and.dental', hover: '#e1306c', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
                  { href: 'https://wa.me/923439282179', hover: '#25d366', icon: <WaIcon size={16} /> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--navy-tint)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)', transition: 'background .2s, color .2s, border-color .2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = s.hover; el.style.color = '#fff'; el.style.borderColor = 'transparent' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--navy-tint)'; el.style.color = 'var(--navy)'; el.style.borderColor = 'var(--line)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Map */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 20, flex: 1, minHeight: 420, boxShadow: 'var(--shadow-lg)' }}>
                <iframe
                  src="https://maps.google.com/maps?q=Arif+Medical+%26+Dental+Complex+Jinnah+Garden+Islamabad&output=embed&z=16"
                  width="100%" height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Arif Medical and Dental Complex Location"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section style={{ background: 'var(--paper)', padding: '64px 0 72px', borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p className="eyebrow">Book Appointment</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>
              Schedule Your Visit
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.75 }}>
              Fill in the form and we will confirm your appointment on WhatsApp within a few hours.
            </p>
          </div>

          <div style={{ background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(21,37,64,.07)' }}>
            <div style={{ padding: '32px 36px' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--navy)', fontSize: '1.1rem', marginBottom: 10 }}>Booking Sent!</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.7 }}>WhatsApp has opened with your details. Our team will confirm your appointment soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="ct-form-cols">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={fLabel}>Full Name *</label>
                      <input required placeholder="Your name" style={fInput} {...inp('name')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={fLabel}>Phone *</label>
                      <input required type="tel" placeholder="03XX-XXXXXXX" style={fInput} {...inp('phone')} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="ct-form-cols">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={fLabel}>Department</label>
                      <select style={{ ...fInput, cursor: 'pointer' }} {...inp('dept')}>
                        <option value="">Select department…</option>
                        {['General Medicine','Cardiology','Orthopedics','Child Specialist','ENT','Skin / Dermatology','Gynecology','Urology','Pulmonology','General Surgery','Radiology','Dentistry','Psychiatry / Psychology'].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={fLabel}>Preferred Date</label>
                      <input type="date" style={fInput} {...inp('date')} min={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={fLabel}>Any specific concern?</label>
                    <textarea placeholder="Briefly describe your symptoms or question…" rows={3} style={{ ...fInput, resize: 'vertical', lineHeight: 1.6 }} {...inp('msg')} />
                  </div>

                  <button type="submit" className="btn btn-red" style={{ justifyContent: 'center', fontSize: '0.97rem', padding: '14px', marginTop: 4 }}>
                    <WaIcon size={16} /> Confirm Appointment on WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA strip ── */}
      <div style={{ background: 'var(--navy)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Ready to book your appointment?
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>Our team is available Mon–Sat, 11 AM – 8 PM</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:0515148373" className="btn btn--outline-navy" style={{ borderColor: 'rgba(255,255,255,.2)', color: '#fff', background: 'rgba(255,255,255,.06)', fontSize: 13 }}>
              <Phone style={{ width: 14, height: 14 }} /> 051-5148373
            </a>
            <a href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment." target="_blank" rel="noopener noreferrer" className="btn btn-red" style={{ fontSize: 13 }}>
              <WaIcon size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        input, select, textarea { font-family: var(--font-sans); }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: rgba(196,22,52,.4) !important;
          box-shadow: 0 0 0 3px rgba(196,22,52,.1) !important;
        }
        .ct-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .ct-main-grid { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 500px) {
          .ct-form-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

const fLabel: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', letterSpacing: '.04em',
}
const fInput: React.CSSProperties = {
  width: '100%', padding: '11px 13px',
  background: 'var(--white)',
  border: '1.5px solid var(--line)',
  borderRadius: 10, fontSize: 14,
  color: 'var(--ink)',
}
