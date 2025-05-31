import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Handle scroll direction for hiding navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setIsMobileMenuOpen(false)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="min-h-screen bg-black text-white relative" id="home">
      {/* Navbar */}
      <nav className={`w-full transition-all duration-300 bg-transparent backdrop-blur-sm fixed top-0 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logoGenReal.png" alt="GenReal AI" className="h-[15vw] md:h-[10vw] w-[15vw] md:w-[10vw] lg:h-[4vw] lg:w-[4vw]" />
          </div>
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
          <ul className="hidden md:flex text-lg gap-8  font-light">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </div>

        {/* Mobile Menu */}
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

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 pt-[60vw] md:pt-[30vw] lg:pt-[20vw] pb-[10vw] mg:pb-[20vw]">
        <h1 className="text-[10vw] leading-[9vw] lg:leading-[5vw] md:text-[5vw] font-bold">
          Welcome to<br /> <span className=" font-bold bg-gradient-to-r from-[#6EE5F5] via-[#29A3B3] to-[#1397A9] bg-clip-text text-transparent">GenReal</span> AI
        </h1>
        <p className="mt-4 text-lg text-gray-300">Discover the new age of security</p>
        <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition">
          Get Started →
        </button>
      </div>

      {/* Statistics Section */}
      <div className="flex flex-col md:flex-row  bg-gradient-to-b from-black to-gray-700 justify-around items-center mt-20 px-8 pt-12 pb-[50vw] md:py-12 space-y-10 md:space-y-0">
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
