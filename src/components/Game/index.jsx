import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../Board";
import "../../styles/index.scss";

const Game = ({ pseudo }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState();
  const [newGame, setNewGame] = useState(true);

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

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // const players = ["X", "O"];

  // const players = {
  //   name: { pseudo },
  //   token: ["X", "O"],
  // };

  // console.log(players.name.pseudo);

  // const nextPlayerRandom = (Math.random() * players.length * randomInt(2)) | 0;
  const nextSquareRandom = randomInt(9);
  console.log("nextSquareRandom:", nextSquareRandom);

  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
      // return players.name.pseudo;
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

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

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

  const winner = calculateWinner(squares);
  // const winner = players.name.pseudo;
  const draw = calculateDraw(squares);

  let status;

  if (winner || draw) {
    if (winner) {
      status = winner + " a gagné ! 🎉";
    }
    if (draw) {
      status = "Match nul 🤝";
    }

    const timer = setTimeout(() => {
      setSquares(Array(9).fill(null));
      setStepNumber(0);
      setNewGame(true);
      return () => clearTimeout(timer);
    }, 1000);
  } else {
    if (newGame) {
      const nextPlayerRandom = randomInt(2);

      if (nextPlayerRandom === 0) {
        setXIsNext(false);
      } else {
        setXIsNext(true);
      }

      setNewGame(false);
    }
    status = "Prochain joueur : " + (xIsNext ? "X" : "O");

    // status = "Prochain joueur : " + (xIsNext ? { players.name.pseudo } : "test");
    // status = "Prochain joueur : " + nextPlayerRandom;
  }

  console.log(history);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("pseudo", " ");
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
    </div>
  );
};

export default Game;
