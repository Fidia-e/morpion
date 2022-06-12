import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import MathRandom from "../../utils/mathRandom";
import nameApi from "../../utils/api.json";
import "../../styles/index.scss";

const Welcome = ({ user, handleChange }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [computerUser, setComputerUser] = useState("");

  useEffect(() => {
    setLoader(false);

    const nameRandomNumber = MathRandom(29);
    const pickRandomName = nameApi.name[nameRandomNumber];
    setComputerUser(pickRandomName);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.trim().length > 0) {
      setError(false);
      setLoader(true);
      localStorage.setItem("pseudo", user);
      localStorage.setItem("pseudoOpponent", computerUser);

      const timer = setTimeout(() => {
        navigate("/jeu");
        return () => clearTimeout(timer);
      }, 1000);

      console.log("Arrête de regarder dans les placards des gens", user, "!");
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
          minLength="3"
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
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default Welcome;
