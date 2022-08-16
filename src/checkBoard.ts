const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkBoardFilled = (boardToCheck : Array<string>) => {
  let i : number = 0;
  let filled = true;
  while (i < 9 && filled) {
    if (boardToCheck[i] === null) {
      filled = false;
    }
    i++;
  }
  return filled ? 'T' : null;
}

export const checkBoardWin = (boardToCheck: Array<string>) => {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return checkBoardFilled(boardToCheck);
}