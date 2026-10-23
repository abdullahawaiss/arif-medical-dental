'use client'
import { useState } from 'react'
import { Clock, Phone } from 'lucide-react'

type Category = 'All' | 'Medical' | 'Dental' | 'Surgical'

const DOCTORS = [
  { name: 'Dr. Jihad Ali', specialty: 'General Physician', qual: 'MBBS', timing: '24/7', cat: 'Medical' as Category, available: true },
  { name: 'Dr. Anum Sharif', specialty: 'Skin Specialist', qual: 'MBBS, MCPS, FCPS (Dermatology)', timing: 'Mon-Thu, 7–9pm', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Muhammad Usman', specialty: 'Cardiologist', qual: 'MBBS, FCPS', timing: 'Sat-Thu, 7–10pm', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Asad Shabbir', specialty: 'Child Specialist', qual: 'MBBS, FCPS, PGPN, PhD', timing: 'Mon-Sat, 6–9pm', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Wajahat Shafi', specialty: 'Medical Specialist', qual: 'MBBS, FCPS', timing: 'Sat-Thu, 7–10pm', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Gul-e-Raana', specialty: 'Clinical Psychologist', qual: 'MS Psychology, ICTQual UK', timing: 'Mon-Sat, On-Call', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Shams Haider', specialty: 'Radiologist', qual: 'MBBS, MD, FCPS-II', timing: 'Mon-Thu, 7:30–9:30pm', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Abdullah Bin Khurram', specialty: 'Pulmonologist', qual: 'MBBS', timing: 'On Request', cat: 'Medical' as Category, available: false },
  { name: 'Dr. Mehak Batool', specialty: 'Dentist', qual: 'BDS, RDS', timing: 'Mon-Sat, 10am–3pm', cat: 'Dental' as Category, available: false },
  { name: 'Dr. Waqas Ahmad Rao', specialty: 'Orthopedic Surgeon', qual: 'MBBS, MS Orthopedic', timing: 'Sun-Thu, 7–9pm', cat: 'Surgical' as Category, available: false },
  { name: 'Dr. Inam Ullah', specialty: 'General Surgeon', qual: 'MBBS, FCPS', timing: 'Mon-Sat, 7–9:30pm', cat: 'Surgical' as Category, available: false },
  { name: 'LT. Col. Dr. Atia', specialty: 'General Surgeon', qual: 'MBBS, FCPS, MRCS, CHPE, FISR', timing: 'Mon-Thu, 4–7pm', cat: 'Surgical' as Category, available: false },
  { name: 'Dr. Asad Ullah Khan', specialty: 'ENT Specialist', qual: 'MBBS, FCPS', timing: 'Mon-Sat, 7–9:30pm', cat: 'Surgical' as Category, available: false },
  { name: 'Dr. Sohaib Khalid', specialty: 'Urologist', qual: 'MBBS, FCPS', timing: 'Mon-Fri, 7:30–9:30pm', cat: 'Surgical' as Category, available: false },
  { name: 'Dr. Kishwar Aamir', specialty: 'Gynaecologist', qual: 'MBBS, FCPS', timing: 'Mon-Sat, 10am–2pm', cat: 'Surgical' as Category, available: false },
]

const AVATAR_COLORS = [
  'from-sky-400 to-blue-600',
  'from-teal-400 to-cyan-600',
  'from-amber-400 to-orange-600',
  'from-purple-400 to-violet-600',
  'from-pink-400 to-rose-600',
  'from-emerald-400 to-green-600',
  'from-indigo-400 to-blue-600',
]

const CATEGORY_BADGE: Record<string, string> = {
  Medical: 'badge-medical',
  Dental: 'badge-dental',
  Surgical: 'badge badge-surgical',
}

const FILTER_TABS: Category[] = ['All', 'Medical', 'Dental', 'Surgical']

export default function Doctors() {
  const [filter, setFilter] = useState<Category>('All')

  const filtered = filter === 'All' ? DOCTORS : DOCTORS.filter((d) => d.cat === filter)

  return (
    <section id="doctors" className="relative py-20 sm:py-28 bg-navy-900">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020814 0%, #152540 100%)' }} />

      {/* Decorative lines */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge badge-medical mb-4">Our Team</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3">
            Meet Our{' '}
            <span className="gradient-text">Specialist Doctors</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            15 experienced medical, dental, and surgical practitioners — book directly via WhatsApp.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === tab
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-lg shadow-sky-500/20'
                  : 'glass text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
              <span className={`ml-2 text-xs ${filter === tab ? 'text-white/70' : 'text-slate-500'}`}>
                ({tab === 'All' ? DOCTORS.length : DOCTORS.filter((d) => d.cat === tab).length})
              </span>
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => (
            <div
              key={doc.name}
              className="glass-dark rounded-2xl p-5 card-lift border border-white/5 hover:border-sky-500/20 group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg`}
                >
                  {doc.name.split(' ').find(w => w.length > 2 && !['Dr.', 'LT.', 'Col.'].includes(w))?.[0] ?? doc.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`badge ${CATEGORY_BADGE[doc.cat] ?? 'badge-medical'}`}>{doc.cat}</span>
                    {doc.available && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Available
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-base leading-tight">{doc.name}</h3>
                  <p className="text-sky-400 text-sm font-medium mt-0.5">{doc.specialty}</p>
                  <p className="text-slate-500 text-xs mt-1">{doc.qual}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{doc.timing}</span>
                </div>
                <a
                  href={`https://wa.me/923439282179?text=Hello%2C%20I%20want%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doc.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 glass rounded-3xl p-8 text-center border border-sky-500/10">
          <p className="text-white font-bold text-xl mb-2">Not sure which doctor to see?</p>
          <p className="text-slate-400 text-sm mb-6">Tell us your concern on WhatsApp and we'll guide you to the right specialist.</p>
          <a
            href="https://wa.me/923439282179?text=Hello%2C%20I%20need%20help%20choosing%20the%20right%20doctor."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg"
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
