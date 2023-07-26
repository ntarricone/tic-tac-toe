import { TURNS, WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck: TURNS[]): TURNS | null => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    )
      return boardToCheck[a]
  }
  return null
}

export const checkEndGame = (newBoard: TURNS[]): boolean =>
  newBoard.every(square => square !== null)
