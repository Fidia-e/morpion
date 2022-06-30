import { useState } from "react";
import GameSolo from "../../components/Game/solo";
import GameDuo from "../../components/Game/duo";
import calculateWinner from "../../utils/calculateWinner";
import "../../styles/index.scss";

const Morpion = () => {
  const pseudo = localStorage.getItem("pseudo");
  const joueur1 = localStorage.getItem("joueur 1");
  const joueur2 = localStorage.getItem("joueur 2");
  const players = [joueur1, joueur2];

  return (
    <>
      {pseudo && <GameSolo />}
      {players && <GameDuo />}
    </>
  );
};

export default Morpion;
