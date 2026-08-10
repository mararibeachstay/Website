import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Loader from './components/Loader/Loader'
import Home from './pages/Home/Home'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // Initialize buttery-smooth Lenis scrolling for the whole app
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      {/* <AnimatePresence>{loading && <Loader />}</AnimatePresence> */}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
