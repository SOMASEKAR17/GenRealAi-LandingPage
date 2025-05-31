import React from 'react'
import Hero from './components/hero'
import About from './components/about'
import CircularCards from './components/aboutCards'
import Team from './components/team'
import News from './components/news'
import ContactUs from "./components/ContactUs.jsx"
import Education from "./components/Education";

const App = () => {
  return (
    <div><Hero />
    <About />
    <CircularCards />
    <Team />
    <News />
    <Education />
    <ContactUs />
    </div>
  )
}

export default App