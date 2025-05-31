import React from "react";

const aboutCards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr  from-black to-cyan-950 text-white flex flex-col items-center justify-center px-4 " id="features">
      {/* Mobile Layout */}
      <div className="w-full max-w-6xl flex flex-col md:hidden gap-6">
        
        
        {/* Title and Subtitle */}
        <div className="text-center md:hidden mt-6 px-4">
          <h1 className="text-2xl font-bold tracking-wide">
            Real-Time Deepfake Detection
          </h1>
          <p className="text-sm mt-2 text-gray-300">
            Instantly analyze videos and images to identify AI-generated manipulations.
          </p>
        </div>
      

        {/* Boxes */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-cyan-700/80 p-4 rounded-md shadow-lg relative">
              <p className="text-sm">
                Our platform provides explainable outputs—heatmaps, confidence
                scores, and tampering traces—so teams don't just get a yes or no,
                but a complete picture of how and where the media was altered.
                This level of transparency is vital for legal, regulatory, and
                high-stakes decision-making.
              </p>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-cyan-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {num}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Title and Subtitle */}
        <div className="text-center hidden md:block mt-6 px-4">
          <h1 className="text-2xl font-bold tracking-wide">
            Real-Time Deepfake Detection
          </h1>
          <p className="text-sm mt-2 text-gray-300">
            Instantly analyze videos and images to identify AI-generated manipulations.
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="relative w-full max-w-6xl hidden md:flex flex-col items-center">
        {/* Boxes */}
        <div className="absolute top-[12vw] left-[9vw] lg:left-[7vw] transform -translate-x-1/3 -translate-y-1/3">
          <div className="bg-cyan-700/80 p-4 rounded-md w-64 shadow-lg">
            <p className="text-sm">
              Our platform provides explainable outputs—heatmaps, confidence
              scores, and tampering traces—so teams don't just get a yes or no,
              but a complete picture of how and where the media was altered.
              This level of transparency is vital for legal, regulatory, and
              high-stakes decision-making.
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <div className="bg-cyan-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              1
            </div>
          </div>
        </div>

        <div className="absolute top-[12vw] right-[9vw] lg:right-[7vw] transform translate-x-1/3 -translate-y-1/3">
          <div className="bg-cyan-700/80 p-4 rounded-md w-64 shadow-lg">
            <p className="text-sm">
              Our platform provides explainable outputs—heatmaps, confidence
              scores, and tampering traces—so teams don't just get a yes or no,
              but a complete picture of how and where the media was altered.
              This level of transparency is vital for legal, regulatory, and
              high-stakes decision-making.
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <div className="bg-cyan-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              3
            </div>
          </div>
        </div>

        <div className="absolute top-[10vw] left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="bg-cyan-600/80 p-4 rounded-md w-64 shadow-lg">
            <p className="text-sm">
              Our platform provides explainable outputs—heatmaps, confidence
              scores, and tampering traces—so teams don't just get a yes or no,
              but a complete picture of how and where the media was altered.
              This level of transparency is vital for legal, regulatory, and
              high-stakes decision-making.
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <div className="bg-cyan-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              2
            </div>
          </div>
        </div>

        {/* Head image */}
        <div className="z-10 pt-55 pb-20">
          <img
            src="/face.png"
            alt="Wireframe head"
            className="w-[10vw] md:w-[17vw]"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center absolute -bottom-[4vw]">
          <h1 className="text-4xl font-bold tracking-wide">
            Real-Time Deepfake Detection
          </h1>
          <p className="text-lg mt-2 text-gray-300">
            Instantly analyze videos and images to identify AI-generated manipulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default aboutCards;