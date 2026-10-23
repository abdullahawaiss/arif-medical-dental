import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: "CEO's Message",
  description: "A message from Dr. Arif, Founder & Medical Director of Arif Medical & Dental Complex, Jinnah Garden, Islamabad.",
}

export default function CeoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Leadership"
        title="A Message from Our Leadership"
        subtitle="Our commitment to accessible, honest, and compassionate medical and dental care."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: "CEO's Message" }]}
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=3840&q=90&auto=format&fit=crop"
      />

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 56, alignItems: 'start' }}>
              {/* Photo */}
              <div>
                <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', position: 'relative', boxShadow: '0 20px 56px rgba(21,37,64,.16)', maxWidth: 320 }}>
                  <Image
                    src="https://www.arifmedicalanddental.com/ceo.webp"
                    alt="Dr. Arif — Founder & Medical Director, Arif Medical & Dental Complex"
                    fill className="object-cover object-top"
                    sizes="(max-width:768px) 100vw, 320px"
                    unoptimized
                  />
                </div>
                <div style={{ marginTop: 20, padding: '20px 24px', background: 'var(--navy)', borderRadius: 12 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Dr. Arif</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500 }}>Founder &amp; Medical Director</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Arif Medical &amp; Dental Complex</p>
                </div>
              </div>

              {/* Message */}
              <div style={{ paddingTop: 8 }}>
                <p className="eyebrow">CEO&apos;s Message</p>

                {/* Pull quote */}
                <blockquote style={{ borderLeft: '3px solid var(--red)', paddingLeft: 20, margin: '0 0 28px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.15rem,2.2vw,1.45rem)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.42, fontStyle: 'italic' }}>
                  &ldquo;We started this complex with a simple belief — that good medical and dental care should be within reach of every family.&rdquo;
                </blockquote>

                <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>
                  When we opened Arif Medical &amp; Dental Complex, our goal was to be the clinic families in Jinnah Garden could trust. A place where you don&apos;t have to travel far or navigate multiple hospitals to get the care you need.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.95rem' }}>
                  Bringing general medicine and complete dental treatment together under one roof was a deliberate choice, so a family can look after their health and their smiles in a single visit — with doctors they know and a team that treats them with dignity.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32, fontSize: '0.95rem' }}>
                  We remain committed to continuous improvement, adding qualified specialists, investing in clean and modern facilities, and maintaining the warmth and care that makes our patients comfortable. Your trust is the foundation of everything we do.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://wa.me/923439282179" target="_blank" rel="noopener noreferrer" className="btn btn-red">Get in Touch</a>
                  <a href="/about" className="btn btn--outline-navy">About Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
