import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import "../src/index.scss";
import "./styles/index.scss";

function App() {
  const [user, setUser] = useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const pseudo = localStorage.getItem("pseudo");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Welcome user={user} handleChange={handleChange} />}
        />
        <Route path="/jeu" element={<Morpion pseudo={pseudo} />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
