import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"; // Import MotionPathPlugin

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin); // Register MotionPathPlugin

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
  // Removed endingRef as the section is removed
  // Removed carouselRef as the carousel is removed

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
          z-index: 0; /* Ensure background elements are behind content */
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
          z-index: 0; /* Ensure background elements are behind content */
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

      // Hero section animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power2.out"
        }
      );

      // Spinning logo animation
      gsap.to(logoRef.current, { 
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
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
          end: "bottom 70%",
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
      ctx.revert(); // Revert all GSAP animations created in this context
      // Cleanup floating elements
      floatingElementsRef.current.forEach(el => el.remove());
      particlesRef.current.forEach(el => el.remove());
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

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
    <div ref={sectionRef} className="bg-[#0A0F1F] text-white font-sans relative overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center z-10 px-8 max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-[#00D1FF] to-white bg-clip-text text-transparent">
            GenReal.ai
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-[#C9D1D9] max-w-4xl mx-auto">
            Our mission is to assist in creating a safer, more reliable digital environment where trust isn't compromised. 
            Whether you're moderating user content or safeguarding public communications, we're here to help you lead with confidence.
          </p>
        </div>

        {/* Spinning Logo */}
        <div ref={logoRef} className="absolute top-20 right-20 w-24 h-24 opacity-40 z-0">
          <svg viewBox="0 0 80 80" className="w-full h-full text-[#00D1FF]">
            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M40 10 L50 30 L40 50 L30 30 Z" fill="currentColor" opacity="0.6"/>
            <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="40" cy="40" r="6" fill="currentColor"/>
          </svg>
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
      {/* The ending section with carousel and its associated elements have been removed */}
    </div>
  );
};

export default AboutUsSection;
