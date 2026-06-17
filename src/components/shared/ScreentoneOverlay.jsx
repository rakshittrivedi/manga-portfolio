/**
 * ScreentoneOverlay — absolutely positioned halftone dot overlay.
 * Drop inside any relative-positioned container.
 */
export default function ScreentoneOverlay({ opacity = 0.08, size = 6 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
