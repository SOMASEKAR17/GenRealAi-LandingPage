import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function AIPlagiarismChecker() {
  const [textInput, setTextInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleCheckPlagiarism = () => {
    if (!textInput.trim()) return;

    setIsChecking(true);
    // Simulate API call or processing time
    setTimeout(() => {
      setIsChecking(false);
      setHasResults(true);
    }, 3000);
  };

  const handleReset = () => {
    setTextInput('');
    setHasResults(false);
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
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

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-6 py-12">
        <div className="relative z-10 w-full max-w-5xl">
          {/* Main Card Container */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-600/30 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img
                  src="/logoGenReal.png" 
                  alt="AI Plagiarism Checker Logo"
                  className="w-10 h-10 object-contain" 
                />
                <h1 className="text-3xl font-bold text-white">
                  AI <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Plagiarism</span> Checker
                </h1>
              </div>
              <p className="text-slate-300 text-sm mx-auto max-w-2xl">
                Detect AI & Human Plagiarism with Unmatched Precision. Built for
                educators, writers, and institutions—get accurate, fast, and
                transparent results in one click.
              </p>
            </div>

            {/* Main Content */}
            <div className="flex h-[500px]">
              {/* Left Side - Text Input */}
              <div className="w-1/2 p-6 border-r border-slate-700/50">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Enter Your Text</h2>
                    <div className="text-sm text-slate-400">
                      {textInput.length}/5000
                    </div>
                  </div>

                  <div className="flex-1 mb-4">
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Paste your text here to check for plagiarism. For years I have been driving on an old car with a tiny steering wheel that I have to manoeuvre to get to go, and I need help..."
                      className="w-full h-full bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-xl p-4 text-white placeholder-slate-400 outline-none resize-none text-sm leading-relaxed focus:border-cyan-400/60 transition-all duration-300 focus:bg-slate-700/40"
                      maxLength={5000}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCheckPlagiarism}
                      disabled={!textInput.trim() || isChecking}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                    >
                      {isChecking ? 'Checking...' : 'Check for Plagiarism'}
                    </button>

                    {(hasResults || textInput) && (
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm text-white rounded-xl font-medium transition-all duration-300"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="w-1/2 p-6">
                <div className="h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-white mb-4">Plagiarism Results</h2>

                  {!textInput.trim() && !isChecking && !hasResults && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg mb-2">Ready to Check</p>
                        <p className="text-slate-500 text-sm">Enter text on the left to get started</p>
                      </div>
                    </div>
                  )}

                  {isChecking && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                        <p className="text-cyan-400 text-lg mb-2">Analyzing Text...</p>
                        <p className="text-slate-400 text-sm">Checking for plagiarism and AI content</p>
                      </div>
                    </div>
                  )}

                  {hasResults && !isChecking && (
                    <div className="flex-1 overflow-y-auto">
                      {/* Sample Text Display */}
                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-xl p-4 mb-6">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {textInput.substring(0, 200)}...
                        </p>
                      </div>

                      {/* Results Circles */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="relative w-16 h-16 mx-auto mb-2">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="none"
                                className="text-slate-600"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${75 * 1.76} ${176 - 75 * 1.76}`}
                                className="text-red-500"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-lg font-bold">75%</span>
                            </div>
                          </div>
                          <p className="text-red-400 font-semibold text-sm">Plagiarism</p>
                          <p className="text-red-400 font-semibold text-sm">Found</p>
                        </div>

                        <div className="text-center">
                          <div className="relative w-16 h-16 mx-auto mb-2">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="none"
                                className="text-slate-600"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${25 * 1.76} ${176 - 25 * 1.76}`}
                                className="text-green-500"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-lg font-bold">25%</span>
                            </div>
                          </div>
                          <p className="text-green-400 font-semibold text-sm">Unique</p>
                          <p className="text-green-400 font-semibold text-sm">Text</p>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-4">Detailed Analysis</h3>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Exact Match</span>
                            <span className="text-white">5%</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Paraphrased Content</span>
                              <span className="text-white">70%</span>
                            </div>
                            <div className="w-full bg-slate-600/50 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Unique Content</span>
                              <span className="text-white">25%</span>
                            </div>
                            <div className="w-full bg-slate-600/50 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-600/50">
                          <p className="text-xs text-slate-400">
                            Plagiarism Sources: {Math.floor(Math.random() * 15) + 5} sources found
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}