import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GamesHub from "./GamesHub";
import UnscrambleGame from "./UnscrambleGame";
import MatchingGame from "./MatchingGame";

function App() {
  return (
    <Router>
      <div className="flex justify-between p-4 bg-gray-100 shadow">
        <nav className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/unscramble" className="text-gray-600 hover:text-indigo-600">
            Unscramble
          </Link>
          {/* 👇 Add the new Matching game link here */}
          <Link to="/matching" className="text-gray-600 hover:text-indigo-600">
            Matching
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<GamesHub />} />
        <Route path="/unscramble" element={<UnscrambleGame />} />
        <Route path="/matching" element={<MatchingGame />} />
      </Routes>
    </Router>
  );
}

export default App;
