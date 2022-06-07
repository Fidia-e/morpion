import { Navigate } from "react-router-dom";
import Game from "../../components/Game";
import "../../styles/index.scss";

const Morpion = ({ user }) => {
  return (
    <>{user ? <Game user={user} /> : <Navigate to="/" replace={true} />}</>
  );
};

export default Morpion;
