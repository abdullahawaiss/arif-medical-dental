'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FEATURES = [
  { num: '01', title: 'Qualified Practitioners',   desc: 'Medical & dental professionals with postgraduate qualifications.' },
  { num: '02', title: 'Clean & Modern Clinic',     desc: 'Hygienic, well-maintained treatment rooms and facility.' },
  { num: '03', title: 'Family Friendly',            desc: 'Care for every age group — children, adults and seniors.' },
  { num: '04', title: 'Easy to Reach',              desc: 'Located in Phase 1, Jinnah Garden — call or WhatsApp anytime.' },
]

const STATS = [
  { num: 15, suffix: '+', label: 'Specialists' },
  { num: 24, suffix: '/7', label: 'Emergency' },
  { num: 6,  suffix: '+', label: 'Services' },
  { num: 100, suffix: '%', label: 'Dedicated' },
]

function animateCount(el: HTMLElement, target: number) {
  const start = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - start) / 1400, 1)
    el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsAnimated = useRef(false)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
    if (!els?.length) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('up'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))

    const statsEl = statsRef.current
    if (statsEl) {
      const sio = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true
          statsEl.querySelectorAll<HTMLElement>('[data-count]').forEach(el => animateCount(el, Number(el.dataset.count)))
          sio.disconnect()
        }
      }, { threshold: 0.4 })
      sio.observe(statsEl)
      return () => { io.disconnect(); sio.disconnect() }
    }
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} style={{ background: 'var(--white)', padding: '96px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>

          {/* Image column */}
          <div className="reveal-left about-img-col" style={{ position: 'relative', overflow: 'visible' }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              position: 'relative', width: '100%', aspectRatio: '3 / 4',
              boxShadow: '0 24px 64px rgba(21,37,64,.18)',
            }}>
              <Image
                src="https://www.arifmedicalanddental.com/images/front.webp"
                alt="Arif Medical & Dental Complex — Hospital Building, Jinnah Garden Islamabad"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority={false}
                unoptimized
              />
              {/* Red accent strip */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: 'var(--red)',
              }} />
            </div>

            {/* Stats strip overlay */}
            <div ref={statsRef} style={{
              position: 'absolute', bottom: -20, left: 10, right: 10,
              background: 'var(--navy)',
              borderRadius: 16, padding: '16px 8px',
              display: 'flex', justifyContent: 'space-around',
              boxShadow: '0 16px 40px rgba(21,37,64,.32)',
              overflow: 'hidden',
            }}>
              {STATS.map(({ num, suffix, label }) => (
                <div key={label} style={{ textAlign: 'center', minWidth: 0, flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 20, color: '#fff', lineHeight: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                    <span data-count={num}>0</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{suffix}</span>
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,.45)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div className="reveal-right about-text-col" style={{ paddingTop: 8 }}>
            <p className="eyebrow">About Us</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: 20 }}>
              A Trusted Medical and Dental Complex in Jinnah Garden
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16, fontSize: '.97rem' }}>
              Arif Medical and Dental Complex was built to make quality healthcare simple and accessible for the local community — offering general medical consultations alongside complete dental treatment in one welcoming clinic.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32, fontSize: '.97rem' }}>
              Our team focuses on attentive, patient-first care in a clean, well-equipped environment, so you and your family can get the treatment you need without running between different clinics across the city.
            </p>

            {/* 4 numbered features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
              {FEATURES.map(f => (
                <div key={f.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700,
                    color: 'rgba(196,22,52,.15)', lineHeight: 1, flexShrink: 0, minWidth: 34,
                  }}>{f.num}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--navy)', marginBottom: 3 }}>{f.title}</p>
                    <p style={{ fontSize: '.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn btn-navy" style={{ display: 'inline-flex' }}>Learn More About Us →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
