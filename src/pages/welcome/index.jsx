import { useNavigate } from "react-router-dom";
import "../../styles/index.scss";

const Welcome = ({ user, handleChange }) => {
  const navigate = useNavigate();

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
          Jouer seul <span className="welcomeCtn__form--btn--span">🤳</span>
        </button>
        <button
          className="welcomeCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmitDuo(event)}
        >
          Jouer à deux <span className="welcomeCtn__form--btn--span">📲</span>
        </button>
      </form>
    </div>
  );
};

export default Welcome;
