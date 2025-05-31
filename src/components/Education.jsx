import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaPen, FaVideo, FaFileAlt, FaTimes } from 'react-icons/fa';
import DeepfakeQuiz from './Quiz';

const EducationSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizOpen = () => {
    setShowQuiz(true);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
  };

  return (
    <div
      className="min-h-screen text-white p-8 relative"
      style={{
        background: `
          radial-gradient(circle at top right, #203a43 0%, transparent 25%),
          radial-gradient(circle at bottom left, #203a43 0%, transparent 17%),
          linear-gradient(to bottom right, #050607, #081015, #0e1c24)
        `
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/education.png)' }}
      />
      <div className="relative z-10">
        <h1 className="font-['Poppins'] font-bold text-[39px] leading-[75px] tracking-[0.09em]">
          Education
        </h1>
        <p className="font-['Raleway'] font-medium text-[18px] leading-[40px] tracking-[0.09em] text-gray-200">
          Understanding Deepfakes: Learn. Spot. Prevent
        </p>

        <div className="mt-12 space-y-8 max-w-6xl">
          {/* Card 1 - Test your Knowledge */}
          <div className="flex items-center justify-between bg-gradient-to-br from-[#053B39] via-[#086762] to-[#13928E] rounded-xl p-10 h-32 w-full shadow-lg hover:shadow-xl transition-all duration-300">
            <FaPen 
              className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform duration-200" 
              onClick={handleQuizOpen}
            />
            <span className="text-xl font-semibold">Test your Knowledge</span>
          </div>

          {/* Card 2 - Video Playlist */}
          <div className="flex items-center justify-between bg-gradient-to-br from-[#053B39] via-[#086762] to-[#13928E] rounded-xl p-10 h-32 w-full shadow-lg hover:shadow-xl transition-all duration-300">
            <FaVideo className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-semibold">Video Playlist</span>
          </div>

          {/* Card 3 - Articles & Papers */}
          <div className="flex items-center justify-between bg-gradient-to-br from-[#053B39] via-[#086762] to-[#13928E] rounded-xl p-10 h-32 w-full shadow-lg hover:shadow-xl transition-all duration-300">
            <FaFileAlt className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-semibold">Articles & Papers</span>
          </div>
        </div>
      </div>

      {/* Quiz Modal Popup */}
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
            onClick={handleQuizClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10"
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
            <DeepfakeQuiz onClose={handleQuizClose} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EducationSection;