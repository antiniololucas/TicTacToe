import { Square } from "./Square"
export function WinnerModal({winner, resetGame}) {

    if (winner === null) return null

    const winner_text = winner === false
        ? "¡Ups... nobody wins!"
        : "The winner is..."

    return (

        <section className="winner">
            <div className="text">
                <h2>{winner_text}</h2>
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
    )
}