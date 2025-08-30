import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, RotateCcw, Trophy, Star, Lightbulb } from "lucide-react";
import placeholderImage from "./assets/images/placeholder.jpg";

type WordData = {
  word: string;
  hint: string;
  illustration: string;
};

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
    { word: "PLANET", hint: "Earth is one", illustration: "planet.jpg" },
    { word: "TIGER", hint: "Big wild cat", illustration: "tiger.jpg" },
    { word: "BRUSH", hint: "Used for painting", illustration: "brush.jpg" },
    { word: "BUTTON", hint: "Keeps clothes closed", illustration: "button.jpg" },
    { word: "LETTER", hint: "You send it", illustration: "letter.jpg" },
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

function getImage(src: string) {
  try {
    return require(`./assets/images/${src}`);
  } catch {
    return placeholderImage;
  }
}

export default function UnscrambleGame() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "challenge">("easy");
  const [currentWord, setCurrentWord] = useState<WordData>({ word: "", hint: "", illustration: "" });
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(5);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [showRevealedImage, setShowRevealedImage] = useState(false);
  const [streak, setStreak] = useState(0);
  const hintCost = 1;

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

    const availableIndices = words.map((_, i) => i).filter((i) => !usedWords.includes(i));
    const indicesToUse = availableIndices.length > 0 ? availableIndices : words.map((_, i) => i);
    const randomIndex = indicesToUse[Math.floor(Math.random() * indicesToUse.length)];
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

  const revealLetter = () => {
    if (score < hintCost || feedback) return;
    const correctLetters = currentWord.word.split("");
    const nextIndex = correctLetters.findIndex((l, i) => playerAnswer[i] !== l);
    if (nextIndex !== -1) {
      const letterToReveal = correctLetters[nextIndex];
      const remainingScrambled = scrambledLetters.filter((l, i) => !(l === letterToReveal && i === scrambledLetters.indexOf(letterToReveal)));
      setScrambledLetters(remainingScrambled);
      const newAnswer = [...playerAnswer];
      newAnswer[nextIndex] = letterToReveal;
      setPlayerAnswer(newAnswer);
      setScore(score - hintCost);

      if (newAnswer.join("") === currentWord.word) {
        setFeedback("correct");
        setStreak(streak + 1);
        setShowRevealedImage(true);
        setTimeout(() => loadNewWord(), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-2">
      <div className="w-full max-w-sm shadow-lg bg-white rounded-xl p-4">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex justify-between items-center mb-1 text-sm">
            <div className="font-bold text-blue-600 flex items-center gap-1">
              <Trophy className="text-yellow-500" size={16} /> Score: {score}
            </div>
            <div className="font-bold text-purple-600 flex items-center gap-1">
              <Star className="text-yellow-500" size={16} /> Streak: {streak}
            </div>
          </div>

          <div className="flex justify-center mb-2">
            <div className="grid grid-cols-2 gap-1 w-full max-w-xs text-xs">
              {(["easy", "medium", "hard", "challenge"] as const).map((level, i) => (
                <button
                  key={i}
                  onClick={() => setDifficulty(level)}
                  className={`py-2 font-bold rounded-lg ${
                    difficulty === level
                      ? level === "easy"
                        ? "bg-green-600 text-white shadow"
                        : level === "medium"
                        ? "bg-yellow-600 text-white shadow"
                        : level === "hard"
                        ? "bg-orange-600 text-white shadow"
                        : "bg-red-600 text-white shadow"
                      : level === "easy"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : level === "medium"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : level === "hard"
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-xs mt-1">{wordDatabase[difficulty].length} words available</p>
          <p className="text-gray-600 text-xs mt-1">Hint: {currentWord.hint}</p>
        </div>

        {/* Image */}
        <div className="relative mb-4 flex justify-center">
          <div className="bg-white border-2 border-purple-300 rounded-xl w-40 h-40 flex items-center justify-center overflow-hidden shadow">
            {currentWord.illustration && (
              <img
                src={getImage(currentWord.illustration)}
                alt={currentWord.word}
                className={`w-full h-full object-cover transition-transform duration-500 ${showRevealedImage ? "scale-100 blur-0" : "scale-125 blur-sm opacity-80"}`}
              />
            )}
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow font-bold">
            Unscramble me!
          </div>
        </div>

        {/* Answer */}
        <div className="mb-4 w-full">
          <div className="flex justify-center gap-2 mb-2 min-h-[50px]">
            {playerAnswer.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleAnswerClick(i)}
                className={`w-10 h-10 flex items-center justify-center text-xl font-bold border-2 rounded-lg shadow ${feedback === "correct" ? "bg-green-100 border-green-500 text-green-700" : feedback === "incorrect" ? "bg-red-100 border-red-500 text-red-700" : "bg-yellow-100 border-yellow-400 text-yellow-800"}`}
              >
                {letter || "_"}
              </button>
            ))}
            {playerAnswer.length === 0 && <div className="text-gray-400 italic text-sm">Your answer will appear here</div>}
          </div>

          {feedback && (
            <div className="flex justify-center mb-2 text-xs">
              {feedback === "correct" ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-lg shadow">
                  <ThumbsUp className="text-green-600" size={20} /> Correct!
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-lg shadow">
                  <ThumbsDown className="text-red-600" size={20} /> Wrong! {currentWord.word}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scrambled letters */}
        <div className="flex flex-col items-center w-full mb-4">
          <div className="flex flex-wrap justify-center gap-2 mb-2 max-w-xs">
            {scrambledLetters.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleLetterClick(letter, i)}
                disabled={!!feedback}
                className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-lg shadow hover:scale-105 transition-all duration-150 disabled:opacity-50"
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Reveal Letter button directly under scrambled letters */}
          <button
            onClick={revealLetter}
            disabled={score < hintCost || !!feedback}
            className="mb-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white text-sm flex items-center gap-1"
          >
            <Lightbulb size={16} /> Reveal Letter (-{hintCost})
          </button>

          <div className="flex justify-center gap-2 w-full flex-wrap text-xs">
            <button onClick={handleBackspace} disabled={playerAnswer.length === 0 || !!feedback} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">← Back</button>
            <button onClick={resetWord} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Reset</button>
            <button onClick={loadNewWord} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center gap-1"><RotateCcw size={16} /> New</button>
          </div>
        </div>
      </div>
    </div>
  );
}
