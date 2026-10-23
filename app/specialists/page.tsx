'use client'
import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Link from 'next/link'

/* ─── Data ───────────────────────────────────────── */
const MEDICAL = [
  { name: 'General Medicine',             icon: '🩺', desc: 'Everyday illnesses and general health' },
  { name: 'Pediatrics',                   icon: '👶', desc: 'Care for infants, children, and adolescents' },
  { name: 'Cardiology',                   icon: '❤️', desc: 'Heart and cardiovascular conditions' },
  { name: 'Endocrinology',               icon: '🔬', desc: 'Hormonal and metabolic disorders' },
  { name: 'Gastroenterology',            icon: '🫁', desc: 'Digestive system conditions' },
  { name: 'Pulmonology',                 icon: '🫀', desc: 'Respiratory and lung conditions' },
  { name: 'Neurology',                   icon: '🧠', desc: 'Brain and nervous system conditions' },
  { name: 'Nephrology',                  icon: '💧', desc: 'Kidney conditions' },
  { name: 'Dermatology',                 icon: '✨', desc: 'Skin, hair, and nail conditions' },
  { name: 'Dental',                       icon: '🦷', desc: 'Check-ups and preventive oral care' },
  { name: 'Physiotherapy',               icon: '🏃', desc: 'Rehabilitation and movement therapy' },
  { name: 'Psychiatry',                  icon: '🧘', desc: 'Mental health conditions' },
  { name: 'Psychology',                  icon: '💭', desc: 'Counselling and emotional wellbeing' },
  { name: 'Rheumatology',               icon: '🦴', desc: 'Joint, muscle, and autoimmune conditions' },
  { name: 'Hematology',                  icon: '🩸', desc: 'Blood disorders' },
  { name: 'Infectious Disease',          icon: '🛡️', desc: 'Infections and communicable illnesses' },
  { name: 'Diet & Nutrition',            icon: '🥗', desc: 'Personalised nutrition guidance' },
  { name: 'Radiologist',                 icon: '📡', desc: 'Diagnostic imaging' },
  { name: 'Speech & Language Pathology', icon: '🗣️', desc: 'Speech, language, and communication' },
  { name: 'Anesthesia',                  icon: '💉', desc: 'Anesthesia and pain management' },
]

const SURGICAL = [
  { name: 'General & Laparoscopic Surgery', icon: '🔪', desc: 'Open and minimally invasive procedures' },
  { name: 'Gynecology',                      icon: '🌸', desc: "Women's reproductive health and surgery" },
  { name: 'Orthopedics Surgery',             icon: '🦾', desc: 'Bone, joint, and muscle surgery' },
  { name: 'Ortho & Spine Surgery',           icon: '🏗️', desc: 'Spine and complex orthopedic surgery' },
  { name: 'Neurosurgery',                    icon: '⚡', desc: 'Brain, spine, and nervous system surgery' },
  { name: 'ENT',                             icon: '👂', desc: 'Ear, nose, and throat surgery' },
  { name: 'Ophthalmology Surgery',           icon: '👁️', desc: 'Eye surgery and vision care' },
  { name: 'Urology',                         icon: '🫘', desc: 'Urinary tract and male reproductive' },
  { name: 'Pediatrics Surgery',              icon: '🧸', desc: 'Surgery for infants and children' },
  { name: 'Vascular Surgery',               icon: '🔴', desc: 'Blood vessel and circulation conditions' },
  { name: 'Plastic Surgery',                icon: '🌟', desc: 'Reconstructive and cosmetic procedures' },
  { name: 'Breast Surgery',                 icon: '🎗️', desc: 'Breast health conditions' },
]

/* ─── Reveal on scroll ───────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { (e.target as HTMLElement).classList.add('sp-visible'); ob.disconnect() }
    }, { threshold: 0.08 })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [ref])
}

/* ─── Premium card ───────────────────────────────── */
function SpecCard({ name, icon, desc, idx }: { name: string; icon: string; desc: string; idx: number }) {
  return (
    <div className="sp-card" style={{ animationDelay: `${idx * 0.04}s` }}>
      <div className="sp-card-icon">{icon}</div>
      <div className="sp-card-num">{String(idx + 1).padStart(2, '0')}</div>
      <div className="sp-card-body">
        <p className="sp-card-name">{name}</p>
        <p className="sp-card-desc">{desc}</p>
      </div>
      <div className="sp-card-arrow">→</div>
    </div>
  )
}

/* ─── Section group ──────────────────────────────── */
function SpecGroup({ label, sub, accent, items }: { label: string; sub: string; accent: string; items: typeof MEDICAL }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref as React.RefObject<HTMLElement>)
  return (
    <div className="sp-group sp-reveal" ref={ref}>
      <div className="sp-group-head">
        <span className="sp-group-accent" style={{ background: accent }} />
        <div>
          <h2 className="sp-group-title">{label}</h2>
          <p className="sp-group-sub">{sub}</p>
        </div>
        <span className="sp-group-count">{items.length} specialities</span>
      </div>
      <div className="sp-grid">
        {items.map((s, i) => <SpecCard key={s.name} {...s} idx={i} />)}
      </div>
    </div>
  )
}

/* ─── Stats strip ────────────────────────────────── */
function Counter({ to, suf = '' }: { to: number; suf?: string }) {
  const [v, setV] = useState(0); const r = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; ob.disconnect()
      let s = 0; const step = () => { s += Math.ceil((to - s) / 7); setV(Math.min(s, to)); if (s < to) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    }, { threshold: .3 })
    if (r.current) ob.observe(r.current)
    return () => ob.disconnect()
  }, [to])
  return <span ref={r}>{v}{suf}</span>
}

/* ─── Page ───────────────────────────────────────── */
export default function SpecialitiesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="What We Cover"
        title="Our Specialities"
        subtitle="Comprehensive medical and surgical care — organised so you always know where to turn."
        image="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=3840&q=90&auto=format&fit=crop"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Specialities' }]}
      />

      {/* ── Stats highlight strip ── */}
      <section className="sp-strip">
        <div className="container sp-strip-inner">
          {[
            { n: MEDICAL.length + SURGICAL.length, s: '+', l: 'Total Specialities' },
            { n: 15, s: '+', l: 'Expert Specialists' },
            { n: 6, s: '+', l: 'Departments' },
            { fixed: '24/7', l: 'Emergency Care' },
          ].map((item, i) => (
            <div key={i} className="sp-strip-item">
              <span className="sp-strip-n">{'fixed' in item ? item.fixed : <Counter to={item.n!} suf={item.s}/>}</span>
              <span className="sp-strip-l">{item.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Search hint ── */}
      <section style={{ background: '#f8fafc', padding: '56px 0 0' }}>
        <div className="container">
          <div className="sp-intro">
            <div>
              <p className="eyebrow">Browse by Category</p>
              <h2 className="sp-intro-h">Medical &amp; Surgical Departments</h2>
            </div>
            <p className="sp-intro-p">
              From routine check-ups to complex surgery, every speciality is backed by board-qualified physicians in a welcoming, modern clinic.
            </p>
          </div>
        </div>
      </section>

      {/* ── Speciality groups ── */}
      <section style={{ background: '#f8fafc', padding: '40px 0 80px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          <SpecGroup
            label="Medical Specialities"
            sub="Diagnosis, treatment & ongoing care"
            accent="var(--navy)"
            items={MEDICAL}
          />
          <SpecGroup
            label="Surgical Specialities"
            sub="Specialist procedures from minor to major"
            accent="var(--red)"
            items={SURGICAL}
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta-section">
        <div className="container sp-cta-inner">
          <div>
            <p className="sp-cta-eyebrow">Ready to Book?</p>
            <h2 className="sp-cta-h">Not sure which speciality you need?</h2>
            <p className="sp-cta-p">Ask us on WhatsApp and we&apos;ll guide you to the right specialist within minutes.</p>
          </div>
          <div className="sp-cta-btns">
            <a href="https://wa.me/923439282179" target="_blank" rel="noopener noreferrer" className="btn btn-red">
              Ask on WhatsApp
            </a>
            <Link href="/doctors" className="btn btn-outline-white">View Our Doctors</Link>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Strip ── */
        .sp-strip {
          background:#f5f8fc;padding:28px 0;
          border-top:1px solid rgba(21,37,64,.08);border-bottom:1px solid rgba(21,37,64,.08);
        }
        .sp-strip-inner {
          display:grid;grid-template-columns:repeat(4,1fr);
        }
        .sp-strip-item {
          display:flex;flex-direction:column;gap:3px;align-items:center;text-align:center;
          padding:8px 0;border-right:1px solid rgba(21,37,64,.09);
        }
        .sp-strip-item:last-child{border-right:none}
        .sp-strip-n {
          font-family:var(--font-serif);font-size:1.9rem;font-weight:500;
          background:linear-gradient(135deg,var(--navy),var(--red));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;line-height:1;
        }
        .sp-strip-l {
          font-size:10px;font-weight:700;text-transform:uppercase;
          letter-spacing:.14em;color:var(--muted);
        }

        /* ── Intro ── */
        .sp-intro {
          display:flex;align-items:flex-end;gap:32px;
          flex-wrap:wrap;margin-bottom:0;padding-bottom:0;
        }
        .sp-intro-h {
          font-family:var(--font-serif);font-size:clamp(1.5rem,2.8vw,2.1rem);
          font-weight:300;color:var(--navy);margin:0;letter-spacing:.01em;
        }
        .sp-intro-p {
          flex:1;min-width:220px;font-size:.92rem;color:var(--muted);
          line-height:1.8;max-width:480px;
        }

        /* ── Reveal — start visible, animate in on scroll ── */
        .sp-reveal { opacity:1; transform:translateY(0) }

        /* ── Group ── */
        .sp-group-head {
          display:flex;align-items:center;gap:14px;margin-bottom:28px;flex-wrap:wrap;
        }
        .sp-group-accent {
          width:4px;height:36px;border-radius:2px;flex-shrink:0;
        }
        .sp-group-title {
          font-family:var(--font-serif);font-size:1.25rem;font-weight:400;
          color:var(--navy);margin:0 0 2px;
        }
        .sp-group-sub {
          font-size:12px;color:var(--muted-2);font-weight:500;margin:0;
        }
        .sp-group-count {
          margin-left:auto;font-size:11px;font-weight:700;letter-spacing:.1em;
          text-transform:uppercase;color:var(--muted-2);
          padding:5px 14px;background:rgba(21,37,64,.05);border-radius:100px;
        }

        /* ── Grid ── */
        .sp-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
          gap:10px;
        }

        /* ── Card ── */
        @keyframes spCardIn {
          from{opacity:0;transform:translateY(14px)}
          to{opacity:1;transform:translateY(0)}
        }
        .sp-card {
          display:flex;align-items:flex-start;gap:10px;
          padding:14px 14px;border-radius:12px;
          background:#ffffff;border:1.5px solid rgba(21,37,64,.09);
          position:relative;cursor:pointer;
          transition:border-color .22s,box-shadow .22s,transform .22s;
          animation:spCardIn .5s cubic-bezier(.22,1,.36,1) both;
          box-sizing:border-box;
        }
        .sp-card::before {
          content:'';position:absolute;inset:0;border-radius:12px;
          background:linear-gradient(135deg,rgba(196,22,52,.0) 0%,rgba(196,22,52,.04) 100%);
          opacity:0;transition:opacity .25s;
        }
        .sp-card:hover{
          border-color:rgba(196,22,52,.28);
          box-shadow:0 8px 28px rgba(196,22,52,.10);
          transform:translateY(-3px);
        }
        .sp-card:hover::before{opacity:1}
        .sp-card-icon {
          font-size:20px;flex-shrink:0;width:38px;height:38px;
          display:flex;align-items:center;justify-content:center;
          background:rgba(196,22,52,.06);border-radius:9px;
          transition:background .22s,transform .22s;
          position:relative;z-index:1;
        }
        .sp-card:hover .sp-card-icon{background:rgba(196,22,52,.12);transform:scale(1.08)}
        .sp-card-num {
          font-size:9px;font-weight:800;color:rgba(21,37,64,.15);
          letter-spacing:.06em;
          position:absolute;top:8px;right:10px;
          z-index:1;
        }
        .sp-card-body{flex:1;min-width:0;position:relative;z-index:1}
        .sp-card-name {
          font-size:12.5px;font-weight:700;color:var(--navy);margin:0 0 2px;
          line-height:1.3;word-break:break-word;
        }
        .sp-card-desc {
          font-size:10.5px;color:var(--muted-2);line-height:1.45;margin:0;
        }
        .sp-card-arrow { display:none }

        /* ── CTA section ── */
        .sp-cta-section {
          background:#152540;padding:72px 0;
          background-image:radial-gradient(ellipse 60% 80% at 80% 50%, rgba(196,22,52,.16) 0%, transparent 60%);
        }
        .sp-cta-inner {
          display:flex;align-items:center;gap:48px;flex-wrap:wrap;
          justify-content:space-between;
        }
        .sp-cta-eyebrow {
          font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
          color:var(--red);margin-bottom:10px;
        }
        .sp-cta-h {
          font-family:var(--font-serif);font-size:clamp(1.4rem,2.5vw,1.9rem);
          font-weight:300;color:#ffffff !important;margin:0 0 12px;letter-spacing:.01em;
        }
        .sp-cta-p{color:rgba(255,255,255,.62) !important;font-size:.92rem;line-height:1.8;max-width:440px;margin:0}
        .sp-cta-btns{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0}

        @media(max-width:768px){
          .sp-strip-inner{grid-template-columns:repeat(2,1fr)}
          .sp-strip-item:nth-child(2){border-right:none}
          .sp-strip-item:nth-child(3){border-bottom:none}
          .sp-cta-inner{flex-direction:column;gap:28px}
          .sp-group-count{display:none}
        }
        @media(max-width:480px){
          .sp-grid{grid-template-columns:1fr}
          .sp-strip-inner{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>
    </main>
  )
}
