import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App