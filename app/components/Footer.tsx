'use client'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'About Us',    href: '/about' },
  { label: 'Specialities', href: '/specialists' },
  { label: 'Doctors',     href: '/doctors' },
  { label: 'Services',    href: '/services' },
  { label: 'Careers',     href: '/careers' },
  { label: 'Contact',     href: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'OPD Services', href: '/opd-services' },
  { label: 'IPD Services', href: '/ipd-services' },
  { label: 'Laboratory', href: '/laboratory' },
  { label: 'Radiology', href: '/radiology' },
  { label: '24-Hour Emergency', href: '/24-hour-services' },
  { label: 'Other Services', href: '/other-services' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: '#e2e8f0' }}>
      {/* Top section */}
      <div className="container" style={{ padding: '44px 20px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 10px rgba(196,22,52,.35)',
              }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 24, height: 24 }}>
                  <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1.2 }}>Arif Medical and Dental</p>
                <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,.45)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' }}>Complex · Islamabad</p>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: '#94a3b8', marginBottom: 20 }}>
              Quality medical and dental care in the heart of Jinnah Garden, Islamabad. Your health is our priority.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://www.facebook.com/people/Arif-Medical-And-Dental-Complex/61572566256803/" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1877f2')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}
              >
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 15, height: 15 }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/arif.medical.and.dental" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e1306c')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}
              >
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 15, height: 15 }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://wa.me/923439282179" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#25d366')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}
              >
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 15, height: 15 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, color: '#94a3b8', transition: 'color .2s', display: 'flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 20 }}>Services</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 13, color: '#94a3b8', transition: 'color .2s', display: 'flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:0515148373" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#94a3b8', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                <Phone style={{ width: 14, height: 14, color: '#93c5fd', flexShrink: 0 }} />
                051-5148373
              </a>
              <a href="tel:03439282179" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#94a3b8', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                <Phone style={{ width: 14, height: 14, color: '#93c5fd', flexShrink: 0 }} />
                0343-9282179
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#94a3b8' }}>
                <MapPin style={{ width: 14, height: 14, color: '#93c5fd', flexShrink: 0, marginTop: 2 }} />
                <span>Street 60, near Noor-E-Mustafa Masjid, Jinnah Gardens, Islamabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div className="container" style={{ padding: '20px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <p style={{ fontSize: 12, color: '#475569' }}>© {new Date().getFullYear()} Arif Medical and Dental Complex. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#475569' }}>Made by <span style={{ color: 'rgba(255,255,255,.45)', fontWeight: 600 }}>Abdullah Awais</span></p>
        </div>
      </div>
    </footer>
  )
}
