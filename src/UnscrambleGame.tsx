import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Trophy,
  Star,
} from "lucide-react";

// ✅ Import placeholder
import placeholderImage from "./assets/images/placeholder.jpg";

// Type
type WordData = {
  word: string;
  hint: string;
  illustration: string; // just the filename (e.g., "cat.jpg")
};

// ✅ Word database (just file names instead of direct imports)
const wordDatabase: Record<string, WordData[]> = {
  easy: [
    { word: "CAT", hint: "A furry pet that says meow", illustration: "cat.jpg" },
    { word: "DOG", hint: "A loyal pet that wags its tail", illustration: "dog.jpg" },
    { word: "SUN", hint: "The star that gives us light", illustration: "sun.jpg" },
    { word: "CAR", hint: "You drive it on the road", illustration: "car.jpg" },
    { word: "BALL", hint: "You play with it", illustration: "ball.jpg" },
    { word: "BOOK", hint: "You read it", illustration: "book.jpg" },
    { word: "TREE", hint: "It has leaves", illustration: "tree.jpg" },
    { word: "BIRD", hint: "It can fly", illustration: "bird.jpg" },
    { word: "FISH", hint: "It swims", illustration: "fish.jpg" },
    { word: "HAT", hint: "You wear it on your head", illustration: "hat.jpg" },
    { word: "BED", hint: "You sleep on it", illustration: "bed.jpg" },
    { word: "MILK", hint: "A white drink", illustration: "milk.jpg" },
    { word: "EGG", hint: "It comes from a chicken", illustration: "egg.jpg" },
    { word: "CUP", hint: "You drink from it", illustration: "cup.jpg" },
    { word: "BOX", hint: "It holds things", illustration: "box.jpg" },
    { word: "DUCK", hint: "It quacks", illustration: "duck.jpg" },
    { word: "TOY", hint: "Kids play with it", illustration: "toy.jpg" },
    { word: "CAKE", hint: "Sweet and tasty", illustration: "cake.jpg" },
    { word: "KEY", hint: "Opens a door", illustration: "key.jpg" },
    { word: "MAP", hint: "Shows places", illustration: "map.jpg" },
    { word: "RAIN", hint: "Falls from the sky", illustration: "rain.jpg" },
    { word: "ICE", hint: "Frozen water", illustration: "ice.jpg" },
    { word: "STAR", hint: "Shines at night", illustration: "star.jpg" },
    { word: "COW", hint: "It gives milk", illustration: "cow.jpg" },
    { word: "PEN", hint: "You write with it", illustration: "pen.jpg" },
  ],
  medium: [
    { word: "APPLE", hint: "A fruit that keeps the doctor away", illustration: "apple.jpg" },
    { word: "HOUSE", hint: "You live in it", illustration: "house.jpg" },
    { word: "WATER", hint: "You drink it", illustration: "water.jpg" },
    { word: "MUSIC", hint: "What you listen to for fun", illustration: "music.jpg" },
    { word: "CHAIR", hint: "You sit on it", illustration: "chair.jpg" },
    { word: "PLANE", hint: "It flies in the sky", illustration: "plane.jpg" },
    { word: "CLOCK", hint: "Tells time", illustration: "clock.jpg" },
    { word: "SCHOOL", hint: "Place to learn", illustration: "school.jpg" },
    { word: "BREAD", hint: "You eat it", illustration: "bread.jpg" },
    { word: "HORSE", hint: "It runs fast", illustration: "horse.jpg" },
    { word: "SHIRT", hint: "You wear it", illustration: "shirt.jpg" },
    { word: "TRAIN", hint: "Runs on tracks", illustration: "train.jpg" },
    { word: "FRUIT", hint: "Banana, apple, orange", illustration: "fruit.jpg" },
    { word: "LIGHT", hint: "Helps you see", illustration: "light.jpg" },
    { word: "CLOUD", hint: "Floats in the sky", illustration: "cloud.jpg" },
    { word: "SMILE", hint: "When you are happy", illustration: "smile.jpg" },
    { word: "SUGAR", hint: "Makes things sweet", illustration: "sugar.jpg" },
    { word: "PANTS", hint: "You wear them", illustration: "pants.jpg" },
    { word: "MOUSE", hint: "Small animal", illustration: "mouse.jpg" },
    { word: "TABLE", hint: "You eat at it", illustration: "table.jpg" },
    { word: "PHONE", hint: "Used to call", illustration: "phone.jpg" },
    { word: "BRUSH", hint: "Used for hair or teeth", illustration: "brush.jpg" },
    { word: "PLANT", hint: "Grows in soil", illustration: "plant.jpg" },
    { word: "CANDY", hint: "Sweet treat", illustration: "candy.jpg" },
    { word: "SHOES", hint: "You wear them on your feet", illustration: "shoes.jpg" },
  ],
  hard: [
    { word: "BANANA", hint: "A yellow fruit monkeys like", illustration: "banana.jpg" },
    { word: "ORANGE", hint: "A citrus fruit", illustration: "orange.jpg" },
    { word: "FLOWER", hint: "It blooms in a garden", illustration: "flower.jpg" },
    { word: "BRIDGE", hint: "It connects two places over water", illustration: "bridge.jpg" },
    { word: "MARKER", hint: "Used for writing", illustration: "marker.jpg" },
    { word: "PENCIL", hint: "For writing", illustration: "pencil.jpg" },
    { word: "MARKET", hint: "Place to shop", illustration: "market.jpg" },
    { word: "LADDER", hint: "Used to climb", illustration: "ladder.jpg" },
    { word: "CASTLE", hint: "Big old building", illustration: "castle.jpg" },
    { word: "GUITAR", hint: "Musical instrument", illustration: "guitar.jpg" },
    { word: "CAMERA", hint: "Takes pictures", illustration: "camera.jpg" },
    { word: "RABBIT", hint: "Jumps fast", illustration: "rabbit.jpg" },
    { word: "BOTTLE", hint: "Holds liquid", illustration: "bottle.jpg" },
    { word: "MARKET", hint: "Place to shop", illustration: "market.jpg" },
    { word: "PENCIL", hint: "For writing", illustration: "pencil.jpg" },
    { word: "PLANET", hint: "Earth is one", illustration: "planet.jpg" },
    { word: "TIGER", hint: "Big wild cat", illustration: "tiger.jpg" },
    { word: "BRUSH", hint: "Used for painting", illustration: "brush.jpg" },
    { word: "BUTTON", hint: "Keeps clothes closed", illustration: "button.jpg" },
    { word: "LETTER", hint: "You send it", illustration: "letter.jpg" },
    { word: "MARKER", hint: "For coloring", illustration: "marker.jpg" },
    { word: "ROCKET", hint: "Flies to space", illustration: "rocket.jpg" },
    { word: "MONKEY", hint: "Climbs trees", illustration: "monkey.jpg" },
    { word: "BRICKS", hint: "Builds houses", illustration: "bricks.jpg" },
    { word: "TOWEL", hint: "Dries you", illustration: "towel.jpg" },
  ],
  challenge: [
    { word: "ELEPHANT", hint: "The largest land animal", illustration: "elephant.jpg" },
    { word: "UNICORN", hint: "A mythical horse with a horn", illustration: "unicorn.jpg" },
    { word: "DRAGON", hint: "A fire-breathing creature", illustration: "dragon.jpg" },
    { word: "PIZZA", hint: "An Italian dish with cheese", illustration: "pizza.jpg" },
    { word: "PYRAMID", hint: "Found in Egypt", illustration: "pyramid.jpg" },
    { word: "OCTOPUS", hint: "Has 8 arms", illustration: "octopus.jpg" },
    { word: "BALLOON", hint: "Floats in air", illustration: "balloon.jpg" },
    { word: "DOLPHIN", hint: "Smart sea animal", illustration: "dolphin.jpg" },
    { word: "VOLCANO", hint: "Mountain that erupts", illustration: "volcano.jpg" },
    { word: "ROBOT", hint: "Machine helper", illustration: "robot.jpg" },
    { word: "PLANETS", hint: "There are 8", illustration: "planets.jpg" },
    { word: "CASTLES", hint: "Old big houses", illustration: "castles.jpg" },
    { word: "FARMERS", hint: "Grow food", illustration: "farmers.jpg" },
    { word: "TRUCK", hint: "Big vehicle", illustration: "truck.jpg" },
    { word: "MARKERS", hint: "Used for art", illustration: "markers.jpg" },
    { word: "BRIDGE", hint: "Cross over water", illustration: "bridge.jpg" },
    { word: "PRINCESS", hint: "Royal girl", illustration: "princess.jpg" },
    { word: "KITTENS", hint: "Baby cats", illustration: "kittens.jpg" },
    { word: "DRUMS", hint: "You play them", illustration: "drums.jpg" },
    { word: "PYTHON", hint: "A type of snake", illustration: "python.jpg" },
    { word: "CASTLE", hint: "Big building", illustration: "castle.jpg" },
    { word: "PLANES", hint: "They fly", illustration: "planes.jpg" },
    { word: "MARKET", hint: "Buy food here", illustration: "market.jpg" },
    { word: "ROCKETS", hint: "Go to space", illustration: "rockets.jpg" },
    { word: "SPIDER", hint: "Has 8 legs", illustration: "spider.jpg" },
  ],
};

// ✅ Helper to safely load images
function getImage(src: string) {
  try {
    return require(`./assets/images/${src}`);
  } catch {
    return placeholderImage; // fallback if missing
  }
}

export default function UnscrambleGame() {
  const [difficulty, setDifficulty] = useState<
    "easy" | "medium" | "hard" | "challenge"
  >("easy");
  const [currentWord, setCurrentWord] = useState<WordData>({
    word: "",
    hint: "",
    illustration: "",
  });
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [showRevealedImage, setShowRevealedImage] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  const scrambleWord = (word: string) => {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  const loadNewWord = () => {
    setPlayerAnswer([]);
    setFeedback(null);
    setShowRevealedImage(false);

    const words = wordDatabase[difficulty];
    if (!words.length) return;

    const availableIndices = words
      .map((_, i) => i)
      .filter((i) => !usedWords.includes(i));

    const indicesToUse =
      availableIndices.length > 0
        ? availableIndices
        : words.map((_, i) => i);

    const randomIndex =
      indicesToUse[Math.floor(Math.random() * indicesToUse.length)];

    const newWord = words[randomIndex];
    const newUsed = [...usedWords, randomIndex];
    setUsedWords(newUsed.length >= words.length ? [randomIndex] : newUsed);
    setCurrentWord(newWord);
    setScrambledLetters(scrambleWord(newWord.word));
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (feedback) return;

    const newAnswer = [...playerAnswer, letter];
    setPlayerAnswer(newAnswer);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));

    if (newAnswer.length === currentWord.word.length) {
      const answer = newAnswer.join("");
      if (answer === currentWord.word) {
        setFeedback("correct");
        setScore(score + 1);
        setStreak(streak + 1);
        setShowRevealedImage(true);
        setTimeout(() => loadNewWord(), 2000);
      } else {
        setFeedback("incorrect");
        setStreak(0);
      }
    }
  };

  const handleAnswerClick = (index: number) => {
    if (feedback) return;
    const letterToRemove = playerAnswer[index];
    const newAnswer = playerAnswer.filter((_, i) => i !== index);
    setPlayerAnswer(newAnswer);
    setScrambledLetters([...scrambledLetters, letterToRemove]);
  };

  const handleBackspace = () => {
    if (playerAnswer.length === 0 || feedback) return;
    const last = playerAnswer[playerAnswer.length - 1];
    setPlayerAnswer(playerAnswer.slice(0, -1));
    setScrambledLetters([...scrambledLetters, last]);
  };

  const resetWord = () => {
    setPlayerAnswer([]);
    setFeedback(null);
    setShowRevealedImage(false);
    setScrambledLetters(scrambleWord(currentWord.word));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-md shadow-xl bg-white rounded-2xl p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl font-bold text-blue-600 flex items-center gap-1">
              <Trophy className="text-yellow-500" size={20} /> Score: {score}
            </div>
            <div className="text-lg font-bold text-purple-600 flex items-center gap-1">
              <Star className="text-yellow-500" size={20} /> Streak: {streak}
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              {(["easy", "medium", "hard", "challenge"] as const).map(
                (level, i) => (
                  <button
                    key={i}
                    onClick={() => setDifficulty(level)}
                    className={`py-3 font-bold rounded-xl ${
                      difficulty === level
                        ? level === "easy"
                          ? "bg-green-600 text-white shadow-lg"
                          : level === "medium"
                          ? "bg-yellow-600 text-white shadow-lg"
                          : level === "hard"
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-red-600 text-white shadow-lg"
                        : level === "easy"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : level === "medium"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : level === "hard"
                        ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    Level {i + 1}
                  </button>
                )
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-purple-700">
            {difficulty.toUpperCase()}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            {wordDatabase[difficulty].length} words available
          </p>
          <p className="text-gray-600 mt-2">Hint: {currentWord.hint}</p>
        </div>

        {/* Image */}
        <div className="relative mb-8 flex justify-center">
          <div className="bg-white border-4 border-purple-300 rounded-2xl w-52 h-52 flex items-center justify-center overflow-hidden shadow-xl">
            {currentWord.illustration && (
              <img
                src={getImage(currentWord.illustration)}
                alt={currentWord.word}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  showRevealedImage
                    ? "scale-100 blur-0"
                    : "scale-150 blur-md opacity-80"
                }`}
              />
            )}
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-sm px-4 py-2 rounded-full shadow-lg font-bold">
            Unscramble me!
          </div>
        </div>

        {/* Answer */}
        <div className="mb-8 w-full">
          <div className="flex justify-center gap-3 mb-4 min-h-[70px]">
            {playerAnswer.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleAnswerClick(i)}
                className={`w-14 h-14 flex items-center justify-center text-3xl font-bold border-4 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-110 ${
                  feedback === "correct"
                    ? "bg-green-100 border-green-500 text-green-700"
                    : feedback === "incorrect"
                    ? "bg-red-100 border-red-500 text-red-700"
                    : "bg-yellow-100 border-yellow-400 text-yellow-800 hover:bg-yellow-200"
                }`}
              >
                {letter}
              </button>
            ))}
            {playerAnswer.length === 0 && (
              <div className="text-gray-400 italic text-lg">
                Your answer will appear here
              </div>
            )}
          </div>

          {feedback && (
            <div className="flex justify-center mb-6">
              {feedback === "correct" ? (
                <div className="flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-2xl shadow-lg">
                  <ThumbsUp className="text-green-600" size={32} />
                  <span className="font-bold text-xl">
                    Correct! Great job!
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-red-100 text-red-800 px-6 py-3 rounded-2xl shadow-lg">
                  <ThumbsDown className="text-red-600" size={32} />
                  <span className="font-bold text-xl">
                    Try again! The word was: {currentWord.word}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scrambled letters */}
        <div className="flex flex-col items-center w-full mb-6">
          <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-md">
            {scrambledLetters.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleLetterClick(letter, i)}
                disabled={!!feedback}
                className="w-14 h-14 flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-2xl shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={handleBackspace}
              disabled={playerAnswer.length === 0 || !!feedback}
              className="px-6 py-5 text-lg rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={resetWord}
              className="px-6 py-5 text-lg rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              onClick={loadNewWord}
              className="px-6 py-5 text-lg rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center gap-2"
            >
              <RotateCcw size={20} /> New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export {};