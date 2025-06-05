import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Hero from './components/hero';
import About from './components/about';
import CircularCards from './components/aboutCards';
import Team from './components/team';
import News from './components/news';
import ContactUs from './components/ContactUs';
import Globe from "./components/globe";
import Education from './components/Education';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top when loading finishes
  useEffect(() => {
    if (isLoaded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isLoaded]);

  return (
    <div className='relative bg-black overflow-hidden'>
      {!isLoaded && (
        <Loader onFinish={() => setIsLoaded(true)} />
      )}
      <div className='z-10' style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <Hero Loaded={isLoaded} />
        <About id="about" />
        <CircularCards />
        <News id="news" />
        <Education id="education" />
        <Globe />
        <FAQ id="faq" />
        <Team id="team" />
        <ContactUs id="contact-us" />
        <Footer />
      </div>
    </div>
  );
};

export default App;
