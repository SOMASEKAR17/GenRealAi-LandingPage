import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"; 

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin); 

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const deepfakeRef = useRef(null);
  const plagiarismRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const particlesRef = useRef([]);
  const leftMotionRef = useRef(null);
  const rightMotionRef = useRef(null);

  useEffect(() => {
    // Create floating background elements
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
      // Continuously moving background particles
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

      // Floating elements animation
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

      // Hero section animation with stagger effect
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

      gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'), 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.8,
          ease: "power2.out",
          delay: 0.8
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

      // Spinning logo animation with pulsing effect
      gsap.to(logoRef.current, { 
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

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
          { x: 0, opacity: 1, scale: 1 })
        .fromTo(deepfakeRef.current.querySelector('.icon-wrapper'),
          { rotation: -180, scale: 0 },
          { rotation: 0, scale: 1 }, "-=0.5");

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
          { x: 0, opacity: 1, scale: 1 })
        .fromTo(plagiarismRef.current.querySelector('.wave-bg'),
          { scaleX: 0, transformOrigin: "right center" },
          { scaleX: 1 }, "-=0.7");

      // MotionPath animations for left and right sides
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
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 via-transparent to-[#1E40AF]/5 animate-pulse"></div>
        
        {/* Main content container */}
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Main content */}
            <div className="space-y-8">
              <div className="grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
                <h1 className="text-7xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-[#FFFFFF] via-[#00D1FF] to-[#FFFFFF] bg-clip-text text-transparent leading-tight whitespace-nowrap">
                  GenReal.ai
                </h1>
              </div>

              <div className="hero-subtitle">
                <h2 className="text-2xl lg:text-4xl font-bold text-[#00D1FF] mb-6 tracking-wide">
                  Building Digital Trust
                </h2>
              </div>
              
              <div className="hero-description">
                <div className="bg-gradient-to-r from-[#00D1FF]/10 to-transparent p-8 rounded-2xl border border-[#00D1FF]/20 backdrop-blur-sm">
                  <p className="text-xl lg:text-2xl leading-relaxed text-[#E6F3FF] font-medium">
                    Our mission is to assist in creating a 
                    <span className="text-[#00D1FF] font-bold"> safer, more reliable digital environment</span> 
                    where trust isn't compromised. Whether you're moderating user content or safeguarding public communications, 
                    <span className="text-[#60A5FA] font-bold"> we're here to help you lead with confidence.</span>
                  </p>
                </div>
                
                {/* Call to action */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <button className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] text-black font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all duration-300 transform hover:scale-105">
                    Explore Solutions
                  </button>
                  <button className="border-2 border-[#00D1FF] text-[#00D1FF] font-bold px-8 py-4 rounded-full hover:bg-[#00D1FF]/10 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right side - Visual element */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-96 h-96">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#00D1FF]/30 animate-spin"></div>
                <div className="absolute inset-8 rounded-full border border-[#00D1FF]/50 animate-pulse"></div>
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#00D1FF]/20 to-[#1E40AF]/20 backdrop-blur-sm"></div>
                
                {/* Center logo */}
                <div className="absolute inset-24 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#00D1FF] to-[#0099CC] rounded-full flex items-center justify-center shadow-2xl shadow-[#00D1FF]/40">
                    <svg viewBox="0 0 64 64" className="w-16 h-16 text-white">
                      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="3"/>
                      <circle cx="32" cy="32" r="8" fill="currentColor"/>
                      <path d="M32 8 L36 20 L32 32 L28 20 Z" fill="currentColor" opacity="0.8"/>
                      <path d="M56 32 L44 36 L32 32 L44 28 Z" fill="currentColor" opacity="0.8"/>
                      <path d="M32 56 L28 44 L32 32 L36 44 Z" fill="currentColor" opacity="0.8"/>
                      <path d="M8 32 L20 28 L32 32 L20 36 Z" fill="currentColor" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
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