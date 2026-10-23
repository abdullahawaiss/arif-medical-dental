'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SERVICES = [
  { icon: '🏥', title: 'OPD Services',    desc: 'Walk-in and scheduled outpatient consultations across our medical and dental specialities.' },
  { icon: '🛏️', title: 'IPD Services',   desc: 'Comfortable in-patient admission with round-the-clock nursing care.' },
  { icon: '🔬', title: 'Laboratory',      desc: 'On-site diagnostic testing and pathology services with fast, reliable results.' },
  { icon: '📡', title: 'Radiology',       desc: 'Diagnostic imaging services to support accurate diagnosis and treatment.' },
  { icon: '🚨', title: '24 Hrs Services', desc: 'Round-the-clock emergency and urgent care, every day of the week.' },
  { icon: '➕', title: 'Other Services',  desc: 'Additional medical, dental, and support services tailored to your needs.' },
]

const CARD_W = 200
const CARD_GAP = 16
const CARD_STEP = CARD_W + CARD_GAP

/* Triple for seamless loop */
const TRACK = [...SERVICES, ...SERVICES, ...SERVICES]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [paused, setPaused] = useState(false)

  /* Scroll reveal */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal')
    if (!els?.length) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('up'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Seed scroll position to middle copy so both ends loop */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = SERVICES.length * CARD_STEP
  }, [])

  /* Auto-scroll */
  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      el.scrollLeft += 1
      /* Seamless loop: if past second copy end, jump back to start of second copy */
      const max = SERVICES.length * 2 * CARD_STEP
      const min = SERVICES.length * CARD_STEP
      if (el.scrollLeft >= max) el.scrollLeft = min
      if (el.scrollLeft <= 0) el.scrollLeft = min
    }, 20)
  }, [])

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => {
    if (paused) stopAuto()
    else startAuto()
    return stopAuto
  }, [paused, startAuto, stopAuto])

  const slide = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    stopAuto()
    setPaused(true)
    el.scrollBy({ left: dir * CARD_STEP * 2, behavior: 'smooth' })
    /* Seamless loop check after scroll settles */
    setTimeout(() => {
      const max = SERVICES.length * 2 * CARD_STEP
      const min = SERVICES.length * CARD_STEP
      if (el.scrollLeft >= max) el.scrollLeft = min
      if (el.scrollLeft <= 0) el.scrollLeft = min
      setPaused(false)
    }, 600)
  }

  return (
    <section id="services" ref={sectionRef} style={{ background: 'var(--paper)', padding: '88px 0 80px', overflow: 'hidden' }}>
      <div className="container">
        <div className="reveal section-head center">
          <p className="eyebrow">Everything Under One Roof</p>
          <h2>Medical and Dental Care, All in One Place</h2>
          <p>From routine check-ups to complete dental treatment, our team is equipped to look after your everyday health needs.</p>
        </div>
      </div>

      {/* Carousel wrapper */}
      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        <button
          onClick={() => slide(-1)}
          aria-label="Previous"
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 40, height: 40, borderRadius: '50%',
            background: 'var(--white)', border: '1.5px solid var(--line)',
            boxShadow: '0 4px 16px rgba(21,37,64,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background .2s, color .2s',
            color: 'var(--navy)',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--navy)'; el.style.color = '#fff' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--white)'; el.style.color = 'var(--navy)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => slide(1)}
          aria-label="Next"
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: 40, height: 40, borderRadius: '50%',
            background: 'var(--navy)', border: '1.5px solid var(--navy)',
            boxShadow: '0 4px 16px rgba(21,37,64,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background .2s, color .2s',
            color: '#fff',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--red)'; el.style.borderColor = 'var(--red)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--navy)'; el.style.borderColor = 'var(--navy)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Scrollable track — no scrollbar */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            padding: '16px 72px 24px',
            cursor: 'grab',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {TRACK.map((s, i) => (
            <div
              key={i}
              style={{
                width: CARD_W,
                flexShrink: 0,
                background: 'var(--white)',
                border: '1.5px solid var(--line)',
                borderRadius: 16,
                padding: '24px 18px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                setPaused(true)
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = '0 16px 36px rgba(21,37,64,0.16)'
                el.style.borderColor = 'rgba(196,22,52,0.35)'
              }}
              onMouseLeave={e => {
                setPaused(false)
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = ''
                el.style.borderColor = ''
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: 'var(--navy-tint)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16, flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.96rem', color: 'var(--navy)', marginBottom: 8, lineHeight: 1.25 }}>
                {s.title}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 72, height: '100%', background: 'linear-gradient(to right, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 72, height: '100%', background: 'linear-gradient(to left, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
      </div>

      <div className="reveal" style={{ textAlign: 'center', marginTop: 12 }}>
        <Link href="/services" className="btn btn-navy">View All Services →</Link>
      </div>

      <style>{`
        div[style*="overflow-x: scroll"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
