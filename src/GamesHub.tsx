// src/GamesHub.tsx
import { Link } from "react-router-dom";
import placeholderImage from "./assets/images/placeholder.jpg";

export default function GamesHub() {
  const games = [
    {
      title: "Unscramble Game",
      description: "Rearrange letters to form words and boost your vocabulary!",
      image: placeholderImage,
      link: "/unscramble",
    },
    {
      title: "Math Quiz (Coming Soon)",
      description: "Test your math skills in this fast-paced quiz game.",
      image: placeholderImage,
      link: "#",
    },
    {
      title: "Memory Match (Coming Soon)",
      description: "Flip cards and find pairs in this memory challenge.",
      image: placeholderImage,
      link: "#",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to EduGames 🎓
        </h1>
        <p className="text-lg text-gray-600">
          Fun, engaging, and educational games for learners of all ages.
        </p>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {game.title}
              </h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
              {game.link === "#" ? (
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed">
                  Coming Soon
                </button>
              ) : (
                <Link
                  to={game.link}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Play Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
