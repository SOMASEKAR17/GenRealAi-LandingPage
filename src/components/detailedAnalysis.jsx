import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const modelResults = [
  {
    label: "Model A",
    value: 82,
    details: "Model A predicted with high confidence that the content is AI-generated.",
  },
  {
    label: "Model B",
    value: 65,
    details: "Model B found some inconsistencies typical in deepfakes.",
  },
  {
    label: "Model C",
    value: 76,
    details: "Model C detected signs of synthetic voice generation.",
  },
];

export default function DetailedAnalysis() {
  const [expandedModel, setExpandedModel] = useState(null);

  const toggleModel = (index) => {
    setExpandedModel(expandedModel === index ? null : index);
  };

  return (
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
        className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl border border-cyan-400/30 mb-8"
      >
        <div className="w-full md:w-1/3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 bg-slate-700/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-3xl font-bold mb-4 border border-cyan-400/30 shadow-xl">
            76
            <span className="text-xs font-medium text-slate-300 mt-1">
              out of 100
            </span>
          </div>
        </div>
        <div className="w-full md:w-2/3 bg-slate-800/80 backdrop-blur-sm p-6">
          <h4 className="text-xl font-bold text-white mb-2">Mostly a Deepfake</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </motion.div>

      {/* Detailed Model Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Detailed Model Analysis
        </h2>

        <div className="space-y-4">
          {modelResults.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className={`bg-slate-800/80 backdrop-blur-sm rounded-xl border ${
                index === 2 ? "border-cyan-400/50" : "border-slate-600/50"
              } overflow-hidden shadow-lg`}
            >
              <div
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => toggleModel(index)}
              >
                <h3 className="text-lg font-semibold text-white">
                  {model.label}
                </h3>
                <motion.div
                  animate={{ rotate: expandedModel === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="text-slate-400" />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {expandedModel === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-slate-600/50">
                      <div className="pt-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {model.details}
                        </p>
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-slate-400">
                              Confidence Score:
                            </span>
                            <span className="text-sm font-semibold text-cyan-400">
                              {model.value}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${model.value}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
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
          onClick={() => (window.location.href = "/")}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}
