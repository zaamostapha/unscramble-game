import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, RotateCcw, Trophy, Star, Lightbulb } from 'lucide-react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";

// Define the word data structure
type WordData = {
  word: string;
  hint: string;
  illustration: string;
};

// Word database with illustrations organized by difficulty
const wordDatabase: Record<string, WordData[]> = {
  easy: [
    { word: "CAT", hint: "A furry pet that says meow", illustration: "cat.jpg" },
    { word: "DOG", hint: "A loyal pet that wags its tail", illustration: "dog.jpg" },
    { word: "SUN", hint: "The bright object in the sky", illustration: "sun.jpg" },
    { word: "CAR", hint: "Vehicle with wheels", illustration: "car.jpg" },
    { word: "BAT", hint: "Used in baseball", illustration: "bat.jpg" },
    { word: "CUP", hint: "Holds your drink", illustration: "cup.jpg" },
    { word: "BED", hint: "Where you sleep", illustration: "bed.jpg" },
    { word: "PEN", hint: "Used for writing", illustration: "pen.jpg" },
    { word: "BOX", hint: "A container", illustration: "box.jpg" },
    { word: "MAP", hint: "Shows locations", illustration: "map.jpg" },
    { word: "HAT", hint: "Worn on your head", illustration: "hat.jpg" },
    { word: "FAN", hint: "Creates a breeze", illustration: "fan.jpg" },
    { word: "KEY", hint: "Opens locks", illustration: "key.jpg" },
    { word: "BAG", hint: "Carries your things", illustration: "bag.jpg" },
    { word: "COW", hint: "Farm animal that says moo", illustration: "cow.jpg" },
    { word: "PIG", hint: "Pink farm animal", illustration: "pig.jpg" },
    { word: "HEN", hint: "Female chicken", illustration: "hen.jpg" },
    { word: "FOX", hint: "Cunning wild animal", illustration: "fox.jpg" },
    { word: "BEE", hint: "Makes honey", illustration: "bee.jpg" },
    { word: "OWL", hint: "Nocturnal bird", illustration: "owl.jpg" },
  ],
  medium: [
    { word: "APPLE", hint: "A red or green fruit", illustration: "apple.jpg" },
    { word: "HOUSE", hint: "Where you live", illustration: "house.jpg" },
    { word: "WATER", hint: "You drink this", illustration: "water.jpg" },
    { word: "LIGHT", hint: "Illuminates darkness", illustration: "light.jpg" },
    { word: "MUSIC", hint: "Pleasant sounds", illustration: "music.jpg" },
    { word: "PLANT", hint: "Grows in soil", illustration: "plant.jpg" },
    { word: "CLOCK", hint: "Tells time", illustration: "clock.jpg" },
    { word: "CHAIR", hint: "You sit on this", illustration: "chair.jpg" },
    { word: "PHONE", hint: "Communication device", illustration: "phone.jpg" },
    { word: "SMILE", hint: "Happy facial expression", illustration: "smile.jpg" },
    { word: "BREAD", hint: "Made from flour", illustration: "bread.jpg" },
    { word: "FROG", hint: "Green amphibian", illustration: "frog.jpg" },
    { word: "FISH", hint: "Lives in water", illustration: "fish.jpg" },
    { word: "BALL", hint: "Round object for games", illustration: "ball.jpg" },
    { word: "BOOK", hint: "Contains stories", illustration: "book.jpg" },
    { word: "BIRD", hint: "Animal with wings", illustration: "bird.jpg" },
    { word: "TREE", hint: "Tall plant with leaves", illustration: "tree.jpg" },
    { word: "MOON", hint: "Orbits Earth at night", illustration: "moon.jpg" },
    { word: "STAR", hint: "Shines in the night sky", illustration: "star.jpg" },
    { word: "RAIN", hint: "Water from clouds", illustration: "rain.jpg" },
    { word: "SNOW", hint: "Frozen precipitation", illustration: "snow.jpg" },
    { word: "FIRE", hint: "Hot burning flames", illustration: "fire.jpg" },
    { word: "WIND", hint: "Moving air", illustration: "wind.jpg" },
    { word: "ROCK", hint: "Hard mineral", illustration: "rock.jpg" },
    { word: "SAND", hint: "Found at beaches", illustration: "sand.jpg" },
  ],
  hard: [
    { word: "BANANA", hint: "Yellow tropical fruit", illustration: "banana.jpg" },
    { word: "ORANGE", hint: "Citrus fruit", illustration: "orange.jpg" },
    { word: "FLOWER", hint: "Blooms in gardens", illustration: "flower.jpg" },
    { word: "BRIDGE", hint: "Crosses over water", illustration: "bridge.jpg" },
    { word: "CASTLE", hint: "Medieval fortress", illustration: "castle.jpg" },
    { word: "GUITAR", hint: "Musical instrument", illustration: "guitar.jpg" },
    { word: "CAMERA", hint: "Takes photographs", illustration: "camera.jpg" },
    { word: "COMPUTER", hint: "Electronic device", illustration: "computer.jpg" },
    { word: "TELEPHONE", hint: "Communication device", illustration: "telephone.jpg" },
    { word: "ELEPHANT", hint: "Large gray animal", illustration: "elephant.jpg" },
    { word: "BUTTERFLY", hint: "Colorful flying insect", illustration: "butterfly.jpg" },
    { word: "CHOCOLATE", hint: "Sweet treat", illustration: "chocolate.jpg" },
    { word: "SUNFLOWER", hint: "Tall yellow flower", illustration: "sunflower.jpg" },
    { word: "UMBRELLA", hint: "Keeps you dry in rain", illustration: "umbrella.jpg" },
    { word: "RAINBOW", hint: "Colorful arc in sky", illustration: "rainbow.jpg" },
    { word: "MOUNTAIN", hint: "Large land elevation", illustration: "mountain.jpg" },
    { word: "OCEAN", hint: "Large body of water", illustration: "ocean.jpg" },
    { word: "VOLCANO", hint: "Mountain that erupts", illustration: "volcano.jpg" },
    { word: "DINOSAUR", hint: "Prehistoric creature", illustration: "dinosaur.jpg" },
    { word: "UNICORN", hint: "Mythical horse with horn", illustration: "unicorn.jpg" },
    { word: "DRAGON", hint: "Mythical fire-breathing creature", illustration: "dragon.jpg" },
    { word: "PIZZA", hint: "Cheesy Italian food", illustration: "pizza.jpg" },
    { word: "HAMBURGER", hint: "Sandwich with meat", illustration: "hamburger.jpg" },
    { word: "ICECREAM", hint: "Frozen dessert", illustration: "icecream.jpg" },
    { word: "CHAMPION", hint: "Winner of competition", illustration: "champion.jpg" },
  ],
  challenge: [
    { word: "ELEPHANT", hint: "Large gray animal with trunk", illustration: "elephant.jpg" },
    { word: "BUTTERFLY", hint: "Colorful flying insect", illustration: "butterfly.jpg" },
    { word: "TELESCOPE", hint: "Observes distant objects", illustration: "telescope.jpg" },
    { word: "MICROPHONE", hint: "Amplifies your voice", illustration: "microphone.jpg" },
    { word: "REFRIGERATOR", hint: "Keeps food cold", illustration: "refrigerator.jpg" },
    { word: "TELEVISION", hint: "Entertainment device", illustration: "television.jpg" },
    { word: "BICYCLE", hint: "Two-wheeled vehicle", illustration: "bicycle.jpg" },
    { word: "AEROPLANE", hint: "Flies through the sky", illustration: "aeroplane.jpg" },
    { word: "SUBMARINE", hint: "Underwater vessel", illustration: "submarine.jpg" },
    { word: "HELICOPTER", hint: "Flying vehicle with rotors", illustration: "helicopter.jpg" },
    { word: "RESTAURANT", hint: "Place to eat out", illustration: "restaurant.jpg" },
    { word: "LIBRARY", hint: "Place with many books", illustration: "library.jpg" },
    { word: "HOSPITAL", hint: "Medical treatment center", illustration: "hospital.jpg" },
    { word: "UNIVERSITY", hint: "Higher education institution", illustration: "university.jpg" },
    { word: "CHOCOLATE", hint: "Sweet cocoa treat", illustration: "chocolate.jpg" },
    { word: "STRAWBERRY", hint: "Red fruit with seeds", illustration: "strawberry.jpg" },
    { word: "WATERMELON", hint: "Large green fruit", illustration: "watermelon.jpg" },
    { word: "PINEAPPLE", hint: "Tropical spiky fruit", illustration: "pineapple.jpg" },
    { word: "BROCCOLI", hint: "Green vegetable", illustration: "broccoli.jpg" },
    { word: "CAULIFLOWER", hint: "White vegetable", illustration: "cauliflower.jpg" },
    { word: "DINOSAUR", hint: "Prehistoric creature", illustration: "dinosaur.jpg" },
    { word: "DICTIONARY", hint: "Book of word meanings", illustration: "dictionary.jpg" },
    { word: "TELEPHONE", hint: "Communication device", illustration: "telephone.jpg" },
    { word: "COMPUTER", hint: "Electronic processing device", illustration: "computer.jpg" },
    { word: "SUNFLOWER", hint: "Tall yellow flower", illustration: "sunflower.jpg" },
    { word: "UMBRELLA", hint: "Rain protection device", illustration: "umbrella.jpg" },
    { word: "RAINBOW", hint: "Colorful sky phenomenon", illustration: "rainbow.jpg" },
    { word: "MOUNTAIN", hint: "Large land elevation", illustration: "mountain.jpg" },
    { word: "VOLCANO", hint: "Erupting mountain", illustration: "volcano.jpg" },
    { word: "UNICORN", hint: "Mythical horse with horn", illustration: "unicorn.jpg" },
  ],
};

export default function UnscrambleGame() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "challenge">("easy");
  const [currentWord, setCurrentWord] = useState<WordData>({ word: "", hint: "", illustration: "" });
  const [scrambledLetters, setScrambledLetters] = useState<{letter: string, revealed: boolean}[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(10); // Start with 10 points
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [showRevealedImage, setShowRevealedImage] = useState(false);
  const [streak, setStreak] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<{index: number, letter: string}[]>([]);
  const [hintCost, setHintCost] = useState(2); // Cost to reveal a letter

  // Initialize game with a random word
  useEffect(() => {
    loadNewWord();
  }, [difficulty]);

  // Scramble word letters
  const scrambleWord = (word: string): {letter: string, revealed: boolean}[] => {
    const letters = word.split('').map(letter => ({letter, revealed: false}));
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  // Load a new random word
  const loadNewWord = () => {
    // Reset game state
    setPlayerAnswer([]);
    setFeedback(null);
    setShowRevealedImage(false);
    setRevealedLetters([]);
    
    // Get words for current difficulty
    const words = wordDatabase[difficulty];
    
    // Find unused words
    const availableIndices = words
      .map((_, index) => index)
      .filter(index => !usedWords.includes(index));
    
    // If all words have been used, reset the used list
    const indicesToUse = availableIndices.length > 0 ? availableIndices : 
      words.map((_, index) => index);
    
    // Select a random word
    const randomIndex = indicesToUse[Math.floor(Math.random() * indicesToUse.length)];
    const newWord = words[randomIndex];
    
    // Update used words
    const newUsedWords = [...usedWords, randomIndex];
    if (newUsedWords.length >= words.length) {
      setUsedWords([randomIndex]); // Reset when all words used
    } else {
      setUsedWords(newUsedWords);
    }
    
    setCurrentWord(newWord);
    setScrambledLetters(scrambleWord(newWord.word));
    
    // Set hint cost based on word length
    setHintCost(Math.max(1, Math.floor(newWord.word.length / 3)));
  };

  // Handle letter click from scrambled letters
  const handleLetterClick = (letter: string, index: number) => {
    if (feedback) return; // Prevent interaction after answer check
    
    // Add letter to player answer
    setPlayerAnswer([...playerAnswer, letter]);
    
    // Mark letter as used in scrambled letters
    const newScrambledLetters = [...scrambledLetters];
    newScrambledLetters[index].revealed = true;
    setScrambledLetters(newScrambledLetters);
    
    // Check answer automatically when all letters are used
    const newAnswer = [...playerAnswer, letter];
    if (newAnswer.length === currentWord.word.length) {
      const answer = newAnswer.join('');
      if (answer === currentWord.word) {
        setFeedback("correct");
        setScore(score + 3); // Award 3 points for correct answer
        setStreak(streak + 1);
        setShowRevealedImage(true);
        
        // Load next word automatically after 2 seconds
        setTimeout(() => {
          loadNewWord();
        }, 2000);
      } else {
        setFeedback("incorrect");
        setStreak(0);
      }
    }
  };

  // Handle letter click from answer (to remove it)
  const handleAnswerLetterClick = (letter: string, index: number) => {
    if (feedback) return; // Prevent interaction after answer check
    
    // Remove from player answer
    const newPlayerAnswer = [...playerAnswer];
    newPlayerAnswer.splice(index, 1);
    setPlayerAnswer(newPlayerAnswer);
    
    // Find and unmark the letter in scrambled letters
    const newScrambledLetters = [...scrambledLetters];
    for (let i = 0; i < newScrambledLetters.length; i++) {
      if (newScrambledLetters[i].letter === letter && newScrambledLetters[i].revealed) {
        newScrambledLetters[i].revealed = false;
        break;
      }
    }
    setScrambledLetters(newScrambledLetters);
  };

  // Reset current word
  const resetWord = () => {
    setPlayerAnswer([]);
    setFeedback(null);
    setShowRevealedImage(false);
    setRevealedLetters([]);
    setScrambledLetters(scrambleWord(currentWord.word));
  };

  // Reveal a letter using points
  const revealLetter = () => {
    if (score < hintCost || feedback) return;
    
    // Find unrevealed letters in scrambled array
    const unrevealedIndices = scrambledLetters
      .map((_, index) => index)
      .filter(index => !scrambledLetters[index].revealed);
    
    if (unrevealedIndices.length === 0) return;
    
    // Select a random unrevealed letter
    const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
    
    // Add to revealed letters and mark as revealed
    const revealedLetter = scrambledLetters[randomIndex].letter;
    setRevealedLetters([...revealedLetters, {index: randomIndex, letter: revealedLetter}]);
    
    // Mark as revealed in scrambled letters
    const newScrambledLetters = [...scrambledLetters];
    newScrambledLetters[randomIndex].revealed = true;
    setScrambledLetters(newScrambledLetters);
    
    // Add to player answer
    setPlayerAnswer([...playerAnswer, revealedLetter]);
    
    // Deduct points
    setScore(score - hintCost);
  };

  // Get difficulty label
  const getDifficultyLabel = () => {
    switch(difficulty) {
      case "easy": return "Level 1 - Easy";
      case "medium": return "Level 2 - Medium";
      case "hard": return "Level 3 - Hard";
      case "challenge": return "Level 4 - Challenge";
      default: return "Level 1 - Easy";
    }
  };

  // Get word count for current difficulty
  const getWordCount = () => {
    return wordDatabase[difficulty].length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-yellow-200 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xl font-bold text-blue-600 flex items-center gap-1">
              <Trophy className="text-yellow-500" size={20} />
              Score: {score}
            </div>
            <div className="text-lg font-bold text-purple-600 flex items-center gap-1">
              <Star className="text-yellow-500" size={20} />
              Streak: {streak}
            </div>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              <Button 
                onClick={() => setDifficulty("easy")} 
                className={`py-2 font-bold rounded-lg ${difficulty === "easy" ? "bg-green-500 text-white shadow-md" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
              >
                Level 1
              </Button>
              <Button 
                onClick={() => setDifficulty("medium")} 
                className={`py-2 font-bold rounded-lg ${difficulty === "medium" ? "bg-yellow-400 text-white shadow-md" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"}`}
              >
                Level 2
              </Button>
              <Button 
                onClick={() => setDifficulty("hard")} 
                className={`py-2 font-bold rounded-lg ${difficulty === "hard" ? "bg-orange-400 text-white shadow-md" : "bg-orange-100 text-orange-800 hover:bg-orange-200"}`}
              >
                Level 3
              </Button>
              <Button 
                onClick={() => setDifficulty("challenge")} 
                className={`py-2 font-bold rounded-lg ${difficulty === "challenge" ? "bg-red-400 text-white shadow-md" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
              >
                Level 4
              </Button>
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-purple-700">
            {getDifficultyLabel()}
          </CardTitle>
          <p className="text-gray-600 mt-1 text-sm">
            {getWordCount()} words available
          </p>
          <p className="text-gray-600 mt-2">Hint: {currentWord.hint}</p>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center">
          {/* Image placeholder with zoom/blur effect */}
          <div className="relative mb-6">
            <div className="bg-white border-4 border-purple-300 rounded-2xl w-48 h-48 flex items-center justify-center overflow-hidden shadow-lg">
              {showRevealedImage ? (
                <img 
                  src={`/images/${currentWord.illustration}`} 
                  alt={currentWord.word} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                  <div className="text-gray-500 text-center p-2">
                    <div className="text-4xl mb-2">?</div>
                    <div className="text-sm">Image hidden</div>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-bold">
              Unscramble me!
            </div>
          </div>
          
          {/* Answer display with revealed letters - now clickable to remove letters */}
          <div className="mb-6 w-full">
            <div className="flex justify-center gap-2 mb-4 min-h-[60px]">
              {playerAnswer.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerLetterClick(letter, index)}
                  disabled={!!feedback}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-yellow-100 border-3 border-yellow-400 text-yellow-800 rounded-xl shadow-md hover:bg-yellow-200 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {letter}
                </button>
              ))}
              {playerAnswer.length === 0 && (
                <div className="text-gray-400 italic text-center w-full py-4">
                  Click scrambled letters to build your word
                </div>
              )}
            </div>
            
            {/* Feedback icons */}
            {feedback && (
              <div className="flex justify-center mb-4">
                {feedback === "correct" ? (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl shadow-md">
                    <ThumbsUp className="text-green-600" size={24} />
                    <span className="font-bold">Correct! Great job!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-xl shadow-md">
                    <ThumbsDown className="text-red-600" size={24} />
                    <span className="font-bold">Try again! The word was: {currentWord.word}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Scrambled letters - centered with nice styling */}
          <div className="flex flex-col items-center w-full mb-5">
            <div className="flex flex-wrap justify-center gap-2 mb-5 max-w-md">
              {scrambledLetters.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLetterClick(item.letter, index)}
                  disabled={item.revealed || !!feedback}
                  className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 ${
                    item.revealed 
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                  }`}
                >
                  {item.revealed ? "" : item.letter}
                </button>
              ))}
            </div>
            
            {/* Hint button and control buttons */}
            <div className="flex flex-col items-center gap-3 w-full">
              <Button 
                onClick={revealLetter} 
                disabled={score < hintCost || feedback || scrambledLetters.every(l => l.revealed)}
                className="px-4 py-3 text-base rounded-lg bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-white font-bold flex items-center gap-2 shadow-md"
              >
                <Lightbulb size={20} />
                Reveal Letter ({hintCost} pts)
              </Button>
              
              <div className="flex justify-center gap-3 w-full">
                <Button 
                  onClick={resetWord} 
                  variant="outline"
                  className="px-4 py-3 text-base rounded-lg bg-white border-2 border-purple-300 hover:bg-purple-50"
                >
                  Reset
                </Button>
                <Button 
                  onClick={loadNewWord} 
                  variant="outline"
                  className="px-4 py-3 text-base rounded-lg bg-white border-2 border-purple-300 hover:bg-purple-50 flex items-center gap-1"
                >
                  <RotateCcw size={16} />
                  New Word
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-purple-800">
        <p className="text-base font-medium">Click scrambled letters to build your word!</p>
        <p className="text-xs mt-1">Click on your answer letters to remove them if needed</p>
      </div>
    </div>
  );
}
Share
Refresh
Copy

