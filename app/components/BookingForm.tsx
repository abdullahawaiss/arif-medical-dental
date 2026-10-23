'use client'
import { useState } from 'react'

const DEPARTMENTS = [
  'General Medicine',
  'Dentistry',
  'Cardiology',
  'Orthopedic Surgery',
  'ENT',
  'Dermatology / Skin',
  'Child Specialist (Pediatrics)',
  'Gynaecology',
  'Urology',
  'General Surgery',
  'Pulmonology',
  'Radiology',
  'Clinical Psychology',
]

export default function BookingForm() {
  const [form, setForm] = useState({
    department: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hi, I'd like to book an appointment.%0A%0ADepartment: ${form.department}%0AName: ${form.firstName} ${form.lastName}%0APhone: ${form.phone}%0AEmail: ${form.email}%0APreferred Date: ${form.date}${form.message ? `%0ANote: ${form.message}` : ''}`
    window.open(`https://wa.me/923439282179?text=${msg}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="book-appointment" style={{ background: 'var(--paper)', padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Left: text */}
          <div style={{ flex: '1 1 300px', maxWidth: 440 }}>
            <p className="eyebrow">Easy Booking</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 700, color: 'var(--navy)',
              lineHeight: 1.15, marginBottom: 16,
            }}>
              Book an Appointment
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32, fontSize: '1rem' }}>
              Select your department, fill in your details, and we&apos;ll confirm your appointment via WhatsApp. Walk-ins are also welcome during clinic hours.
            </p>

            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '📞', title: 'Call Us', desc: '051 5148373' },
                { icon: '💬', title: 'WhatsApp', desc: '+92 343 9282179' },
                { icon: '🕐', title: 'Clinic Hours', desc: 'Mon – Sat, 11:00 AM – 8:00 PM' },
                { icon: '📍', title: 'Location', desc: 'Street 60, near Noor-E-Mustafa Masjid, Jinnah Gardens, Islamabad' },
              ].map(item => (
                <div key={item.title} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 18px', borderRadius: 12,
                  background: 'var(--white)', border: '1px solid var(--line)',
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--navy)', marginBottom: 2 }}>{item.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ flex: '1 1 360px' }}>
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}>
              {/* Form header */}
              <div style={{
                background: 'var(--navy)',
                padding: '20px 28px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--red)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.05rem', color: '#fff' }}>
                  Book an Appointment
                </p>
              </div>

              {submitted ? (
                <div style={{ padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', marginBottom: 8 }}>
                    Request Sent!
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                    We&apos;ve opened WhatsApp with your details. We&apos;ll confirm your appointment shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* Department */}
                    <div>
                      <label style={labelStyle}>Select Department</label>
                      <select
                        value={form.department}
                        onChange={e => set('department', e.target.value)}
                        required
                        style={inputStyle}
                      >
                        <option value="">-- Select Department --</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    {/* Name row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>First Name <span style={{ color: 'var(--red)' }}>*</span></label>
                        <input
                          type="text" required placeholder="First name"
                          value={form.firstName} onChange={e => set('firstName', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name</label>
                        <input
                          type="text" placeholder="Last name"
                          value={form.lastName} onChange={e => set('lastName', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>Your Phone <span style={{ color: 'var(--red)' }}>*</span></label>
                      <input
                        type="tel" required placeholder="e.g. 0300 1234567"
                        value={form.phone} onChange={e => set('phone', e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Your Email</label>
                      <input
                        type="email" placeholder="your@email.com"
                        value={form.email} onChange={e => set('email', e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label style={labelStyle}>Preferred Date</label>
                      <input
                        type="date"
                        value={form.date} onChange={e => set('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        style={inputStyle}
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '13px', marginTop: 4 }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 17, height: 17 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Send via WhatsApp
                    </button>

                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--navy)',
  marginBottom: 6,
  letterSpacing: '0.03em',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid var(--line)',
  borderRadius: 8,
  fontSize: '0.9rem',
  color: 'var(--ink)',
  background: 'var(--white)',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color .2s',
}
