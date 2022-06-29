import { Navigate } from "react-router-dom";
import Game from "../../components/Game";
import "../../styles/index.scss";

const Morpion = () => {
  const pseudo = localStorage.getItem("pseudo");

  return <>{pseudo ? <Game /> : <Navigate to="/" replace={true} />}</>;
};

export default Morpion;
