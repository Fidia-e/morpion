import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../Board";
import MathRandom from "../../utils/mathRandom";
import "../../styles/index.scss";

const GameSolo = () => {
  //----------------------------------------------     Initialisation     ------------------------------------------------//
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [newGame, setNewGame] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

  const squaresCopy = [...squares];
  const nextPlayerRandom = MathRandom(2);

  const pseudo = localStorage.getItem("pseudo");
  const pseudoOpponent = localStorage.getItem("pseudoOpponent");

  const navigate = useNavigate();

  useEffect(() => {
    if (pseudo === null || pseudoOpponent === null) {
      navigate("/");
    }
  });

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

  // console.log("RENDU GAME");

  //----------------------------------------     Calcul gagnant // match nul     ------------------------------------------//
  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === "X") {
          return pseudo;
        } else return pseudoOpponent;
      }
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

  // si deux cases d'une même ligne sont identiques, alors remplir la 3e avec "O"
  // si A = B alors remplir C avec "O"
  // si A = C alors remplir B avec "O"
  // si B = C alors remplir A avec "O"

  if (squares[0] === squares[1] && squares[0]) {
    squares[2] = "O";
  }

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

  // fonction qui fait jouer l'ordinateur (random)

  if (xIsNext === false) {
    const timer = setTimeout((i) => {
      const emptySquares = squaresCopy.filter((square) => square === null);
      console.log("emptySquares:", emptySquares);
      console.log(`${pseudoOpponent}`, "vient de cliquer");
      const randomEmptySquare = MathRandom(emptySquares.length, 1);
      let availableSquares = 0;
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
      const [a, b, c] = lines[i];
      console.log("lines:", lines);

      // const [a, b, c] = lines[square];

      // récupérer la position des squares vides
      // maper à la place de filter pour récupérer les index des squares vides
      // puis les remplir avec "O"

      for (let i = 0; i < lines.length; i++) {
        console.log(i);
        if (squaresCopy[i] === null) {
          availableSquares++;

          if (availableSquares === randomEmptySquare) {
            squaresCopy[i] = "O";
            setSquares(squaresCopy);
            setXIsNext(!xIsNext);
            break;
          }
        }

        if (squaresCopy[a] && squaresCopy[a] === squaresCopy[b]) {
          squaresCopy[c] = "O";
          // setSquares(squaresCopy);
          // setXIsNext(!xIsNext);
        }

        if (squaresCopy[a] && squaresCopy[a] === squaresCopy[c]) {
          squaresCopy[b] = "O";
          // setSquares(squaresCopy);
          // setXIsNext(!xIsNext);
        }

        if (squaresCopy[b] && squaresCopy[b] === squaresCopy[c]) {
          squaresCopy[a] = "O";
          // setSquares(squaresCopy);
          // setXIsNext(!xIsNext);
        }
      }

      return () => clearTimeout(timer);
    }, 1500);
  } else {
  }

  // * squares[a] && squares[a] === squares[b] && squares[a] === squares[c]

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
    status =
      "Prochain joueur : " + (xIsNext ? `${pseudo}` : `${pseudoOpponent}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="gameSoloCtn">
      <div className="gameSoloCtn__title">
        {pseudo && (
          <h1 className="gameSoloCtn__title--pseudo">Hello {pseudo} 👋</h1>
        )}
        {pseudoOpponent && (
          <h2 className="gameSoloCtn__title--pseudoOpponent">
            Tu joues contre {pseudoOpponent}
          </h2>
        )}
      </div>
      <div className="gameSoloCtn__board">
        {<Board status={status} handleClick={handleClick} squares={squares} />}
      </div>
      <p className="gameSoloCtn__stepsCount">Nombre de coups {stepNumber}</p>
      <button
        className="gameSoloCtn__logoutBtn"
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Je veux sortir de là 👀 !!
      </button>
    </div>
  );
};

export default GameSolo;
