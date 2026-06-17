import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SFXText from '../shared/SFXText'
import './RockPaperScissors.css'

const CHOICES = [
  { id: 'rock', label: 'ROCK', emoji: '✊', beats: 'scissors' },
  { id: 'paper', label: 'PAPER', emoji: '✋', beats: 'rock' },
  { id: 'scissors', label: 'SCISSORS', emoji: '✌', beats: 'paper' },
]

const CLASH_SFX = { win: 'SMASH!!', lose: 'BLOCKED!!', draw: 'CLASH!!' }
const CLASH_DESC = {
  win: 'Your jutsu overpowers the enemy!!',
  lose: 'The AI parries your attack!!',
  draw: 'Both fighters clash — neither yields!!',
}

function getResult(player, ai) {
  if (player === ai) return 'draw'
  const choice = CHOICES.find((c) => c.id === player)
  return choice.beats === ai ? 'win' : 'lose'
}

export default function RockPaperScissors() {
  const [phase, setPhase] = useState('pick') // pick | countdown | reveal
  const [playerChoice, setPlayerChoice] = useState(null)
  const [aiChoice, setAiChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [scores, setScores] = useState({ win: 0, lose: 0, draw: 0 })

  const handlePick = (choice) => {
    setPlayerChoice(choice)
    setPhase('countdown')
    let count = 3
    setCountdown(count)
    const interval = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(interval)
        const ai = CHOICES[Math.floor(Math.random() * 3)].id
        setAiChoice(ai)
        const res = getResult(choice, ai)
        setResult(res)
        setScores((s) => ({ ...s, [res]: s[res] + 1 }))
        setPhase('reveal')
      }
    }, 700)
  }

  const reset = () => {
    setPhase('pick')
    setPlayerChoice(null)
    setAiChoice(null)
    setResult(null)
    setCountdown(3)
  }

  const playerEmoji = CHOICES.find((c) => c.id === playerChoice)?.emoji
  const aiEmoji = CHOICES.find((c) => c.id === aiChoice)?.emoji

  return (
    <div className="rps">
      <h3 className="rps__title">ROCK PAPER SCISSORS</h3>

      {/* Score bar */}
      <div className="rps__scores">
        <div className="rps__score rps__score--win">WIN<span>{scores.win}</span></div>
        <div className="rps__score rps__score--draw">DRAW<span>{scores.draw}</span></div>
        <div className="rps__score rps__score--lose">LOSE<span>{scores.lose}</span></div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'pick' && (
          <motion.div
            key="pick"
            className="rps__pick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="rps__instruction">CHOOSE YOUR WEAPON, WARRIOR</p>
            <div className="rps__choices">
              {CHOICES.map((c) => (
                <motion.button
                  key={c.id}
                  className="rps__choice manga-panel ink-border"
                  onClick={() => handlePick(c.id)}
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={c.label}
                >
                  <span className="rps__choice-emoji">{c.emoji}</span>
                  <span className="rps__choice-label">{c.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'countdown' && (
          <motion.div
            key={`count-${countdown}`}
            className="rps__countdown"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="rps__count-num">{countdown > 0 ? countdown : 'GO!!'}</span>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            className="rps__reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Clash animation */}
            <div className="rps__clash">
              <motion.div
                className="rps__fighter rps__fighter--player"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="rps__fighter-emoji">{playerEmoji}</span>
                <span className="rps__fighter-label">YOU</span>
              </motion.div>

              <motion.div
                className="rps__vs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              >
                VS
              </motion.div>

              <motion.div
                className="rps__fighter rps__fighter--ai"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="rps__fighter-emoji">{aiEmoji}</span>
                <span className="rps__fighter-label">AI</span>
              </motion.div>
            </div>

            <motion.div
              className={`rps__result-banner rps__result-banner--${result}`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: result === 'win' ? -3 : result === 'lose' ? 3 : 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
            >
              <SFXText text={CLASH_SFX[result]} size="2rem" rotate={result === 'win' ? -4 : 4} style={{ color: 'var(--ink-black)' }} />
              <p className="rps__result-desc">{CLASH_DESC[result]}</p>
            </motion.div>

            <button className="stamp-btn rps__reset-btn" onClick={reset}>REMATCH</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
