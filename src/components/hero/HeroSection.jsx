import { useState } from 'react'
import { motion } from 'framer-motion'
import KnightSilhouette from './KnightSilhouette'
import SpeedLines from './SpeedLines'
import SFXText from '../shared/SFXText'
import ParticleBurst from '../shared/ParticleBurst'
import './HeroSection.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const panelLeft = {
  hidden: { x: -300, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const panelCenter = {
  hidden: { y: -200, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
}

const panelRight = {
  hidden: { x: 300, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
}

export default function HeroSection() {
  const [burstTrigger, setBurstTrigger] = useState(0)

  const handleCTA = (e) => {
    setBurstTrigger((t) => t + 1)
    const rect = e.currentTarget.getBoundingClientRect()
    window._particleOrigin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    setTimeout(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      <ParticleBurst
        trigger={burstTrigger}
        origin={{
          x: window._particleOrigin?.x ?? '50%',
          y: window._particleOrigin?.y ?? '60%',
        }}
        count={48}
      />

      <motion.div
        className="hero__panels"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Panel 1 — Knight */}
        <motion.div className="hero__panel hero__panel--left" variants={panelLeft}>
          <SpeedLines active />
          <div className="hero__panel-inner hero__panel-inner--knight">
            <KnightSilhouette />
            <motion.div
              className="hero__sfx-whoosh"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 400, damping: 16 }}
            >
              <SFXText text="WHOOSH!!" size="1.6rem" rotate={-12} delay={1.1} />
            </motion.div>
          </div>
        </motion.div>

        {/* Panel 2 — Main headline */}
        <motion.div className="hero__panel hero__panel--center" variants={panelCenter}>
          <div className="hero__panel-inner hero__panel-inner--text">
            <motion.p
              className="hero__eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              CHAPTER 001 — ENTER THE CHAOS ARCHITECT
            </motion.p>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              RAKSHIT<br />TRIVEDI
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Witness the chaos architect of Udaipur — bending React like it's chakra control.
            </motion.p>

            <motion.div
              className="hero__sfx-boom"
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 500, damping: 18 }}
            >
              <SFXText text="BOOM!!" size="2.4rem" rotate={-8} delay={1.3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Panel 3 — Sub + CTA */}
        <motion.div className="hero__panel hero__panel--right" variants={panelRight}>
          <div className="hero__panel-inner hero__panel-inner--cta">
            <motion.p
              className="hero__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Not your average portfolio.<br />
              This is a <em>shōnen saga</em> of commits,<br />
              caffeine, and questionable life choices.
            </motion.p>

            <motion.div
              className="hero__roles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <span className="hero__role-tag">React Dev</span>
              <span className="hero__role-tag">Hackathon Survivor</span>
              <span className="hero__role-tag">Cracked Builder</span>
            </motion.div>

            <motion.button
              className="stamp-btn hero__cta"
              onClick={handleCTA}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 400 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              READ THE SAGA ⚔
            </motion.button>

            <motion.div
              style={{ marginTop: 20 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <SFXText text="ドン!!" size="1.4rem" rotate={10} style={{ color: 'var(--ink-black)' }} delay={1.5} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>▼ SCROLL DOWN ▼</span>
      </motion.div>
    </section>
  )
}
