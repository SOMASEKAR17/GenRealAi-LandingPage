import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Result = () => {
  const navigate = useNavigate();
  const [showDetailed, setShowDetailed] = useState(false);
  const [expandedModel, setExpandedModel] = useState(0);

  const modelResults = [
    { 
      label: 'Model 1', 
      value: 60,
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    { 
      label: 'Model 2', 
      value: 85,
      details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
    },
    { 
      label: 'Model 3', 
      value: 72,
      details: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."
    },
    { 
      label: 'Model 4', 
      value: 49,
      details: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores."
    },
  ];

  const handleGetDetailedResult = () => {
    setShowDetailed(true);
  };

  const toggleModel = (index) => {
    setExpandedModel(expandedModel === index ? -1 : index);
  };

  return (
    <div className="w-screen min-h-screen bg-[#0E1010] text-white font-sans relative px-4 sm:px-6 overflow-hidden">

      {/* Logo */}
      <img
        src="/logoGenReal.png"
        alt="GenReal.AI"
        className="absolute top-4 left-4 h-10 w-10 sm:h-12 sm:w-12 object-contain z-20"
      />

      <AnimatePresence mode="wait">
        {!showDetailed ? (
          // Initial Result View
          <motion.div
            key="initial"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen"
          >
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl border border-gray-700">
              {/* Result Box */}
              <div className="w-full md:w-1/2 bg-[#42DED980] p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-md font-semibold text-gray-200 mb-4">Your Result</h3>
                <div className="w-28 h-28 bg-[#14534F] rounded-full flex flex-col items-center justify-center text-3xl font-bold mb-4">
                  76
                  <span className="text-xs font-medium text-gray-300 mt-1">out of 100</span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">Mostly a Deepfake</h4>
                <p className="text-sm text-gray-300 px-4">
                  60% of people encountered a deepfake video in the past year. 50% of people encountered a deepfake video in the past year
                </p>
              </div>

              {/* Summary Box */}
              <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 sm:p-8">
                <h3 className="text-md font-semibold text-white mb-6">Summary</h3>
                <div className="space-y-5">
                  {modelResults.map((model, i) => (
                    <div key={i}>
                      <p className="text-sm text-gray-300 mb-1">{model.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">0</span>
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${model.value}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">1</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition cursor-pointer"
                  >
                    Go back Home
                  </button>
                  <button
                    onClick={handleGetDetailedResult}
                    className="bg-[#247875] text-white px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition cursor-pointer hover:bg-[#2d8a86]"
                  >
                    Get Detailed Result <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Detailed Analysis View
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 max-w-4xl mx-auto py-8"
          >
            {/* Top Result Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl border border-gray-700 mb-8"
            >
              <div className="w-full md:w-1/3 bg-[#42DED980] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-28 h-28 bg-[#14534F] rounded-full flex flex-col items-center justify-center text-3xl font-bold mb-4">
                76
                <span className="text-xs font-medium text-gray-300 mt-1">out of 100</span>
              </div>

              </div>
              <div className="w-full md:w-2/3 bg-[#3A3A3A] p-6">
                <h4 className="text-xl font-bold text-white mb-2">Mostly a Deepfake</h4>
                <p className="text-sm text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.
                </p>
              </div>
            </motion.div>

            {/* Detailed Model Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-8">Detailed Model Analysis</h2>
              
              <div className="space-y-4">
                {modelResults.map((model, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                    className={`bg-[#2A2A2A] rounded-xl border ${
                      index === 2 ? 'border-[#42DED9]' : 'border-gray-600'
                    } overflow-hidden`}
                  >
                    <div
                      className="p-6 cursor-pointer flex items-center justify-between hover:bg-[#333333] transition-colors"
                      onClick={() => toggleModel(index)}
                    >
                      <h3 className="text-lg font-semibold text-white">{model.label}</h3>
                      <motion.div
                        animate={{ rotate: expandedModel === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-gray-400" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedModel === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-600">
                            <div className="pt-4">
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {model.details}
                              </p>
                              <div className="mt-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs text-gray-400">Confidence Score:</span>
                                  <span className="text-sm font-semibold text-teal-400">{model.value}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${model.value}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="h-full bg-teal-400 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => {
                  setShowDetailed(false);
                  setExpandedModel(-1); // Close any expanded models
                }}
                className="bg-[#247875] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d8a86] transition cursor-pointer"
              >
                Back to Summary
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;