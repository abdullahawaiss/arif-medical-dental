'use client'
import { useEffect, useRef } from 'react'

const REASONS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 26, height: 26 }}>
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Two Specialties, One Visit',
    desc: 'Handle general medical needs and dental care without visiting separate clinics.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 26, height: 26 }}>
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Attentive, Patient-First Care',
    desc: 'Every visit is treated with care, clear communication, and respect for your time.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 26, height: 26 }}>
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Clean & Modern Facility',
    desc: 'A hygienic clinic maintained to proper medical and dental standards throughout.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 26, height: 26 }}>
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Simple to Reach',
    desc: 'Located in Phase 1, Jinnah Garden — call or message us anytime on WhatsApp.',
  },
]

export default function WhyChooseUs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = Math.min(55, Math.floor(canvas.width / 18))
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      /* Lines between nearby points */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(181,18,45,${0.18 * (1 - dist / 130)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      /* Dots */
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  /* ── Scroll-reveal for items ── */
  useEffect(() => {
    const cards = itemsRef.current?.querySelectorAll<HTMLElement>('.wcu-card')
    const heading = sectionRef.current?.querySelector<HTMLElement>('.wcu-heading')
    if (!cards?.length) return

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('wcu-in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })

    if (heading) io.observe(heading)
    cards.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section id="why" ref={sectionRef} style={{ background: '#152540', padding: '96px 0', overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>

      {/* ── DNA background image ── */}
      <div aria-hidden className="wcu-dna-bg" />

      {/* ── Pinkish warm overlay ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(245,240,232,0.12) 0%, rgba(196,22,52,0.07) 40%, rgba(21,37,64,0.65) 100%)' }} />

      {/* ── Canvas particle background ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
      />

      {/* ── Gradient blobs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,200,210,0.18) 0%, transparent 65%)', top: '-120px', right: '-80px', animation: 'wcuOrb1 16s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,18,45,0.12) 0%, transparent 65%)', bottom: '-60px', left: '-40px', animation: 'wcuOrb2 20s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(21,37,64,0.5) 100%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Heading block */}
        <div className="wcu-heading" style={{ maxWidth: 600, marginBottom: 64 }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 18 }}>
            <span style={{ width: 28, height: 1.5, background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
            Why Choose Us
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', fontWeight: 600, color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>
            Care You Can{' '}
            <span style={{ color: 'var(--red)', fontStyle: 'italic' }}>Rely On,</span>{' '}
            Close to Home
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.97rem', lineHeight: 1.76, maxWidth: 480 }}>
            We built Arif Medical and Dental Complex around the way patients actually experience healthcare — simple, respectful, and thorough.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={itemsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="wcu-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 20,
                transition: 'background .3s, border-color .3s, color .3s',
              }} className="wcu-icon">
                {r.icon}
              </div>
              {/* Red accent bar */}
              <div style={{ width: 28, height: 2, background: 'var(--red)', borderRadius: 2, marginBottom: 14, transition: 'width .4s ease' }} className="wcu-bar" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.74 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wcu-dna-bg {
          position: absolute;
          inset: -8%;
          z-index: 0;
          background-image: url('https://investingnews.com/media-library/hand-holding-glowing-dna-strands-with-molecular-structures.jpg?id=50311089&width=1200&height=1200&coordinates=416%2C0%2C417%2C0');
          background-size: cover;
          background-position: center;
          opacity: 0.38;
          animation: wcuDnaFloat 20s ease-in-out infinite alternate;
          filter: saturate(1.2) hue-rotate(-10deg);
        }
        @keyframes wcuDnaFloat {
          0%   { transform: scale(1)    translate(0, 0); }
          33%  { transform: scale(1.06) translate(-1.5%, 1%); }
          66%  { transform: scale(1.04) translate(1.5%, -0.5%); }
          100% { transform: scale(1.08) translate(-0.5%, 1.5%); }
        }
        @keyframes wcuOrb1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,50px) scale(1.18); } }
        @keyframes wcuOrb2 { from { transform: translate(0,0); } to { transform: translate(-30px,-40px) scale(1.12); } }

        .wcu-heading { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .wcu-heading.wcu-in { opacity: 1; transform: translateY(0); }

        .wcu-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 28px 24px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity .7s ease, transform .7s ease, background .3s, border-color .3s, box-shadow .3s;
        }
        .wcu-card.wcu-in { opacity: 1; transform: translateY(0); }
        .wcu-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(181,18,45,0.35);
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
        }
        .wcu-card:hover .wcu-icon {
          background: rgba(181,18,45,0.18) !important;
          border-color: rgba(181,18,45,0.4) !important;
          color: #fff !important;
        }
        .wcu-card:hover .wcu-bar { width: 52px !important; }
      `}</style>
    </section>
  )
}
