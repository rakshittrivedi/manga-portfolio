import { useState } from 'react'
import { motion } from 'framer-motion'
import SFXText from '../shared/SFXText'
import ScreentoneOverlay from '../shared/ScreentoneOverlay'
import './PageTurnCard.css'

export default function PageTurnCard({ project, onFlip }) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    setFlipped((f) => !f)
    if (!flipped && onFlip) onFlip()
  }

  return (
    <div
      className="ptc"
      onClick={handleFlip}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
      tabIndex={0}
      role="button"
      aria-label={`${project.title} — click to reveal details`}
    >
      <motion.div
        className="ptc__inner"
        animate={{ rotateY: flipped ? -180 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div className="ptc__face ptc__face--front manga-panel ink-border-thick screentone">
          <ScreentoneOverlay opacity={0.06} />
          <span className="panel-number">{project.panelNumber}</span>

          <div className="ptc__front-content">
            <div className="ptc__sfx" aria-hidden="true">
              <SFXText text={project.accentSFX} size="1.4rem" rotate={-10} style={{ color: 'var(--ink-black)' }} />
            </div>

            <h3 className="ptc__title">{project.title}</h3>

            <div className="speech-bubble ptc__tagline">
              <p>{project.tagline}</p>
            </div>

            <div className="ptc__stack">
              {project.stack.map((tech) => (
                <span key={tech} className="ptc__tech">
                  {tech}
                </span>
              ))}
            </div>

            <p className="ptc__flip-hint">[ TAP TO REVEAL ]</p>
          </div>
        </div>

        {/* Back face */}
        <div className="ptc__face ptc__face--back manga-panel ink-border-thick">
          <span className="panel-number">{project.panelNumber}</span>

          <div className="ptc__back-content">
            <h3 className="ptc__title">{project.title}</h3>
            <p className="ptc__desc">{project.description}</p>

            <div className="ptc__links">
              <a
                href={project.liveUrl}
                className="stamp-btn ptc__link-btn"
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
    </div>
  )
}
