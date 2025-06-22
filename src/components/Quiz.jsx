import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function DeepfakeQuiz({
  randomRotation = true,
  sensitivity = 150,
  onClose,
}) {
  const [cardDimensions, setCardDimensions] = useState({ width: 350, height: 400 });
  const [quizData] = useState([
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      isDeepfake: false,
      explanation: 'This is a real photograph with natural lighting and authentic facial features.',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1494790108755-2616c5d4e1d8?w=400&h=400&fit=crop&crop=face',
      isDeepfake: false,
      explanation: 'Real photograph showing consistent skin texture and natural expressions.',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
      isDeepfake: false,
      explanation: 'Authentic photograph with natural lighting and genuine expressions.',
    },
  ]);

  const [unansweredCards, setUnansweredCards] = useState([]);
  const [answeredCards, setAnsweredCards] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    function updateCardSize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const width = Math.min(screenWidth * 0.8, 380);
      const height = Math.min(screenHeight * 0.6, 450);
      setCardDimensions({ width, height });
    }

    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  useEffect(() => {
    if (unansweredCards.length === 0 && answeredCards.length === quizData.length) {
      setQuizCompleted(true);
    }
  }, [unansweredCards, answeredCards, quizData.length]);

  const handleAnswer = (isDeepfake) => {
    if (answered) return;
    const currentCard = unansweredCards[unansweredCards.length - 1];

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
        correct: isDeepfake === currentCard.isDeepfake,
      };
      setAnsweredCards((prev) => [...prev, answeredCard]);
      setUnansweredCards((prev) => prev.slice(0, -1));
      setAnswered(false);
      setUserAnswer(null);
      setShowExplanation(false);
    }, 2500);
  };

  const handleSkip = () => {
    setUnansweredCards((prev) => {
      const newCards = [...prev];
      const last = newCards.pop();
      newCards.unshift(last);
      return newCards;
    });
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const restartQuiz = () => {
    setUnansweredCards(quizData);
    setAnsweredCards([]);
    setScore(0);
    setAnswered(false);
    setUserAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  useEffect(() => {
    const initializedCards = quizData.map((card) => ({
      ...card,
      rotate: randomRotation ? Math.random() * 4 - 2 : 0, // assign rotation once
    }));
    setUnansweredCards(initializedCards);
  }, []);
  

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Close quiz"
        >
          <X size={24} />
        </button>

        {quizCompleted ? (
          <div className="bg-slate-800/95 text-white p-8 rounded-2xl border border-slate-600/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <div className={`text-5xl font-bold mb-4 ${getScoreColor()}`}>
              {score} / {quizData.length}
            </div>
            <p className="text-base text-gray-200 mb-6">
              {score === quizData.length
                ? 'Perfect! You\'re a deepfake detection expert!'
                : score >= 4
                ? 'Great job! You have a good eye for deepfakes.'
                : score >= 3
                ? 'Not bad! Keep practicing to improve your detection skills.'
                : 'Keep learning! Deepfake detection takes practice.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={restartQuiz} className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg text-white font-semibold">
                Take Quiz Again
              </button>
              <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 px-6 py-3 rounded-lg text-white font-semibold">
                Close Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Deepfake Detection Quiz</h2>
              <div className="text-teal-200 bg-teal-800/30 px-4 py-2 rounded-full border border-teal-600/30 text-sm">
                Questions Left: {unansweredCards.length} | Answered: {answeredCards.length} | Score: {score}
              </div>
            </div>

            <div className="relative" style={{ width: cardDimensions.width, height: cardDimensions.height }}>
              <AnimatePresence>
                {unansweredCards.map((card, index) => {
                  const isTop = index === unansweredCards.length - 1;
                  const z = index;
                  const scale = 1 - (unansweredCards.length - index - 1) * 0.02;
                  const rotate = card.rotate;

                  return (
                    <motion.div
                      key={card.id}
                      className="absolute left-0 top-0"
                      style={{
                        width: cardDimensions.width,
                        height: cardDimensions.height,
                        zIndex: z,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale, rotate }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      drag={isTop ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={(event, info) => {
                        if (isTop && Math.abs(info.offset.x) > sensitivity) {
                          handleSkip();
                        }
                      }}
                    >
                      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-600/30 overflow-hidden shadow-2xl w-full h-full">
                        <img src={card.img} alt="" className="w-full h-3/5 object-cover" />
                        {isTop && (
                          <div className="p-4 text-center">
                            <h3 className="text-white text-lg font-semibold mb-4">Is this a deepfake?</h3>
                            {!answered && (
                              <div className="flex gap-3 justify-center">
                                <button onClick={() => handleAnswer(false)} className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg text-white text-sm">
                                  Real Image
                                </button>
                                <button onClick={() => handleAnswer(true)} className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white text-sm">
                                  Deepfake
                                </button>
                              </div>
                            )}
                            {showExplanation && (
                              <div className="mt-4 p-3 bg-slate-800/60 rounded-lg border border-slate-600/30">
                                <div className={`font-bold mb-2 ${userAnswer === card.isDeepfake ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {userAnswer === card.isDeepfake ? '✓ Correct!' : '✗ Incorrect'}
                                </div>
                                <p className="text-gray-300 text-sm">{card.explanation}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-sm text-gray-300 text-center">
              💡 Drag card left/right to skip | Answer to score points
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeepfakeQuiz;
