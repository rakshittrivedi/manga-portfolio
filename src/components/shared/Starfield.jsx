import { useEffect, useRef } from 'react'
import './Starfield.css'

/**
 * Starfield — canvas star backdrop with twinkling and parallax drift.
 */
export default function Starfield({ density = 180, speed = 0.15, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let stars = []
    let raf
    let w = 0
    let h = 0

    const init = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color: ['#ffffff', '#a78bfa', '#38bdf8', '#f472b6', '#fbbf24'][
          Math.floor(Math.random() * 5)
        ],
        drift: (Math.random() - 0.5) * speed,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        s.twinkle += s.twinkleSpeed
        const a = s.alpha * (0.4 + 0.6 * Math.sin(s.twinkle))
        s.y += s.drift
        if (s.y < 0) s.y = h
        if (s.y > h) s.y = 0

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = a
        ctx.fill()

        if (s.r > 1.2) {
          ctx.globalAlpha = a * 0.3
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => init()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`starfield ${className}`}
      aria-hidden="true"
    />
  )
}
