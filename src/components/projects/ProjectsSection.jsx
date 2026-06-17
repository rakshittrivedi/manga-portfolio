import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/projects'
import PageTurnCard from './PageTurnCard'
import ParticleBurst from '../shared/ParticleBurst'
import SFXText from '../shared/SFXText'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [burstOrigin, setBurstOrigin] = useState({ x: '50%', y: '50%' })

  const handleFlip = (e) => {
    setBurstTrigger((t) => t + 1)
    setBurstOrigin({ x: '50%', y: '50%' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const cardVariant = {
    hidden: { y: 100, scale: 0.82, rotate: 4, opacity: 0 },
    visible: {
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 280, damping: 22 },
    },
  }

  return (
    <section id="projects" className="projects" ref={ref} aria-label="Projects section">
      <ParticleBurst trigger={burstTrigger} origin={burstOrigin} count={40} />

      <div className="projects__inner">
        {/* Heading */}
        <motion.div
          className="projects__heading-wrap"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="panel-number">003</span>
          <h2 className="chapter-heading">THE PROJECT ARC</h2>
          <p className="projects__subhead">
            Works that would make even Madara nod. Each panel hides a saga — <em>tap to reveal.</em>
          </p>
          <div className="projects__sfx" aria-hidden="true">
            <SFXText text="LET'S GO!!" size="1.6rem" rotate={-5} style={{ color: 'var(--ink-black)' }} />
          </div>
        </motion.div>

        {/* Cards grid */}
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
