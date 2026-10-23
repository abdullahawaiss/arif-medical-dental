'use client'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Link from 'next/link'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=85&auto=format&fit=crop', alt: 'MRI / Radiology Machine', cat: 'Radiology' },
  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=85&auto=format&fit=crop', alt: 'Operating Room', cat: 'Surgery' },
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=85&auto=format&fit=crop', alt: 'Hospital Corridor', cat: 'Facility' },
  { src: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=900&q=85&auto=format&fit=crop', alt: 'ICU / Patient Monitor', cat: 'ICU' },
  { src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=85&auto=format&fit=crop', alt: 'OPD Consultation Room', cat: 'OPD' },
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=85&auto=format&fit=crop', alt: 'Emergency Department', cat: 'Emergency' },
  { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=85&auto=format&fit=crop', alt: 'Dental Treatment Chair', cat: 'Dental' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop', alt: 'Modern Reception', cat: 'Facility' },
  { src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=900&q=85&auto=format&fit=crop', alt: 'Dental X-Ray Equipment', cat: 'Dental' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop', alt: 'Ultrasound Machine', cat: 'Diagnostics' },
  { src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=85&auto=format&fit=crop', alt: 'Laboratory Equipment', cat: 'Lab' },
  { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85&auto=format&fit=crop', alt: 'Hospital Ward', cat: 'IPD' },
]

const CATS = ['All', ...Array.from(new Set(IMAGES.map(i => i.cat)))]

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? IMAGES : IMAGES.filter(i => i.cat === active)

  return (
    <main>
      <PageHeader
        eyebrow="Our Facility"
        title="Inside Our Clinic"
        subtitle="State-of-the-art equipment and warm, welcoming spaces — see what awaits you."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=3840&q=90&auto=format&fit=crop"
      />

      <section style={{ background: '#f8fafc', padding: '64px 0 80px' }}>
        <div className="container">

          {/* Filter tabs */}
          <div className="gl-tabs">
            {CATS.map(c => (
              <button key={c} className={`gl-tab${active===c?' gl-tab--on':''}`} onClick={()=>setActive(c)}>{c}</button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="gl-grid">
            {filtered.map((img, i) => (
              <div key={img.src+i} className="gl-card" style={{animationDelay:`${i*.055}s`}}>
                <img src={img.src} alt={img.alt} loading="lazy"/>
                <div className="gl-cap">
                  <span className="gl-cat">{img.cat}</span>
                  <p className="gl-alt">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="gl-cta">
            <h3>Come experience the care in person</h3>
            <p>Book on WhatsApp and we&apos;ll confirm your slot within minutes.</p>
            <div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap'}}>
              <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment." target="_blank" rel="noopener noreferrer" className="btn btn-red">Book on WhatsApp</a>
              <Link href="/contact" className="btn btn-outline-white">Get Directions</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes glCardIn {
          from{opacity:0;transform:translateY(18px) scale(.97)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        .gl-tabs {
          display:flex;flex-wrap:wrap;gap:8px;margin-bottom:36px;
        }
        .gl-tab {
          padding:7px 18px;border-radius:100px;font-size:12px;font-weight:700;
          letter-spacing:.04em;cursor:pointer;transition:all .2s;
          background:rgba(21,37,64,.05);color:var(--muted);border:1.5px solid transparent;
        }
        .gl-tab:hover{background:rgba(196,22,52,.07);color:var(--red);border-color:rgba(196,22,52,.2)}
        .gl-tab--on{background:var(--red);color:#fff;border-color:var(--red)}
        .gl-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
          gap:16px;
        }
        .gl-card {
          border-radius:14px;overflow:hidden;position:relative;
          aspect-ratio:4/3;background:#e8edf4;
          box-shadow:0 2px 12px rgba(21,37,64,.07);
          transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s;
          animation:glCardIn .5s cubic-bezier(.22,1,.36,1) both;
          cursor:pointer;
        }
        .gl-card:hover{transform:translateY(-5px) scale(1.015);box-shadow:0 16px 40px rgba(21,37,64,.16)}
        .gl-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s}
        .gl-card:hover img{transform:scale(1.06)}
        .gl-cap {
          position:absolute;inset:0;
          background:linear-gradient(0deg,rgba(21,37,64,.88) 0%,transparent 55%);
          display:flex;flex-direction:column;justify-content:flex-end;
          padding:16px;opacity:0;transition:opacity .3s;
        }
        .gl-card:hover .gl-cap{opacity:1}
        .gl-cat {
          font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
          color:var(--red);background:rgba(196,22,52,.18);
          padding:3px 8px;border-radius:100px;display:inline-block;
          margin-bottom:5px;width:fit-content;
        }
        .gl-alt{font-size:13px;font-weight:600;color:#fff;line-height:1.3}
        .gl-cta {
          margin-top:64px;text-align:center;padding:48px 28px;
          border-radius:20px;background:var(--navy);
        }
        .gl-cta h3{font-family:var(--font-serif);font-weight:400;font-size:1.35rem;color:#fff;margin-bottom:10px}
        .gl-cta p{color:rgba(255,255,255,.6);font-size:.9rem;margin-bottom:28px}
      `}</style>
    </main>
  )
}
