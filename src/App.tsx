// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GamesHub from "./GamesHub";
import UnscrambleGame from "./UnscrambleGame";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EduGames 🎮
            </Link>
            <nav className="space-x-6">
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                Home
              </Link>
              <Link
                to="/unscramble"
                className="text-gray-600 hover:text-indigo-600"
              >
                Unscramble
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<GamesHub />} />
            <Route path="/unscramble" element={<UnscrambleGame />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-6">
          <div className="container mx-auto px-6 py-4 text-center text-gray-500">
            © {new Date().getFullYear()} EduGames. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}
