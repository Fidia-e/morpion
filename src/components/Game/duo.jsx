import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../Board";
import MathRandom from "../../utils/mathRandom";
import calculateWinner from "../../utils/calculateWinner";
import calculateDraw from "../../utils/calculateDraw";
import "../../styles/index.scss";

const GameDuo = () => {
  //----------------------------------------------     Initialisation     ------------------------------------------------//
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [newGame, setNewGame] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

  const squaresCopy = [...squares];
  const nextPlayerRandom = MathRandom(2);

  const joueur1 = localStorage.getItem("joueur1");
  const joueur2 = localStorage.getItem("joueur2");
  const players = [joueur1, joueur2];

  const navigate = useNavigate();

  useEffect(() => {
    if (joueur1 === null || joueur2 === null) {
      navigate("/");
    }
  });

  //---------------------------------------------------   JEU   --------------------------------------------------------//

  function handleClick(i) {
    const historyCopy = history.slice(0, stepNumber + 1);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setHistory(history.concat([squaresCopy]));
    setXIsNext(!xIsNext);
    setStepNumber(historyCopy.length);
  }

  //-----------------------------------------------   AFFICHAGE   ----------------------------------------------------//

  const winner = calculateWinner(squares);
  const draw = calculateDraw(squares);

  let status;

  if (winner || draw) {
    if (winner) {
      status = winner + " a gagné ! 🎉";
    }
    if (!winner && draw) {
      status = "Match nul 🤝";
    }

    const timer = setTimeout(() => {
      setSquares(Array(9).fill(null));
      setStepNumber(0);
      setNewGame(true);
      return () => clearTimeout(timer);
    }, 1500);
  } else {
    if (newGame) {
      if (nextPlayerRandom === 0) {
        setXIsNext(false);
      } else {
        setXIsNext(true);
      }
      setNewGame(false);
    }
    status = "Prochain joueur : " + (xIsNext ? `${joueur1}` : `${joueur2}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="gameDuoCtn">
      <div className="gameDuoCtn__title">
        {players && (
          <h1 className="gameDuoCtn__title--pseudo">
            Hello {joueur1} et {joueur2} 👋
          </h1>
        )}
        <h2 className="gameDuoCtn__title--subtitle">
          Vous commencerez chacun(e) votre tour aléatoirement 🎲 !
        </h2>
      </div>
      <div className="gameDuoCtn__board">
        {<Board status={status} handleClick={handleClick} squares={squares} />}
      </div>
      <p className="gameDuoCtn__stepsCount">Nombre de coups {stepNumber}</p>
      <button
        className="gameDuoCtn__logoutBtn"
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Je veux sortir de là 👀 !!
      </button>
    </div>
  );
};

export default GameDuo;
