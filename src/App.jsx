import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Loader from './components/loader';
import Hero from './components/hero';
import About from './components/about';
import Team from './components/team';
import News from './components/news';
import ContactUs from './components/ContactUs';
import VideoCarousel  from "./components/videoCarousel"
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Upload from './components/Upload';
import Plagiarism from "./components/Plagiarism";

const Home = ({ isLoaded }) => (
  <div className='z-10' style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
    <Hero Loaded={isLoaded} />
    <About id="about" />
    <div className='w-[100%] hidden md:block h-screen'>
      <div className='w-[60%] h-[50%] mx-auto'>
        <VideoCarousel />
      </div>
    </div>
    <News id="news" />
    <FAQ id="faq" />
    <ContactUs id="contact-us" />
    <Team id="team" />
    <Footer />
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(location.pathname !== '/');

  useEffect(() => {
    // Scroll to top when loading finishes
    if (isLoaded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isLoaded]);

  const isHome = location.pathname === '/';

  return (
    <div className='relative bg-black overflow-hidden'>
      {isHome && !isLoaded && <Loader onFinish={() => setIsLoaded(true)} />}

      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/plagiarism" element={<Plagiarism/>} />
      </Routes>
    </div>
  );
};

const App = () => {

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
