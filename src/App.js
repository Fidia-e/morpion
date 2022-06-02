import { Routes, Route, Navigate } from "react-router-dom";
// import NotFound from "./components/NotFound";
import Welcome from "./pages/welcome";
import Morpion from "./pages/morpion";
import "../src/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome user />} />
        <Route path="/game" element={<Morpion user />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
