import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './KnightSilhouette.css'

/**
 * KnightSilhouette — 3D armored knight with cosmic aura glow.
 * Parallax rotation on mouse move + pulsing energy field.
 */
export default function KnightSilhouette() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window
      const rx = ((e.clientY / innerHeight) - 0.5) * 12
      const ry = ((e.clientX / innerWidth) - 0.5) * -12
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <motion.div
      className="knight-wrapper"
      initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.7 }}
      style={{ perspective: 800, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Orbital rings */}
      <div className="knight__orbit knight__orbit--1" aria-hidden="true" />
      <div className="knight__orbit knight__orbit--2" aria-hidden="true" />

      {/* Aura glow */}
      <motion.div
        className="knight__aura"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="knight__body"
      >
        <svg
          viewBox="0 0 200 380"
          xmlns="http://www.w3.org/2000/svg"
          className="knight__svg"
          aria-label="Knight silhouette with cosmic aura"
          role="img"
        >
          <defs>
            <linearGradient id="knightGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <filter id="knightShadow">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#7c3aed" floodOpacity="0.8" />
              <feDropShadow dx="4" dy="8" stdDeviation="2" floodColor="#0a0a0a" floodOpacity="0.5" />
            </filter>
          </defs>

          <g filter="url(#knightShadow)">
            <ellipse cx="100" cy="38" rx="32" ry="36" fill="url(#knightGlow)" />
            <rect x="72" y="18" width="56" height="12" rx="2" fill="#1a0a3e" />
            <rect x="82" y="34" width="36" height="6" rx="3" fill="#22d3ee" opacity="0.8" />
            <path d="M100 2 C88 8, 76 2, 80 16 C86 10, 94 14, 100 2Z" fill="#a78bfa" />
            <path d="M100 2 C112 8, 124 2, 120 16 C114 10, 106 14, 100 2Z" fill="#f472b6" />
            <rect x="84" y="70" width="32" height="18" rx="4" fill="#1e1b4b" />
            <path d="M64 88 L136 88 L148 160 L52 160 Z" fill="#0d0221" />
            <line x1="100" y1="95" x2="100" y2="155" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
            <line x1="72" y1="110" x2="128" y2="110" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="130" x2="130" y2="130" stroke="#f472b6" strokeWidth="1" opacity="0.3" />
            <ellipse cx="55" cy="98" rx="22" ry="14" fill="#1a0a3e" />
            <ellipse cx="145" cy="98" rx="22" ry="14" fill="#1a0a3e" />
            <path d="M36 108 L28 170 L44 170 L52 112Z" fill="#0d0221" />
            <path d="M164 108 L158 80 L174 76 L178 170 L162 170Z" fill="#0d0221" />
            <rect x="168" y="10" width="8" height="80" rx="2" fill="#38bdf8" />
            <rect x="154" y="72" width="36" height="8" rx="2" fill="#a78bfa" />
            <polygon points="172,10 168,0 176,0" fill="#22d3ee" />
            <rect x="26" y="168" width="20" height="16" rx="3" fill="#0d0221" />
            <rect x="158" y="168" width="20" height="16" rx="3" fill="#0d0221" />
            <path d="M60 158 L140 158 L148 195 L52 195 Z" fill="#1a0a3e" />
            <rect x="60" y="188" width="34" height="40" rx="4" fill="#0d0221" />
            <rect x="106" y="188" width="34" height="40" rx="4" fill="#0d0221" />
            <rect x="62" y="225" width="28" height="70" rx="4" fill="#0d0221" />
            <rect x="110" y="225" width="28" height="70" rx="4" fill="#0d0221" />
            <rect x="60" y="290" width="32" height="30" rx="3" fill="#1e1b4b" />
            <rect x="108" y="290" width="32" height="30" rx="3" fill="#1e1b4b" />
            <path d="M58 318 L58 338 L96 338 L92 318Z" fill="#0d0221" />
            <path d="M106 318 L110 338 L148 338 L142 318Z" fill="#0d0221" />
            <path d="M52 92 C30 130, 20 200, 28 290 L52 280 C44 210, 50 150, 64 110Z" fill="#7c3aed" opacity="0.35" />
          </g>
        </svg>
      </div>
    </motion.div>
  )
}
