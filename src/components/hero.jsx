import React, { useState, useEffect, useRef } from 'react';
import FaceModel from './faceModel.jsx';
import { gsap } from 'gsap';


const HeroSection = ({ Loaded }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
   const statsRef = useRef(null);

  useEffect(() => {
    // GSAP animation: slide up and fade in
    if (statsRef.current && Loaded) {
      gsap.fromTo(
        statsRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0 }
      );
    }
  }, [Loaded]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="relative h-screen bg-transparent text-white overflow-hidden" id="home">
      
      {/* 3D Background */}
     <div className='absolute w-full h-full top-0 left-0 z-0'> 
      <FaceModel url="https://prod.spline.design/HhKp39RX8LdjN5FK/scene.splinecode" />
     </div>

      {/* Navbar */}
      <nav className={`w-full transition-all pointer-events-none duration-300 bg-transparent backdrop-blur-sm fixed top-0 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <img src="/logoGenReal.png" alt="GenReal AI" className="h-[15vw] md:h-[10vw] w-[15vw] md:w-[10vw] lg:h-[4vw] lg:w-[4vw]" />
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex text-lg gap-8 font-light">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </div>

        {isMobileMenuOpen && (
          <ul className="md:hidden px-6 pb-4 space-y-2 bg-transparent">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        )}
      </nav>

      {/* Hero Content */}
      <div className="absolute h-[70vh] inset-0 flex pointer-events-none flex-col items-center justify-center text-center z-10 bg-transparent bg-opacity-50">
        <h1 className="text-[10vw] leading-[9vw] md:text-[5vw] lg:leading-[5vw] font-bold">
          Welcome to<br />
          <span className="bg-gradient-to-r from-[#6EE5F5] via-[#29A3B3] to-[#1397A9] bg-clip-text text-transparent">
            GenReal
          </span>.AI
        </h1>
        <p className="mt-4 text-lg text-gray-300">Discover the new age of security</p>
        <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition">
          Get Started →
        </button>
      </div>

      {/* Statistics Section */}
      <div ref={statsRef} className="absolute opacity-0 w-full h-[30vh] pointer-events-none bottom-0 z-10 flex flex-col md:flex-row bg-gradient-to-b from-transparent from-0% to-50% to-gray-700 justify-around items-center px-8 pt-12 pb-[50vw] md:py-10 space-y-10 md:space-y-0">
        <div className="text-center">
          <h2 className="text-cyan-400 text-4xl font-bold">80%</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-xs">of companies lack protocols to handle deepfake attacks</p>
        </div>
        <div className="text-center">
          <h2 className="text-cyan-400 text-4xl font-bold">60%</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-xs">of people encountered a deepfake video in the past year</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
