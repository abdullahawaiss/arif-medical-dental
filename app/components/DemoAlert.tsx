'use client'
import { useEffect, useState } from 'react'

export default function DemoAlert() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600)
    const hideTimer = setTimeout(() => setVisible(false), 2000)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'var(--navy)',
      color: '#fff',
      padding: '14px 28px',
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 600,
      boxShadow: '0 8px 32px rgba(0,0,0,.35)',
      border: '1px solid rgba(255,255,255,.12)',
      whiteSpace: 'nowrap',
      opacity: fading ? 0 : 1,
      transition: 'opacity .4s ease',
      pointerEvents: 'none',
    }}>
      ⚠️ یہ ایک Demo Website ہے
    </div>
  )
}
