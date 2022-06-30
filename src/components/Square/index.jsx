import "../../styles/index.scss";

const Square = ({ value, onClick, xIsNext }) => {
  return (
    <>
      <button
        className="square"
        onClick={() => onClick()}
        disabled={xIsNext === false}
      >
        {value}
      </button>
    </>
  );
};

export default Square;
