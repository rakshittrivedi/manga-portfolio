import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SFXText from '../shared/SFXText'
import ParticleBurst from '../shared/ParticleBurst'
import ScreentoneOverlay from '../shared/ScreentoneOverlay'
import './ContactSection.css'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [burstTrigger, setBurstTrigger] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await axios.post('/api/contact', data)
      setStatus('success')
      setBurstTrigger((t) => t + 1)
      reset()
    } catch {
      setStatus('error')
    }
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }
  const itemVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  }

  return (
    <section id="contact" className="contact" ref={ref} aria-label="Contact section">
      <ParticleBurst trigger={burstTrigger} count={56} />

      <motion.div
        className="contact__inner"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Heading */}
        <motion.div className="contact__heading-wrap" variants={itemVariant}>
          <span className="panel-number">004</span>
          <h2 className="chapter-heading">CONTACT — SEND THE SCROLL</h2>
          <p className="contact__subhead">
            Got a mission? A collab? A bug that has survived 47 stack overflows?<br />
            <strong>Summon Rakshit.</strong>
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Form panel */}
          <motion.div className="contact__form-panel manga-panel ink-border-thick" variants={itemVariant}>
            <ScreentoneOverlay opacity={0.05} />
            <div className="contact__form-inner">
              {status === 'success' ? (
                <SuccessPanel onReset={() => setStatus('idle')} />
              ) : (
                <form
                  className="contact__form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  {/* Honeypot */}
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} {...register('_honey')} />

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="name">
                      <span className="sfx-text" style={{ fontSize: '0.8rem', color: 'var(--ink-black)', WebkitTextStroke: '1px var(--ink-black)' }}>NAME</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                      placeholder="Your name, hero"
                      autoComplete="name"
                      {...register('name', { required: 'Name required, coward.' })}
                    />
                    {errors.name && <span className="contact__error">{errors.name.message}</span>}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="email">
                      <span className="sfx-text" style={{ fontSize: '0.8rem', color: 'var(--ink-black)', WebkitTextStroke: '1px var(--ink-black)' }}>EMAIL</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                      placeholder="your@email.com"
                      autoComplete="email"
                      {...register('email', {
                        required: 'Email required.',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'That is not an email.' },
                      })}
                    />
                    {errors.email && <span className="contact__error">{errors.email.message}</span>}
                  </div>

                  <div className="contact__field">
                    <label className="contact__label" htmlFor="message">
                      <span className="sfx-text" style={{ fontSize: '0.8rem', color: 'var(--ink-black)', WebkitTextStroke: '1px var(--ink-black)' }}>MESSAGE</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                      placeholder="Write your mission brief here..."
                      {...register('message', { required: 'Say something!', minLength: { value: 10, message: 'At least 10 chars.' } })}
                    />
                    {errors.message && <span className="contact__error">{errors.message.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className={`stamp-btn contact__submit ${status === 'loading' ? 'contact__submit--loading' : ''}`}
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.04 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.96 } : {}}
                  >
                    {status === 'loading' ? 'CHARGING...' : 'SEND IT!! ⚡'}
                  </motion.button>

                  {status === 'error' && (
                    <motion.p
                      className="contact__error-msg"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      ‼ JUTSU FAILED — try again later.
                    </motion.p>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div className="contact__info" variants={itemVariant}>
            <div className="speech-bubble contact__bubble">
              <p style={{ fontWeight: 700, lineHeight: 1.6 }}>
                I respond faster than Goku powers up. Hit me up for freelance work, collab, or just to roast each other's code.
              </p>
            </div>

            <div className="contact__socials">
              <a href="mailto:rakshittrivedi106@mail.com" className="contact__social-link" aria-label="Email Rakshit">
                <span className="contact__social-icon">✉</span>
                <span>rakshittrivedi106@mail.com</span>
              </a>
              <a href="https://github.com" className="contact__social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <span className="contact__social-icon">◈</span>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" className="contact__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <span className="contact__social-icon">◉</span>
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="contact__sfx" aria-hidden="true">
              <SFXText text="CALL ME!!" size="2rem" rotate={8} style={{ color: 'var(--ink-black)' }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function SuccessPanel({ onReset }) {
  return (
    <motion.div
      className="contact__success"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <SFXText text="NICE!!" size="3rem" rotate={-5} style={{ color: 'var(--ink-black)' }} />
      <p className="contact__success-text">
        Scroll delivered! Rakshit will respond before the next arc begins.
      </p>
      <button className="stamp-btn" onClick={onReset} style={{ marginTop: 16 }}>
        SEND ANOTHER
      </button>
    </motion.div>
  )
}
