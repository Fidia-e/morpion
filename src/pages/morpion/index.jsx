import { Navigate } from "react-router-dom";
import Game from "../../components/Game";
import "../../styles/index.scss";

const Morpion = ({ pseudo }) => {
  return (
    <>
      {pseudo ? <Game pseudo={pseudo} /> : <Navigate to="/" replace={true} />}
    </>
  );
};

export default Morpion;
