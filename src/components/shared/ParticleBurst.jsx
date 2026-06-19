import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/**
 * ParticleBurst — fires sand/ink particle explosion on `trigger` change.
 * Place anywhere; particles render fixed over the viewport at origin.
 */
export default function ParticleBurst({ trigger, origin = { x: '50%', y: '50%' }, count = 36, cosmic = false }) {
  const colors = cosmic
    ? ['#7c3aed', '#38bdf8', '#f472b6', '#22d3ee', '#fbbf24', '#a78bfa']
    : ['var(--ink-black)']
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      angle: (360 / count) * i + Math.random() * 20 - 10,
      distance: 60 + Math.random() * 100,
      size: 3 + Math.random() * 6,
      duration: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
    const t = setTimeout(() => setParticles([]), 1000)
    return () => clearTimeout(t)
  }, [trigger, count, cosmic])

  return (
    <AnimatePresence>
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const dx = Math.cos(rad) * p.distance
        const dy = Math.sin(rad) * p.distance
        return (
          <motion.span
            key={p.id}
            aria-hidden="true"
            style={{
              position: 'fixed',
              left: origin.x,
              top: origin.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: cosmic ? `0 0 6px ${p.color}` : 'none',
              pointerEvents: 'none',
              zIndex: 9999,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: 'easeOut' }}
          />
        )
      })}
    </AnimatePresence>
  )
}
