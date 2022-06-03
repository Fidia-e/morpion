import { useState } from "react";
import Board from "../Board";

const Game = ({ user }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [history, setHistory] = useState([Array(9).fill(null)]);

  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }

    return null;
  }

  // function calculateDraw(squares) {
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];

  //     if (
  //       squares[a] &&
  //       squares[a] === squares[b] &&
  //       squares[a] !== squares[c]
  //       // squares[i] !== null
  //     )
  //       return "draw";
  //   }
  // }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = winner + " a gagné";
    const timer = setTimeout(() => {
      setSquares(Array(9).fill(null));
      return () => clearTimeout(timer);
    }, 1500);
    // } else if (matchNull) {
    //   status = "Match nul";
    //   const timer = setTimeout(() => {
    //     setSquares(Array(9).fill(null));
    //     return () => clearTimeout(timer);
    //   }, 1500);
  } else {
    // status = "Prochain joueur : " + (xIsNext ? { user: user } : "test");
    status = "Prochain joueur : " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    // const history = history;
    // const current = history[history.length - 1];
    const squaresCopy = [...squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="gameCtn">
      <h1 className="gameCtn__title">Hello {user}</h1>
      <div className="gameCtn__board">
        {
          <Board
            user={user}
            status={status}
            handleClick={handleClick}
            squares={squares}
          />
        }
      </div>
      <div className="gameCtn__info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
