import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import "../src/index.scss";
import "./styles/index.scss";

function App() {
  const [user, setUser] = useState("");
  const [newGame, setNewGame] = useState(true);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              user={user}
              setUser={setUser}
              handleChange={handleChange}
            />
          }
        />
        <Route
          path="/jeu"
          element={
            <Morpion user={user} newGame={newGame} setNewGame={setNewGame} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
