import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import face from "/facemesh.png";
import GeometricAnimation from './GeometricAnimation'; // adjust the path as needed


const HeroSection = ({ Loaded }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const statsRef = useRef(null);

  useEffect(() => {
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

  useEffect(() => {
    const sections = ['home', 'about', 'features', 'news', 'education', 'faq', 'contact-us'];

    const observers = sections.map(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.4,
        }
      );
      observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'news', label: 'News' },
    { id: 'education', label: 'Education' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact-us', label: 'Contact Us' }
  ];

  const getLinkClass = (id) =>
    activeSection === id
      ? 'text-white font-semibold border-b-2 border-white'
      : 'text-gray-300 hover:text-white';

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden" id="home">
    
    {/* Particle Background Animation */}
    <GeometricAnimation />

    {/* Colored Radial Background */}
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #6EE5F5 0%, #34B8C9 10%, rgba(0, 0, 0, 0.8) 100%)"
      }}
    />

    {/* Black Gradient Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black z-20 pointer-events-none" />

    {/* Background Image */}
    <img
      src={face}
      alt="Background"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[520px] object-cover z-10 opacity-80 pointer-events-none"
    />

      {/* Navbar */}
      <nav className={`w-full transition-all duration-300 bg-transparent fixed top-0 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <img src="/logoGenReal.png" alt="GenReal AI" className="h-[15vw] md:h-[10vw] w-[15vw] md:w-[10vw] lg:h-[4vw] lg:w-[4vw]" />
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex text-lg gap-8 font-light">
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={getLinkClass(link.id)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {isMobileMenuOpen && (
          <ul className="md:hidden px-6 pb-4 space-y-2 bg-transparent z-40">
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={getLinkClass(link.id)}>{link.label}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Hero Content */}
      <div className="absolute h-[70vh] inset-0 flex flex-col items-center justify-center text-center z-30">
        <h1 className="text-[10vw] leading-[9vw] md:text-[5vw] lg:leading-[5vw] font-bold">
          Welcome to<br />
          <span className="bg-gradient-to-r from-[#6EE5F5] via-[#29A3B3] to-[#1397A9] bg-clip-text text-transparent">
            GenReal
          </span>.AI
        </h1>
        <p className="mt-4 text-lg text-gray-300">Discover the new age of security</p>
        <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition pointer-events-auto">
          Get Started →
        </button>
      </div>

      {/* Statistics Section */}
      <div
        ref={statsRef}
        className="absolute opacity-0 w-full bottom-0 z-40 flex flex-col md:flex-row justify-around items-center px-8 py-4 space-y-6 md:space-y-0 pointer-events-auto"
        style={{
          background: 'linear-gradient(3.22deg, #383838 -10.06%, #3B3636 18.86%, #2E2929 49.72%, #242121 64.62%, #171515 78.13%, #080707 97.6%)',
        }}
      >
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