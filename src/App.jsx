import React from 'react'
import Hero from './components/hero'
import About from './components/about'
import CircularCards from './components/aboutCards'
import Team from './components/team'
import News from './components/news'
import ContactUs from "./components/ContactUs.jsx"
import Education from "./components/Education";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";

const App = () => {
  return (
    <div><Hero />
    <About id="about"/>
    <CircularCards/>
    <Team  id="team"/>
    <News id="news"/>
    <Education id="education"/>
    <FAQ id="faq"/>
    <ContactUs id="contact-us"/>
    <Footer/>
    </div>
  )
}

export default App