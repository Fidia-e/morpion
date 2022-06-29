import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import Solo from "./pages/solo";
import Duo from "./pages/duo";
import GameSolo from "./components/Game/solo";
import GameDuo from "./components/Game/duo";
import "../src/index.scss";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
            // user={user}
            // setUser={setUser}
            // handleChange={handleChange}
            />
          }
        />
        <Route path="/solo" element={<Solo />} />
        <Route path="/duo" element={<Duo />} />
        <Route path="/jeu" element={<Morpion />} />
        <Route path="/jeu-solo" element={<GameSolo />} />
        <Route path="/jeu-duo" element={<GameDuo />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
