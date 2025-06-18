import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GeometricAnimation from './GeometricAnimation';
import FaceModel from './FaceModel';

const HeroSection = ({ Loaded }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (!section) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, { threshold: 0.4 });

      observer.observe(section);
      return observer;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'news', label: 'News' },
    { id: 'education', label: 'Education' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  const getLinkClass = (id) =>
    activeSection === id
      ? 'text-white font-semibold border-b-2 border-white'
      : 'text-gray-300 hover:text-white';

  return (
    <div className="relative h-screen bg-transparent text-white overflow-hidden" id="home" ref={heroRef}>
      <GeometricAnimation paused={!isHeroInView} disableTracking={isMobile} />
      <FaceModel paused={!isHeroInView} disableTracking={isMobile} />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black z-20 pointer-events-none" />

      <nav className={`w-full fixed top-0 z-50 transition-transform duration-300 bg-black/30 backdrop-blur-md shadow-md ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center px-[4vw] py-4 w-full">
          <img src="/logoGenReal.png" alt="GenReal AI" className="h-[15vw] md:h-[10vw] w-[15vw] md:w-[10vw] xl:h-[4vw] xl:w-[4vw]" />

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          <ul className="hidden md:flex text-lg gap-[4vw] font-light">
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={getLinkClass(link.id)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {isMobileMenuOpen && (
          <ul className="md:hidden px-[4vw] pb-4 space-y-2 bg-black/30 backdrop-blur-md z-40">
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={getLinkClass(link.id)}>{link.label}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="absolute inset-0 flex flex-col items-center justify-start pt-[26vh] sm:pt-[26vh] md:pt-[30vh] text-center z-30 pointer-events-none px-4">
        <h1 className="text-[clamp(2.75rem,10vw,5rem)] sm:text-[clamp(3rem,8vw,5.5rem)] lg:text-[5.5rem] xl:text-[6rem] leading-[clamp(2.75rem,7vw,4.5rem)] sm:leading-[clamp(3rem,7vw,5rem)] lg:leading-[5.5rem] text-center font-bold">
          Welcome to<br />
          <span className="bg-gradient-to-r from-[#6EE5F5] via-[#29A3B3] to-[#1397A9] bg-clip-text text-transparent">
            GenReal
          </span>.AI
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-300">
          Discover the new age of security
        </p>
        <button className="mt-8 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition pointer-events-auto">
          Get Started →
        </button>
      </div>


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
