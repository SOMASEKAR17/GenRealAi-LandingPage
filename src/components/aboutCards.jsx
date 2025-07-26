import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, FileSearch } from 'lucide-react';

const DeepfakeDetectionPlatform = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      icon: UserPlus,
      title: "Get Started with GenReal.ai",
      subtitle: "Sign Up to Try Our Platform Today",
      description:
        "Experience the power of real-time detection and content integrity tools built for the next generation of digital trust. Sign up to get started with a free trial.",
      features: ["Free Trial Access", "API & Dashboard", "Easy Onboarding"],
      buttonLabel: "Sign Up",
    },
    {
      icon: Shield,
      title: "Advanced Deepfake Detection",
      subtitle: "Protect Your Content with Our Detection Technologies",
      description:
        "Our deepfake detection service identifies manipulated media using state-of-the-art AI to safeguard visual and audio content authenticity.",
      features: ["Real-time Analysis", "99.7% Accuracy", "Multiple Format Support"],
      buttonLabel: "Try It Out",
    },
    {
      icon: FileSearch,
      title: "AI Plagiarism Prevention",
      subtitle: "Ensure Academic Integrity with AI Detection",
      description:
        "Robust tools that detect AI-generated or plagiarized content with deep language understanding. Tailored for educational and editorial use cases.",
      features: ["Smart Detection", "Instant Reports", "Multi-language Support"],
      buttonLabel: "Explore Tool",
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0A0F1F] via-[#050A15] to-[#0A0F1F] transition-colors duration-1000">

      {/* Mouse Follower */}
      <div 
        className="fixed w-5 h-5 bg-cyan-300/60 rounded-full blur-md pointer-events-none transition-all duration-300 z-10"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Header */}
      <div className={`relative z-20 pt-16 pb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="block">
              <span className="text-cyan-400">Deepfake Detection</span>
              {' '}&{' '}
              <span className="text-cyan-400">AI Plagiarism Prevention</span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge tools to identify manipulated media and AI-generated text — built for trust, transparency, and digital integrity.
          </p>
        </div>
      </div>



      {/* Services Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-slate-800/50 backdrop-blur-lg border transition-all duration-500 cursor-pointer hover:scale-105 flex flex-col justify-between min-h-[500px] ${
                  isActive 
                    ? 'border-cyan-400/50 shadow-2xl shadow-cyan-500/20' 
                    : 'border-slate-700/50 hover:border-cyan-500/30'
                } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Background hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <h4 className="text-cyan-300 font-medium mb-4">{service.subtitle}</h4>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Push button to bottom */}
                  <div className="mt-auto">
                    <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 text-cyan-300 font-medium hover:from-cyan-500/30 hover:to-cyan-600/30 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                      {service.buttonLabel}
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetectionPlatform;
