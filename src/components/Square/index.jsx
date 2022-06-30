import "../../styles/index.scss";

const Square = ({ value, onClick, status }) => {
  const pseudoOpponent = localStorage.getItem("pseudoOpponent");

  return (
    <>
      <button
        className="square"
        onClick={() => onClick()}
        disabled={status === `Prochain joueur : ${pseudoOpponent}`}
      >
        {value}
      </button>
    </>
  );
};

export default Square;
