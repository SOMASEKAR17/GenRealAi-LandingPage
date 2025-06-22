import React, { useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <-- Add this

const Processing = () => {
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate(); // <-- Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

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

  return (
    <div
      className="w-screen h-screen text-white flex flex-col items-center justify-center font-sans relative overflow-hidden px-4"
      style={{ backgroundColor: interpolateColor() }}
    >
      {/* Logo */}
      <div className="relative mb-6 w-40 h-40 rounded-full border-2 border-cyan-400 overflow-hidden">
        <img
          src="/logoGenReal.png"
          alt="GenReal.AI Logo"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
              onClick={() => navigate('/quiz')} // <-- Navigate on click
            >
              Take Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Processing;
