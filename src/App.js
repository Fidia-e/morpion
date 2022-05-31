import { Routes, Route } from "react-router-dom";
// import NotFound from "./components/NotFound";
import Game from "./components/Game";
import "../src/index.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Game />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
