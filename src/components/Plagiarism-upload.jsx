import React, { useState } from 'react';
// import { FileText, CheckCircle, AlertCircle } from 'lucide-react'; // Lucide icons are not directly used in the current display logic but kept if you plan to use them.
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function AIPlagiarismChecker() {
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Function to handle the main button's action (Check or Go Home)
  const handleMainButtonAction = () => {
    if (hasResults) {
      navigate('/'); // Go to home if results are shown
    } else {
      handleCheckPlagiarism(); // Check plagiarism if no results
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
  {/* Animated Background */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating Orbs */}
    <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
    <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-purple-400/8 rounded-full blur-xl animate-pulse delay-500"></div>

    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"></div>

    {/* Gradient Lines */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-blue-500/30 to-transparent animate-pulse delay-1000"></div>
  </div>

  {/* Main Content */}
  <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
    <div className="relative z-10 w-full max-w-6xl">
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-600/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-6 text-slate-400 hover:text-white text-2xl font-bold z-50 cursor-pointer transition-colors duration-200"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logoGenReal.png" alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              AI <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Plagiarism</span> Checker
            </h1>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Detect AI & Human Plagiarism with Unmatched Precision. Built for educators, writers, and institutions.
          </p>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col md:flex-row min-h-[500px] h-full">
          {/* Left Side - Input */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-700/50">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Enter Your Text</h2>
                <div className="text-sm text-slate-400">{textInput.length}/5000</div>
              </div>

              <div className="flex-1 mb-4 relative">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your text here..."
                  className="w-full h-full min-h-[200px] bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-xl p-4 text-white placeholder-slate-400 outline-none resize-none text-base md:text-sm leading-relaxed focus:border-cyan-400/60 transition-all duration-300 focus:bg-slate-700/40"
                  maxLength={5000}
                />
                {!textInput.trim() && !isChecking && !hasResults && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6">
                      <img src="/paste.svg" alt="Paste Icon" className="w-16 h-16 opacity-50" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleMainButtonAction}
                  disabled={!textInput.trim() && !hasResults || isChecking}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                >
                  {isChecking ? 'Checking...' : hasResults ? 'Go to Home' : 'Check for Plagiarism'}
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
          <div className="w-full md:w-1/2 p-4 sm:p-6">
            <div className="h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4">
                {hasResults ? 'Results' : 'Get Started'}
              </h2>

              {!textInput.trim() && !isChecking && !hasResults && (
                <div className="flex flex-col items-start justify-start h-full px-4 pt-2 text-slate-400 space-y-6 text-sm leading-relaxed">
                  <p><span className="text-white font-semibold">Step 1:</span> Paste any paragraph or essay.</p>
                  <p><span className="text-white font-semibold">Step 2:</span> Click <span className="text-cyan-400 font-semibold">Check for Plagiarism</span>.</p>
                  <p><span className="text-white font-semibold">Step 3:</span> View AI or human-generated results.</p>
                  <p><span className="text-white font-semibold">Tip:</span> Use insights to improve content quality!</p>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Plagiarism Result */}
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-600" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray={`${75 * 1.76} ${176 - 75 * 1.76}`} className="text-red-500" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">75%</span>
                        </div>
                      </div>
                      <p className="text-red-400 font-semibold text-sm">Plagiarism Found</p>
                    </div>

                    {/* Unique Result */}
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-600" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray={`${25 * 1.76} ${176 - 25 * 1.76}`} className="text-green-500" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">25%</span>
                        </div>
                      </div>
                      <p className="text-green-400 font-semibold text-sm">Unique Text</p>
                    </div>
                  </div>

                  {/* Analysis Bars */}
                  <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-4">Detailed Analysis</h3>

                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Exact Match</span>
                        <span className="text-white">5%</span>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-400">Paraphrased Content</span>
                          <span className="text-white">70%</span>
                        </div>
                        <div className="w-full bg-slate-600/50 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-400">Unique Content</span>
                          <span className="text-white">25%</span>
                        </div>
                        <div className="w-full bg-slate-600/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-600/50 text-xs text-slate-400">
                      Plagiarism Sources: {Math.floor(Math.random() * 15) + 5} sources found
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