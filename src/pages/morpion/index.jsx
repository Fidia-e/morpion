import Game from "../../components/Game";
import "../../styles/index.scss";

const Morpion = ({ user }) => {
  return (
    <>
      <Game user={user} />
    </>
  );
};

export default Morpion;
