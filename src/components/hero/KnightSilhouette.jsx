import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * KnightSilhouette — pure SVG armored knight in dramatic pose.
 * Subtle parallax rotation on mouse move.
 */
export default function KnightSilhouette() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window
      const rx = ((e.clientY / innerHeight) - 0.5) * 8
      const ry = ((e.clientX / innerWidth) - 0.5) * -8
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <motion.div
      className="knight-wrapper"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.9 }}
      style={{ perspective: 600, display: 'flex', justifyContent: 'center' }}
    >
      <div
        ref={ref}
        style={{
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 200 380"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 'clamp(160px, 22vw, 280px)', filter: 'drop-shadow(4px 8px 0px rgba(0,0,0,0.4))' }}
          aria-label="Knight silhouette"
          role="img"
        >
          {/* Helmet */}
          <ellipse cx="100" cy="38" rx="32" ry="36" fill="#0a0a0a" />
          <rect x="72" y="18" width="56" height="12" rx="2" fill="#0a0a0a" />
          {/* Visor slit */}
          <rect x="82" y="34" width="36" height="6" rx="3" fill="#f5f0e8" opacity="0.6" />
          {/* Plume */}
          <path d="M100 2 C88 8, 76 2, 80 16 C86 10, 94 14, 100 2Z" fill="#0a0a0a" />
          <path d="M100 2 C112 8, 124 2, 120 16 C114 10, 106 14, 100 2Z" fill="#0a0a0a" />
          {/* Neck/gorget */}
          <rect x="84" y="70" width="32" height="18" rx="4" fill="#0a0a0a" />
          {/* Chest plate */}
          <path d="M64 88 L136 88 L148 160 L52 160 Z" fill="#0a0a0a" />
          {/* Chest detail lines */}
          <line x1="100" y1="95" x2="100" y2="155" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.3" />
          <line x1="72" y1="110" x2="128" y2="110" stroke="#f5f0e8" strokeWidth="1" opacity="0.3" />
          <line x1="70" y1="130" x2="130" y2="130" stroke="#f5f0e8" strokeWidth="1" opacity="0.2" />
          {/* Pauldrons (shoulder armor) */}
          <ellipse cx="55" cy="98" rx="22" ry="14" fill="#0a0a0a" />
          <ellipse cx="145" cy="98" rx="22" ry="14" fill="#0a0a0a" />
          {/* Left arm */}
          <path d="M36 108 L28 170 L44 170 L52 112Z" fill="#0a0a0a" />
          {/* Right arm (sword arm, raised) */}
          <path d="M164 108 L158 80 L174 76 L178 170 L162 170Z" fill="#0a0a0a" />
          {/* Sword */}
          <rect x="168" y="10" width="8" height="80" rx="2" fill="#0a0a0a" />
          <rect x="154" y="72" width="36" height="8" rx="2" fill="#0a0a0a" />
          <polygon points="172,10 168,0 176,0" fill="#0a0a0a" />
          {/* Gauntlets */}
          <rect x="26" y="168" width="20" height="16" rx="3" fill="#0a0a0a" />
          <rect x="158" y="168" width="20" height="16" rx="3" fill="#0a0a0a" />
          {/* Hip plate / fauld */}
          <path d="M60 158 L140 158 L148 195 L52 195 Z" fill="#0a0a0a" />
          {/* Tassets (thigh guards) */}
          <rect x="60" y="188" width="34" height="40" rx="4" fill="#0a0a0a" />
          <rect x="106" y="188" width="34" height="40" rx="4" fill="#0a0a0a" />
          {/* Legs */}
          <rect x="62" y="225" width="28" height="70" rx="4" fill="#0a0a0a" />
          <rect x="110" y="225" width="28" height="70" rx="4" fill="#0a0a0a" />
          {/* Greaves */}
          <rect x="60" y="290" width="32" height="30" rx="3" fill="#0a0a0a" />
          <rect x="108" y="290" width="32" height="30" rx="3" fill="#0a0a0a" />
          {/* Boots */}
          <path d="M58 318 L58 338 L96 338 L92 318Z" fill="#0a0a0a" />
          <path d="M106 318 L110 338 L148 338 L142 318Z" fill="#0a0a0a" />
          {/* Cape */}
          <path d="M52 92 C30 130, 20 200, 28 290 L52 280 C44 210, 50 150, 64 110Z" fill="#0a0a0a" opacity="0.7" />
        </svg>
      </div>
    </motion.div>
  )
}
