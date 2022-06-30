import "../../styles/index.scss";

const Square = ({ value, onClick, xIsNext }) => {
  return (
    <>
      <button className="square" onClick={() => onClick()}>
        {value}
      </button>
    </>
  );
};

export default Square;
