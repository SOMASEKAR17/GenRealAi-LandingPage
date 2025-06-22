import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaTimes, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import DeepfakeQuiz from './Quiz';
import Result from "./result";

const Processing = () => {
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingComplete(true);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);

    const timeout = setTimeout(() => {
      setShowNotification(true);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const interpolateColor = () => {
    const p = Math.min(progress / 100, 1);
    const from = [14, 16, 16]; // #0E1010
    const to = [13, 47, 45];   // #0D2F2D
    const interpolated = from.map((f, i) => Math.round(f + (to[i] - f) * p));
    return `rgb(${interpolated.join(',')})`;
  };

  const handleSeeResults = () => {
    setShowResult(true);
  };

  if (showResult) {
    return <Result />;
  }

  return (
    <div
      className="w-screen h-screen text-white flex flex-col items-center justify-center font-sans relative overflow-hidden px-4"
      style={{ backgroundColor: interpolateColor() }}
    >
    {/* Logo */}
    <div className="relative mb-6">
      <div className="w-44 h-44 rounded-full bg-[#333232] flex items-center justify-center border-4 border-cyan-400 shadow-lg">
        <img
          src="/logoGenReal.png"
          alt="GenReal.AI Logo"
          className="w-28 h-28 object-contain"
        />
      </div>
    </div>

      {/* Title */}
      <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-2">
        Did you know
      </h2>

      {/* Fact */}
      <p className="text-center text-sm sm:text-base text-gray-300 max-w-sm mb-6">
        60% of people encountered a deepfake video in the past year
      </p>

      {/* Progress Bar */}
      <div className="w-[80%] max-w-md h-2 bg-gray-600 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-cyan-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* See Results Button - appears when processing is complete */}
      {processingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: 0.3 
          }}
          className="mb-6"
        >
          <motion.button
            onClick={handleSeeResults}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 cursor-pointer hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye className="text-lg" />
            See Results
          </motion.button>
        </motion.div>
      )}

      {/* Notification box */}
      {showNotification && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="fixed bottom-6 right-6 bg-[#123332] border border-cyan-400 px-6 py-5 rounded-xl shadow-xl flex items-start gap-4 max-w-xs"
        >
          <FaInfoCircle className="text-cyan-400 text-2xl mt-1" />
          <div>
            <p className="text-sm mb-2 leading-snug">
              Think you're good at spotting deepfakes? Put your skills to the test.
            </p>
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-5 py-2 rounded-full font-semibold"
              onClick={() => setShowQuiz(true)} 
            >
              Take Quiz
            </button>
          </div>
        </motion.div>
      )}

      {/* Quiz Popup Modal */}
      {showQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(32, 58, 67, 0.8) 0%, transparent 25%),
              radial-gradient(circle at bottom left, rgba(32, 58, 67, 0.8) 0%, transparent 17%),
              linear-gradient(to bottom right, rgba(5, 6, 7, 0.9), rgba(8, 16, 21, 0.9), rgba(14, 28, 36, 0.9))
            `,
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setShowQuiz(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10 hover:cursor-pointer"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Quiz Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <DeepfakeQuiz onClose={() => setShowQuiz(false)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Processing;