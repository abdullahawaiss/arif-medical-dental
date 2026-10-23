'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: 4,
      height: '100vh',
      background: 'rgba(196,22,52,.10)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: '100%',
        height: `${pct}%`,
        background: 'linear-gradient(180deg, #c41634 0%, #8a0e25 100%)',
        borderRadius: '0 0 3px 3px',
        transition: 'height .05s linear',
        boxShadow: '2px 0 8px rgba(196,22,52,.35)',
      }} />
    </div>
  )
}
