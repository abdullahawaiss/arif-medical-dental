'use client'
import { useEffect } from 'react'

export default function RevealInit() {
  useEffect(() => {
    const TARGETS = [
      '.section-reveal',
      '[data-reveal]',
    ]

    const all = document.querySelectorAll<HTMLElement>(TARGETS.join(','))
    if (!all.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const delay = el.dataset.revealDelay ? Number(el.dataset.revealDelay) : 0
          setTimeout(() => el.classList.add('revealed'), delay)
          io.unobserve(el)
        })
      },
      { threshold: 0.10, rootMargin: '0px 0px -50px 0px' }
    )

    all.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
