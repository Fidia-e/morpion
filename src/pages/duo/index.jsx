import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import "../../styles/index.scss";

const Duo = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    player1: "",
    player2: "",
  });

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (users.player1.trim() === "" || users.player2.trim() === "") {
      setError(true);
    } else {
      setError(false);
      setLoader(true);
      localStorage.setItem("joueur1", users.player1);
      localStorage.setItem("joueur2", users.player2);

      const timer = setTimeout(() => {
        navigate("/jeu-duo");
        return () => clearTimeout(timer);
      }, 1000);

      console.log(
        `Arrêtez de regarder dans les placards des gens, ${users.player1} et ${users.player2}!`
      );
    }
  };

  return (
    <div className="welcomeDuoCtn">
      <h1 className="welcomeDuoCtn__title">
        Vous jouerez l'un(e) contre l'autre 🙋💁
      </h1>
      <form className="welcomeDuoCtn__form" action="submit">
        <input
          className="welcomeDuoCtn__form--input"
          name="player1"
          type="text"
          placeholder="pseudo joueur 1"
          minLength="3"
          value={users.player1}
          onChange={handleChange}
        />
        <input
          className="welcomeDuoCtn__form--input"
          name="player2"
          type="text"
          placeholder="pseudo joueur 2"
          minLength="3"
          value={users.player2}
          onChange={handleChange}
        />
        <button
          className="welcomeDuoCtn__form--btn"
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Jouer
        </button>
      </form>
      <div className="welcomeCtn__error">
        {error && <p>Quelqu'un a oublié son pseudo 😢</p>}
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default Duo;
