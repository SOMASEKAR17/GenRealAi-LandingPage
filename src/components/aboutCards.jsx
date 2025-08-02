import React, { useState, useEffect } from 'react';
import { Shield, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeepfakeDetectionPlatform = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleCard = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const services = [
    {
      icon: Shield,
      title: "Advanced Deepfake Detection",
      bigTitle: "DEEPFAKE DETECTION",
      subtitle: "Protect Your Content with AI-Powered Detection",
      description:
        "Our cutting-edge deepfake detection service identifies manipulated media using state-of-the-art artificial intelligence to safeguard visual and audio content authenticity in real-time.",
      features: [
        "Real-time Video Analysis",
        "99.7% Detection Accuracy",
        "Multiple Format Support",
        "Batch Processing Available",
        "API Integration Ready"
      ],
      buttonLabel: "Try Detection Tool",
      path: "/deepfake-detection",
      bgImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23064e77;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23155e75;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23bg1)'/%3E%3Cg opacity='0.4'%3E%3Ccircle cx='80' cy='80' r='3' fill='%2306b6d4'/%3E%3Ccircle cx='320' cy='60' r='2' fill='%2306b6d4'/%3E%3Ccircle cx='150' cy='180' r='2.5' fill='%2306b6d4'/%3E%3Ccircle cx='280' cy='220' r='2' fill='%2306b6d4'/%3E%3Cpath d='M50 150 Q200 100 350 200' stroke='%2306b6d4' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M100 250 Q250 180 380 240' stroke='%2306b6d4' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/g%3E%3Ctext x='200' y='160' text-anchor='middle' fill='%2306b6d4' font-family='Arial' font-size='24' font-weight='bold' opacity='0.1'%3EDETECT%3C/text%3E%3C/svg%3E"
    },
    {
      icon: FileSearch,
      title: "AI Plagiarism Prevention",
      bigTitle: "PLAGIARISM DETECTION",
      subtitle: "Ensure Academic Integrity with AI Detection",
      description:
        "Comprehensive plagiarism detection tools that identify AI-generated content and copied text with advanced language understanding, tailored for educational institutions and content creators.",
      features: [
        "AI Content Detection",
        "Smart Plagiarism Analysis",
        "Instant Detailed Reports",
        "Multi-language Support",
        "Citation Verification"
      ],
      buttonLabel: "Try Plagiarism Tool",
      path: "/plagiarism-detection",
      bgImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='bg2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23075985;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%234338ca;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23bg2)'/%3E%3Cg opacity='0.3'%3E%3Crect x='60' y='60' width='80' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='60' y='80' width='120' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='60' y='100' width='90' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='220' y='60' width='100' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='220' y='80' width='80' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='220' y='100' width='110' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='60' y='160' width='70' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='60' y='180' width='140' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='220' y='160' width='90' height='4' fill='%2306b6d4' rx='2'/%3E%3Crect x='220' y='180' width='75' height='4' fill='%2306b6d4' rx='2'/%3E%3C/g%3E%3Ctext x='200' y='260' text-anchor='middle' fill='%2306b6d4' font-family='Arial' font-size='20' font-weight='bold' opacity='0.1'%3EVERIFY%3C/text%3E%3C/svg%3E"
    }
  ];

  return (
    <div className="relative min-h-[90vh] py-12 overflow-hidden bg-gradient-to-b from-[#0A0F1F] via-[#050A15] to-[#0A0F1F] transition-colors duration-1000" id="products">
      {/* Header */}
      <div className={`relative z-20 pt-8 pb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block">
              <span className="text-cyan-400">Deepfake Detection</span>
              {' '} & {' '}
              <span className="text-cyan-400">AI Plagiarism Prevention</span>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge AI tools to identify manipulated media and detect AI-generated content — built for trust, transparency, and digital integrity.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFlipped = flippedCards.has(index);

            return (
              <div
                key={index}
                className={`group relative cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  transitionDelay: `${index * 300}ms`,
                  perspective: '1200px',
                  height: '70vh',
                  minHeight: '500px'  
                }}
                onClick={() => toggleCard(index)}
              >
                <div className={`relative w-full h-full transition-transform duration-1000 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front Side - Product Focus */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-700 hover:scale-[1.02] flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      backgroundImage: `url("${service.bgImage}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 text-center px-8">
                      {/* Icon */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-cyan-400/20">
                        <Icon className="w-12 h-12 text-cyan-400" />
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-6 tracking-wide leading-tight">
                        {service.bigTitle}
                      </h2>
                      
                      {/* Subtitle */}
                      <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                        {service.subtitle}
                      </p>
                      
                      {/* Call to action */}
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-cyan-500/20">
                        <p className="text-cyan-300 text-sm font-medium uppercase tracking-widest mb-2">
                          Click to Get Details
                        </p>
                        <div className="flex justify-center">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>

                  {/* Back Side - Detailed Information */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/10 p-8 flex flex-col justify-between overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-slate-900/50 to-blue-500/5" />
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center backdrop-blur-sm border border-cyan-400/20">
                          <Icon className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-cyan-300 font-medium text-sm">{service.subtitle}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-base mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        <h4 className="text-white font-semibold text-lg mb-4">Key Features:</h4>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10">
                      <button
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 text-white font-semibold text-lg hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-300/60 transition-all duration-300 backdrop-blur-sm group/btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the card from flipping back
                          navigate(service.path);
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {service.buttonLabel}
                          <span className="inline-block group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </button>
                      
                      {/* Additional info */}
                      <p className="text-center text-gray-400 text-xs mt-3 font-medium">
                        Free trial available • No credit card required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default DeepfakeDetectionPlatform;