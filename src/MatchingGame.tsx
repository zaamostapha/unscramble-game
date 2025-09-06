"use client";

import { useState, useEffect } from "react";

type CardType = {
  id: number;
  word: string;
  icon: string;
  type: "word" | "icon";
  isFlipped: boolean;
  isMatched: boolean;
  category: string;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
};

// Expanded word sets with 10+ words per category
const wordSets = [
  // Animals (15 words)
  { word: "Cat", icon: "🐱", category: "animals" },
  { word: "Dog", icon: "🐶", category: "animals" },
  { word: "Bird", icon: "🐦", category: "animals" },
  { word: "Fish", icon: "🐠", category: "animals" },
  { word: "Bear", icon: "🐻", category: "animals" },
  { word: "Lion", icon: "🦁", category: "animals" },
  { word: "Horse", icon: "🐴", category: "animals" },
  { word: "Rabbit", icon: "🐰", category: "animals" },
  { word: "Cow", icon: "🐮", category: "animals" },
  { word: "Pig", icon: "🐷", category: "animals" },
  { word: "Tiger", icon: "🐯", category: "animals" },
  { word: "Elephant", icon: "🐘", category: "animals" },
  { word: "Monkey", icon: "🐵", category: "animals" },
  { word: "Sheep", icon: "🐑", category: "animals" },
  { word: "Chicken", icon: "🐔", category: "animals" },
  
  // Nature (12 words)
  { word: "Sun", icon: "☀️", category: "nature" },
  { word: "Moon", icon: "🌙", category: "nature" },
  { word: "Star", icon: "⭐", category: "nature" },
  { word: "Cloud", icon: "☁️", category: "nature" },
  { word: "Rain", icon: "🌧️", category: "nature" },
  { word: "Snow", icon: "❄️", category: "nature" },
  { word: "Tree", icon: "🌳", category: "nature" },
  { word: "Flower", icon: "🌸", category: "nature" },
  { word: "Mountain", icon: "⛰️", category: "nature" },
  { word: "River", icon: "🌊", category: "nature" },
  { word: "Fire", icon: "🔥", category: "nature" },
  { word: "Wind", icon: "💨", category: "nature" },
  
  // Objects (15 words)
  { word: "Book", icon: "📚", category: "objects" },
  { word: "Box", icon: "📦", category: "objects" },
  { word: "Pen", icon: "✏️", category: "objects" },
  { word: "Cup", icon: "☕", category: "objects" },
  { word: "Key", icon: "🔑", category: "objects" },
  { word: "Map", icon: "🗺️", category: "objects" },
  { word: "Ball", icon: "⚽", category: "objects" },
  { word: "Clock", icon: "⏰", category: "objects" },
  { word: "Phone", icon: "📱", category: "objects" },
  { word: "Camera", icon: "📷", category: "objects" },
  { word: "Gift", icon: "🎁", category: "objects" },
  { word: "Light", icon: "💡", category: "objects" },
  { word: "Music", icon: "🎵", category: "objects" },
  { word: "Heart", icon: "❤️", category: "objects" },
  { word: "Star", icon: "⭐", category: "objects" },
  
  // Transport (12 words)
  { word: "Car", icon: "🚗", category: "transport" },
  { word: "Bus", icon: "🚌", category: "transport" },
  { word: "Bike", icon: "🚲", category: "transport" },
  { word: "Train", icon: "🚂", category: "transport" },
  { word: "Plane", icon: "✈️", category: "transport" },
  { word: "Boat", icon: "⛵", category: "transport" },
  { word: "Truck", icon: "🚚", category: "transport" },
  { word: "Rocket", icon: "🚀", category: "transport" },
  { word: "Helicopter", icon: "🚁", category: "transport" },
  { word: "Taxi", icon: "🚕", category: "transport" },
  { word: "Motorcycle", icon: "🏍️", category: "transport" },
  { word: "Scooter", icon: "🛴", category: "transport" },
  
  // Clothing (12 words)
  { word: "Hat", icon: "🎩", category: "clothing" },
  { word: "Shirt", icon: "👕", category: "clothing" },
  { word: "Dress", icon: "👗", category: "clothing" },
  { word: "Shoes", icon: "👟", category: "clothing" },
  { word: "Socks", icon: "🧦", category: "clothing" },
  { word: "Gloves", icon: "🧤", category: "clothing" },
  { word: "Scarf", icon: "🧣", category: "clothing" },
  { word: "Coat", icon: "🧥", category: "clothing" },
  { word: "Belt", icon: "🪢", category: "clothing" },
  { word: "Tie", icon: "👔", category: "clothing" },
  { word: "Skirt", icon: "🩱", category: "clothing" },
  { word: "Jacket", icon: "🧥", category: "clothing" },
  
  // Home (13 words)
  { word: "Bed", icon: "🛏️", category: "home" },
  { word: "Chair", icon: "🪑", category: "home" },
  { word: "Table", icon: "🪑", category: "home" },
  { word: "Door", icon: "🚪", category: "home" },
  { word: "Window", icon: "🪟", category: "home" },
  { word: "Lamp", icon: "🪔", category: "home" },
  { word: "Sofa", icon: "🛋️", category: "home" },
  { word: "Fridge", icon: "🧊", category: "home" },
  { word: "Oven", icon: "🔥", category: "home" },
  { word: "Bath", icon: "🛁", category: "home" },
  { word: "Toilet", icon: "🚽", category: "home" },
  { word: "Sink", icon: "🧼", category: "home" },
  { word: "Mirror", icon: "🪞", category: "home" },
];

const categories: Category[] = [
  { id: "animals", name: "Animals", icon: "🐾", color: "border-yellow-400", bgColor: "bg-yellow-100" },
  { id: "nature", name: "Nature", icon: "🌿", color: "border-green-400", bgColor: "bg-green-100" },
  { id: "objects", name: "Objects", icon: "📦", color: "border-blue-400", bgColor: "bg-blue-100" },
  { id: "transport", name: "Transport", icon: "🚗", color: "border-red-400", bgColor: "bg-red-100" },
  { id: "clothing", name: "Clothing", icon: "👕", color: "border-purple-400", bgColor: "bg-purple-100" },
  { id: "home", name: "Home", icon: "🏠", color: "border-orange-400", bgColor: "bg-orange-100" },
];

const levelSettings = [
  { name: "Level 1", pairs: 3, time: 20, lives: 5 },
  { name: "Level 2", pairs: 4, time: 25, lives: 5 },
  { name: "Level 3", pairs: 5, time: 30, lives: 5 },
  { name: "Level 4", pairs: 6, time: 35, lives: 4 },
  { name: "Level 5", pairs: 8, time: 40, lives: 3 },
  { name: "Level 6", pairs: 10, time: 45, lives: 3 },
];

const initialAchievements: Achievement[] = [
  { id: "first_win", name: "First Victory", description: "Complete your first level", unlocked: false, icon: "🥇" },
  { id: "five_wins", name: "Match Master", description: "Complete 5 levels", unlocked: false, icon: "🏆" },
  { id: "perfect_game", name: "Perfect Game", description: "Complete a level without losing any lives", unlocked: false, icon: "✨" },
  { id: "speed_demon", name: "Speed Demon", description: "Complete a level in under 10 seconds", unlocked: false, icon: "⚡" },
];

// Simple Button component
const Button = ({ 
  children, 
  className = "", 
  onClick,
  disabled = false,
  variant = "default"
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
}) => {
  let baseClasses = "px-3 py-1.5 rounded-full text-sm font-bold transition-all focus:outline-none transform hover:scale-105 active:scale-95 shadow-md";
  
  if (disabled) {
    baseClasses += " opacity-50 cursor-not-allowed";
  }
  
  switch (variant) {
    case "outline":
      baseClasses += " border-2 border-indigo-500 text-indigo-700 bg-white hover:bg-indigo-50";
      break;
    case "ghost":
      baseClasses += " bg-transparent hover:bg-gray-100 text-gray-700";
      break;
    default:
      baseClasses += " bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600";
  }
  
  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Beautiful Card component for kids (responsive square shape)
const Card = ({ 
  children, 
  className = "", 
  onClick,
  isFlipped = false,
  isMatched = false
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  isFlipped?: boolean;
  isMatched?: boolean;
}) => (
  <div 
    className={`
      rounded-xl overflow-hidden transition-all duration-300 transform
      ${isMatched 
        ? 'ring-2 ring-green-400 bg-green-50 scale-95' 
        : 'hover:scale-105 shadow-md'
      }
      ${className}
    `}
    onClick={onClick}
  >
    <div className="relative w-full h-full">
      {/* Decorative corner elements */}
      <div className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-yellow-300"></div>
      <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-pink-300"></div>
      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 rounded-full bg-blue-300"></div>
      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-green-300"></div>
      
      {/* Card content */}
      <div className="p-0.5 h-full">
        {children}
      </div>
    </div>
  </div>
);

export default function MatchingGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameState, setGameState] = useState<"memorize" | "playing" | "completed">("memorize");
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [hintUsed, setHintUsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [currentLevel, selectedCategory]);

  // Timer for memorization phase
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "memorize" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameState === "memorize" && timeLeft === 0) {
      startGame();
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // Timer for gameplay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && !gameCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameState === "playing" && timeLeft === 0 && !gameCompleted) {
      handleLifeLost();
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, gameCompleted]);

  const getWordsForCategory = (category: string | null, count: number) => {
    let availableWords = category 
      ? wordSets.filter(word => word.category === category)
      : wordSets;
    
    // Shuffle and take required count
    const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const resetGame = () => {
    const level = levelSettings[currentLevel];
    setTimeLeft(level.time);
    setLives(level.lives);
    setStreak(0);
    setHintUsed(false);
    
    // Get words for current level
    const pairs = getWordsForCategory(selectedCategory, level.pairs);
    
    // Create pairs of word and icon cards
    const initialCards: CardType[] = [];
    pairs.forEach((pair, index) => {
      // Word card
      initialCards.push({
        id: index * 2,
        word: pair.word,
        icon: pair.icon,
        type: "word",
        isFlipped: true,
        isMatched: false,
        category: pair.category
      });
      // Icon card
      initialCards.push({
        id: index * 2 + 1,
        word: pair.word,
        icon: pair.icon,
        type: "icon",
        isFlipped: true,
        isMatched: false,
        category: pair.category
      });
    });

    // Shuffle cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
    setGameState("memorize");
  };

  const startGame = () => {
    // Hide all cards
    const hiddenCards = cards.map(card => ({
      ...card,
      isFlipped: false
    }));
    setCards(hiddenCards);
    setGameState("playing");
  };

  const handleCardClick = (id: number) => {
    if (gameState !== "playing") return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2 || gameCompleted) {
      return;
    }

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && 
          firstCard.word === secondCard.word && 
          firstCard.type !== secondCard.type) {
        // Match found
        setStreak(streak + 1);
        
        setTimeout(() => {
          const matchedCards = cards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setScore(score + 1);
          
          // Check if game is completed
          if (score + 1 === levelSettings[currentLevel].pairs) {
            completeLevel();
          }
        }, 500);
      } else {
        // No match - reset streak and lose a life after delay
        setStreak(0);
        setTimeout(() => {
          const resetCards = cards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          handleLifeLost();
        }, 1000);
      }
    }
  };

  const handleLifeLost = () => {
    if (lives > 1) {
      setLives(lives - 1);
    } else {
      setLives(0);
      setGameState("completed");
      setGameCompleted(true);
    }
  };

  const completeLevel = () => {
    setGameCompleted(true);
    setGameState("completed");
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    
    // Unlock next level
    if (currentLevel < levelSettings.length - 1 && 
        !unlockedLevels.includes(currentLevel + 1)) {
      setUnlockedLevels([...unlockedLevels, currentLevel + 1]);
    }
    
    // Check for achievements
    checkAchievements();
  };

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    let updated = false;
    
    // First win achievement
    if (!newAchievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      updated = true;
    }
    
    if (updated) {
      setAchievements(newAchievements);
    }
  };

  const nextLevel = () => {
    if (currentLevel < levelSettings.length - 1 && unlockedLevels.includes(currentLevel + 1)) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const selectLevel = (levelIndex: number) => {
    if (unlockedLevels.includes(levelIndex)) {
      setCurrentLevel(levelIndex);
    }
  };

  const useHint = () => {
    if (hintUsed || gameState !== "playing" || gameCompleted) return;
    
    setHintUsed(true);
    
    // Find an unmatched pair
    const unmatchedCards = cards.filter(card => !card.isMatched);
    if (unmatchedCards.length > 0) {
      const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
      
      const updatedCards = cards.map(card =>
        card.id === randomCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
      
      setTimeout(() => {
        const resetCards = cards.map(card =>
          card.id === randomCard.id ? { ...card, isFlipped: false } : card
        );
        setCards(resetCards);
      }, 1500);
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "border-gray-300";
  };

  const getCategoryBgColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.bgColor : "bg-gray-100";
  };

  // Calculate card size based on number of pairs
  const getCardSize = () => {
    const pairs = levelSettings[currentLevel].pairs;
    
    if (pairs <= 3) return "w-24 h-24"; // 96px for 3 pairs
    if (pairs <= 4) return "w-20 h-20"; // 80px for 4 pairs
    if (pairs <= 5) return "w-16 h-16"; // 64px for 5 pairs
    if (pairs <= 6) return "w-14 h-14"; // 56px for 6 pairs
    if (pairs <= 8) return "w-12 h-12"; // 48px for 8 pairs
    return "w-10 h-10"; // 40px for 10 pairs
  };

  // Calculate grid columns based on number of pairs
  const getGridColumns = () => {
    const pairs = levelSettings[currentLevel].pairs;
    
    if (pairs <= 3) return "grid-cols-3";
    if (pairs <= 4) return "grid-cols-4";
    if (pairs <= 6) return "grid-cols-4";
    return "grid-cols-5";
  };

  // Calculate text size based on card size
  const getTextSize = () => {
    const pairs = levelSettings[currentLevel].pairs;
    
    if (pairs <= 3) return "text-lg";
    if (pairs <= 4) return "text-base";
    if (pairs <= 5) return "text-sm";
    if (pairs <= 6) return "text-sm";
    if (pairs <= 8) return "text-xs";
    return "text-xs";
  };

  const cardSize = getCardSize();
  const gridColumns = getGridColumns();
  const textSize = getTextSize();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-2 flex flex-col">
      {/* Celebration animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-4xl animate-bounce">🎉</div>
        </div>
      )}
      
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
        <div className="text-center mb-2">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-xl font-bold text-indigo-800 drop-shadow-md">Kids Matching Game</h1>
            <div className="flex gap-1">
              <Button 
                onClick={resetGame}
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs"
              >
                🔄 New Game
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center gap-1 mb-2 flex-wrap">
            <div className="bg-white rounded-lg shadow p-1 flex items-center border border-yellow-300">
              <span className="text-yellow-500 mr-0.5 text-sm">🏆</span>
              <div>
                <p className="text-[8px] text-gray-600">Score</p>
                <p className="text-base font-bold text-indigo-700">{score}/{levelSettings[currentLevel].pairs}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-1 flex items-center border border-red-300">
              <span className="text-red-500 mr-0.5 text-sm">❤️</span>
              <div>
                <p className="text-[8px] text-gray-600">Lives</p>
                <p className="text-base font-bold text-indigo-700">{lives}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-1 border border-green-300">
              <p className="text-[8px] text-gray-600">Streak</p>
              <p className="text-base font-bold text-indigo-700">{streak}</p>
            </div>
          </div>
          
          {/* Game stats */}
          {(gameState === "playing" || gameState === "completed") && (
            <div className="flex justify-center gap-1 mb-2">
              <div className="bg-white rounded-lg shadow p-1 border border-blue-300">
                <p className="text-[8px] text-gray-600">Moves</p>
                <p className="text-base font-bold text-indigo-700">{moves}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-1 border border-purple-300">
                <p className="text-[8px] text-gray-600">Time</p>
                <p className={`text-base font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-indigo-700'}`}>
                  {timeLeft}s
                </p>
              </div>
            </div>
          )}
          
          {/* Memorization phase */}
          {gameState === "memorize" && (
            <div className="mb-2">
              <p className="text-base text-indigo-700 font-bold mb-1">Memorize the pairs!</p>
              <div className="bg-white rounded-lg shadow p-1 inline-block mx-1 border border-yellow-300">
                <p className="text-[10px] text-gray-600">Time to Memorize</p>
                <p className="text-xl font-bold text-indigo-700">{timeLeft}s</p>
              </div>
            </div>
          )}
          
          {/* Game controls */}
          <div className="flex justify-center gap-1 mb-2 flex-wrap">
            {gameState === "memorize" && (
              <Button 
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm"
              >
                🚀 Start Now!
              </Button>
            )}
            
            {gameState === "playing" && !hintUsed && (
              <Button 
                onClick={useHint}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm"
              >
                💡 Hint
              </Button>
            )}
          </div>
        </div>

        {/* Game completed screen */}
        {gameState === "completed" ? (
          <div className="flex-1 flex items-center justify-center py-3">
            <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs w-full text-center border-2 border-yellow-300">
              <h2 className="text-xl font-bold text-green-600 mb-1">
                {lives > 0 ? "🎉 Level Complete! 🎉" : "😢 Game Over!"}
              </h2>
              
              {lives > 0 ? (
                <>
                  <p className="text-base text-gray-700 mb-1">You matched all pairs!</p>
                  <p className="text-base text-gray-700 mb-2">
                    Score: {score} in {moves} moves
                  </p>
                  <p className="text-base text-gray-700 mb-3">
                    Streak: {streak}
                  </p>
                </>
              ) : (
                <p className="text-base text-gray-700 mb-3">You ran out of lives. Try again!</p>
              )}
              
              <div className="flex gap-1 justify-center flex-wrap">
                <Button 
                  onClick={resetGame}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  Play Again
                </Button>
                
                {lives > 0 && currentLevel < levelSettings.length - 1 && unlockedLevels.includes(currentLevel + 1) ? (
                  <Button 
                    onClick={nextLevel}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Next Level →
                  </Button>
                ) : lives > 0 && currentLevel < levelSettings.length - 1 ? (
                  <Button 
                    disabled
                    className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm cursor-not-allowed"
                  >
                    <span className="mr-1">🔒</span>
                    Locked
                  </Button>
                ) : lives > 0 ? (
                  <Button 
                    onClick={() => setCurrentLevel(0)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Play Again
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <div className={`grid gap-1 h-full w-full justify-center ${gridColumns}`}>
              {cards.map((card) => (
                <div key={card.id} className="flex justify-center">
                  <Card
                    isFlipped={card.isFlipped || card.isMatched}
                    isMatched={card.isMatched}
                    className={`
                      ${cardSize}
                      ${card.isMatched ? 'bg-green-100' : 'bg-white'}
                      ${flippedCards.includes(card.id) ? 'ring-2 ring-indigo-400' : ''}
                      ${gameState === "memorize" ? 'ring-1 ring-indigo-300' : ''}
                      border-2 ${getCategoryColor(card.category)}
                    `}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="p-0.5 h-full flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center relative">
                        {card.isFlipped || card.isMatched ? (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            {card.type === "word" ? (
                              <div className={`${textSize} font-bold text-center p-1 rounded-lg w-full h-full flex items-center justify-center ${getCategoryBgColor(card.category)}`}>
                                {card.word}
                              </div>
                            ) : (
                              <div className={`${textSize === 'text-xs' ? 'text-lg' : 'text-xl'} flex items-center justify-center`}>
                                {card.icon}
                              </div>
                            )}
                            {card.isMatched && (
                              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border border-white">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-indigo-200 to-purple-200 w-full h-full flex items-center justify-center rounded-lg border border-dashed border-indigo-300">
                            <span className="text-indigo-800 font-bold">?</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category selector */}
        <div className="mt-3">
          <h3 className="text-center text-indigo-800 font-bold text-base mb-1">Select Category</h3>
          <div className="flex flex-wrap justify-center gap-1">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={!selectedCategory ? "default" : "outline"}
              className={`px-2 py-1 text-xs rounded-full ${
                !selectedCategory 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
                  : "border border-indigo-500 text-indigo-700 bg-white"
              }`}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-2 py-1 text-xs rounded-full ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
                    : "border border-indigo-500 text-indigo-700 bg-white"
                }`}
              >
                <span className="mr-0.5">{category.icon}</span> {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Level selector */}
        <div className="mt-3">
          <h3 className="text-center text-indigo-800 font-bold text-base mb-1">Select Level</h3>
          <div className="flex flex-wrap justify-center gap-1">
            {levelSettings.map((level, index) => (
              <Button
                key={index}
                onClick={() => selectLevel(index)}
                disabled={!unlockedLevels.includes(index)}
                variant={currentLevel === index ? "default" : "outline"}
                className={`px-2 py-1 text-xs rounded-full ${
                  currentLevel === index 
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" 
                    : unlockedLevels.includes(index)
                    ? "border border-green-500 text-green-700 bg-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {level.name}
                {!unlockedLevels.includes(index) && <span className="ml-0.5">🔒</span>}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-3 text-center text-gray-700 text-xs">
          {gameState === "memorize" && (
            <p className="font-bold">Study the pairs before they're hidden!</p>
          )}
          {gameState === "playing" && (
            <p className="font-bold">Flip two cards to find matching pairs!</p>
          )}
        </div>
      </div>
    </div>
  );
}