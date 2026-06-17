import { motion } from 'framer-motion'
import '../../styles/manga.css'

/**
 * SFXText — animated manga sound-effect stamp text.
 * Pops in with a spring scale animation.
 */
export default function SFXText({
  text,
  size = '2rem',
  color = 'var(--paper-white)',
  rotate = -8,
  delay = 0,
  className = '',
  style = {},
}) {
  return (
    <motion.span
      className={`sfx-text ${className}`}
      style={{
        fontSize: size,
        color,
        display: 'inline-block',
        rotate: `${rotate}deg`,
        ...style,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 18,
        delay,
      }}
    >
      {text}
    </motion.span>
  )
}
