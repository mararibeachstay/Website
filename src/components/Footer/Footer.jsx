import { Facebook, Instagram, MessageCircle, Youtube, Phone, Mail, MapPin, Heart } from 'lucide-react'
import logo from '/logo.png'
import './Footer.css'


const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}


function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__top">
        {/* Brand column */}
        <div className="footer__col footer__brand">
          <a href="#home" className="footer__logo">
            <img src={logo} alt="Marari Traditional Beach Homestay" />
            <span>
              MARARI
              <small>Traditional Beach Homestay</small>
            </span>
          </a>
          <p>
            A family-run homestay by the beach in Mararikulam, Kerala — offering quiet
            shores, home-cooked meals and genuine hospitality since 2005.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="WhatsApp"><MessageCircle size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a  onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a  onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a  onClick={() => scrollToSection('rooms')}>Rooms</a></li>
            <li><a  onClick={() => scrollToSection('experience')}>Experience</a></li>
          </ul>
        </div>

        {/* Rooms */}
        <div className="footer__col">
          <h4>Rooms</h4>
          <ul>
            <li><a onClick={() => scrollToSection('rooms')}>Deluxe Sea View Room</a></li>
            <li><a onClick={() => scrollToSection('rooms')}>Standard Garden View Room</a></li>
            <li><a onClick={() => scrollToSection('rooms')}>Family Room</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact-list">
            <li><Phone size={15} /> +91 9562760142</li>
            <li><Phone size={15} /> +91 8921170356</li>
            <li><Mail size={15} />mararitraditionalbeachhomestay@gmail.com</li>
            <li><MapPin size={15} />Marari Traditional Beach Homestay , Kattor PO , Kalavoor , Alappuzha.</li>
          </ul>
        </div>

        {/* Map */}
        <div className="footer__col footer__map">
          <h4>Find Us</h4>
          <div className="footer__map-frame">
            <iframe
              title="Marari Beach Homestay Location"
              src="https://maps.google.com/maps?q=Marari%20Beach%2C%20Alappuzha%2C%20Kerala&t=&z=12&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">

          <p>
            © {new Date().getFullYear()} Marari Traditional Beach Homestay.
            All Rights Reserved.
          </p>

          <p className="footer__crafted">
            Crafted with
            <Heart className="footer__heart-icon" size={15} fill="currentColor" />
            by{" "}
            <a
              href="https://adithyanskumar.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adithyan
            </a>
          </p>

        </div>
      </div>
    </footer>
  )
}

export default Footer
