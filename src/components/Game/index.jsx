// import { useState } from "react";
import Board from "../Board";

const Game = ({ user }) => {
  // const [user, setUser] = useState("");

  return (
    <div className="game">
      <div>Hello {user}</div>
      <div className="game-board">{<Board />}</div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
