import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DetailedAnalysis from "./detailedAnalysis"

const Result = () => {
  const [showDetailed, setShowDetailed] = useState(false);
  const [expandedModel, setExpandedModel] = useState(0);

  // Scroll lock effect
  // Scroll lock effect
useEffect(() => {
  if (showDetailed) {
    document.body.style.overflow = 'hidden'; // 👈 THIS
  } else {
    document.body.style.overflow = 'auto';
  }
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [showDetailed]);


  const modelResults = [
    {
      label: 'Model 1',
      value: 60,
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
      label: 'Model 2',
      value: 85,
      details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem..."
    },
    {
      label: 'Model 3',
      value: 72,
      details: "But I must explain to you how all this mistaken idea of..."
    },
    {
      label: 'Model 4',
      value: 49,
      details: "At vero eos et accusamus et iusto odio dignissimos..."
    },
  ];

  const handleGetDetailedResult = () => {
    setShowDetailed(true);
  };

  const toggleModel = (index) => {
    setExpandedModel(expandedModel === index ? -1 : index);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans relative px-4 sm:px-6 overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-x-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Logo */}
      <img
        src="/logoGenReal.png"
        alt="GenReal.AI"
        className="absolute top-4 left-4 h-10 w-10 sm:h-12 sm:w-12 object-contain z-20"
      />

      <AnimatePresence mode="wait">
        {!showDetailed ? (
          <motion.div
            key="initial"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen"
          >
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-cyan-400/30">
              {/* Result Box */}
              <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-md font-semibold text-slate-200 mb-4">Your Result</h3>
                <div className="w-28 h-28 bg-slate-700/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-3xl font-bold mb-4 border border-cyan-400/30 shadow-xl">
                  76
                  <span className="text-xs font-medium text-slate-300 mt-1">out of 100</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Mostly a Deepfake</h4>
                <p className="text-sm text-slate-300 px-4 leading-relaxed">
                  60% of people encountered a deepfake video in the past year.
                </p>
              </div>

              {/* Summary Box */}
              <div className="w-full md:w-1/2 bg-slate-800/80 backdrop-blur-sm p-6 sm:p-8">
                <h3 className="text-md font-semibold text-white mb-6">Summary</h3>
                <div className="space-y-5">
                  {modelResults.map((model, i) => (
                    <div key={i}>
                      <p className="text-sm text-slate-300 mb-2 font-medium">{model.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-mono">0</span>
                        <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${model.value}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">1</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Go back Home
                  </button>
                  <button
                    onClick={handleGetDetailedResult}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Get Detailed Result <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <DetailedAnalysis />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;