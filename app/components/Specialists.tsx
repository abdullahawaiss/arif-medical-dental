'use client'
import { useState } from 'react'
import { Clock } from 'lucide-react'

type Cat = 'All' | 'Medical' | 'Dental' | 'Surgical'

const DOCTORS = [
  { name: 'Dr. Jihad Ali',          specialty: 'General Physician',        qual: 'MBBS',                                 timing: '24/7 Available', cat: 'Medical'   as Cat, avail: true },
  { name: 'Dr. Anum Sharif',        specialty: 'Dermatologist',             qual: 'MBBS, MCPS, FCPS (Dermatology)',       timing: 'Mon–Thu, 7–9pm', cat: 'Medical'   as Cat },
  { name: 'Dr. Muhammad Usman',     specialty: 'Cardiologist',              qual: 'MBBS, FCPS',                           timing: 'Sat–Thu, 7–10pm', cat: 'Medical'  as Cat },
  { name: 'Dr. Asad Shabbir',       specialty: 'Child Specialist',          qual: 'MBBS, FCPS, PGPN, PhD',               timing: 'Mon–Sat, 6–9pm', cat: 'Medical'   as Cat },
  { name: 'Dr. Wajahat Shafi',      specialty: 'Medical Specialist',        qual: 'MBBS, FCPS',                           timing: 'Sat–Thu, 7–10pm', cat: 'Medical'  as Cat },
  { name: 'Dr. Gul-e-Raana',        specialty: 'Clinical Psychologist',     qual: 'MS Psychology (UK Certified)',         timing: 'Mon–Sat, On-Call', cat: 'Medical' as Cat },
  { name: 'Dr. Shams Haider',       specialty: 'Radiologist',               qual: 'MBBS, MD, FCPS-II',                   timing: 'Mon–Thu, 7:30–9:30pm', cat: 'Medical' as Cat },
  { name: 'Dr. Abdullah Bin Khurram', specialty: 'Pulmonologist',           qual: 'MBBS',                                 timing: 'By Appointment', cat: 'Medical'  as Cat },
  { name: 'Dr. Mehak Batool',       specialty: 'Dentist',                   qual: 'BDS, RDS',                             timing: 'Mon–Sat, 10am–3pm', cat: 'Dental' as Cat },
  { name: 'Dr. Waqas Ahmad Rao',    specialty: 'Orthopedic Surgeon',        qual: 'MBBS, MS Orthopedic',                 timing: 'Sun–Thu, 7–9pm', cat: 'Surgical'  as Cat },
  { name: 'Dr. Inam Ullah',         specialty: 'General Surgeon',           qual: 'MBBS, FCPS',                           timing: 'Mon–Sat, 7–9:30pm', cat: 'Surgical' as Cat },
  { name: 'LT. Col. Dr. Atia',     specialty: 'General Surgeon',           qual: 'MBBS, FCPS, MRCS, CHPE, FISR',        timing: 'Mon–Thu, 4–7pm', cat: 'Surgical'  as Cat },
  { name: 'Dr. Asad Ullah Khan',    specialty: 'ENT Specialist',            qual: 'MBBS, FCPS',                           timing: 'Mon–Sat, 7–9:30pm', cat: 'Surgical' as Cat },
  { name: 'Dr. Sohaib Khalid',      specialty: 'Urologist',                 qual: 'MBBS, FCPS',                           timing: 'Mon–Fri, 7:30–9:30pm', cat: 'Surgical' as Cat },
  { name: 'Dr. Kishwar Aamir',      specialty: 'Gynaecologist',             qual: 'MBBS, FCPS',                           timing: 'Mon–Sat, 10am–2pm', cat: 'Surgical' as Cat },
]

const AVATARS = ['#1b3a6b','#0f766e','#1d4ed8','#7c3aed','#be185d','#0369a1','#065f46']

const BADGE: Record<Cat, string> = {
  All: '',
  Medical: 'badge-medical',
  Dental: 'badge-dental',
  Surgical: 'badge-surgical',
}

const TABS: Cat[] = ['All', 'Medical', 'Dental', 'Surgical']
const COUNTS: Record<Cat, number> = {
  All: DOCTORS.length,
  Medical: DOCTORS.filter(d => d.cat === 'Medical').length,
  Dental: DOCTORS.filter(d => d.cat === 'Dental').length,
  Surgical: DOCTORS.filter(d => d.cat === 'Surgical').length,
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function initials(name: string) {
  const parts = name.replace(/^(LT\.\s*Col\.\s*)?Dr\.\s*/i, '').split(' ')
  return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase()
}

export default function Specialists() {
  const [filter, setFilter] = useState<Cat>('All')
  const list = filter === 'All' ? DOCTORS : DOCTORS.filter(d => d.cat === filter)

  return (
    <section id="specialists" className="py-20 sm:py-28" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Our Specialists</span>
          <h2
            className="font-extrabold mt-4 mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: 'var(--navy)' }}
          >
            Meet Our Doctors
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            15 experienced medical, dental, and surgical practitioners. Book your slot directly via WhatsApp.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: filter === tab ? 'var(--navy)' : 'var(--bg-subtle)',
                color: filter === tab ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${filter === tab ? 'var(--navy)' : 'var(--border)'}`,
              }}
            >
              {tab} <span className="ml-1 opacity-60">({COUNTS[tab]})</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((doc, i) => (
            <div key={doc.name} className="card p-5 flex gap-4 items-start">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: AVATARS[i % AVATARS.length] }}
              >
                {initials(doc.name)}
              </div>

              <div className="flex-1 min-w-0">
                {/* Badge row */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE[doc.cat]}`}>
                    {doc.cat}
                  </span>
                  {doc.avail && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Available Now
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm leading-tight mb-0.5" style={{ color: 'var(--navy)' }}>{doc.name}</h3>
                <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--accent)' }}>{doc.specialty}</p>
                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{doc.qual}</p>

                {/* Timing + Book */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="w-3 h-3" />
                    {doc.timing}
                  </div>
                  <a
                    href={`https://wa.me/923439282179?text=Hello%2C+I+want+to+book+with+${encodeURIComponent(doc.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-green-200"
                  >
                    <WaIcon /> Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom help */}
        <div className="mt-10 text-center card-flat rounded-2xl p-8 max-w-xl mx-auto" style={{ background: 'var(--bg-subtle)' }}>
          <p className="font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>Not sure which specialist to see?</p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>Tell us your concern and we'll guide you to the right doctor.</p>
          <a
            href="https://wa.me/923439282179?text=Hello%2C+I+need+help+choosing+the+right+specialist."
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
