'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'

/* ══════════════════════════════════════════════════════
   CANVAS — aurora particles + ECG
   ══════════════════════════════════════════════════════ */
function useCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let W = 0, H = 0, raf = 0
    let aT = 0, dnaT = 0, ecgT = 0
    const RED:[number,number,number]=[196,22,52], NAVY:[number,number,number]=[21,37,64], TEAL:[number,number,number]=[20,120,140]

    interface P { x:number;y:number;vx:number;vy:number;r:number;col:[number,number,number] }
    let pts: P[] = []
    const ecgBuf:{x:number;y:number}[] = []

    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight
      c.width = W * devicePixelRatio; c.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      pts = []
      const n = Math.min(Math.floor(W * H / 9000), 60)
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random()*W, y: Math.random()*H,
        vx:(Math.random()-.5)*.38, vy:(Math.random()-.5)*.38,
        r: Math.random()*1.8+.6,
        col: Math.random()<.38 ? RED : (Math.random()<.5 ? NAVY : TEAL),
      })
    }

    function ecgShape(t:number){ const p=((t*1.1)%200)/200; if(p<.08)return 0; if(p<.13)return -5; if(p<.17)return 10; if(p<.19)return -4; if(p<.29)return 0; if(p<.34)return 38; if(p<.38)return -11; if(p<.48)return 4; if(p<.52)return -2; return 0 }

    const frame = () => {
      if (!W || !H) { raf = requestAnimationFrame(frame); return }
      ctx.clearRect(0,0,W,H)
      aT+=.007; dnaT+=.014; ecgT+=1.6

      /* aurora blobs */
      const blobs=[
        {nx:.68,ny:.35,r:.28,c:NAVY, a:.04,ox:Math.sin(aT*.8)*60,  oy:Math.cos(aT*.6)*50},
        {nx:.14,ny:.60,r:.22,c:NAVY, a:.03,ox:Math.sin(aT*.5)*50,  oy:Math.cos(aT*.7)*45},
        {nx:.48,ny:.10,r:.18,c:TEAL, a:.03,ox:Math.sin(aT*.9)*70,  oy:Math.cos(aT*.4)*35},
        {nx:.88,ny:.76,r:.20,c:NAVY, a:.03,ox:Math.cos(aT*.6)*55,  oy:Math.sin(aT*.5)*50},
        {nx:.30,ny:.28,r:.16,c:TEAL, a:.03,ox:Math.sin(aT*.7)*45,  oy:Math.cos(aT*.8)*40},
      ]
      blobs.forEach(b=>{
        const bx=(b.nx*W)+b.ox, by=(b.ny*H)+b.oy, br=b.r*Math.min(W,H)
        const g=ctx.createRadialGradient(bx,by,0,bx,by,br)
        g.addColorStop(0,`rgba(${b.c},${b.a})`); g.addColorStop(1,'rgba(0,0,0,0)')
        ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
      })

      /* particle network — connections */
      const MAX=W*.15
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=(pts[i].x-pts[j].x), dy=(pts[i].y-pts[j].y), d=Math.sqrt(dx*dx+dy*dy)
        if(d<MAX){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(${pts[i].col},${(1-d/MAX)*.18})`; ctx.lineWidth=.65; ctx.stroke() }
      }
      /* particle dots */
      pts.forEach(p=>{
        const gr=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5)
        gr.addColorStop(0,`rgba(${p.col},.65)`); gr.addColorStop(1,`rgba(${p.col},0)`)
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${p.col},.92)`; ctx.fill()
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0
      })

      /* DNA double helix — right 22% */
      const dxc=W*.80, damp=W*.022, dtop=H*.15, dbot=H*.85, STEPS=72
      const s1x:number[]=[],s1y:number[]=[],s2x:number[]=[],s2y:number[]=[]
      for(let i=0;i<=STEPS;i++){
        const t=i/STEPS, y=dtop+t*(dbot-dtop), ph=dnaT+t*Math.PI*5
        s1x.push(dxc+Math.sin(ph)*damp); s1y.push(y)
        s2x.push(dxc+Math.sin(ph+Math.PI)*damp); s2y.push(y)
      }
      ctx.beginPath(); s1x.forEach((x,i)=>i===0?ctx.moveTo(x,s1y[i]):ctx.lineTo(x,s1y[i]))
      ctx.strokeStyle='rgba(196,22,52,.30)'; ctx.lineWidth=1.6; ctx.shadowColor='rgba(196,22,52,.25)'; ctx.shadowBlur=5; ctx.stroke(); ctx.shadowBlur=0
      ctx.beginPath(); s2x.forEach((x,i)=>i===0?ctx.moveTo(x,s2y[i]):ctx.lineTo(x,s2y[i]))
      ctx.strokeStyle='rgba(21,37,64,.38)'; ctx.lineWidth=1.6; ctx.shadowColor='rgba(21,37,64,.3)'; ctx.shadowBlur=5; ctx.stroke(); ctx.shadowBlur=0
      for(let i=0;i<=STEPS;i+=4){ ctx.beginPath(); ctx.moveTo(s1x[i],s1y[i]); ctx.lineTo(s2x[i],s2y[i]); ctx.strokeStyle='rgba(196,22,52,.09)'; ctx.lineWidth=1; ctx.stroke() }
      for(let i=0;i<=STEPS;i+=8){
        const ph=dnaT+(i/STEPS)*Math.PI*5, glow=(Math.sin(ph*2+dnaT)*.5+.5)
        ;([{x:s1x[i],y:s1y[i],c:RED},{x:s2x[i],y:s2y[i],c:NAVY}] as {x:number;y:number;c:[number,number,number]}[]).forEach(n=>{
          const ng=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,5+glow*4)
          ng.addColorStop(0,`rgba(${n.c},${.55+glow*.4})`); ng.addColorStop(1,`rgba(${n.c},0)`)
          ctx.beginPath(); ctx.arc(n.x,n.y,5+glow*4,0,Math.PI*2); ctx.fillStyle=ng; ctx.fill()
          ctx.beginPath(); ctx.arc(n.x,n.y,2,0,Math.PI*2); ctx.fillStyle=`rgba(${n.c},.88)`; ctx.fill()
        })
      }

      /* ECG heartbeat — bottom strip */
      const ex0=W*.04, exW=W*.56, ebaseY=H*.83
      const ex=ex0+(ecgT%(exW))
      ecgBuf.push({x:ex,y:ebaseY+ecgShape(ecgT)})
      if(ecgBuf.length>520) ecgBuf.shift()
      if(ecgBuf.length>1){
        ctx.beginPath(); ctx.moveTo(ecgBuf[0].x,ecgBuf[0].y)
        for(let i=1;i<ecgBuf.length;i++){
          if(ecgBuf[i].x<ecgBuf[i-1].x-5){ ctx.stroke(); ctx.beginPath(); ctx.moveTo(ecgBuf[i].x,ecgBuf[i].y) }
          else ctx.lineTo(ecgBuf[i].x,ecgBuf[i].y)
        }
        ctx.strokeStyle='rgba(196,22,52,.52)'; ctx.lineWidth=1.5; ctx.shadowColor='rgba(196,22,52,.42)'; ctx.shadowBlur=8; ctx.stroke(); ctx.shadowBlur=0
      }
      if(ecgBuf.length){ const tip=ecgBuf[ecgBuf.length-1]; const tg=ctx.createRadialGradient(tip.x,tip.y,0,tip.x,tip.y,12); tg.addColorStop(0,'rgba(196,22,52,.88)'); tg.addColorStop(1,'rgba(196,22,52,0)'); ctx.beginPath(); ctx.arc(tip.x,tip.y,12,0,Math.PI*2); ctx.fillStyle=tg; ctx.fill() }

      raf=requestAnimationFrame(frame)
    }
    resize()
    const ro=new ResizeObserver(resize); ro.observe(c)
    raf=requestAnimationFrame(frame)
    return()=>{ cancelAnimationFrame(raf); ro.disconnect() }
  }, [ref])
}

/* ══════════════════════════════════════════════════════
   WORD CYCLE — 21st.dev lower-third slide style
   ══════════════════════════════════════════════════════ */
const WORDS = ['Health', 'Smile', 'Family', 'Future', 'Wellness']
function WordCycle() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'in'|'out'>('in')
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{ setMounted(true) },[])
  useEffect(() => {
    const t = setInterval(() => {
      setPhase('out')
      setTimeout(() => { setIdx(i=>(i+1)%WORDS.length); setPhase('in') }, 380)
    }, 2600)
    return ()=>clearInterval(t)
  }, [])
  if (!mounted) return <span style={{color:'var(--red)',fontStyle:'italic'}}>{WORDS[0]}</span>
  return (
    <span style={{
      display:'inline-block', color:'var(--red)', fontStyle:'italic',
      position:'relative', overflow:'visible',
      opacity: phase==='in'?1:0,
      transform: phase==='in'?'translateY(0) rotateX(0)':'translateY(14px) rotateX(-20deg)',
      transition:'opacity .36s cubic-bezier(.22,1,.36,1), transform .36s cubic-bezier(.22,1,.36,1)',
      transformOrigin:'top center',
    }}>
      {WORDS[idx]}
      <span style={{
        position:'absolute', bottom:-3, left:0, right:0, height:2.5,
        background:'linear-gradient(90deg,var(--red),rgba(196,22,52,.25))',
        borderRadius:2,
        transform: phase==='in'?'scaleX(1)':'scaleX(0)',
        transformOrigin:'left',
        transition:'transform .5s cubic-bezier(.22,1,.36,1) .1s',
      }}/>
    </span>
  )
}

/* ══════════════════════════════════════════════════════
   TYPEWRITER eyebrow (lower-third reveal style)
   ══════════════════════════════════════════════════════ */
const EB = 'TRUSTED MEDICAL & DENTAL CARE · ISLAMABAD'
function EyebrowType() {
  const [n, setN] = useState(0)
  useEffect(()=>{
    if(n>=EB.length) return
    const t=setTimeout(()=>setN(v=>v+1),42)
    return()=>clearTimeout(t)
  },[n])
  return (
    <span>{EB.slice(0,n)}{n<EB.length&&<span style={{
      display:'inline-block',width:1.5,height:'0.85em',
      background:'var(--red)',verticalAlign:'middle',marginLeft:2,
      animation:'twB .85s step-end infinite',
    }}/>}</span>
  )
}

/* ══════════════════════════════════════════════════════
   COUNTER
   ══════════════════════════════════════════════════════ */
function Counter({to,suf=''}:{to:number;suf?:string}){
  const [v,setV]=useState(0); const ref=useRef<HTMLSpanElement>(null)
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return; ob.disconnect()
      let s=0; const step=()=>{ s+=Math.ceil((to-s)/7); setV(Math.min(s,to)); if(s<to) requestAnimationFrame(step) }
      requestAnimationFrame(step)
    },{threshold:.3})
    if(ref.current) ob.observe(ref.current)
    return()=>ob.disconnect()
  },[to])
  return <span ref={ref}>{v}{suf}</span>
}

const STATS=[
  {to:15,suf:'+',label:'Specialists'},
  {fixed:'24/7',label:'Emergency'},
  {to:6,suf:'+',label:'Departments'},
  {fixed:'100%',label:'Dedicated'},
]
const FEATURES=[
  {icon:'👨‍⚕️',title:'Experienced Doctors', desc:'Qualified & caring practitioners'},
  {icon:'📅',title:'Easy Appointments',  desc:'Book via WhatsApp or call'},
  {icon:'🏥',title:'Modern Equipment',   desc:'Clean, hygienic environment'},
  {icon:'📍',title:'Jinnah Garden',      desc:'Easily accessible location'},
]

function WaIcon(){return(
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:17,height:17,flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)}

/* ══════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════ */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvas(canvasRef)

  return (
    <>
      <section id="home" className="hv3">

        {/* Gradient tint on top */}
        <div className="hv3-bg" aria-hidden/>
        {/* Canvas */}
        <canvas ref={canvasRef} className="hv3-canvas" aria-hidden/>
        {/* Dot grid */}
        <div className="hv3-dots" aria-hidden/>
        {/* Orbs */}
        <div className="hv3-orbs" aria-hidden>
          <div className="hv3-orb o1"/><div className="hv3-orb o2"/><div className="hv3-orb o3"/>
          <div className="hv3-ring r1"/><div className="hv3-ring r2"/>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="container hv3-inner">

          {/* LEFT */}
          <div className="hv3-left">
            {/* Lower-third accent bar — 21st.dev style */}
            <div className="hv3-lt-bar" style={{animationDelay:'.05s'}}>
              <span className="hv3-lt-accent"/>
              <EyebrowType/>
            </div>

            {/* H1 with sliding word */}
            <h1 className="hv3-h1" style={{animationDelay:'.15s'}}>
              Complete Care<br/>
              for Your <WordCycle/>,<br/>
              <span className="hv3-h1-muted">Under One Roof</span>
            </h1>

            {/* Lower-third name reveal (21st.dev style) */}
            <div className="hv3-name-reveal" style={{animationDelay:'.28s'}}>
              <div className="hv3-nr-line"/>
              <div className="hv3-nr-text">
                <span className="hv3-nr-name">Arif Medical and Dental Complex</span>
                <span className="hv3-nr-title">Est. Jinnah Garden · Islamabad</span>
              </div>
            </div>

            <p className="hv3-sub" style={{animationDelay:'.38s'}}>
              General medical consultations and complete dental treatment in one welcoming clinic — experienced practitioners, modern equipment, all for your family.
            </p>

            <div className="hv3-ctas" style={{animationDelay:'.48s'}}>
              <a href="https://wa.me/923439282179?text=Hi%2C+I%27d+like+to+book+an+appointment+at+Arif+Medical+and+Dental+Complex"
                target="_blank" rel="noopener noreferrer" className="hv3-btn hv3-btn-red">
                <WaIcon/> Book an Appointment
                <span className="hv3-shine"/>
              </a>
              <a href="tel:0515148373" className="hv3-btn hv3-btn-outline">
                <Phone size={14} style={{flexShrink:0}}/> Call 051 5148373
              </a>
            </div>

            <div className="hv3-trust" style={{animationDelay:'.6s'}}>
              {['✓ Board-Qualified','✓ 24/7 Emergency','✓ Family-Friendly'].map((t,i)=>(
                <span key={t} className="hv3-badge" style={{animationDelay:`${.6+i*.07}s`}}>{t}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — Dr. Arif / doctor photo */}
          <div className="hv3-right">
            {/* Background glow */}
            <div className="hv3-glow"/>

            {/* DOCTOR IMAGE */}
            <div className="hv3-doc">
              <Image
                src="/images/doctor-hero.webp"
                alt="Doctor consulting patient — Arif Medical and Dental Complex"
                fill
                priority
                sizes="(max-width: 920px) 100vw, 420px"
                className="hv3-doc-img"
                style={{objectFit:'contain',objectPosition:'center bottom'}}
              />
            </div>

            {/* Hours badge */}
            <div className="hv3-hbadge">
              <span className="hv3-dot"/> Open Mon–Sat · 11 AM – 8 PM
            </div>

            {/* Rating card — links to real Google reviews */}
            <a
              href="https://www.google.com/search?q=arif+medical+and+dental+complex#lrd=0x38dfbfd20ffe59b7:0x5e0ae7a3c7e70a50,1"
              target="_blank"
              rel="noopener noreferrer"
              className="hv3-rcard"
              style={{textDecoration:'none',cursor:'pointer'}}
              title="See our Google Reviews"
            >
              <div className="hv3-rcard-stars">★★★★★</div>
              <p className="hv3-rcard-v">4.9 / 5</p>
              <p className="hv3-rcard-l">Google Reviews ↗</p>
            </a>
          </div>
        </div>

        {/* ── FEATURES BAR ── */}
        <div className="hv3-bar">
          <div className="hv3-bar-shine"/>
          <div className="container hv3-bar-grid">
            {FEATURES.map((f,i)=>(
              <div key={f.title} className="hv3-bi" style={{animationDelay:`${.8+i*.07}s`}}>
                <span className="hv3-bicon" style={{animationDelay:`${i*.55}s`}}>{f.icon}</span>
                <div><p className="hv3-bt">{f.title}</p><p className="hv3-bd">{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes twB { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes hv3Up {
          from{opacity:0;transform:translateY(22px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes ltSlide {
          from{opacity:0;transform:translateX(-16px)}
          to{opacity:1;transform:translateX(0)}
        }
        @keyframes ltLine {
          from{height:0;opacity:0}
          to{height:100%;opacity:1}
        }
        @keyframes btnShine {
          0%{left:-100%}38%{left:140%}100%{left:140%}
        }
        @keyframes barS { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes docF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes glowP {
          from{transform:translateX(-50%) scale(.85);opacity:.5}
          to{transform:translateX(-50%) scale(1.15);opacity:1}
        }
        @keyframes cpulse {
          0%,100%{box-shadow:0 20px 64px rgba(21,37,64,.12),0 0 0 1px rgba(196,22,52,.06)}
          50%{box-shadow:0 26px 88px rgba(196,22,52,.14),0 0 0 1px rgba(196,22,52,.18)}
        }
        @keyframes dr { to{transform:translateX(-50%) rotate(360deg)} }
        @keyframes badgeF { 0%,100%{transform:translateY(0) rotate(-.3deg)} 50%{transform:translateY(-7px) rotate(.3deg)} }
        @keyframes rcardF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes dotP { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.22)} 50%{box-shadow:0 0 0 8px rgba(34,197,94,.06)} }
        @keyframes iconBounce { 0%,100%{transform:translateY(0)}20%{transform:translateY(-5px)}40%{transform:translateY(0)} }
        @keyframes oa { from{transform:translate(0,0) scale(1)} to{transform:translate(-70px,90px) scale(1.25)} }
        @keyframes ob { from{transform:translate(0,0)} to{transform:translate(60px,-70px) scale(1.18)} }
        @keyframes oc { 0%{transform:translate(0,0) scale(1)}50%{transform:translate(-45px,-35px) scale(1.12)}100%{transform:translate(45px,25px) scale(.92)} }
        @keyframes rs1 { to{transform:rotate(360deg)} }
        @keyframes ltName {
          from{opacity:0;transform:translateY(8px) scaleX(.96)}
          to{opacity:1;transform:translateY(0) scaleX(1)}
        }

        /* ═══ SECTION ═══ */
        .hv3 {
          position:relative; overflow:hidden;
          display:flex; flex-direction:column;
          background:#ffffff; isolation:isolate;
        }

        /* hex grid removed */

        /* ── Pulse rings (HTML, at Dr. position) ── */
        .hv3-pr {
          position:absolute; border-radius:50%;
          border:1px solid rgba(196,22,52,.15);
          transform:translate(-50%,-50%) scale(0);
          animation:prOut 5s ease-out infinite;
          pointer-events:none; z-index:2;
        }
        .pr1{width:260px;height:260px;left:73%;top:46%;}
        .pr2{width:440px;height:440px;left:73%;top:46%;animation-delay:1.7s;border-color:rgba(21,37,64,.18);}
        .pr3{width:620px;height:620px;left:73%;top:46%;animation-delay:3.4s;}
        @keyframes prOut {
          0%  {transform:translate(-50%,-50%) scale(.04);opacity:.85}
          100%{transform:translate(-50%,-50%) scale(1);opacity:0}
        }

        /* ── Medical cross accents ── */
        .hv3-cross { position:absolute; pointer-events:none; z-index:2; opacity:0; animation:crossFd 10s ease-in-out infinite; }
        .hv3-cross::before,.hv3-cross::after { content:''; position:absolute; background:rgba(196,22,52,.18); border-radius:2px; }
        .hv3-cross::before{width:2px;height:22px;left:10px;top:0}
        .hv3-cross::after {width:22px;height:2px;left:0;top:10px}
        @keyframes crossFd{0%,100%{opacity:0;transform:scale(.5)}30%,70%{opacity:1;transform:scale(1)}}
        .cx1{left:8%;top:16%;animation-delay:0s}
        .cx2{left:91%;top:13%;animation-delay:3.5s}
        .cx3{left:7%;top:78%;animation-delay:7s}
        .cx4{left:92%;top:80%;animation-delay:2s}

        .hv3-bg {
          position:absolute; inset:0; z-index:2;
          background:
            radial-gradient(ellipse 85% 65% at 68% 32%, rgba(21,37,64,.03) 0%, transparent 55%),
            radial-gradient(ellipse 65% 85% at 12% 68%, rgba(21,37,64,.03) 0%, transparent 50%);
        }
        .hv3-canvas { position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;will-change:auto }
        .hv3-dots { display:none }
        .hv3-orbs { position:absolute;inset:0;z-index:5;pointer-events:none;overflow:hidden }
        .hv3-orb  { position:absolute;border-radius:50%;filter:blur(88px) }
        .o1 { width:620px;height:620px;top:-240px;right:-140px;
              background:radial-gradient(circle,rgba(21,37,64,.04) 0%,transparent 60%);
              animation:oa 22s ease-in-out infinite alternate }
        .o2 { width:430px;height:430px;bottom:-170px;left:-100px;
              background:radial-gradient(circle,rgba(21,37,64,.03) 0%,transparent 60%);
              animation:ob 28s ease-in-out infinite alternate }
        .o3 { display:none }
        .hv3-ring { position:absolute;border-radius:50%;border-style:dashed }
        .r1 { width:380px;height:380px;top:-70px;right:100px;
              border:1.5px dashed rgba(196,22,52,.15);
              animation:rs1 48s linear infinite }
        .r2 { width:240px;height:240px;bottom:50px;left:45px;
              border:1px dashed rgba(21,37,64,.10);
              animation:rs1 34s linear infinite reverse }

        /* ═══ GRID ═══ */
        .hv3-inner {
          position:relative;z-index:6;
          display:grid; grid-template-columns:1fr 420px;
          gap:36px; align-items:center; padding:48px 20px 22px;
        }

        /* ═══ LEFT ═══ */
        .hv3-left>* { animation:hv3Up .7s cubic-bezier(.22,1,.36,1) both }

        /* Lower-third accent bar (21st.dev style) */
        .hv3-lt-bar {
          display:flex; align-items:center; gap:10px;
          font-size:10.5px; font-weight:700; letter-spacing:.2em;
          text-transform:uppercase; color:rgba(21,37,64,.55);
          margin-bottom:18px;
          animation:ltSlide .6s cubic-bezier(.22,1,.36,1) both;
          overflow:hidden;
        }
        .hv3-lt-accent {
          display:block; flex-shrink:0; width:3px; border-radius:2px;
          background:linear-gradient(180deg,var(--red),rgba(196,22,52,.3));
          animation:ltLine .5s ease .1s both;
          height:22px;
        }

        .hv3-h1 {
          font-family:var(--font-serif);
          font-size:clamp(1.7rem,3.3vw,2.9rem);
          font-weight:400; color:var(--navy);
          line-height:1.11; letter-spacing:-.028em;
          margin:0 0 18px;
        }
        .hv3-h1-muted { color:rgba(21,37,64,.45); font-weight:300 }

        /* Lower-third name reveal (21st.dev style) */
        .hv3-name-reveal {
          display:flex; align-items:center; gap:12px; margin-bottom:16px;
          animation:ltSlide .65s cubic-bezier(.22,1,.36,1) .2s both;
        }
        .hv3-nr-line {
          width:3px; border-radius:2px; align-self:stretch; flex-shrink:0;
          background:linear-gradient(180deg,var(--red),rgba(196,22,52,.2));
          min-height:32px;
        }
        .hv3-nr-text { display:flex; flex-direction:column; gap:1px; overflow:hidden }
        .hv3-nr-name {
          font-family:var(--font-serif); font-size:.95rem; font-weight:500;
          color:var(--navy); line-height:1.2;
          animation:ltName .5s cubic-bezier(.22,1,.36,1) .35s both;
        }
        .hv3-nr-title {
          font-size:10.5px; font-weight:600; color:var(--muted-2);
          letter-spacing:.05em; text-transform:uppercase;
          animation:ltName .5s cubic-bezier(.22,1,.36,1) .45s both;
        }

        .hv3-sub { font-size:.91rem;color:var(--muted);line-height:1.8;max-width:480px;margin:0 0 22px }
        .hv3-ctas { display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px }

        /* Buttons */
        .hv3-btn {
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 24px;border-radius:10px;font-size:.9rem;font-weight:700;
          cursor:pointer;transition:transform .22s,box-shadow .22s;
          position:relative;overflow:hidden;text-decoration:none;
        }
        .hv3-btn:hover { transform:translateY(-3px) }
        .hv3-btn-red {
          background:var(--red);color:#fff;
          box-shadow:0 4px 20px rgba(196,22,52,.36);
        }
        .hv3-btn-red:hover { box-shadow:0 8px 32px rgba(196,22,52,.52) }
        .hv3-shine {
          position:absolute;top:0;left:-100%;width:55%;height:100%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.28),transparent);
          animation:btnShine 3.5s ease-in-out infinite 1.4s;
        }
        .hv3-btn-outline {
          background:rgba(21,37,64,.06);color:var(--navy);
          border:1.5px solid rgba(21,37,64,.22);
          box-shadow:0 2px 8px rgba(21,37,64,.10);
        }
        .hv3-btn-outline:hover { background:rgba(21,37,64,.10);border-color:rgba(21,37,64,.40);box-shadow:0 8px 24px rgba(21,37,64,.16) }

        .hv3-trust { display:flex;flex-wrap:wrap;gap:8px }
        .hv3-badge {
          font-size:11px;font-weight:600;color:rgba(21,37,64,.65);letter-spacing:.03em;
          padding:5px 13px;background:rgba(21,37,64,.05);
          border:1px solid rgba(21,37,64,.12);border-radius:100px;
          animation:hv3Up .6s cubic-bezier(.22,1,.36,1) both;
          backdrop-filter:blur(6px);
          transition:background .2s,color .2s,border-color .2s;
        }
        .hv3-badge:hover { background:rgba(196,22,52,.12);border-color:rgba(196,22,52,.35);color:var(--red) }

        /* ═══ RIGHT — DOCTOR ═══ */
        .hv3-right {
          position:relative;height:460px;z-index:4;
          animation:hv3Up .85s cubic-bezier(.22,1,.36,1) .1s both;
        }

        .hv3-glow {
          position:absolute;width:380px;height:380px;border-radius:50%;
          bottom:-35px;left:50%;transform:translateX(-50%);
          background:radial-gradient(circle,rgba(196,22,52,.12) 0%,transparent 65%);
          filter:blur(40px);
          animation:glowP 7s ease-in-out infinite alternate;
        }
        /* .hv3-circle removed — image fills arch directly */
        .hv3-dring { position:absolute;border-radius:50%;border-style:dashed }
        .dr1 { width:366px;height:366px;bottom:-23px;left:50%;transform:translateX(-50%);
               border:1.5px dashed rgba(196,22,52,.14);animation:dr 30s linear infinite;z-index:2 }
        .dr2 { width:406px;height:406px;bottom:-43px;left:50%;transform:translateX(-50%);
               border:1px dashed rgba(21,37,64,.065);animation:dr 44s linear infinite reverse;z-index:2 }
        .dr3 { width:444px;height:444px;bottom:-62px;left:50%;transform:translateX(-50%);
               border:.5px dashed rgba(196,22,52,.055);animation:dr 60s linear infinite;z-index:2 }

        .hv3-doc {
          position:absolute; inset:0; z-index:3; overflow:hidden;
          border-radius:20px;
          filter:drop-shadow(0 24px 40px rgba(21,37,64,.16));
          animation:docF 6s ease-in-out infinite;
        }
        /* Hospital background image — animated pan */
        .hv3-hosp-bg {
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;object-position:center;display:block;
          animation:hospPan 14s ease-in-out infinite alternate;
          filter:saturate(1.1) brightness(1.05);
          z-index:0;
        }
        @keyframes hospPan {
          0%   { transform:scale(1.08) translate(0,0); }
          33%  { transform:scale(1.12) translate(-2%,1%); }
          66%  { transform:scale(1.10) translate(2%,-1%); }
          100% { transform:scale(1.14) translate(-1%,2%); }
        }
        /* Cream-warm gradient over hospital bg */
        .hv3-hosp-overlay {
          position:absolute;inset:0;z-index:1;
          background:linear-gradient(
            180deg,
            rgba(245,240,232,0.18) 0%,
            rgba(196,22,52,0.06) 40%,
            rgba(21,37,64,0.52) 100%
          );
        }
        /* Doctor image on top of hospital bg */
        .hv3-doc-img {
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;object-position:top center;display:block;
          z-index:2;
        }

        /* Lower-third doctor name — centered with margin:auto, no transform conflict */
        .hv3-doctor-lt {
          position:absolute; bottom:18px; left:0; right:0; margin:0 auto;
          width:fit-content;
          display:flex;align-items:center;gap:8px;
          background:rgba(255,255,255,.88);
          backdrop-filter:blur(12px);
          border:1px solid rgba(21,37,64,.08); border-radius:100px;
          padding:7px 16px 7px 8px; z-index:5; white-space:nowrap;
          box-shadow:0 6px 24px rgba(21,37,64,.12);
          animation:docLtIn .7s cubic-bezier(.22,1,.36,1) .6s both;
        }
        @keyframes docLtIn {
          from{opacity:0;transform:translateY(10px)}
          to{opacity:1;transform:translateY(0)}
        }
        .hv3-dlt-bar {
          width:3px;height:32px;border-radius:2px;flex-shrink:0;
          background:linear-gradient(180deg,var(--red),rgba(196,22,52,.3));
        }
        .hv3-dlt-name {
          font-family:var(--font-serif);font-size:.95rem;font-weight:500;
          color:var(--navy);line-height:1.2;
        }
        .hv3-dlt-role {
          font-size:9.5px;font-weight:600;color:var(--muted-2);
          text-transform:uppercase;letter-spacing:.06em;
        }

        /* Hours badge */
        .hv3-hbadge {
          position:absolute;top:14px;right:-8px;z-index:5;
          background:#fff;border:1px solid rgba(21,37,64,.08);border-radius:100px;
          padding:7px 14px;font-size:11.5px;font-weight:600;color:var(--navy);
          display:flex;align-items:center;gap:7px;
          box-shadow:0 4px 24px rgba(21,37,64,.10);white-space:nowrap;
          animation:badgeF 5s ease-in-out infinite;
        }
        .hv3-dot {
          width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;
          animation:dotP 2.4s ease-in-out infinite;
        }

        /* Rating card */
        .hv3-rcard {
          position:absolute;top:80px;right:-14px;z-index:5;
          background:#fff;border:1px solid rgba(21,37,64,.07);border-radius:14px;
          padding:10px 14px;text-align:center;
          box-shadow:0 6px 24px rgba(21,37,64,.10);
          animation:rcardF 7s ease-in-out infinite 1.2s;
        }
        .hv3-rcard-stars { color:#f59e0b;font-size:11px;letter-spacing:1px;margin-bottom:2px }
        .hv3-rcard-v { font-family:var(--font-serif);font-size:1.1rem;font-weight:600;color:var(--navy);line-height:1.1 }
        .hv3-rcard-l { font-size:9px;font-weight:600;color:var(--muted-2);text-transform:uppercase;letter-spacing:.07em }

        /* ═══ STATS STRIP ═══ */
        .hv3-stats-wrap {
          position:relative;z-index:4;
          background:#f5f8fc;
          border-top:1px solid rgba(21,37,64,.10); border-bottom:1px solid rgba(21,37,64,.10);
          padding:16px 0;overflow:hidden;
        }
        .hv3-stats { display:grid;grid-template-columns:repeat(4,1fr) }
        .hv3-stat { min-width:0 }
        .hv3-stat {
          display:flex;flex-direction:column;gap:2px;
          align-items:center;text-align:center;padding:4px 0;
          border-right:1px solid rgba(21,37,64,.065);
          animation:hv3Up .7s cubic-bezier(.22,1,.36,1) both;
          transition:background .2s;
        }
        .hv3-stat:last-child { border-right:none }
        .hv3-stat:hover { background:rgba(196,22,52,.03) }
        .hv3-sn {
          font-family:var(--font-serif);font-size:1.5rem;font-weight:600;
          background:linear-gradient(135deg,var(--navy),var(--red));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;line-height:1;
        }
        .hv3-sl { font-size:9px;font-weight:700;color:#8094aa;text-transform:uppercase;letter-spacing:.12em }

        /* ═══ FEATURES BAR ═══ */
        .hv3-bar {
          background:#f8fafc;
          border-top:1px solid rgba(21,37,64,.09);
          border-bottom:1px solid rgba(21,37,64,.09);
          padding:20px 0;position:relative;z-index:4;overflow:hidden
        }
        .hv3-bar-shine { display:none }
        .hv3-bar-grid { position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,1fr);gap:12px }
        .hv3-bi {
          display:flex;align-items:center;gap:12px;
          padding:8px 12px;border-radius:12px;
          animation:hv3Up .65s cubic-bezier(.22,1,.36,1) both;
          transition:background .2s,transform .2s;
          border:1px solid transparent;
        }
        .hv3-bi:hover { background:rgba(196,22,52,.05);border-color:rgba(196,22,52,.12);transform:translateY(-2px) }
        .hv3-bicon { font-size:22px;flex-shrink:0;animation:iconBounce 5s ease-in-out infinite }
        .hv3-bi:nth-child(2) .hv3-bicon{animation-delay:.6s}
        .hv3-bi:nth-child(3) .hv3-bicon{animation-delay:1.2s}
        .hv3-bi:nth-child(4) .hv3-bicon{animation-delay:1.8s}
        .hv3-bt { font-size:13px;font-weight:700;color:var(--navy);margin-bottom:1px }
        .hv3-bd { font-size:11px;color:var(--muted) }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width:920px){
          .hv3-inner { grid-template-columns:1fr;padding:34px 20px 18px !important;gap:24px }
          .hv3-right {
            order:-1;height:320px;
            background:radial-gradient(ellipse 85% 70% at 50% 55%,rgba(21,37,64,.06) 0%,transparent 100%);
            border-radius:18px;
          }
          .hv3-glow   { width:290px;height:290px }
          .dr1{width:286px;height:286px}.dr2{width:322px;height:322px}.dr3{width:352px;height:352px}
          .hv3-bar-grid { grid-template-columns:repeat(2,1fr) }
          .hv3-h1 { font-size:clamp(1.65rem,5vw,2.25rem) }
          .hv3-hbadge { right:2px }
          .hv3-rcard  { right:2px;top:70px }
        }
        /* MOBILE: hide doctor image, show full text */
        @media (max-width:640px){
          .hv3-right  { display:none !important }
          .hv3-inner  { grid-template-columns:1fr;padding:28px 20px 16px !important;gap:0 }
          .hv3-sn     { font-size:1.15rem }
          .hv3-sl     { font-size:7.5px;letter-spacing:.07em }
          .hv3-sub    { display:block !important;font-size:.89rem;max-width:100% }
          .hv3-name-reveal { display:flex !important }
          .hv3-h1     { font-size:clamp(1.65rem,7vw,2.1rem) }
          .hv3-bar-grid { grid-template-columns:repeat(2,1fr);gap:6px }
          .hv3-bar    { padding:14px 0 }
          .hv3-bi     { padding:6px 8px;gap:8px }
          .hv3-bicon  { font-size:18px }
          .hv3-bt     { font-size:11px }
          .hv3-bd     { font-size:9.5px }
          .hv3-btn    { padding:12px 18px;font-size:.87rem }
          .r1,.r2     { display:none }
          .hv3-ctas   { flex-direction:column;gap:8px }
          .hv3-btn    { justify-content:center;width:100% }
        }
        @media (max-width:390px){
          .hv3-inner  { padding:16px 20px 12px !important }
          .hv3-h1     { font-size:1.42rem !important }
          .hv3-sub    { font-size:.85rem !important }
          .hv3-btn    { padding:10px 14px;font-size:.82rem }
          .hv3-bar-grid { grid-template-columns:repeat(2,1fr);gap:6px }
        }
      `}</style>
    </>
  )
}
