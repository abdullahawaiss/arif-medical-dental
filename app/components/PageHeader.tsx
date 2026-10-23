'use client'
import Link from 'next/link'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href?: string }[]
  image?: string
}

const DEFAULT_IMAGES: Record<string, string> = {
  default:    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=3840&q=90&auto=format&fit=crop',
  about:      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=3840&q=90&auto=format&fit=crop',
  doctors:    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=3840&q=90&auto=format&fit=crop',
  specialists:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=3840&q=90&auto=format&fit=crop',
  services:   'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=3840&q=90&auto=format&fit=crop',
  opd:        'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=3840&q=90&auto=format&fit=crop',
  ipd:        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=3840&q=90&auto=format&fit=crop',
  laboratory: 'https://images.unsplash.com/photo-1628863353691-0071c8c1ac89?w=3840&q=90&auto=format&fit=crop',
  radiology:  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=3840&q=90&auto=format&fit=crop',
  emergency:  'https://images.unsplash.com/photo-1584467735871-a1e2e2d73b4b?w=3840&q=90&auto=format&fit=crop',
  careers:    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=3840&q=90&auto=format&fit=crop',
  gallery:    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=3840&q=90&auto=format&fit=crop',
  contact:    'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=3840&q=90&auto=format&fit=crop',
  ceo:        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=3840&q=90&auto=format&fit=crop',
  team:       'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=3840&q=90&auto=format&fit=crop',
}

function getImage(eyebrow?: string, title?: string, supplied?: string): string {
  if (supplied) return supplied
  const key = ((eyebrow ?? '') + ' ' + (title ?? '')).toLowerCase()
  for (const [k, v] of Object.entries(DEFAULT_IMAGES)) {
    if (key.includes(k)) return v
  }
  return DEFAULT_IMAGES.default
}

export default function PageHeader({ eyebrow, title, subtitle, breadcrumb, image }: Props) {
  const bg = getImage(eyebrow, title, image)

  return (
    <section className="page-hero" aria-label={title}>
      {/* Background image - higher opacity */}
      <div className="page-hero-bg" style={{ backgroundImage: `url('${bg}')` }} />
      {/* Layered overlay for depth */}
      <div className="page-hero-overlay" />
      {/* Grid texture */}
      <div className="page-hero-grid" />
      {/* Red orb decoration */}
      <div className="page-hero-orb page-hero-orb--top" />
      <div className="page-hero-orb page-hero-orb--bottom" />

      <div className="page-hero-content container">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="page-hero-breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i} className="page-hero-crumb">
                {i > 0 && <span className="page-hero-sep">›</span>}
                {b.href
                  ? <Link href={b.href} className="page-hero-crumb-link">{b.label}</Link>
                  : <span>{b.label}</span>
                }
              </span>
            ))}
          </div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p className="page-hero-eyebrow">
            <span className="page-hero-eyebrow-line" />
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <h1 className="page-hero-title">{title}</h1>

        {/* Subtitle */}
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}

        {/* Decorative accent */}
        <div className="page-hero-accent">
          <div className="page-hero-accent-red" />
          <div className="page-hero-accent-white" />
        </div>
      </div>

      <style>{`
        .page-hero {
          position: relative;
          height: 440px;
          display: flex;
          align-items: center;
          overflow: hidden;
          isolation: isolate;
        }
        .page-hero-bg {
          position: absolute;
          inset: -5%;
          z-index: 0;
          background-size: cover;
          background-position: center center;
          opacity: 0.88;
          animation: heroPan 24s ease-in-out infinite alternate;
          filter: saturate(1.05);
        }
        @keyframes heroPan {
          from { transform: scale(1) translateX(0); }
          to   { transform: scale(1.07) translateX(1.5%); }
        }
        .page-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            120deg,
            rgba(21,37,64,.55) 0%,
            rgba(21,37,64,.35) 50%,
            rgba(21,37,64,.18) 100%
          );
        }
        .page-hero-grid { display: none; }
        .page-hero-orb {
          position: absolute;
          z-index: 2;
          border-radius: 50%;
          pointer-events: none;
        }
        .page-hero-orb--top {
          width: 420px; height: 420px;
          top: -100px; right: -80px;
          background: radial-gradient(circle, rgba(196,22,52,.22) 0%, transparent 65%);
        }
        .page-hero-orb--bottom {
          width: 300px; height: 300px;
          bottom: -80px; left: -60px;
          background: radial-gradient(circle, rgba(21,37,64,.6) 0%, transparent 65%);
        }
        .page-hero-content {
          position: relative;
          z-index: 3;
          padding: 80px 28px 60px;
          width: 100%;
        }
        .page-hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
          font-size: 11.5px;
          color: rgba(255,255,255,.38);
          font-weight: 500;
          flex-wrap: wrap;
        }
        .page-hero-crumb { display: flex; align-items: center; gap: 6px; }
        .page-hero-sep { opacity: 0.5; }
        .page-hero-crumb-link {
          color: rgba(255,255,255,.38);
          transition: color .2s;
        }
        .page-hero-crumb-link:hover { color: rgba(255,255,255,.8); }
        .page-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
        }
        .page-hero-eyebrow-line {
          width: 28px; height: 2px;
          background: var(--red);
          display: inline-block;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .page-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          max-width: 760px;
          text-wrap: balance;
        }
        .page-hero-subtitle {
          font-size: clamp(.95rem, 1.3vw, 1.08rem);
          color: rgba(255,255,255,.62);
          max-width: 600px;
          line-height: 1.75;
          margin-top: 4px;
        }
        .page-hero-accent {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 32px;
        }
        .page-hero-accent-red {
          width: 32px; height: 2px;
          background: var(--red);
          border-radius: 2px;
        }
        .page-hero-accent-white {
          width: 10px; height: 2px;
          background: rgba(255,255,255,.2);
          border-radius: 2px;
        }
        @media (max-width: 640px) {
          .page-hero { height: 360px; }
          .page-hero-content { padding: 60px 20px 48px; }
          .page-hero-title { font-size: clamp(1.7rem, 7vw, 2.4rem); }
        }
      `}</style>
    </section>
  )
}
