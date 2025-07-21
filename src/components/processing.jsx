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
    let start = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const percentage = Math.min((elapsed / 10000) * 100, 100);
      setProgress(prev => (percentage > prev ? Math.floor(percentage) : prev));

      if (percentage < 100) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setProcessingComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(step);

    const timeout = setTimeout(() => {
      setShowNotification(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleSeeResults = () => {
    setShowResult(true);
  };

  if (showResult) return <Result />;

  return (
    <div className="w-screen min-h-screen pt-10 overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-start font-sans relative">

      {/* Fixed background behind all content */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-4 sm:px-8 py-12">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border-2 border-cyan-400/30 shadow-2xl backdrop-blur-sm">
              <img
                src="/logoGenReal.png"
                alt="GenReal.AI Logo"
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Analyzing Content
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-6">
            Our AI is processing your media for deepfake detection
          </p>

          <div className="flex justify-center items-center flex-wrap gap-4 mb-8 text-center">
            {['Upload', 'Analysis', 'Verification', 'Complete'].map((label, i) => (
              <div className="flex items-center gap-2" key={label}>
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                  progress > [0, 30, 70, 99][i] ? (i === 3 ? 'bg-green-400' : 'bg-cyan-400') : 'bg-slate-600'
                }`}></div>
                <span className="text-xs sm:text-sm text-slate-400">{label}</span>
                {i < 3 && <div className="w-8 h-0.5 bg-slate-600"></div>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md mb-12 px-4 sm:px-0"
        >
          <div className="relative mb-4">
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="absolute -top-8 left-0 right-0 text-center">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm text-center">
            {progress < 30 ? 'Uploading and preprocessing...' :
             progress < 70 ? 'Running deepfake detection algorithms...' :
             progress < 100 ? 'Finalizing analysis...' :
             'Analysis complete!'}
          </p>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
            <h3 className="text-cyan-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
              Did you know?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              60% of people encountered a deepfake video in the past year, but only 
              <span className="text-cyan-400 font-semibold"> 24% </span> 
              could identify them correctly
            </p>
          </div>
        </motion.div>

        {/* See Results Button */}
        {processingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mb-8"
          >
            <motion.button
              onClick={handleSeeResults}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3 sm:px-10 sm:py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-cyan-400/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye className="text-lg" />
              View Results
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Notification */}
      {showNotification && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="fixed bottom-6 right-6 bg-slate-800/90 backdrop-blur-sm border border-cyan-400/30 px-6 py-5 rounded-xl shadow-2xl flex items-start gap-4 max-w-xs z-50"
        >
          <FaInfoCircle className="text-cyan-400 text-2xl mt-1" />
          <div>
            <p className="text-sm mb-3 leading-snug text-slate-200">
              Think you're good at spotting deepfakes? Put your skills to the test.
            </p>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowQuiz(true)}
            >
              Take Quiz
            </button>

          </div>
          <button
                onClick={() => setShowNotification(false)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-400 text-lg font-bold"
                aria-label="Close"
              >
                &times;
              </button>
        </motion.div>
      )}

      {/* Quiz Modal */}
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
          <button
            onClick={() => setShowQuiz(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <FaTimes className="text-2xl" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative max-w-full sm:max-w-4xl w-full max-h-[90vh] overflow-auto sm:overflow-hidden"
          >
            <DeepfakeQuiz onClose={() => setShowQuiz(false)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Processing;
