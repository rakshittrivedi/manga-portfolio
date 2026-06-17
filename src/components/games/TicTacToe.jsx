import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBestMove, getRandomMove, checkWinner } from '../../utils/aiMinimax'
import SFXText from '../shared/SFXText'
import './TicTacToe.css'

const EMPTY = Array(9).fill(null)

const ICONS = { X: '⚔', O: '🛡' }

export default function TicTacToe() {
  const [board, setBoard] = useState([...EMPTY])
  const [isXTurn, setIsXTurn] = useState(true)
  const [difficulty, setDifficulty] = useState('hard') // easy | hard
  const [result, setResult] = useState(null) // null | { winner, line }
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  // AI move
  useEffect(() => {
    if (isXTurn || result) return
    const timer = setTimeout(() => {
      const move = difficulty === 'hard' ? getBestMove([...board]) : getRandomMove([...board])
      if (move === -1 || move === undefined) return
      const newBoard = [...board]
      newBoard[move] = 'O'
      setBoard(newBoard)
      const outcome = checkWinner(newBoard)
      if (outcome) {
        setResult(outcome)
        setScores((s) => ({ ...s, [outcome.winner]: (s[outcome.winner] || 0) + 1 }))
      } else {
        setIsXTurn(true)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [isXTurn, board, result, difficulty])

  const handleClick = (i) => {
    if (!isXTurn || board[i] || result) return
    const newBoard = [...board]
    newBoard[i] = 'X'
    setBoard(newBoard)
    const outcome = checkWinner(newBoard)
    if (outcome) {
      setResult(outcome)
      setScores((s) => ({ ...s, [outcome.winner]: (s[outcome.winner] || 0) + 1 }))
    } else {
      setIsXTurn(false)
    }
  }

  const reset = () => {
    setBoard([...EMPTY])
    setIsXTurn(true)
    setResult(null)
  }

  const winLine = result?.line || []

  return (
    <div className="ttt">
      <h3 className="ttt__title">TIC TAC TOE VS AI</h3>

      {/* Difficulty */}
      <div className="ttt__difficulty" role="group" aria-label="Difficulty">
        {['easy', 'hard'].map((d) => (
          <button
            key={d}
            className={`ttt__diff-btn ${difficulty === d ? 'ttt__diff-btn--active' : ''}`}
            onClick={() => { setDifficulty(d); reset() }}
            aria-pressed={difficulty === d}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="ttt__scores">
        <div className="ttt__score">
          <span>{ICONS.X} YOU</span>
          <span className="ttt__score-val">{scores.X}</span>
        </div>
        <div className="ttt__score ttt__score--draw">
          <span>DRAW</span>
          <span className="ttt__score-val">{scores.draw}</span>
        </div>
        <div className="ttt__score">
          <span>{ICONS.O} AI</span>
          <span className="ttt__score-val">{scores.O}</span>
        </div>
      </div>

      {/* Board */}
      <div className="ttt__board" role="grid" aria-label="Tic Tac Toe board">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            className={`ttt__cell ${winLine.includes(i) ? 'ttt__cell--win' : ''}`}
            onClick={() => handleClick(i)}
            aria-label={`Cell ${i + 1}${cell ? `, ${cell === 'X' ? 'you' : 'AI'}` : ', empty'}`}
            disabled={!!cell || !!result || !isXTurn}
            whileHover={!cell && !result && isXTurn ? { scale: 1.05 } : {}}
            whileTap={!cell && !result && isXTurn ? { scale: 0.95 } : {}}
          >
            <AnimatePresence>
              {cell && (
                <motion.span
                  key={cell + i}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                  className={`ttt__icon ttt__icon--${cell.toLowerCase()}`}
                  aria-hidden="true"
                >
                  {ICONS[cell]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Status */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            className="ttt__result"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {result.winner === 'X' && <SFXText text="VICTORY!!" size="2rem" rotate={-5} style={{ color: 'var(--ink-black)' }} />}
            {result.winner === 'O' && <SFXText text="DEFEATED!!" size="2rem" rotate={5} style={{ color: 'var(--ink-black)' }} />}
            {result.winner === 'draw' && <SFXText text="DRAW!!" size="2rem" rotate={0} style={{ color: 'var(--ink-black)' }} />}
            <button className="stamp-btn ttt__reset-btn" onClick={reset}>REMATCH</button>
          </motion.div>
        ) : (
          <motion.p key="turn" className="ttt__turn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {isXTurn ? `YOUR TURN ${ICONS.X}` : `AI THINKING ${ICONS.O}...`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
