import { useState } from 'react'
import { motion } from 'framer-motion'
import KnightSilhouette from './KnightSilhouette'
import SpeedLines from './SpeedLines'
import Starfield from '../shared/Starfield'
import SFXText from '../shared/SFXText'
import ParticleBurst from '../shared/ParticleBurst'
import './HeroSection.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const panelLeft = {
  hidden: { x: -400, opacity: 0, rotateY: 25 },
  visible: { x: 0, opacity: 1, rotateY: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const panelCenter = {
  hidden: { y: -250, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
}

const panelRight = {
  hidden: { x: 400, opacity: 0, rotateY: -25 },
  visible: { x: 0, opacity: 1, rotateY: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 } },
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
      <Starfield density={220} speed={0.12} />
      <div className="hero__cosmic-gradient" aria-hidden="true" />
      <div className="circuit-overlay" aria-hidden="true" />

      <ParticleBurst
        trigger={burstTrigger}
        origin={{
          x: window._particleOrigin?.x ?? '50%',
          y: window._particleOrigin?.y ?? '60%',
        }}
        count={56}
        cosmic
      />

      <motion.div
        className="hero__panels"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__panel hero__panel--left" variants={panelLeft}>
          <SpeedLines active cosmic />
          <div className="hero__panel-inner hero__panel-inner--knight">
            <KnightSilhouette />
            <motion.div
              className="hero__sfx-whoosh"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 400, damping: 14 }}
            >
              <SFXText text="WHOOSH!!" size="1.6rem" rotate={-12} delay={1.2} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="hero__panel hero__panel--center" variants={panelCenter}>
          <div className="hero__panel-inner hero__panel-inner--text">
            <motion.p
              className="hero__eyebrow animate-neon"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              CHAPTER 001 — ENTER THE CHAOS ARCHITECT
            </motion.p>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              RAKSHIT<br />TRIVEDI
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              Witness the chaos architect of Udaipur — bending React like gravity waves and black holes bend spacetime.
            </motion.p>

            <motion.div
              className="hero__sfx-boom"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 500, damping: 16 }}
            >
              <SFXText text="BOOM!!" size="2.4rem" rotate={-8} delay={1.4} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="hero__panel hero__panel--right" variants={panelRight}>
          <div className="hero__panel-inner hero__panel-inner--cta">
            <motion.p
              className="hero__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Not your average portfolio.<br />
              This is a <em>cosmic rom‑com saga</em> of commits,<br />
              caffeine, and questionable life choices.
            </motion.p>

            <motion.div
              className="hero__roles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {['React Dev', 'Hackathon Survivor', 'Cracked Builder', 'Stargazer'].map((role, i) => (
                <motion.span
                  key={role}
                  className={`cosmic-tag ${i === 3 ? 'cosmic-tag--pulse' : ''}`}
                  whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            <motion.button
              className="stamp-btn stamp-btn--cosmic hero__cta"
              onClick={handleCTA}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 350 }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              READ THE SAGA ⚔
            </motion.button>

            <motion.div
              style={{ marginTop: 20 }}
              initial={{ opacity: 0, rotate: 15 }}
              animate={{ opacity: 1, rotate: 10 }}
              transition={{ delay: 1.6, type: 'spring' }}
            >
              <SFXText text="ドン!!" size="1.4rem" rotate={10} style={{ color: 'var(--cosmic-purple)' }} delay={1.6} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="animate-heartbeat">▼ SCROLL DOWN ▼</span>
      </motion.div>
    </section>
  )
}
