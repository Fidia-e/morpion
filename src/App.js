import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import "../src/index.scss";
import "./styles/index.scss";

function App() {
  const [user, setUser] = useState("");
  // const [error, setError] = useState(false);

  const handleChange = (event) => {
    setUser(event.target.value);

    // if (!event.target.value) {
    //   setError(true);
    // }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Welcome user={user} handleChange={handleChange} />}
        />
        <Route path="/jeu" element={<Morpion user={user} />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
