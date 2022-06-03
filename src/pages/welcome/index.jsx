import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.scss";

const Welcome = ({ user, handleChange }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Arrête de regarder dans les placards des gens", user, "!");

    if (user.trim().length !== 0) {
      navigate("/jeu");
    } else {
      setError(true);
    }
  };

  return (
    <div className="welcomeCtn">
      <h1 className="welcomeCtn__title">Une envie de jouer au morpion ? 🤓</h1>
      <form className="welcomeCtn__form" action="submit">
        <input
          className="welcomeCtn__form--input"
          type="text"
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
      <div className="welcomeCtn__error">
        {error && <p>Tu as oublié ton pseudo 😢</p>}
      </div>
    </div>
  );
};

export default Welcome;
