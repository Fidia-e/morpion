import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../Board";
import MathRandom from "../../utils/mathRandom";
import "../../styles/index.scss";

const Game = ({ newGame, setNewGame }) => {
  //----------------------------------------------     Initialisation     ------------------------------------------------//
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  // const [currentOpponent, setCurrentOpponent] = useState([]);

  const nextPlayerRandom = MathRandom(2);

  const pseudo = localStorage.getItem("pseudo");
  const pseudoOpponent = localStorage.getItem("pseudoOpponent");

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

  // TODO trouver comment afficher le BON nom du gagant

  // const players = {
  //   name: [`${pseudo}`, `${pseudoOpponent}`],
  //   token: ["X", "O"],
  // };

  const players = {
    user: {
      name: `${pseudo}`,
      token: "X",
    },
    computer: {
      name: `${pseudoOpponent}`,
      token: "O",
    },
  };

  console.log(players.user);
  console.log(players.computer);

  // console.log(players.name);
  // console.log(players.token);
  // console.log(`${pseudo}`);
  // console.log(`${pseudoOpponent}`);

  // TODO const nextSquareRandom = randomInt(9);

  // useEffect(() => {
  //   const token = players.token;
  //   setCurrentOpponent([pseudoOpponent, token[nextPlayerRandom]]);
  //   localStorage.setItem("pseudoOpponent", currentOpponent[0]);
  //   console.log("currentOpponent:", currentOpponent);
  // }, []);

  //---------------------------------------------     Calcul gagnants     -----------------------------------------------//
  function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];

        // if(squares[a] === "X") {
        //   return `${pseudo}`;
        // } else return `${pseudoOpponent}`;
      }

      // squares[a] === "X" ? `${pseudo}` : `${pseudoOpponent}`;
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

  //-----------------------------------------------------------------------------------------------------------------------//
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const squaresCopy = [...squares];

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

  if (xIsNext === false) {
    const timer = setTimeout(() => {
      const emptySquares = squaresCopy.filter((square) => square === null);
      const randomEmptySquare = MathRandom(emptySquares.length);

      if (emptySquares) {
        // squaresCopy.splice(randomEmptySquare, 1, "O");
        squaresCopy.splice(randomEmptySquare, 1, "O");
      }

      console.log("emptySquares:", emptySquares);
      console.log("JEU------->:", squaresCopy);

      return () => clearTimeout(timer);
    }, 1500);

    // setSquares(squaresCopy);
  }

  // console.log(squaresCopy);

  const winner = calculateWinner(squares);
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
    <div className="gameCtn">
      <div className="gameCtn__title">
        {pseudo && (
          <h1 className="gameCtn__title--pseudo">Hello {pseudo} 👋</h1>
        )}
        {pseudoOpponent && (
          <h2 className="gameCtn__title--pseudoOpponent">
            Tu joues contre {pseudoOpponent}
          </h2>
        )}
      </div>
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
