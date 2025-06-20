 import { WINNER_COMBOS } from "../constants"
 
 export const checkWinner = (boardToCheck) => {
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