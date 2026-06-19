import { motion } from 'framer-motion'
import './NarrationBox.css'

/**
 * NarrationBox — sarcastic manga narrator caption with cosmic styling.
 */
export default function NarrationBox({ children, delay = 0, roast = false }) {
  return (
    <motion.div
      className={`narration-box ${roast ? 'narration-box--roast' : ''}`}
      initial={{ opacity: 0, y: 12, rotate: -0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.01, boxShadow: '5px 5px 0 var(--ink-black), var(--glow-pink)' }}
    >
      {children}
    </motion.div>
  )
}
