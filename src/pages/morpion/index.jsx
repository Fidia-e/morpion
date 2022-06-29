import { Navigate } from "react-router-dom";
import GameSolo from "../../components/Game/solo";
import "../../styles/index.scss";

const Morpion = () => {
  const pseudo = localStorage.getItem("pseudo");

  return <>{pseudo ? <GameSolo /> : <Navigate to="/" replace={true} />}</>;
};

export default Morpion;
