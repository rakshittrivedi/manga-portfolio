import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/projects'
import PageTurnCard from './PageTurnCard'
import ParticleBurst from '../shared/ParticleBurst'
import SFXText from '../shared/SFXText'
import NarrationBox from '../shared/NarrationBox'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [burstOrigin, setBurstOrigin] = useState({ x: '50%', y: '50%' })

  const handleFlip = () => {
    setBurstTrigger((t) => t + 1)
    setBurstOrigin({ x: '50%', y: '50%' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  }

  const cardVariant = {
    hidden: { y: 120, scale: 0.78, rotate: 6, opacity: 0, rotateX: 20 },
    visible: {
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  }

  return (
    <section id="projects" className="projects bg-projects-cosmic" ref={ref} aria-label="Projects section">
      <div className="circuit-overlay" aria-hidden="true" />
      <ParticleBurst trigger={burstTrigger} origin={burstOrigin} count={48} cosmic />

      <div className="projects__inner">
        <motion.div
          className="projects__heading-wrap"
          initial={{ opacity: 0, y: -30, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <span className="panel-number">003</span>
          <h2 className="chapter-heading">THE PROJECT ARC</h2>
          <p className="projects__subhead">
            Works that would make even Madara nod — each panel a cosmic highlight reel. <em>Tap to turn the page.</em>
          </p>
          <NarrationBox delay={0.3}>
            Your average portfolio lists "todo app" like it's a flex. These are <strong>actual sagas</strong> — built on zero sleep, maximum spite, and orbital-level ambition.
          </NarrationBox>
          <div className="projects__sfx" aria-hidden="true">
            <SFXText text="LET'S GO!!" size="1.6rem" rotate={-5} style={{ color: 'var(--cosmic-purple)' }} />
          </div>
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariant}>
              <PageTurnCard project={project} onFlip={handleFlip} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
