import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TicTacToe from './TicTacToe'
import RockPaperScissors from './RockPaperScissors'
import AnimeQuiz from './AnimeQuiz'
import SFXText from '../shared/SFXText'
import './GameHub.css'

const GAMES = [
  { id: 'ttt', label: 'TIC TAC TOE', sub: 'vs Unbeatable AI', emoji: '⚔', num: 'I' },
  { id: 'rps', label: 'ROCK PAPER SCISSORS', sub: 'Anime Battle Edition', emoji: '✊', num: 'II' },
  { id: 'quiz', label: 'ANIME QUIZ', sub: 'Test Your Power Level', emoji: '?', num: 'III' },
]

export default function GameHub() {
  const [open, setOpen] = useState(false)
  const [activeGame, setActiveGame] = useState(null)

  const GameComponent = activeGame === 'ttt' ? TicTacToe : activeGame === 'rps' ? RockPaperScissors : activeGame === 'quiz' ? AnimeQuiz : null

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="gamehub__fab stamp-btn"
        onClick={() => setOpen(true)}
        aria-label="Open Side Quest games"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.9 }}
      >
        ⚔ SIDE QUEST
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="gamehub__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Side Quest game hub"
          >
            <motion.div
              className="gamehub__modal manga-panel ink-border-thick"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="gamehub__header">
                <div>
                  <h2 className="gamehub__title">SIDE QUEST HUB</h2>
                  <p className="gamehub__subtitle">Every saga needs a filler arc.</p>
                </div>
                <button
                  className="gamehub__close"
                  onClick={() => { setOpen(false); setActiveGame(null) }}
                  aria-label="Close game hub"
                >
                  ✕
                </button>
              </div>

              {/* Game content */}
              <div className="gamehub__content">
                <AnimatePresence mode="wait">
                  {!activeGame ? (
                    <motion.div
                      key="menu"
                      className="gamehub__menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {GAMES.map((g, i) => (
                        <motion.button
                          key={g.id}
                          className="gamehub__game-card manga-panel ink-border"
                          onClick={() => setActiveGame(g.id)}
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={`Play ${g.label}`}
                        >
                          <span className="gamehub__card-num">{g.num}</span>
                          <span className="gamehub__card-emoji" aria-hidden="true">{g.emoji}</span>
                          <span className="gamehub__card-label">{g.label}</span>
                          <span className="gamehub__card-sub">{g.sub}</span>
                        </motion.button>
                      ))}

                      <div className="gamehub__sfx" aria-hidden="true">
                        <SFXText text="CHOOSE!!" size="1.6rem" rotate={-6} style={{ color: 'var(--ink-black)' }} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeGame}
                      className="gamehub__game-view"
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -60, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        className="gamehub__back"
                        onClick={() => setActiveGame(null)}
                        aria-label="Back to game menu"
                      >
                        ← BACK
                      </button>
                      {GameComponent && <GameComponent />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Games section anchor */}
      <div id="games" style={{ position: 'absolute', top: 0 }} aria-hidden="true" />
    </>
  )
}
