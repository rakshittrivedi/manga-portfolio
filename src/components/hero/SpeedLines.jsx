import { useEffect, useRef } from 'react'

/**
 * SpeedLines — canvas-based radial speed lines burst.
 * Fires once on mount, then idles with low-opacity lines.
 */
export default function SpeedLines({ active = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let raf

    const draw = () => {
      const { width, height } = canvas
      const cx = width / 2
      const cy = height / 2
      const lineCount = 48
      const maxLen = Math.hypot(cx, cy) * 1.1

      ctx.clearRect(0, 0, width, height)

      const burst = frame < 30
      const baseOpacity = burst ? (frame / 30) * 0.7 : 0.12

      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2
        const startRatio = burst ? 0.1 : 0.35
        const endRatio = burst ? 1 : 0.75

        const x1 = cx + Math.cos(angle) * maxLen * startRatio
        const y1 = cy + Math.sin(angle) * maxLen * startRatio
        const x2 = cx + Math.cos(angle) * maxLen * endRatio
        const y2 = cy + Math.sin(angle) * maxLen * endRatio

        const alpha = baseOpacity * (0.6 + 0.4 * Math.sin(i * 1.3 + frame * 0.05))

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(10, 10, 10, ${alpha})`
        ctx.lineWidth = burst ? 1.5 - (frame / 30) : 0.8
        ctx.stroke()
      }

      frame++
      raf = requestAnimationFrame(draw)
    }

    if (active) draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
