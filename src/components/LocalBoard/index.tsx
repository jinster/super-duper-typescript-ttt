import React from 'react';
import './index.css';

type SquareProps = {
  boardNumber: number,
  squareNumber: number,
  clickSquare: Function,
  value: string,
}

type LocalBoardProps = {
  boardNumber: number,
  boardStatus: boolean,
  squareData: string[][],
  clickSquare: Function,
  isValid: boolean,
}

const Square = ({
  boardNumber,
  squareNumber,
  value,
  clickSquare
} : SquareProps) => {
  return (
    <button
      className="square"
      onClick={() => clickSquare(boardNumber, squareNumber)}
      style={{color: `${value === 'O' ? '#f1faee' : '#e63946'}`}}
    >
      {value}
    </button>
  )
} 

const LocalBoard = ({
  boardNumber,
  boardStatus,
  squareData,
  clickSquare,
  isValid
} : LocalBoardProps) => {
  const renderSquare = (squareNumber: number) => {
    return (
      <Square
        boardNumber={boardNumber}
        squareNumber={squareNumber}
        value={squareData[boardNumber][squareNumber]}
        clickSquare={clickSquare}
      />
    )
  }

  return (
    <div className={`localBoard${isValid ? ' isValid' : ''} ${boardStatus}won`}>
      <div className={`${boardStatus ? 'showStatus' : ''}`}>{boardStatus}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default LocalBoard;