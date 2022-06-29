import { Navigate } from "react-router-dom";
import GameSolo from "../../components/Game/solo";
import GameDuo from "../../components/Game/duo";
import "../../styles/index.scss";

const Morpion = () => {
  const pseudo = localStorage.getItem("pseudo");
  const joueur1 = localStorage.getItem("joueur 1");
  const joueur2 = localStorage.getItem("joueur 2");

  return (
    <>
      {pseudo ? <GameSolo /> : <Navigate to="/" replace={true} />}
      {joueur1 && joueur2 ? <GameDuo /> : <Navigate to="/" replace={true} />}
    </>
  );
};

export default Morpion;
