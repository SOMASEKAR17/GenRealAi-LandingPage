import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaHome, FaChartBar, FaArrowLeft, FaEye, FaCog, FaShieldAlt, FaMicrophone, FaBrain } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const DetailedAnalysis = ({ onBack }) => {
  const detailedModels = [
    {
      id: 1,
      name: "DeepFake Detector v1",
      subtitle: "Neural Network Analysis",
      score: 60,
      confidence: "Medium",
      icon: <FaBrain className="text-2xl" />,
      gradient: "from-purple-500 to-indigo-600",
      description: "Advanced neural network analysis detecting facial inconsistencies and temporal artifacts in the video sequence.",
      metrics: {
        "Facial Consistency": 72,
        "Temporal Artifacts": 48,
        "Edge Detection": 65,
        "Pixel Anomalies": 58
      },
      technicalDetails: "Uses a deep convolutional neural network with attention mechanisms to identify subtle inconsistencies in facial features across video frames.",
      processingTime: "2.3s",
      dataPoints: "1,247 frames analyzed"
    },
    {
      id: 2,
      name: "FaceSwap Analyzer",
      subtitle: "Specialized Face Detection",
      score: 85,
      confidence: "High",
      icon: <FaEye className="text-2xl" />,
      gradient: "from-red-500 to-pink-600",
      description: "Specialized algorithm for identifying face replacement techniques and unnatural facial movements.",
      metrics: {
        "Face Boundaries": 89,
        "Skin Texture": 82,
        "Eye Movement": 88,
        "Facial Landmarks": 81
      },
      technicalDetails: "Employs advanced computer vision techniques to detect inconsistencies in facial geometry and texture mapping.",
      processingTime: "1.8s",
      dataPoints: "324 facial landmarks tracked"
    },
    {
      id: 3,
      name: "Temporal Consistency",
      subtitle: "Frame-by-Frame Analysis",
      score: 72,
      confidence: "High",
      icon: <FaCog className="text-2xl" />,
      gradient: "from-green-500 to-emerald-600",
      description: "Frame-by-frame analysis detecting inconsistencies in lighting, shadows, and facial expressions over time.",
      metrics: {
        "Lighting Consistency": 76,
        "Shadow Analysis": 68,
        "Motion Blur": 74,
        "Frame Continuity": 70
      },
      technicalDetails: "Analyzes temporal coherence across video frames using optical flow and lighting consistency algorithms.",
      processingTime: "3.1s",
      dataPoints: "2,156 frame transitions"
    },
    {
      id: 4,
      name: "Audio-Visual Sync",
      subtitle: "Cross-Modal Analysis",
      score: 49,
      confidence: "Low",
      icon: <FaMicrophone className="text-2xl" />,
      gradient: "from-yellow-500 to-orange-600",
      description: "Cross-modal analysis examining lip-sync accuracy and voice-face correspondence patterns.",
      metrics: {
        "Lip Sync Accuracy": 52,
        "Voice Matching": 45,
        "Audio Quality": 51,
        "Phoneme Alignment": 48
      },
      technicalDetails: "Combines audio processing with visual lip movement analysis to detect synchronization anomalies.",
      processingTime: "4.2s",
      dataPoints: "892 phoneme matches"
    },
    {
      id: 5,
      name: "Ensemble Meta-Detector",
      subtitle: "Combined AI Analysis",
      score: 78,
      confidence: "High",
      icon: <FaShieldAlt className="text-2xl" />,
      gradient: "from-cyan-500 to-blue-600",
      description: "Meta-learning approach combining outputs from multiple detection models for enhanced accuracy.",
      metrics: {
        "Model Consensus": 81,
        "Uncertainty Estimation": 75,
        "Feature Fusion": 79,
        "Confidence Calibration": 77
      },
      technicalDetails: "Utilizes ensemble learning techniques to combine predictions from multiple specialized detectors.",
      processingTime: "5.7s",
      dataPoints: "4 model predictions fused"
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 70) return 'from-red-500 to-red-600';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative"
    >
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs with enhanced animations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-400/8 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-400/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-blue-400/6 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-44 h-44 bg-pink-400/6 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Dynamic grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] animate-pulse"></div>
        
        {/* Animated gradient beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Header - Modified: Added pt-8 for potential logo space if it were present */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 pt-8 pb-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Detailed Analysis Report
              </h1>
              <p className="text-slate-400 text-sm">Comprehensive AI Model Breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative min-h-[calc(100vh-theme(spacing.16))]"> 
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">76%</div>
              <div className="text-slate-400">Overall Deepfake Probability</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
              <div className="text-slate-400">AI Models Analyzed</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">17.1s</div>
              <div className="text-slate-400">Total Processing Time</div>
            </div>
          </div>
        </motion.div>

        {/* Model Analysis Cards */}
        <div className="space-y-8">
          {detailedModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-600/30 shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 group"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${model.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {model.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                      <p className="text-slate-400 text-sm">{model.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold mb-1 ${getScoreColor(model.score)}`}>
                      {model.score}%
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full ${
                      model.confidence === 'High' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      model.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {model.confidence} Confidence
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-8 leading-relaxed">{model.description}</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(model.metrics).map(([metric, value], i) => (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                      className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-colors duration-300"
                    >
                      <div className="text-center">
                        <div className={`text-2xl font-bold mb-2 ${getScoreColor(value)}`}>
                          {value}%
                        </div>
                        <div className="text-slate-400 text-xs">{metric}</div>
                      </div>
                      {/* Mini progress bar */}
                      <div className="mt-3 h-1 bg-slate-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ delay: index * 0.1 + i * 0.05 + 0.3, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${getScoreGradient(value)} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Technical Details */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Technical Analysis</h4>
                  <p className="text-slate-300 mb-4 leading-relaxed text-sm">{model.technicalDetails}</p>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Processing Time: <span className="text-cyan-400">{model.processingTime}</span></span>
                    <span>Data Points: <span className="text-cyan-400">{model.dataPoints}</span></span>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`h-1 bg-gradient-to-r ${model.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={onBack}
            className="group bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-slate-500/30 inline-flex items-center gap-3"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Summary
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Result = () => {
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    if (showDetailed) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
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

      {/* Logo with responsive sizing and high z-index */}
      <div className="absolute top-4 left-4 z-50"> 
        <img
          src="/logoGenReal.png"
          alt="GenReal.AI"
          // Responsive height: h-10 on small screens, h-16 on larger screens
          className="h-10 sm:h-16 w-auto object-contain" 
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
                className="text-center mb-8 pt-16 sm:pt-20" 
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
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text ">
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
                        className="group bg-slate-700/20 p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm sm:text-base text-white font-semibold">{model.label}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full bg-slate-700/50 ${getConfidenceColor(model.confidence)}`}>
                              {model.confidence}
                            </span>
                            {/* Removed chevron icons here */}
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

                        {/* Removed expandable details here */}
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
          <DetailedAnalysis onBack={() => setShowDetailed(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;