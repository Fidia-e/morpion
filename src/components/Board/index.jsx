// import { useState } from "react";
import Square from "../Square";
import "../../styles/index.scss";

const Board = ({ squares, status, handleClick }) => {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        status={status}
        onClick={() => handleClick(i)}
      />
    );
  }

  return (
    <div className="boardCtn">
      <div className="boardCtn__status">{status}</div>
      <div className="boardCtn__board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="boardCtn__board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="boardCtn__board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
