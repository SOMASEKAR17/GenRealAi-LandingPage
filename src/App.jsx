import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
import Plagiarism from "./components/Plagiarism-upload";
import DeepfakeDetectionPlatform from "./components/aboutCards";

const Home = ({ isLoaded, onFaceModelLoaded }) => (
  <div className='z-10' style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
    <Hero Loaded={isLoaded} onFaceModelLoaded={onFaceModelLoaded} />
    <About id="about" />
    <DeepfakeDetectionPlatform />
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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(location.pathname !== '/');
  const [faceModelLoaded, setFaceModelLoaded] = useState(false);

  const handleFaceModelLoaded = () => {
    setFaceModelLoaded(true);
  };

  const handleLoaderFinish = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isLoaded]);

  const isHome = location.pathname === '/';

  return (
    <div className='relative bg-black overflow-hidden'>
      {isHome && !isLoaded && (
        <Loader 
          onFinish={handleLoaderFinish} 
          faceModelLoaded={faceModelLoaded}
        />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home 
                  isLoaded={isLoaded} 
                  onFaceModelLoaded={handleFaceModelLoaded}
                />
              </PageWrapper>
            }
          />
          <Route
            path="/upload"
            element={
              <PageWrapper>
                <Upload />
              </PageWrapper>
            }
          />
          <Route
            path="/plagiarism"
            element={
              <PageWrapper>
                <Plagiarism />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
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