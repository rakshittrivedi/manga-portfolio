import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '../../data/animeQuiz'
import SFXText from '../shared/SFXText'
import './AnimeQuiz.css'

export default function AnimeQuiz() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null) // null | 'correct' | 'wrong'
  const [selectedOption, setSelectedOption] = useState(null)
  const [done, setDone] = useState(false)

  const q = quizQuestions[current]

  const handleAnswer = (option) => {
    if (selected) return
    setSelectedOption(option)
    if (option === q.answer) {
      setSelected('correct')
      setScore((s) => s + q.powerLevel)
    } else {
      setSelected('wrong')
    }

    setTimeout(() => {
      if (current + 1 < quizQuestions.length) {
        setCurrent((c) => c + 1)
        setSelected(null)
        setSelectedOption(null)
      } else {
        setDone(true)
      }
    }, 1200)
  }

  const reset = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setSelectedOption(null)
    setDone(false)
  }

  const maxScore = quizQuestions.length * 100
  const pct = Math.round((score / maxScore) * 100)

  if (done) {
    return (
      <div className="quiz">
        <h3 className="quiz__title">ANIME QUIZ</h3>
        <motion.div
          className="quiz__final"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <SFXText
            text={pct >= 80 ? 'GOATED!!' : pct >= 50 ? 'NOT BAD!!' : 'STUDY UP!!'}
            size="2.4rem"
            rotate={-5}
            style={{ color: 'var(--ink-black)' }}
          />
          <p className="quiz__final-score">POWER LEVEL: {score} / {maxScore}</p>

          {/* Power meter */}
          <div className="quiz__meter" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="quiz__meter-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
            <span className="quiz__meter-label">{pct}%</span>
          </div>

          <p className="quiz__final-desc">
            {pct === 100 && 'You are the Goat. Anime Dad. We bow.'}
            {pct >= 80 && pct < 100 && 'Solid. A true anime enjoyer.'}
            {pct >= 50 && pct < 80 && 'Mid arc. Keep grinding the episodes.'}
            {pct < 50 && 'You have dishonored your village. Touch grass, then watch anime.'}
          </p>

          <button className="stamp-btn" onClick={reset}>RETRY</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <h3 className="quiz__title">ANIME QUIZ</h3>

      {/* Progress */}
      <div className="quiz__progress">
        <span className="quiz__progress-text">QUESTION {current + 1} / {quizQuestions.length}</span>
        <div className="quiz__progress-bar">
          <motion.div
            className="quiz__progress-fill"
            animate={{ width: `${((current) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="quiz__score-live">PL: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="quiz__question-wrap"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Silhouette */}
          <div className="quiz__silhouette" aria-hidden="true">
            <motion.div
              className={`quiz__silhouette-reveal ${selected === 'correct' ? 'quiz__silhouette-reveal--show' : ''}`}
            >
              <span className="quiz__silhouette-text">?</span>
              {selected === 'correct' && (
                <motion.span
                  className="quiz__answer-name"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {q.answer}
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Question */}
          <p className="quiz__question">{q.question}</p>
          <p className="quiz__hint">Hint: {q.hint}</p>

          {/* Options */}
          <div className="quiz__options">
            {q.options.map((opt) => {
              let state = 'idle'
              if (selected) {
                if (opt === q.answer) state = 'correct'
                else if (opt === selectedOption) state = 'wrong'
              }
              return (
                <motion.button
                  key={opt}
                  className={`quiz__option quiz__option--${state}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                  whileHover={!selected ? { x: 4 } : {}}
                  whileTap={!selected ? { scale: 0.97 } : {}}
                >
                  {opt}
                  {state === 'correct' && ' ✓'}
                  {state === 'wrong' && ' ✗'}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
