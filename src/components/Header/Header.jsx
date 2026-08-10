import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CalendarDays } from 'lucide-react'
import logo from '/logo.png'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Rooms', id: 'rooms' },
  { label: 'Experience', id: 'experience' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const headerRef = useRef(null)

  const scrollToSection = (id) => {
    const section = document.getElementById(id)

    if (!section) return

    const headerHeight = headerRef.current?.offsetHeight || 90

    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight +
      2

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })

    window.history.replaceState({}, '', window.location.pathname)

    setMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      const headerHeight = headerRef.current?.offsetHeight || 90

      let current = 'home'

      NAV_LINKS.forEach((item) => {
        const section = document.getElementById(item.id)

        if (!section) return

        if (window.scrollY >= section.offsetTop - headerHeight - 80) {
          current = item.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeMenu = (e) => {
      if (!headerRef.current?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    const esc = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', closeMenu)
    window.addEventListener('keydown', esc)

    return () => {
      document.removeEventListener('mousedown', closeMenu)
      window.removeEventListener('keydown', esc)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
    >
      <div className="container header__inner">

        <button
          className="header__logo"
          onClick={() => scrollToSection('home')}
        >
          <img
            src={logo}
            alt="Marari Traditional Beach Homestay"
          />

          <span className="header__logo-text">
            MARARI
            <small>Traditional Beach Homestay</small>
          </span>
        </button>

        <nav className="header__nav header__nav--desktop">

          {NAV_LINKS.map((link) => (

            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`header__nav-link ${
                activeSection === link.id ? 'active' : ''
              }`}
            >
              {link.label}
            </button>

          ))}

        </nav>

        <div className="header__actions">

          <button
            className="header__cta"
            onClick={() => scrollToSection('booking')}
          >
            <CalendarDays
              size={17}
              strokeWidth={1.8}
            />

            <span>Book Your Stay</span>
          </button>

          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      <AnimatePresence>

        {menuOpen && (

          <motion.nav
            className="header__nav--mobile"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.28,
            }}
          >

            {NAV_LINKS.map((link) => (

              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`header__mobile-link ${
                  activeSection === link.id ? 'active' : ''
                }`}
              >
                {link.label}
              </button>

            ))}

          </motion.nav>

        )}

      </AnimatePresence>

    </header>
  )
}

export default Header