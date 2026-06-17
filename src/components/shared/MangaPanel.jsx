import { motion } from 'framer-motion'
import '../../styles/manga.css'

/**
 * MangaPanel — reusable ink-bordered panel wrapper.
 * Props:
 *   panelNumber  — optional top-left badge
 *   screentone   — adds halftone dot overlay
 *   thick        — uses thicker border variant
 *   className    — extra classes
 *   animate      — framer motion animate prop passthrough
 *   initial      — framer motion initial prop
 *   transition   — framer motion transition prop
 */
export default function MangaPanel({
  children,
  panelNumber,
  screentone = false,
  thick = false,
  className = '',
  style = {},
  animate,
  initial,
  transition,
  whileHover,
  onClick,
}) {
  const borderClass = thick ? 'ink-border-thick' : 'ink-border'
  const toneClass = screentone ? 'screentone' : ''

  return (
    <motion.div
      className={`manga-panel ${borderClass} ${toneClass} ${className}`}
      style={style}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      onClick={onClick}
    >
      {panelNumber !== undefined && (
        <span className="panel-number">{panelNumber}</span>
      )}
      {children}
    </motion.div>
  )
}
