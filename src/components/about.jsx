import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const deepfakeRef = useRef(null);
  const plagiarismRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const particlesRef = useRef([]);
  const leftMotionRef = useRef(null);
  const rightMotionRef = useRef(null);

  useEffect(() => {
    const createFloatingElements = () => {
      for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: #00D1FF;
          border-radius: 50%;
          opacity: ${Math.random() * 0.5 + 0.1};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          z-index: 0;
        `;
        sectionRef.current.appendChild(element);
        floatingElementsRef.current.push(element);
      }
    };

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 1px;
          height: 1px;
          background: #00D1FF;
          opacity: ${Math.random() * 0.3 + 0.1};
          left: ${Math.random() * 100}%;
          top: 100%;
          pointer-events: none;
          z-index: 0;
        `;
        sectionRef.current.appendChild(particle);
        particlesRef.current.push(particle);
      }
    };

    createFloatingElements();
    createParticles();

    const ctx = gsap.context(() => {
      particlesRef.current.forEach((particle) => {
        gsap.to(particle, {
          y: -window.innerHeight - 100,
          duration: Math.random() * 10 + 8,
          repeat: -1,
          delay: Math.random() * 5,
          ease: "none"
        });
        
        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 8 + 6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      });

      floatingElementsRef.current.forEach((element) => {
        gsap.to(element, {
          y: Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        });
      });

      // Hero section animations
      gsap.fromTo(heroRef.current.querySelector('.hero-title'),
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          delay: 0.3
        }
      );

      gsap.fromTo(heroRef.current.querySelector('.hero-description'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: 1.2
        }
      );

      // Deepfake section - slide in from left with morphing effect
      const deepfakeTl = gsap.timeline({
        scrollTrigger: {
          trigger: deepfakeRef.current,
          start: "top 90%",
          end: "bottom 70%",
          scrub: 1.3,
        }
      });
      
      deepfakeTl
        .fromTo(deepfakeRef.current.querySelector('.content-wrapper'),
          { x: -200, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1 });

      // Plagiarism section - slide in from right with wave effect
      const plagiarismTl = gsap.timeline({
        scrollTrigger: {
          trigger: plagiarismRef.current,
          start: "top 90%",
          end: "bottom 90%",
          scrub: 1.5,
        }
      });
      
      plagiarismTl
        .fromTo(plagiarismRef.current.querySelector('.content-wrapper'),
          { x: 200, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1 });

      if (leftMotionRef.current) {
        gsap.to(leftMotionRef.current, {
          motionPath: {
            path: [{x: 0, y: 0}, {x: -100, y: -200}, {x: 50, y: -400}, {x: -50, y: -600}, {x: 0, y: -800}],
            curviness: 2,
            autoRotate: true,
          },
          duration: 15,
          repeat: -1,
          ease: "none"
        });
      }

      if (rightMotionRef.current) {
        gsap.to(rightMotionRef.current, {
          motionPath: {
            path: [{x: 0, y: 0}, {x: 100, y: -150}, {x: -30, y: -350}, {x: 80, y: -550}, {x: 0, y: -750}],
            curviness: 2,
            autoRotate: true,
          },
          duration: 12,
          repeat: -1,
          ease: "none",
          delay: 2
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      floatingElementsRef.current.forEach(el => el.remove());
      particlesRef.current.forEach(el => el.remove());
    };
  }, []);

  const DetectionIcon = () => (
    <div className="icon-wrapper w-24 h-24 mx-auto mb-6 relative">
      <svg viewBox="0 0 64 64" className="w-full h-full text-[#00D1FF]">
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
        <path d="M32 4 L36 12 L32 20 L28 12 Z" fill="currentColor" opacity="0.8"/>
        <path d="M60 32 L52 36 L44 32 L52 28 Z" fill="currentColor" opacity="0.8"/>
        <path d="M32 60 L28 52 L32 44 L36 52 Z" fill="currentColor" opacity="0.8"/>
        <path d="M4 32 L12 28 L20 32 L12 36 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    </div>
  );

  const PlagiarismIcon = () => (
    <div className="icon-wrapper w-24 h-24 mx-auto mb-6">
      <svg viewBox="0 0 64 64" className="w-full h-full text-[#00D1FF]">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <rect x="12" y="12" width="40" height="40" rx="4" fill="currentColor" opacity="0.1"/>
        <line x1="18" y1="22" x2="46" y2="22" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="2"/>
        <line x1="18" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="14" r="10" fill="currentColor"/>
        <path d="M45 14 L48 17 L55 10" stroke="#0A0F1F" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-black to-[#0F1419] text-white font-sans relative overflow-hidden" id="about">
      {/* Hero Section - Redesigned */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10 pt-24">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 via-transparent to-[#1E40AF]/5 animate-pulse"></div>
        
        {/* Main content container */}
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Main content */}
            <div className="space-y-6">
              <h1 className="hero-title text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
                Building a <br /> Safer Digital World
              </h1>
              
              <div className="hero-description">
                <p className="text-lg lg:text-xl leading-relaxed text-[#E6F3FF] font-medium">
                  At GenReal.ai, our mission is to empower you with the tools to **trust the content you see**. We provide advanced AI solutions for deepfake detection and plagiarism prevention, creating a **safer, more reliable digital environment** for everyone.
                </p>
              </div>
              
              {/* Call to action buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] text-black font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all duration-300 transform hover:scale-105">
                  Explore Solutions
                </button>
                <button className="border-2 border-[#00D1FF] text-[#00D1FF] font-bold px-8 py-4 rounded-full hover:bg-[#00D1FF]/10 transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
            
            {/* Right side - Video placeholder */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xl h-[320px] sm:h-[400px] md:h-[480px] bg-gray-900 rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gray-900/80 backdrop-blur-sm">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">How It Works: Watch the Demo</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-6">See how easy it is to upload your content and get instant results.</p>
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Play Video
                    </button>
                  </div>
                  {/* Optional: Add a subtle overlay for visual flair */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Deepfake Detection Section - Diagonal Layout */}
      <section ref={deepfakeRef} className="min-h-screen flex items-center py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-transparent transform -skew-y-3"></div>
        
        {/* Left side motion path element */}
        <div ref={leftMotionRef} className="absolute left-10 top-1/2 w-8 h-8 bg-[#00D1FF] rounded-full opacity-60 shadow-lg shadow-[#00D1FF]/50 z-20"></div>
        
        <div className="content-wrapper max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center z-10">
          <div>
            <DetectionIcon />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#00D1FF] to-white bg-clip-text text-transparent">
              Deepfake Detection
            </h2>
            <p className="text-lg md:text-xl text-[#C9D1D9] leading-relaxed mb-8">
              Advanced AI-powered detection of manipulated visual and audio content. Our cutting-edge deep learning models 
              identify deepfakes with unprecedented accuracy, protecting your platform from synthetic media threats in real-time.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                Real-time API
              </span>
              <span className="bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                99.7% Accuracy
              </span>
              <span className="bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                Batch Processing
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/30 to-transparent rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-[#1E2A38] to-[#2A3441] rounded-full border border-[#00D1FF]/40"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-[#00D1FF]/10 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Plagiarism Detection Section - Wave Design */}
      <section ref={plagiarismRef} className="min-h-screen flex items-center py-20 relative z-10">
        <div className="wave-bg absolute inset-0 bg-gradient-to-l from-[#00D1FF]/5 to-transparent transform skew-y-3"></div>
        
        {/* Right side motion path element */}
        <div ref={rightMotionRef} className="absolute right-10 top-1/2 w-6 h-6 bg-gradient-to-r from-[#00D1FF] to-[#00A8CC] rounded-full opacity-70 shadow-lg shadow-[#00D1FF]/50 z-20"></div>
        
        <div className="content-wrapper max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center z-10">
          <div className="relative order-2 md:order-1">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#00D1FF]/30 to-transparent rounded-lg rotate-12"></div>
              <div className="absolute inset-4 bg-gradient-to-bl from-[#1E2A38] to-[#2A3441] rounded-lg border border-[#00D1FF]/40 rotate-6"></div>
              <div className="absolute inset-8 bg-gradient-to-bl from-[#00D1FF]/10 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <PlagiarismIcon />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-l from-[#00D1FF] to-white bg-clip-text text-transparent">
              Plagiarism Detection
            </h2>
            <p className="text-lg md:text-xl text-[#C9D1D9] leading-relaxed mb-8">
              Comprehensive content verification and originality checking across multiple formats. Our intelligent system 
              detects copied content, paraphrasing, and ensures academic and professional integrity with lightning-fast analysis.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gradient-to-l from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                Multi-format Support
              </span>
              <span className="bg-gradient-to-l from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                Instant Results
              </span>
              <span className="bg-gradient-to-l from-[#00D1FF]/20 to-[#00D1FF]/10 px-6 py-3 rounded-full border border-[#00D1FF]/30 text-[#00D1FF] font-semibold">
                Academic Focus
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;