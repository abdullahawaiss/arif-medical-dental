'use client'

const SPECIALITIES = [
  // Medical
  { name: 'General Medicine', icon: '🩺', cat: 'Medical' },
  { name: 'Cardiology', icon: '❤️', cat: 'Medical' },
  { name: 'Dermatology', icon: '✨', cat: 'Medical' },
  { name: 'Pediatrics', icon: '👶', cat: 'Medical' },
  { name: 'Pulmonology', icon: '🫁', cat: 'Medical' },
  { name: 'Neurology', icon: '🧠', cat: 'Medical' },
  { name: 'Gastroenterology', icon: '🔬', cat: 'Medical' },
  { name: 'Nephrology', icon: '💊', cat: 'Medical' },
  { name: 'Endocrinology', icon: '⚗️', cat: 'Medical' },
  { name: 'Rheumatology', icon: '🦴', cat: 'Medical' },
  { name: 'Psychology', icon: '🧩', cat: 'Medical' },
  { name: 'Psychiatry', icon: '🪄', cat: 'Medical' },
  { name: 'Physiotherapy', icon: '🏃', cat: 'Medical' },
  { name: 'Radiology', icon: '📡', cat: 'Medical' },
  { name: 'Diet & Nutrition', icon: '🥗', cat: 'Medical' },
  // Dental
  { name: 'Dental Care', icon: '🦷', cat: 'Dental' },
  // Surgical
  { name: 'General Surgery', icon: '🔪', cat: 'Surgical' },
  { name: 'Orthopedics', icon: '🦵', cat: 'Surgical' },
  { name: 'ENT', icon: '👂', cat: 'Surgical' },
  { name: 'Gynecology', icon: '👩‍⚕️', cat: 'Surgical' },
  { name: 'Urology', icon: '⚕️', cat: 'Surgical' },
  { name: 'Neurosurgery', icon: '🧬', cat: 'Surgical' },
  { name: 'Vascular Surgery', icon: '🩸', cat: 'Surgical' },
  { name: 'Ophthalmology', icon: '👁️', cat: 'Surgical' },
  { name: 'Plastic Surgery', icon: '💎', cat: 'Surgical' },
  { name: 'Pediatric Surgery', icon: '🧸', cat: 'Surgical' },
  { name: 'Ortho & Spine', icon: '🦴', cat: 'Surgical' },
  { name: 'Breast Surgery', icon: '⚕️', cat: 'Surgical' },
]

const CAT_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Medical: { bg: 'bg-sky-500/5 hover:bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  Dental: { bg: 'bg-teal-500/5 hover:bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  Surgical: { bg: 'bg-amber-500/5 hover:bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
}

export default function Specialities() {
  return (
    <section id="specialities" className="relative py-20 sm:py-28">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #152540 0%, #020814 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="badge badge-dental mb-4">Specialities</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3">
            30+ Medical{' '}
            <span className="gradient-text">Specialities</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Comprehensive care organized so you always know where to turn — medical, dental, and surgical specialists all in one clinic.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {SPECIALITIES.map((s, i) => {
            const style = CAT_STYLE[s.cat]
            return (
              <div
                key={s.name}
                className={`group relative rounded-2xl border ${style.border} ${style.bg} p-4 text-center cursor-default transition-all duration-200 card-lift`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {s.icon}
                </div>
                <p className="text-white text-xs font-semibold leading-tight">{s.name}</p>
                <p className={`text-[10px] mt-1 font-medium ${style.text}`}>{s.cat}</p>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          {(['Medical', 'Dental', 'Surgical'] as const).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <span className={`badge ${cat === 'Medical' ? 'badge-medical' : cat === 'Dental' ? 'badge-dental' : 'badge-surgical'}`}>
                {cat}
              </span>
              <span className="text-slate-400 text-xs">
                {SPECIALITIES.filter((s) => s.cat === cat).length} specialities
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
