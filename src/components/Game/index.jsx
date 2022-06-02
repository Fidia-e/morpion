import { useState } from "react";
import Board from "../Board";

const Game = () => {
  const [user, setUser] = useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Arrête de regarder dans les placards des gens", user, "!");
  };

  return (
    <div className="game">
      <div>Hello {user}</div>
      <div className="game-board">{<Board />}</div>
      <div className="game-info">
        <form action="submit">
          <input
            type="pseudo"
            placeholder="pseudo"
            value={user}
            onChange={handleChange}
          />
          <button type="submit" onClick={(event) => handleSubmit(event)}>
            Jouer
          </button>
        </form>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
