'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    children: [
      { label: 'About Us',      href: '/about' },
      { label: "CEO's Message", href: '/ceo' },
      { label: 'Gallery',       href: '/gallery' },
    ],
  },
  { label: 'Specialities', href: '/specialists' },
  { label: 'Doctors',      href: '/doctors' },
  {
    label: 'Services',
    children: [
      { label: 'All Services',    href: '/services' },
      { label: 'OPD Services',    href: '/opd-services' },
      { label: 'IPD Services',    href: '/ipd-services' },
      { label: 'Laboratory',      href: '/laboratory' },
      { label: 'Radiology',       href: '/radiology' },
      { label: '24 Hrs Services', href: '/24-hour-services' },
      { label: 'Other Services',  href: '/other-services' },
    ],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const MOBILE_LINKS = [
  { label: 'Home',            href: '/' },
  { label: 'About Us',        href: '/about' },
  { label: "CEO's Message",   href: '/ceo' },
  { label: 'Gallery',         href: '/gallery' },
  { label: 'Meet Our Doctors',href: '/doctors' },
  { label: 'Specialities',    href: '/specialists' },
  { label: 'All Services',    href: '/services' },
  { label: 'OPD Services',    href: '/opd-services' },
  { label: 'IPD Services',    href: '/ipd-services' },
  { label: 'Laboratory',      href: '/laboratory' },
  { label: 'Radiology',       href: '/radiology' },
  { label: '24 Hrs Services', href: '/24-hour-services' },
  { label: 'Other Services',  href: '/other-services' },
  { label: 'Careers',         href: '/careers' },
  { label: 'Contact',         href: '/contact' },
]

function WaIcon({ cls = 'w-4 h-4' }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function DropdownItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isChildActive = item.children?.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(v => !v)}
        className={`nav-link flex items-center gap-1 ${isChildActive ? 'active' : ''}`}
        aria-haspopup="true" aria-expanded={open}
      >
        {item.label}
        <ChevronDown className="w-3.5 h-3.5 opacity-60" style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0,
          background: 'var(--white)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '6px 0',
          minWidth: 200,
          boxShadow: '0 12px 32px rgba(21,37,64,.14)',
          zIndex: 200,
          animation: 'ddFade .15s ease',
        }}>
          {item.children!.map(c => (
            <Link key={c.href} href={c.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '9px 18px',
                fontSize: '0.85rem', fontWeight: 500,
                color: pathname === c.href ? 'var(--red)' : 'var(--ink)',
                background: pathname === c.href ? 'var(--navy-tint)' : 'transparent',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy-tint)'; (e.currentTarget as HTMLElement).style.color = 'var(--red)' }}
              onMouseLeave={e => {
                const active = pathname === c.href
                ;(e.currentTarget as HTMLElement).style.background = active ? 'var(--navy-tint)' : 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = active ? 'var(--red)' : 'var(--ink)'
              }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDark(true); document.documentElement.setAttribute('data-theme', 'dark') }
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggleDark = () => {
    const n = !dark; setDark(n)
    document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light')
    localStorage.setItem('theme', n ? 'dark' : 'light')
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <style>{`
        @keyframes ddFade { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* Top bar */}
      <div className="top-bar hidden sm:block">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 text-xs">
              <a href="tel:0515148373" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3 opacity-70" /> 051 5148373
              </a>
              <a href="https://wa.me/923439282179" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <WaIcon cls="w-3 h-3 opacity-70" /> +92 343 9282179
              </a>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a href="https://www.facebook.com/people/Arif-Medical-And-Dental-Complex/61572566256803/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://www.instagram.com/arif.medical.and.dental" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`main-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile: hamburger on LEFT */}
            <div className="flex lg:hidden items-center shrink-0">
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: open ? 0 : 5, width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                  background: open ? 'var(--red)' : 'var(--navy)',
                  border: 'none', cursor: 'pointer', padding: '9px 10px',
                  boxShadow: '0 2px 10px rgba(21,37,64,.2)',
                  transition: 'background .2s',
                  position: 'relative',
                }}
              >
                {open ? (
                  <X style={{ width: 20, height: 20, color: '#fff', position: 'absolute' }} />
                ) : (
                  <>
                    <span style={{ display: 'block', width: 20, height: 2.5, background: '#fff', borderRadius: 2, transition: 'all .2s' }} />
                    <span style={{ display: 'block', width: 14, height: 2.5, background: '#fff', borderRadius: 2, alignSelf: 'flex-start', transition: 'all .2s' }} />
                    <span style={{ display: 'block', width: 20, height: 2.5, background: '#fff', borderRadius: 2, transition: 'all .2s' }} />
                  </>
                )}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              {/* Medical cross icon */}
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 10px rgba(196,22,52,.35)',
              }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 24, height: 24 }}>
                  <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              </div>
              <div>
                <p className="nav-logo-name" style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 15.5, color: 'var(--navy)', lineHeight: 1.15, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Arif Medical and Dental</p>
                <p className="nav-logo-sub" style={{ fontSize: 10.5, color: 'var(--muted-2)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Complex · Islamabad</p>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center flex-nowrap">
              {NAV_ITEMS.map(item =>
                item.children ? (
                  <li key={item.label}><DropdownItem item={item} /></li>
                ) : (
                  <li key={item.label}>
                    <Link href={item.href!} className={`nav-link ${isActive(item.href!) ? 'active' : ''}`}>{item.label}</Link>
                  </li>
                )
              )}
            </ul>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0">
              <a href="tel:0515148373" className="btn btn--outline-navy btn-sm">
                <Phone className="w-3 h-3" /> Call Now
              </a>
              <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment+at+Arif+Medical+%26+Dental+Complex" target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm">
                <WaIcon cls="w-3 h-3" /> WhatsApp
              </a>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[700px]' : 'max-h-0'}`} style={{ background: 'var(--white)', borderTop: `1px solid var(--line)` }}>
          <div className="container py-4">
            <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment+at+Arif+Medical+%26+Dental+Complex"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-red w-full mb-3"
              onClick={() => setOpen(false)}
              style={{ justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', padding: '13px' }}>
              <WaIcon cls="w-4 h-4" /> Book an Appointment
            </a>
            <div className="space-y-0.5 mb-3" style={{ maxHeight: 400, overflowY: 'auto' }}>
              {MOBILE_LINKS.map(({ label, href }) => (
                <Link key={label + href} href={href} onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded text-sm font-semibold transition-all"
                  style={{ color: isActive(href) ? 'var(--red)' : 'var(--ink)', background: isActive(href) ? 'var(--navy-tint)' : 'transparent' }}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-2.5 border-t" style={{ borderColor: 'var(--line)' }}>
              <a href="tel:0515148373" className="btn btn--outline-navy w-full" style={{ justifyContent: 'center' }}>
                <Phone className="w-4 h-4" /> Call 051 5148373
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* WhatsApp float */}
      <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment+at+Arif+Medical+%26+Dental+Complex" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  )
}
