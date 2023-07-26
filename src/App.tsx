import { useState } from 'react'
import { LOCAL_STORAGE, TURNS, initBoard, initTurn } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import Square from './components/Square'
import confetti from 'canvas-confetti'
import Modal from './components/Modal'
import { resetLocalStorage, saveGameToStorage } from './logic/storage'

function App() {
  const [board, setBoard] = useState<TURNS[]>(() => {
    const savedBoard = localStorage.getItem(LOCAL_STORAGE.BOARD)
    return savedBoard ? JSON.parse(savedBoard) : initBoard
  })
  const [turn, setTurn] = useState<TURNS>(() => {
    const savedTurn = localStorage.getItem(LOCAL_STORAGE.TURN)
    return (savedTurn ?? initTurn) as TURNS
  })
  const [winner, setWinner] = useState<TURNS | null | false>(null)

  const updateBoard = (index: number): void => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setBoard(newBoard)
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) setWinner(false)
  }

  const resetGame = (): void => {
    setBoard(initBoard)
    setTurn(initTurn)
    setWinner(null)

    resetLocalStorage([LOCAL_STORAGE.BOARD, LOCAL_STORAGE.TURN])
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {board.map((square, i) => (
          <Square key={i} updateBoard={updateBoard} index={i}>
            {square}
          </Square>
        ))}
      </section>
      <section className='turn'>
        <Square className={turn === TURNS.X ? 'is-selected' : ''}>{TURNS.X}</Square>
        <Square className={turn === TURNS.O ? 'is-selected' : ''}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <Modal>
          <header className=''>
            <h2>{!winner ? 'Draw' : 'Win!'} </h2>
            {winner && <Square className='win'>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}>Play Again</button>
          </footer>
        </Modal>
      )}
    </main>
  )
}

export default App
