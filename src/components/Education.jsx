import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaPen, FaVideo, FaFileAlt, FaTimes } from 'react-icons/fa';
import DeepfakeQuiz from './Quiz';
import VideoCarousel from "./videoCarousel";

const EducationSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showVideoCarousel, setShowVideoCarousel] = useState(false);

  useEffect(() => {
  const body = document.body;
  const shouldLockScroll = showQuiz || showVideoCarousel;

  if (shouldLockScroll) {
    body.classList.add("overflow-hidden");
  } else {
    body.classList.remove("overflow-hidden");
  }

  // Cleanup on unmount
  return () => body.classList.remove("overflow-hidden");
}, [showQuiz, showVideoCarousel]);


  const handleQuizOpen = () => {
    setShowQuiz(true);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
  };

  const handleVideoCarouselOpen = () => {
    setShowVideoCarousel(true);
  };

  const handleVideoCarouselClose = () => {
    setShowVideoCarousel(false);
  };

  return (
    <div
      className="min-h-screen text-white p-8 relative bg-gradient-to-tl from-black to-cyan-950  from-30%  to-100%"
      id="education"
    >
      <div className="relative z-10 text-white px-4 py-16">
  {/* Background overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
    style={{ backgroundImage: "url(/education.png)" }}
  />

  {/* Title Section */}
  <div className="relative z-10 text-center mb-12">
    <h1 className=" font-bold text-4xl md:text-5xl tracking-wider drop-shadow-lg">
      Education
    </h1>
    <p className=" font-medium text-lg md:text-xl mt-4 text-cyan-100 tracking-wide">
      Understanding Deepfakes: Learn. Spot. Prevent.
    </p>
  </div>

  {/* Card Section */}
  <div className="relative z-10 max-w-5xl mx-auto grid gap-8">
    {/* Card 1 */}
    <div onClick={handleQuizOpen} className="flex gap-2 items-center cursor-pointer justify-between bg-[#001f23] border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300">
      <FaPen 
        className="text-cyan-300 text-3xl hover:scale-110 transition-transform duration-200" 
      />
      <span className="text-2xl text-cyan-100 tracking-wide">
        Test your Knowledge
      </span>
    </div>

    {/* Card 2 */}
    <div onClick={handleVideoCarouselOpen} className="flex gap-2 items-center cursor-pointer justify-between bg-[#001f23] border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300">
      <FaVideo 
        className="text-cyan-300 text-3xl hover:scale-110 transition-transform duration-200" 
      />
      <span className="text-2xl  text-cyan-100 tracking-wide">
        Video Playlist
      </span>
    </div>

    {/* Card 3 */}
    <div className="flex gap-2 items-center justify-between cursor-pointer bg-[#001f23] border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300">
      <FaFileAlt 
        className="text-cyan-300 text-3xl hover:scale-110 transition-transform duration-200" 
      />
      <span className="text-2xl  text-cyan-100 tracking-wide">
        Articles & Papers
      </span>
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
            <DeepfakeQuiz onClose={handleQuizClose} />
          </motion.div>
        </motion.div>
      )}

      {/* Video Carousel Modal Popup */}
      {showVideoCarousel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg"
        >
          {/* Close button */}
          <button
            onClick={handleVideoCarouselClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10 hover:cursor-pointer"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Video Carousel Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            <VideoCarousel />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EducationSection;