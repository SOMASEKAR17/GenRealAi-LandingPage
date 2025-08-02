import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, HelpCircle, Video, FileCheck, Shield, Users, Target } from 'lucide-react';

const DynamicFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const itemsRef = useRef([]);
  const contentRef = useRef(null);

  // New FAQ data focused on Video & Plagiarism detection products
  const faqData = [
    {
      id: 1,
      number: "01",
      title: "WHAT DO YOUR PRODUCTS DO?",
      subtitle: "An overview of our core services",
      icon: HelpCircle,
      content: {
        description: "We provide two primary AI-powered services: state-of-the-art Deepfake Video Detection to identify manipulated video content, and a next-generation AI Plagiarism Detector that spots both copied text and AI-written content.",
        keyPoints: ["Detects manipulated videos", "Identifies AI-generated text", "Ensures content authenticity", "For creators, educators, and businesses"],
        color: "from-cyan-500 to-blue-400",
      }
    },
    {
      id: 2,
      number: "02",
      title: "HOW DOES VIDEO DETECTION WORK?",
      subtitle: "The tech behind our video analysis",
      icon: Video,
      content: {
        description: "Our system analyzes videos frame-by-frame, using advanced computer vision models to detect subtle artifacts, unnatural facial movements, and other inconsistencies that are hallmarks of deepfakes.",
        keyPoints: ["Frame-by-Frame Analysis", "Facial Landmark Tracking", "Inconsistency Detection", "Real-time & file-based scanning"],
        color: "from-emerald-500 to-teal-400",
      }
    },
    {
      id: 3,
      number: "03",
      title: "WHAT MAKES YOUR PLAGIARISM CHECKER DIFFERENT?",
      subtitle: "Beyond traditional plagiarism checks",
      icon: FileCheck,
      content: {
        description: "Unlike traditional tools that only check for copied text, our AI detector analyzes writing style, sentence structure, and linguistic patterns to accurately determine if content was written by an AI like GPT-4, not just copied.",
        keyPoints: ["Detects AI-written content", "Traditional copy-paste checking", "Provides detailed source reports", "Ideal for academic integrity"],
        color: "from-purple-500 to-pink-400",
      }
    },
    {
      id: 4,
      number: "04",
      title: "HOW ACCURATE ARE THE MODELS?",
      subtitle: "Reliability and performance metrics",
      icon: Target,
      content: {
        description: "Our models are continuously trained on massive datasets, achieving industry-leading accuracy. For our video detection, we report a 99.7% success rate in identifying known manipulation techniques. The AI text detector is benchmarked against the latest language models.",
        keyPoints: ["99.7% video detection accuracy", "Constantly updated models", "Low false-positive rate", "Transparent performance reports"],
        color: "from-orange-500 to-red-400",
      }
    },
    {
      id: 5,
      number: "05",
      title: "IS MY UPLOADED DATA SECURE?",
      subtitle: "Our commitment to data privacy",
      icon: Shield,
      content: {
        description: "Absolutely. We prioritize your privacy and data security. All uploaded files are encrypted, processed in a secure environment, and are never used for training our models. Data is automatically deleted from our servers after 24 hours.",
        keyPoints: ["End-to-end encryption", "Secure, isolated processing", "No data used for training", "24-hour data deletion policy"],
        color: "from-rose-500 to-fuchsia-400",
      }
    }
  ];


  useEffect(() => {
    // GSAP is a robust animation library. This setup loads it from a CDN.
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      initAnimations();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initAnimations = () => {
    if (typeof gsap === 'undefined') return;

    gsap.fromTo(leftPanelRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(rightPanelRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(itemsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.5 }
    );
  };

  const handleItemClick = (index) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);

    if (typeof gsap !== 'undefined') {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(index);
          gsap.fromTo(contentRef.current,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: 0.1,
              onComplete: () => setIsAnimating(false)
            }
          );
        }
      });

      gsap.to(itemsRef.current[index], {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    } else {
      setActiveIndex(index);
      setIsAnimating(false);
    }
  };

  const currentItem = faqData[activeIndex];

  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/binary-code.png)' }}
        ></div>
        <div className="scanline"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - FAQ List */}
        <div ref={leftPanelRef} className="w-2/5 p-8 border-r border-cyan-500/30 bg-black/30 backdrop-blur-sm">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-cyan-400 mb-2">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <div className="text-cyan-300/60 font-mono text-sm">
              &gt; Query the Knowledge Base
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  ref={el => itemsRef.current[index] = el}
                  onClick={() => handleItemClick(index)}
                  className={`
                    group cursor-pointer p-6 rounded-lg border transition-all duration-300
                    ${isActive
                      ? 'bg-cyan-900/50 border-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-900/30 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-gray-700/50 text-gray-400 group-hover:bg-cyan-400/10 group-hover:text-cyan-400'}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        font-bold text-lg truncate transition-colors duration-300
                        ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                      `}>
                        {item.title}
                      </h3>

                      <p className={`
                        text-sm truncate transition-colors duration-300
                        ${isActive ? 'text-cyan-200' : 'text-gray-500 group-hover:text-gray-400'}
                      `}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Dynamic Content */}
        <div ref={rightPanelRef} className="flex-1 p-8 bg-black/10">
          <div ref={contentRef} className="h-full">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentItem.content.color} flex items-center justify-center`}>
                  <currentItem.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    {currentItem.title}
                  </h2>
                  <span className="text-cyan-400 font-mono text-sm">
                    {currentItem.subtitle}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-cyan-400 font-bold mb-4 text-lg uppercase tracking-wider">Answer</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {currentItem.content.description}
                </p>
              </div>

              <div>
                <h3 className="text-cyan-400 font-bold mb-4 text-lg uppercase tracking-wider">Key Points</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentItem.content.keyPoints.map((point, index) => (
                    <div key={index} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white font-medium">{point}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button className={`
                  px-8 py-3 rounded-lg font-bold text-white transition-all duration-300
                  bg-gradient-to-r ${currentItem.content.color}
                  hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transform
                `}>
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(to bottom, rgba(0, 255, 255, 0), rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0));
          animation: scan 6s linear infinite;
          opacity: 0.6;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default DynamicFAQ;