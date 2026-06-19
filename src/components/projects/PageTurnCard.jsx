import { useState } from 'react'
import { motion } from 'framer-motion'
import SFXText from '../shared/SFXText'
import ScreentoneOverlay from '../shared/ScreentoneOverlay'
import './PageTurnCard.css'

const ACCENT_COLORS = ['#7c3aed', '#38bdf8', '#f472b6', '#22d3ee', '#fbbf24', '#a78bfa']

export default function PageTurnCard({ project, onFlip }) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const accent = ACCENT_COLORS[(project.id - 1) % ACCENT_COLORS.length]

  const handleFlip = () => {
    setFlipped((f) => !f)
    if (!flipped && onFlip) onFlip()
  }

  return (
    <motion.div
      className="ptc"
      onClick={handleFlip}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${project.title} — click to reveal details`}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400 } }}
      style={{ '--ptc-accent': accent }}
    >
      <motion.div
        className="ptc__glow"
        animate={{ opacity: hovered ? 0.7 : 0.3, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <motion.div
        className="ptc__inner"
        animate={{ rotateY: flipped ? -180 : 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="ptc__face ptc__face--front manga-panel ink-border-thick screentone">
          <ScreentoneOverlay opacity={0.06} />
          <span className="panel-number">{project.panelNumber}</span>
          <div className="ptc__cosmic-stripe" aria-hidden="true" />

          <div className="ptc__front-content">
            <div className="ptc__sfx" aria-hidden="true">
              <SFXText text={project.accentSFX} size="1.4rem" rotate={-10} style={{ color: accent }} />
            </div>

            <h3 className="ptc__title">{project.title}</h3>

            <div className="speech-bubble ptc__tagline">
              <p>{project.tagline}</p>
            </div>

            <div className="ptc__stack">
              {project.stack.map((tech) => (
                <motion.span
                  key={tech}
                  className="ptc__tech"
                  whileHover={{ scale: 1.08, backgroundColor: accent, color: '#fff' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <p className="ptc__flip-hint">[ TAP TO REVEAL ]</p>
          </div>
        </div>

        <div className="ptc__face ptc__face--back manga-panel ink-border-thick">
          <span className="panel-number">{project.panelNumber}</span>
          <div className="ptc__back-gradient" aria-hidden="true" />

          <div className="ptc__back-content">
            <h3 className="ptc__title">{project.title}</h3>
            <p className="ptc__desc">{project.description}</p>

            <div className="ptc__links">
              <a
                href={project.liveUrl}
                className="stamp-btn stamp-btn--cosmic ptc__link-btn"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
              >
                LIVE DEMO
              </a>
              <a
                href={project.repoUrl}
                className="stamp-btn ptc__link-btn ptc__link-btn--outline"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
              >
                REPO
              </a>
            </div>

            <p className="ptc__flip-hint">[ TAP TO GO BACK ]</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
