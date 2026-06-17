/**
 * Minimax AI for Tic Tac Toe.
 * AI is 'O', human is 'X'.
 */

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],          // diags
]

export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  if (board.every(Boolean)) return { winner: 'draw', line: [] }
  return null
}

function score(board, depth) {
  const result = checkWinner(board)
  if (!result) return 0
  if (result.winner === 'O') return 10 - depth
  if (result.winner === 'X') return depth - 10
  return 0
}

function minimax(board, depth, isMaximizing) {
  const result = checkWinner(board)
  if (result) return score(board, depth)

  if (isMaximizing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O'
        best = Math.max(best, minimax(board, depth + 1, false))
        board[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X'
        best = Math.min(best, minimax(board, depth + 1, true))
        board[i] = null
      }
    }
    return best
  }
}

/** Returns best move index for AI ('O'). */
export function getBestMove(board) {
  let bestVal = -Infinity
  let bestMove = -1

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O'
      const val = minimax(board, 0, false)
      board[i] = null
      if (val > bestVal) {
        bestVal = val
        bestMove = i
      }
    }
  }
  return bestMove
}

/** Returns a random available move (easy mode). */
export function getRandomMove(board) {
  const empty = board.map((v, i) => (v ? null : i)).filter((i) => i !== null)
  return empty[Math.floor(Math.random() * empty.length)]
}
