import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../Board";
import "../../styles/index.scss";

const Game = ({ pseudo, setUser }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const navigate = useNavigate();

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
  const [stepNumber, setStepNumber] = useState(0);

  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }

    return null;
  }

  function calculateDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  }

  const winner = calculateWinner(squares);
  const draw = calculateDraw(squares);

  let status;

  if (winner) {
    status = winner + " a gagné ! 🎉";

    const timer = setTimeout(() => {
      setSquares(Array(9).fill(null));
      setStepNumber(0);
      return () => clearTimeout(timer);
    }, 1500);
  } else if (draw) {
    status = "Match nul";

    const timer = setTimeout(() => {
      setSquares(Array(9).fill(null));
      setStepNumber(0);
      return () => clearTimeout(timer);
    }, 1500);
  } else {
    // status = "Prochain joueur : " + (xIsNext ? { user: user } : "test");
    status = "Prochain joueur : " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    const historyCopy = history.slice(0, stepNumber + 1);
    const squaresCopy = [...squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setHistory(history.concat([squaresCopy]));
    setXIsNext(!xIsNext);
    setStepNumber(historyCopy.length);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="gameCtn">
      {pseudo && <h1 className="gameCtn__title">Hello {pseudo} 👋</h1>}
      <div className="gameCtn__board">
        {<Board status={status} handleClick={handleClick} squares={squares} />}
      </div>
      <p className="gameCtn__stepsCount">Nombre de coups {stepNumber}</p>
      <button
        className="gameCtn__logoutBtn"
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Je veux sortir de là 👀 !!
      </button>
      <div className="gameCtn__info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
