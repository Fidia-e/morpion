import { Navigate } from "react-router-dom";
import Game from "../../components/Game";
import "../../styles/index.scss";

const Morpion = ({ user }) => {
  const pseudo = localStorage.getItem("pseudo");

  return (
    <>
      {pseudo ? (
        <Game user={user} pseudo={pseudo} />
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Morpion;
