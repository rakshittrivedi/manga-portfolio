import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScreentoneOverlay from '../shared/ScreentoneOverlay'
import SFXText from '../shared/SFXText'
import NarrationBox from '../shared/NarrationBox'
import './AboutSection.css'

const chapters = [
  {
    num: '01',
    title: 'THE ORIGIN ARC',
    desc: 'Born in Udaipur under a sky that looked suspiciously like a rom-com montage. First `console.log` fired. Spacetime has been unstable ever since.',
  },
  {
    num: '02',
    title: 'THE TRAINING ARC',
    desc: 'React, Node, databases, hackathons — absorbed faster than light escaping a neutron star. Sleep was optional. Caffeine was mandatory.',
  },
  {
    num: '03',
    title: 'THE BATTLE ARC',
    desc: 'Hackathons survived. Production deploys shipped. Bugs defeated harder than black holes bend spacetime. Legend status: loading… 87%.',
  },
]

const stats = [
  { label: 'Hackathons', value: '10+' },
  { label: 'Projects', value: '20+' },
  { label: 'Coffees', value: '∞' },
  { label: 'Bugs Fixed', value: '99%' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  }

  const leftVariant = {
    hidden: { x: -120, opacity: 0, rotateY: 15 },
    visible: { x: 0, opacity: 1, rotateY: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  }

  const rightVariant = {
    hidden: { x: 120, opacity: 0, rotateY: -15 },
    visible: { x: 0, opacity: 1, rotateY: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  }

  const itemVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  return (
    <section id="about" className="about bg-about-cosmic" ref={ref} aria-label="About section">
      <div className="circuit-overlay" aria-hidden="true" />

      <motion.div
        className="about__inner"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="about__heading-wrap" variants={itemVariant}>
          <span className="panel-number">002</span>
          <h2 className="chapter-heading about__heading">ABOUT — THE ORIGIN ARC</h2>
          <NarrationBox roast delay={0.2}>
            Another dev portfolio? <em>Please.</em> This one has sarcasm, starfields, and enough Framer Motion to make your CSS cry. You're welcome.
          </NarrationBox>
        </motion.div>

        <div className="about__grid">
          <motion.div className="about__left manga-panel about__left--cosmic" variants={leftVariant}>
            <ScreentoneOverlay opacity={0.09} />
            <div className="about__portrait" aria-label="Character portrait">
              <svg viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="portraitBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ede8dc" />
                    <stop offset="100%" stopColor="#e0e7ff" />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="240" height="300" fill="url(#portraitBg)" stroke="#0a0a0a" strokeWidth="5" />
                <rect x="18" y="18" width="224" height="284" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                <ellipse cx="130" cy="110" rx="55" ry="60" fill="#0a0a0a" />
                <path d="M80 80 C75 50, 110 30, 130 35 C150 30, 185 50, 180 80 C175 60, 155 48, 130 50 C105 48, 85 60, 80 80Z" fill="#f5f0e8" />
                <ellipse cx="112" cy="105" rx="10" ry="12" fill="#f5f0e8" />
                <ellipse cx="148" cy="105" rx="10" ry="12" fill="#f5f0e8" />
                <circle cx="114" cy="107" r="6" fill="#7c3aed" />
                <circle cx="150" cy="107" r="6" fill="#7c3aed" />
                <circle cx="116" cy="104" r="2" fill="#f5f0e8" />
                <circle cx="152" cy="104" r="2" fill="#f5f0e8" />
                <rect x="100" y="95" width="24" height="18" rx="4" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                <rect x="136" y="95" width="24" height="18" rx="4" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                <line x1="124" y1="104" x2="136" y2="104" stroke="#f472b6" strokeWidth="2" />
                <path d="M118 130 C124 138, 136 138, 142 130" stroke="#f472b6" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M60 170 L80 165 C95 160, 115 155, 130 155 C145 155, 165 160, 180 165 L200 170 L210 300 L50 300Z" fill="#1a0a3e" />
                <rect x="75" y="240" width="110" height="6" rx="2" fill="#38bdf8" opacity="0.6" />
                <rect x="80" y="200" width="100" height="42" rx="3" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.7" />
                <rect x="88" y="210" width="40" height="3" rx="1" fill="#22d3ee" opacity="0.6" />
                <rect x="88" y="218" width="60" height="3" rx="1" fill="#f472b6" opacity="0.5" />
                <rect x="88" y="226" width="50" height="3" rx="1" fill="#a78bfa" opacity="0.55" />
              </svg>
            </div>
            <div className="about__stats">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="about__stat"
                  whileHover={{ scale: 1.05, boxShadow: '5px 5px 0 var(--ink-black), var(--glow-purple)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="about__stat-value">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about__right" variants={rightVariant}>
            <motion.div className="thought-bubble about__thought" variants={itemVariant}>
              <SpeechReveal text="Here's the next Hokage of the hidden leaf village — Rakshit Trivedi, the one who fights bugs harder than black holes bend spacetime." />
            </motion.div>

            <motion.div className="speech-bubble about__speech about__speech--cosmic" variants={itemVariant}>
              <SpeechReveal
                text="Witness the chaos architect of Udaipur — bending React like gravity waves, shipping features like a Solo Leveling protagonist, and somehow making it romantic."
                delay={0.3}
              />
            </motion.div>

            <motion.div style={{ alignSelf: 'flex-end', marginRight: 16 }} variants={itemVariant}>
              <SFXText text="PLUS ULTRA!!" size="1.8rem" rotate={5} style={{ color: 'var(--cosmic-purple)' }} />
            </motion.div>

            <div className="about__chapters">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.num}
                  className="about__chapter"
                  variants={itemVariant}
                  whileHover={{ x: 6, backgroundColor: 'var(--cosmic-deep)', color: 'var(--paper-white)' }}
                >
                  <div className="about__chapter-header">
                    <span className="about__chapter-num">VOL.{ch.num}</span>
                    <span className="about__chapter-title">{ch.title}</span>
                  </div>
                  <p className="about__chapter-desc">{ch.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function SpeechReveal({ text, delay = 0 }) {
  const words = text.split(' ')
  return (
    <p style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', lineHeight: 1.6, fontWeight: 700 }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.04, duration: 0.25 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
