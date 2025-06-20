import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import {  TURNS } from './constants'
import { checkWinner } from './logics/board'
import { WinnerModal } from './components/WinnerModal'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null); //Null es ganador, false es empate.

  const updateBoard = (index) => {

    //Si la posicion ya tiene un valor, corta el proceso. Si ya hay un ganador tambien
    const newBoard = [...board]
    if (newBoard[index] || winner) return

    //Cambia turno al siguiente
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);

    //Dibuja el tablero
    newBoard[index] = turn
    setBoard(newBoard)

    const winner_checked = checkWinner(newBoard);

    if (winner_checked) {
      confetti()
      setWinner(winner_checked);
    }

    if (winner_checked === null && newBoard.every(x => x !== null)) {
      setWinner(false);
      console.log("Empate")
    }
  }

  const resetGame = () => {
    setWinner(null)
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
  }

  return (
    <>
      <main className='board'>
        <h1 style={{ marginBottom: "20px" }}>Tic Tac Toe</h1>
        <button onClick={() => resetGame()}>Reset Game</button>
        <section className='game'>
          {board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>

        </section>


        {winner !== null &&
          <WinnerModal resetGame = {resetGame} winner = {winner}/>
        }

      </main>
    </>


  )
}

export default App
