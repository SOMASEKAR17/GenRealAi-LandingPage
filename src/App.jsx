import React from 'react'
import Hero from './components/hero'
import About from './components/about'
import CircularCards from './components/aboutCards'
import Team from './components/team'
import News from './components/news'

const App = () => {
  return (
    <div><Hero />
    <About />
    <CircularCards />
    <Team />
    <News />
    </div>
  )
}

export default App