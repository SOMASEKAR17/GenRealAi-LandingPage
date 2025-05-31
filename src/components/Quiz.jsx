import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";

// QuizCard component
function QuizCard({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

// DeepfakeQuiz component
function DeepfakeQuiz({
  randomRotation = true,
  sensitivity = 300,
  animationConfig = { stiffness: 260, damping: 20 },
  onClose
}) {
  const [cardDimensions, setCardDimensions] = useState({ width: 350, height: 400 });

  // Responsive resizing
  useEffect(() => {
    function updateCardSize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let width = Math.min(screenWidth * 0.9, 400);
      let height = Math.min(screenHeight * 0.65, 480);

      setCardDimensions({ width, height });
    }

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("resize", updateCardSize);
  }, []);

  const [quizData] = useState([
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isDeepfake: false,
      explanation:
        "This is a real photograph with natural lighting and authentic facial features.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1494790108755-2616c5d4e1d8?w=400&h=400&fit=crop&crop=face",
      isDeepfake: false,
      explanation:
        "Real photograph showing consistent skin texture and natural expressions.",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=DEEPFAKE%0APLACEHOLDER%0A1",
      isDeepfake: true,
      explanation:
        "This would be a deepfake image with subtle inconsistencies in facial mapping.",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isDeepfake: false,
      explanation:
        "Authentic photograph with natural lighting and genuine expressions.",
    },
    {
      id: 5,
      img: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=DEEPFAKE%0APLACEHOLDER%0A2",
      isDeepfake: true,
      explanation:
        "This would be a deepfake with AI-generated artifacts and unnatural features.",
    },
  ]);

  const [unansweredCards, setUnansweredCards] = useState(quizData);
  const [answeredCards, setAnsweredCards] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentCard = unansweredCards[unansweredCards.length - 1];

  const sendToBack = () => {
    if (unansweredCards.length > 1) {
      setUnansweredCards((prev) => {
        const newCards = [...prev];
        const lastCard = newCards.pop();
        newCards.unshift(lastCard);
        return newCards;
      });
      setAnswered(false);
      setUserAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswer = (isDeepfake) => {
    if (answered) return;

    setUserAnswer(isDeepfake);
    setAnswered(true);
    setShowExplanation(true);

    if (isDeepfake === currentCard.isDeepfake) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const answeredCard = {
        ...currentCard,
        userAnswer: isDeepfake,
        correct: isDeepfake === currentCard.isDeepfake
      };

      setAnsweredCards(prev => [...prev, answeredCard]);
      setUnansweredCards(prev => prev.slice(0, -1));

      setAnswered(false);
      setUserAnswer(null);
      setShowExplanation(false);
    }, 2000);
  };

  useEffect(() => {
    if (unansweredCards.length === 0 && answeredCards.length === quizData.length) {
      setQuizCompleted(true);
    }
  }, [unansweredCards, answeredCards, quizData.length]);

  const restartQuiz = () => {
    setUnansweredCards(quizData);
    setAnsweredCards([]);
    setScore(0);
    setAnswered(false);
    setUserAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return "text-emerald-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (quizCompleted) {
    return (
      <div className="text-center bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-600/30 w-[90vw] max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
        <div className={`text-5xl font-bold mb-4 ${getScoreColor()}`}>
          {score} / {quizData.length}
        </div>
        <p className="text-base text-gray-200 mb-6">
          {score === quizData.length
            ? "Perfect! You're a deepfake detection expert!"
            : score >= 4
            ? "Great job! You have a good eye for deepfakes."
            : score >= 3
            ? "Not bad! Keep practicing to improve your detection skills."
            : "Keep learning! Deepfake detection takes practice."}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold"
            onClick={restartQuiz}
          >
            Take Quiz Again
          </button>
          <button
            className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 rounded-lg font-semibold"
            onClick={onClose}
          >
            Close Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center overflow-hidden w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Deepfake Detection Quiz</h2>
        <div className="text-teal-200 bg-teal-800/30 px-4 py-2 rounded-full border border-teal-600/30 text-sm">
          Questions Left: {unansweredCards.length} | Answered: {answeredCards.length} | Score: {score}
        </div>
      </div>

      <div
        className="relative mb-6"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          perspective: "600px",
        }}
      >
        {unansweredCards.map((card, index) => {
          const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
          const isTopCard = index === unansweredCards.length - 1;

          return (
            <QuizCard
              key={card.id}
              onSendToBack={sendToBack}
              sensitivity={sensitivity}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-600/30 overflow-hidden shadow-xl"
                animate={{
                  rotateZ: (unansweredCards.length - index - 1) * 4 + randomRotate,
                  scale: 1 + index * 0.06 - unansweredCards.length * 0.06,
                  transformOrigin: "90% 90%",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={cardDimensions}
              >
                <div className="relative w-full h-full">
                  <img
                    src={card.img}
                    alt={`Quiz question ${card.id}`}
                    className="w-full h-3/5 object-cover"
                  />
                  {isTopCard && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 to-slate-800/80 p-4 text-center">
                      <h3 className="text-white text-base font-semibold mb-3">
                        Is this a deepfake?
                      </h3>
                      {!answered && (
                        <div className="flex gap-3 justify-center">
                          <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={() => handleAnswer(false)}
                          >
                            Real Image
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={() => handleAnswer(true)}
                          >
                            Deepfake
                          </button>
                        </div>
                      )}
                      {showExplanation && (
                        <div className="mt-3 text-sm">
                          <div
                            className={`font-bold mb-1 ${
                              userAnswer === currentCard.isDeepfake
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {userAnswer === currentCard.isDeepfake
                              ? "Correct!"
                              : "Incorrect."}
                          </div>
                          <p className="text-gray-300 text-xs">
                            {currentCard.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </QuizCard>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-400 mb-2">
        Drag cards to skip
      </div>

      <button
        className="text-sm text-gray-400 underline hover:text-gray-300"
        onClick={onClose}
      >
        Close Quiz
      </button>
    </div>
  );
}

export default DeepfakeQuiz;
