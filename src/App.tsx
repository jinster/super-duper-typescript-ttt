import React, { useEffect, useState } from "react";
import "./index.css";
import GlobalBoard from './components/GlobalBoard';
import { checkBoardWin } from './checkBoard';

export default function App() {
  const [gameOver, setGameOver] = useState('');
  const [squareData, setSquareData] = useState(Array.from({ length: 9 }, e => Array(9).fill(null)));
  const [localBoardStatus, setLocalBoardStatus] = useState(Array(9).fill(null))
  const [validBoardNumbers, setValidBoardNumbers] = useState(Array.from({length: 9}, (e, i) => i));
  const [xIsNext, setxIsNext] = useState(true);

  const playAgain = () => {
    //reset everything
  }

  useEffect(() => {
    if (gameOver) {
      setValidBoardNumbers([]);
    }
  }, [gameOver]);

  const clickSquare = (boardNumber: number, squareNumber: number) => {
    if (squareData[boardNumber][squareNumber] ||
        !(validBoardNumbers.indexOf(boardNumber) > -1) ||
        gameOver) return;

    const newSquareData = squareData;
    newSquareData[boardNumber][squareNumber] = xIsNext ? 'X' : 'O';
    setSquareData(newSquareData);
    setxIsNext(!xIsNext);

    // Check if the local board has a winner or is filled
    const updatedBoardStatus = checkBoardWin(newSquareData[boardNumber]);
    const newLocalBoardStatus = localBoardStatus;
    if (updatedBoardStatus) {
      newLocalBoardStatus[boardNumber] = updatedBoardStatus;
      setLocalBoardStatus(newLocalBoardStatus);

      // Check if we have an overall winner
      const winner = checkBoardWin(newLocalBoardStatus);
      if (winner) setGameOver(winner);
    }

    // Generate new list of valid boards for next player to move
    const newValidBoardNumbers = [];
    if (newLocalBoardStatus[squareNumber] !== null) {
      for (let i = 0; i < 9; i++) {
        if (newLocalBoardStatus[i] === null) {
          newValidBoardNumbers.push(i);
        }
      }
    } else {
      newValidBoardNumbers.push(squareNumber);
    }
    setValidBoardNumbers(newValidBoardNumbers);
  }

  return (
    <div className="App">
      <h1>Super Tic-Tac-Toe</h1>
      <div className="globalBoardContainer">
        <GlobalBoard 
          validBoardNumbers={validBoardNumbers}
          localBoardStatus={localBoardStatus}
          squareData={squareData}
          clickSquare={clickSquare}
        />
      </div>
      {!gameOver ? <div>Player to move: {xIsNext ? 'X' : 'O'}</div>
        : 
        <>
          <div>Game over -- Winner: {gameOver}</div>
          <button onClick={playAgain}>Play Again?</button>
        </>
      }
    </div>
  );
}
