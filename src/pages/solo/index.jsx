import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import MathRandom from "../../utils/mathRandom";
import nameApi from "../../utils/api.json";
import "../../styles/index.scss";

const Solo = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [computerUser, setComputerUser] = useState("");

  useEffect(() => {
    setLoader(false);

    const nameRandomNumber = MathRandom(36);
    const pickRandomName = nameApi.name[nameRandomNumber];
    setComputerUser(pickRandomName);
  }, []);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.trim().length > 0) {
      setError(false);
      setLoader(true);
      localStorage.setItem("pseudo", user);
      localStorage.setItem("pseudoOpponent", computerUser);

      const timer = setTimeout(() => {
        navigate("/jeu-solo");
        return () => clearTimeout(timer);
      }, 1000);

      console.log("Arrête de regarder dans les placards des gens", user, "!");
    } else {
      setError(true);
    }
  };

  return (
    <div className="welcomeSoloCtn">
      <h1 className="welcomeSoloCtn__title">Tu affronteras l'ordinateur 🧑‍💻</h1>
      <form className="welcomeSoloCtn__form" action="submit">
        <input
          className="welcomeSoloCtn__form--input"
          type="text"
          placeholder="pseudo"
          minLength="3"
          value={user}
          onChange={handleChange}
        />
        <button
          className="welcomeSoloCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Jouer
        </button>
      </form>
      <div className="welcomeSoloCtn__error">
        {error && <p>Tu as oublié ton pseudo 😢</p>}
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default Solo;
