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

    const nameRandomNumber = MathRandom(36);
    const pickRandomName = nameApi.name[nameRandomNumber];
    setComputerUser(pickRandomName);
  }, []);

  const handleSubmitSolo = (event) => {
    event.preventDefault();
    navigate("/solo");
  };

  const handleSubmitDuo = (event) => {
    event.preventDefault();
    navigate("/duo");
  };

  return (
    <div className="welcomeCtn">
      <h1 className="welcomeCtn__title">Une envie de jouer au morpion ? 🤓</h1>
      <form className="welcomeCtn__form" action="submit">
        <button
          className="welcomeCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmitSolo(event)}
        >
          Jouer seul 🤳
        </button>
        <button
          className="welcomeCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmitDuo(event)}
        >
          Jouer à deux 📲
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
