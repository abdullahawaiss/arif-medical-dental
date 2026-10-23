'use client'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--paper)', padding: '80px 0 0' }}>
      <div className="container" style={{ marginBottom: 0, paddingBottom: 56 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'stretch' }}>

          {/* Left: info */}
          <div style={{ flex: '1 1 300px', maxWidth: 480 }}>
            <p className="eyebrow">Find Us</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontWeight: 700,
              fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
              color: 'var(--navy)', lineHeight: 1.15, marginBottom: 16,
            }}>
              Visit Arif Medical and Dental Complex
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '.97rem', lineHeight: 1.8, marginBottom: 36 }}>
              Walk in or book ahead via WhatsApp — we&apos;re open Monday to Saturday, 11 AM to 8 PM.
            </p>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>

              {/* Address */}
              <div style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--navy-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin style={{ width: 20, height: 20, color: 'var(--navy)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--red)', marginBottom: 6 }}>Address</p>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)', lineHeight: 1.6 }}>
                    Street 60, near Noor-E-Mustafa Masjid<br />Jinnah Gardens, Islamabad
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--navy-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone style={{ width: 20, height: 20, color: 'var(--navy)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--red)', marginBottom: 6 }}>Phone</p>
                  <a href="tel:0515148373" style={{ display: 'block', fontWeight: 600, fontSize: 14, color: 'var(--navy)', marginBottom: 4, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--navy)')}
                  >051-5148373</a>
                  <a href="tel:03439282179" style={{ display: 'block', fontWeight: 600, fontSize: 14, color: 'var(--navy)', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--navy)')}
                  >0343-9282179</a>
                </div>
              </div>

              {/* Hours */}
              <div style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--navy-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock style={{ width: 20, height: 20, color: 'var(--navy)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--red)', marginBottom: 6 }}>Hours</p>
                  <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', marginBottom: 2 }}>Mon – Sat</p>
                  <p style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 600 }}>11:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Map + Button */}
          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 0, overflow: 'hidden', borderRadius: 20, flex: 1, minHeight: 380, boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                className="map-frame"
                src="https://maps.google.com/maps?q=Arif+Medical+%26+Dental+Complex+Jinnah+Garden+Islamabad&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arif Medical and Dental Complex Location"
              />
            </div>
            {/* WhatsApp CTA — below map */}
            <a
              href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment."
              target="_blank" rel="noopener noreferrer"
              className="btn btn-red"
              style={{ width: '100%', justifyContent: 'center', fontSize: '.92rem' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 17, height: 17, flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Appointment on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div style={{ background: 'var(--navy)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Ready to book your appointment?
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Our team is available 24/7 — call or message us now.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:0515148373" className="btn btn-outline-white" style={{ fontSize: 13 }}>
              <Phone style={{ width: 14, height: 14 }} /> 051-5148373
            </a>
            <a
              href="https://wa.me/923439282179?text=Hello%2C+I+want+to+book+an+appointment."
              target="_blank" rel="noopener noreferrer"
              className="btn btn-red" style={{ fontSize: 13 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
