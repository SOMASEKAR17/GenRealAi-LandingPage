import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#0A0F1F] to-cyan-900/20 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Header aligned with content below */}
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-cyan-400 rounded flex items-center justify-center font-raleway">
                  <span className="text-black font-bold text-base">AI</span>
                </div>
                <h1 className="text-3xl font-bold font-raleway">
                  <span className="text-cyan-400">Plagiarism</span> Checker
                </h1>
              </div>

              <div>
                <h2 className="text-5xl md:text-6xl font-bold font-poppins leading-tight mb-6">
                  Detect AI & Human Plagiarism
                  <br />
                   with
                  <br />
                  Unmatched Precision
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed font-poppins">
                  General AI also aids in verifying the authenticity of written
                  materials. So, if you think you're being cheated with an array of
                  cleverly submitted prompts and generated in a minute without
                  much hard work instead of a genuine, well thought out
                  product, this is the place to be.
                </p>
              </div>

              <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold text-lg px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                onClick={() => navigate("/plagiarism")}

              >
                <span>Try it</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right Content - Image */}
            <div className="relative flex justify-center">
              <img
                src="plagiarism-image.png"
                alt="AI Plagiarism Checker Interface"
                className="w-[90%] md:w-[80%] lg:w-[100%] max-w-[600px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
