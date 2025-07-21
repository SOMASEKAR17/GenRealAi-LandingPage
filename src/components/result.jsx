import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaChevronDown, FaChevronUp, FaHome, FaChartBar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DetailedAnalysis from "./detailedAnalysis"

const Result = () => {
  const [showDetailed, setShowDetailed] = useState(false);
  const [expandedModel, setExpandedModel] = useState(null);

  useEffect(() => {
    if (showDetailed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDetailed]);

  const modelResults = [
    {
      label: 'DeepFake Detector v1',
      value: 60,
      confidence: 'Medium',
      details: "Advanced neural network analysis detecting facial inconsistencies and temporal artifacts in the video sequence."
    },
    {
      label: 'FaceSwap Analyzer',
      value: 85,
      confidence: 'High',
      details: "Specialized algorithm for identifying face replacement techniques and unnatural facial movements."
    },
    {
      label: 'Temporal Consistency',
      value: 72,
      confidence: 'High',
      details: "Frame-by-frame analysis detecting inconsistencies in lighting, shadows, and facial expressions over time."
    },
    {
      label: 'Audio-Visual Sync',
      value: 49,
      confidence: 'Low',
      details: "Cross-modal analysis examining lip-sync accuracy and voice-face correspondence patterns."
    },
  ];

  const handleGetDetailedResult = () => {
    setShowDetailed(true);
  };

  const toggleModel = (index) => {
    setExpandedModel(expandedModel === index ? null : index);
  };

  const getConfidenceColor = (confidence) => {
    switch(confidence) {
      case 'High': return 'text-emerald-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getProgressColor = (value) => {
    if (value >= 70) return 'from-emerald-500 to-green-600';
    if (value >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans relative">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-purple-400/8 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"></div>
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-blue-500/30 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Logo with enhanced styling */}
      <div className="absolute top-4 left-4 z-30">
        <img
          src="/logoGenReal.png"
          alt="GenReal.AI"
          className="h-10 w-auto object-contain"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showDetailed ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8"
          >
            <div className="relative z-10 w-full max-w-6xl">
              
              {/* Header Section */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                  Analysis Complete
                </h1>
                <p className="text-slate-400 text-lg">AI-powered deepfake detection results</p>
              </motion.div>

              {/* Main Results Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col lg:flex-row gap-6 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 backdrop-blur-sm bg-slate-800/30"
              >
                
                {/* Result Display */}
                <div className="lg:w-2/5 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm p-8 lg:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-400/5 rounded-full blur-xl"></div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="mb-6"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-4xl sm:text-5xl font-bold mb-6 border-2 border-cyan-400/30 shadow-2xl relative">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">76</span>
                        <span className="text-xs font-medium text-slate-300 mt-1">out of 100</span>
                        
                        {/* Animated ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                      Likely Deepfake
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xs">
                      High confidence detection based on multiple AI model analysis
                    </p>
                  </motion.div>
                </div>

                {/* Analysis Summary */}
                <div className="lg:w-3/5 bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <FaChartBar className="text-cyan-400 text-xl" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Model Analysis</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {modelResults.map((model, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                        className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          expandedModel === i 
                            ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-4 rounded-xl border border-cyan-400/30 shadow-lg' 
                            : 'hover:bg-slate-700/20 p-3 rounded-lg'
                        }`}
                        onClick={() => toggleModel(i)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm sm:text-base text-white font-semibold">{model.label}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full bg-slate-700/50 ${getConfidenceColor(model.confidence)}`}>
                              {model.confidence}
                            </span>
                            {expandedModel === i ? 
                              <FaChevronUp className="text-cyan-400 transition-transform duration-300" /> : 
                              <FaChevronDown className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            }
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-xs text-slate-500 font-mono min-w-[20px]">0%</span>
                          <div className="flex-1 h-3 bg-slate-600/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-500/30">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${model.value}%` }}
                              transition={{ delay: 0.6 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${getProgressColor(model.value)} rounded-full shadow-lg relative`}
                            >
                              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                            </motion.div>
                          </div>
                          <span className="text-xs text-slate-500 font-mono min-w-[30px]">100%</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <span className="text-lg font-bold text-white">{model.value}%</span>
                        </div>

                        <AnimatePresence>
                          {expandedModel === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-slate-600/50"
                            >
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {model.details}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={() => window.location.href = '/'}
                      className="group bg-slate-600/80 hover:bg-slate-500/80 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-slate-500/30 flex items-center justify-center gap-2"
                    >
                      <FaHome className="group-hover:scale-110 transition-transform duration-300" />
                      Back to Home
                    </button>
                    <button
                      onClick={handleGetDetailedResult}
                      className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <FaChartBar className="group-hover:scale-110 transition-transform duration-300" />
                      Detailed Analysis
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
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