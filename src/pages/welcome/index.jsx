import { useNavigate } from "react-router-dom";
import "../../styles/index.scss";

const Welcome = ({ user, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/jeu");

    console.log("Arrête de regarder dans les placards des gens", user, "!");
  };

  return (
    <div className="welcomeCtn">
      <h1 className="welcomeCtn__title">Une envie de jouer au morpion ? 🤓</h1>
      <form className="welcomeCtn__form" action="submit">
        <input
          className="welcomeCtn__form--input"
          type="pseudo"
          placeholder="pseudo"
          value={user}
          onChange={handleChange}
        />
        <button
          className="welcomeCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Jouer
        </button>
      </form>
    </div>
  );
};

export default Welcome;
