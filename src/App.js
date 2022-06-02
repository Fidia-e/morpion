import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import "../src/index.scss";

function App() {
  const [user, setUser] = useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Welcome user={user} handleChange={handleChange} />}
        />
        <Route path="/game" element={<Morpion user={user} />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
