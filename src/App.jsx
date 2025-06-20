import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null); //Null es ganador, false es empate.

  const checkWinner = (boardToCheck) => {
    //Revisamos todas las ganadoras para ver si alguna coincide con las que tenemos
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return boardToCheck[a]
    }
    return null
  }

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
          {board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
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
          <>
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                      ? "¡Ups... nobody wins!"
                      : <>
                          The winner is... <br /><br /> 🥁🥁🥁
                        </>
                  }
                </h2>

                <header>
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button
                    className="winner-button"
                    onClick={() => resetGame()}
                  >
                    Play Again
                  </button>
                </footer>

              </div>
            </section>
          </>
        }

      </main>
    </>


  )
}

export default App
