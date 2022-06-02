import Board from "../Board";

const Game = ({ user }) => {
  return (
    <div className="gameCtn">
      <h1 className="gameCtn__title">Hello {user}</h1>
      <div className="gameCtn__board">{<Board user={user} />}</div>
      <div className="gameCtn__info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
