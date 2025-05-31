import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGame from "./pages/StartGame";
import Adventure from "./pages/Adventure";
import Inventory from "./pages/Inventory";
import WorldMap from "./pages/WorldMap";
import History from "./pages/History";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/map" element={<WorldMap />} />
        <Route path="/history" element={<History />} />
        <Route path="/newgame" element={<NewGame />} />
      </Routes>
    </Router>
  );
}

export default App;
