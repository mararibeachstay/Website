import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDays, Users, ChevronRight, ChevronLeft, ChevronDown, ArrowRight,
  Heart, UtensilsCrossed, HandHeart,
  BedDouble, Ruler, Waves, Home as HomeIcon,
  Sunrise, Bike, Soup, Fish, Sunset, Sparkles, Anchor, Landmark,
  Plus, Minus, Phone, MessageCircle, Mail, MapPin,
  Quote, Star, Phone as PhoneIcon,
} from 'lucide-react'
import Button from '../../components/Button/Button'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import './Home.css'

/* -------------------------------------------------------------------------- */
/* STATIC CONTENT                                                             */
/* -------------------------------------------------------------------------- */

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1602343168117-8c8b52a1b409?auto=format&fit=crop&w=1000&q=80'

const ABOUT_FEATURES = [
  { icon: Heart, title: 'Family Owned', desc: 'Personal care and attention' },
  { icon: Waves, title: 'Beachfront', desc: 'Just 2 minutes to the beach' },
  { icon: UtensilsCrossed, title: 'Authentic Food', desc: 'Home-cooked Kerala meals' },
  { icon: HandHeart, title: 'Warm Hospitality', desc: 'We treat you like our family' },
]

const ROOMS = [
  {
    name: 'Deluxe Sea View Room',
    guests: '2 Guests',
    beds: '1 Bed',
    view: 'Sea View',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Standard Garden View Room',
    guests: '2 Guests',
    beds: '1 Bed',
    view: 'Garden View',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Family Room',
    guests: '4 Guests',
    beds: '2 Beds',
    view: 'Garden View',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
]

const EXPERIENCES = [
  { icon: Sunrise, label: 'Morning', label2: 'Beach Walks' },
  { icon: Bike, label: 'Village', label2: 'Cycling' },
  { icon: Soup, label: 'Traditional', label2: 'Kerala Meals' },
  { icon: Fish, label: 'Fishing', label2: 'Experience' },
  { icon: Sunset, label: 'Sunset', label2: 'Relaxation' },
  { icon: Sparkles, label: 'Ayurveda', label2: 'Wellness' },
  { icon: Anchor, label: 'Backwater', label2: 'Canoeing' },
  { icon: Landmark, label: 'Local Culture', label2: '& Temples' },
]

const FAQS = [
  { q: 'Is the beach walkable?', a: 'Yes — Marari Beach is just a two-minute walk from our homestay, along a quiet palm-lined path.' },
  { q: 'Do you provide breakfast?', a: 'Every stay includes a home-cooked Kerala breakfast, prepared fresh each morning using local ingredients.' },
  { q: 'Is airport pickup available?', a: 'Yes, we can arrange airport or railway station pickup from Cochin International Airport on request.' },
  { q: 'Is parking free?', a: 'Complimentary private parking is available on-site for all our guests throughout their stay.' },
  { q: 'Can families stay?', a: 'Absolutely — our Family Room comfortably sleeps four and we welcome children of all ages.' },
  { q: 'Is WiFi available?', a: 'Yes, complimentary high-speed WiFi is available throughout the property, indoors and out.' },
]

const TESTIMONIALS = [
  {
    quote: 'The location is just perfect! Waking up to the sound of waves and the warm hospitality made our stay unforgettable. Highly recommended!',
    name: 'Priya Nair',
    place: 'Bangalore, India',
  },
  {
    quote: 'A truly authentic homestay experience. The food felt like home and the hosts went out of their way to make us comfortable.',
    name: 'Daniel Fischer',
    place: 'Munich, Germany',
  },
  {
    quote: 'Quiet, clean, and beautifully close to the beach. Exactly the escape we were looking for in Kerala.',
    name: 'Anjali Menon',
    place: 'Kochi, India',
  },
]

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
]

const CTA_IMAGE =
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80'

/* WhatsApp business number (digits only, country code first, no + or spaces) */
const WHATSAPP_NUMBER = '919496861903'

/* -------------------------------------------------------------------------- */
/* MOTION VARIANTS                                                            */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const toISODate = (date) => date.toISOString().split('T')[0]

const addDays = (iso, days) => {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

const formatDisplayDate = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getDefaultBookingDates = () => {
  const today = new Date()
  const checkIn = new Date(today)
  checkIn.setDate(today.getDate() + 7) // a week out, by default
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkIn.getDate() + 2)
  return { checkIn: toISODate(checkIn), checkOut: toISODate(checkOut) }
}

const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

/* -------------------------------------------------------------------------- */
/* HOME PAGE                                                                  */
/* -------------------------------------------------------------------------- */

function Home() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeReview, setActiveReview] = useState(0)

  /* ---- Booking widget state ---- */
  const [booking, setBooking] = useState(() => ({
    ...getDefaultBookingDates(),
    adults: 2,
    children: 1,
  }))
  const [guestsOpen, setGuestsOpen] = useState(false)
  const guestsRef = useRef(null)

  const todayISO = toISODate(new Date())
  const minCheckOut = addDays(booking.checkIn, 1)

  const guestsSummary = `${booking.adults} Adult${booking.adults !== 1 ? 's' : ''}${booking.children > 0 ? `, ${booking.children} Child${booking.children !== 1 ? 'ren' : ''}` : ''
    }`

  // Close the guests dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target)) setGuestsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value
    setBooking((b) => {
      const needsBump = new Date(b.checkOut) <= new Date(newCheckIn)
      return {
        ...b,
        checkIn: newCheckIn,
        checkOut: needsBump ? addDays(newCheckIn, 1) : b.checkOut,
      }
    })
  }

  const handleCheckOutChange = (e) => {
    setBooking((b) => ({ ...b, checkOut: e.target.value }))
  }

  const updateGuests = (type, delta) => {
    setBooking((b) => {
      const min = type === 'adults' ? 1 : 0
      const max = type === 'adults' ? 10 : 6
      return { ...b, [type]: Math.min(max, Math.max(min, b[type] + delta)) }
    })
  }

  const handleCheckAvailability = () => {
    const message = [
      'Hi Marari Beach Homestay! 🌴',
      "I'd like to check availability for:",
      '',
      `📅 Check-in: ${formatDisplayDate(booking.checkIn)}`,
      `📅 Check-out: ${formatDisplayDate(booking.checkOut)}`,
      `👥 Guests: ${guestsSummary}`,
      '',
      'Please let me know if these dates are available. Thank you!',
    ].join('\n')
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  const handleRoomBooking = (roomName) => {
    scrollToSection('booking')
    // Pre-fill nothing destructive — just let the guest confirm dates, then WhatsApp.
    void roomName
  }

  const nextReview = () => setActiveReview((i) => (i + 1) % TESTIMONIALS.length)
  const prevReview = () => setActiveReview((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <main className="home">
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="hero" id="home">
        <div className="hero__bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero__overlay" />

        <div className="container hero__content">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🌴 Welcome to Mararikulam
          </motion.p>

          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            Experience Kerala's Quietest<br />
            <span className="italic-accent">Beach Escape</span>
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Wake up to the sound of waves, walk barefoot on untouched beaches, and
            experience authentic Kerala hospitality in the heart of Mararikulam.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <Button variant="primary" icon={CalendarDays} onClick={() => scrollToSection('booking')}>
              Book Your Stay
            </Button>
            <Button variant="outline" icon={ChevronRight} onClick={() => scrollToSection('about')}>
              Explore More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating booking card */}
      <motion.div
        className="booking-card"
        id="booking"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="booking-card__field">
          <label className="booking-card__label" htmlFor="checkIn">
            <CalendarDays size={15} /> Check In
          </label>
          <input
            id="checkIn"
            type="date"
            className="booking-card__value booking-card__input"
            value={booking.checkIn}
            min={todayISO}
            onChange={handleCheckInChange}
          />
        </div>

        <div className="booking-card__divider" />

        <div className="booking-card__field">
          <label className="booking-card__label" htmlFor="checkOut">
            <CalendarDays size={15} /> Check Out
          </label>
          <input
            id="checkOut"
            type="date"
            className="booking-card__value booking-card__input"
            value={booking.checkOut}
            min={minCheckOut}
            onChange={handleCheckOutChange}
          />
        </div>

        <div className="booking-card__divider" />

        <div className="booking-card__field booking-card__field--guests" ref={guestsRef}>
          <span className="booking-card__label">
            <Users size={15} /> Guests
          </span>
          <button
            type="button"
            className="booking-card__value booking-card__guests-toggle"
            onClick={() => setGuestsOpen((o) => !o)}
            aria-expanded={guestsOpen}
          >
            <span>{guestsSummary}</span>
            <ChevronDown size={14} className={`booking-card__chevron ${guestsOpen ? 'is-open' : ''}`} />
          </button>

          <AnimatePresence>
            {guestsOpen && (
              <motion.div
                className="guests-dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="guests-dropdown__row">
                  <div>
                    <p>Adults</p>
                    <span>Ages 13+</span>
                  </div>
                  <div className="guests-dropdown__counter">
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', -1)}
                      disabled={booking.adults <= 1}
                      aria-label="Decrease adults"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{booking.adults}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 1)}
                      disabled={booking.adults >= 10}
                      aria-label="Increase adults"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="guests-dropdown__row">
                  <div>
                    <p>Children</p>
                    <span>Ages 0–12</span>
                  </div>
                  <div className="guests-dropdown__counter">
                    <button
                      type="button"
                      onClick={() => updateGuests('children', -1)}
                      disabled={booking.children <= 0}
                      aria-label="Decrease children"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{booking.children}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 1)}
                      disabled={booking.children >= 6}
                      aria-label="Increase children"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button type="button" className="guests-dropdown__done" onClick={() => setGuestsOpen(false)}>
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button variant="primary" className="booking-card__btn" onClick={handleCheckAvailability}>
          Check Availability
        </Button>
      </motion.div>

      {/* ================================================================ */}
      {/* ABOUT                                                             */}
      {/* ================================================================ */}
      <section className="about" id="about">
        <div className="container about__grid">
          <motion.div
            className="about__text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                icon="🌴"
                eyebrow="Welcome to Marari"
                heading="Where Every Stay"
                accent="Feels Like Home"
              />
            </motion.div>

            <motion.p className="about__desc" variants={fadeUp}>
              A family-run homestay by the beach offering clean, comfortable rooms,
              home-cooked Kerala food and genuine hospitality.
            </motion.p>

            <motion.div className="about__features" variants={fadeUp}>
              {ABOUT_FEATURES.map(({ icon: Icon, title, desc }) => (
                <div className="about__feature" key={title}>
                  <span className="about__feature-icon"><Icon size={22} strokeWidth={1.4} /></span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button variant="primary" icon={ArrowRight} onClick={() => scrollToSection('experience')}>
                Know Our Story
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="about__image"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={ABOUT_IMAGE} alt="Beachfront veranda seating at Marari homestay" />
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ROOMS                                                             */}
      {/* ================================================================ */}
      <section className="rooms" id="rooms">
        <div className="container">
          <div className="rooms__header">
            <SectionTitle icon={<BedDouble size={16} />} eyebrow="Our Accommodation" heading="Comfortable Rooms" accent="with a View" />
            <Button
              variant="outline"
              icon={ArrowRight}
              className="rooms__view-all"
              onClick={() => scrollToSection('rooms')}
            >
              View All Rooms
            </Button>
          </div>

          <motion.div
            className="rooms__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {ROOMS.map((room) => (
              <motion.article className="room-card" key={room.name} variants={fadeUp}>
                <div className="room-card__image-wrap">
                  <img src={room.image} alt={room.name} />
                </div>
                <div className="room-card__body">
                  <h3>{room.name}</h3>
                  <div className="room-card__meta">
                    <span><Users size={14} /> {room.guests}</span>
                    <span><BedDouble size={14} /> {room.beds}</span>
                    <span><Ruler size={14} /> {room.view}</span>
                  </div>
                  <Button
                    variant="primary"
                    className="room-card__btn"
                    onClick={() => handleRoomBooking(room.name)}
                  >
                    Book Now
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPERIENCE                                                        */}
      {/* ================================================================ */}
      <section className="experience" id="experience">
        <div className="container">
          <SectionTitle icon={<HomeIcon size={16} />} eyebrow="Experience Marari" heading="More Than Just" accent="a Stay" align="left" />

          <motion.div
            className="experience__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {EXPERIENCES.map(({ icon: Icon, label, label2 }) => (
              <motion.div className="experience__item" key={label} variants={fadeUp}>
                <span className="experience__icon"><Icon size={26} strokeWidth={1.3} /></span>
                <p>{label}<br />{label2}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TESTIMONIALS                                                      */}
      {/* ================================================================ */}
      <section className="testimonials" id="reviews">
        <div
          className="testimonials__bg"
          style={{ backgroundImage: `url(${GALLERY_IMAGES[3]})` }}
        />
        <div className="testimonials__overlay" />

        <div className="container testimonials__inner">
          <div className="testimonials__left">
            <SectionTitle
              icon="🌴"
              eyebrow="Trusted by Travellers"
              heading="Loved by Guests, Recommended"
              accent="by Many"
              light
            />
            <p className="testimonials__desc">Real experiences from our happy guests.</p>
            <div className="testimonials__rating">
              <span className="testimonials__google">Google</span>
              <span className="testimonials__stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C4A260" stroke="none" />)}
              </span>
              <span>4.7 (130+ Reviews)</span>
            </div>
            <div className="testimonials__nav">
              <button onClick={prevReview} aria-label="Previous review"><ChevronLeft size={18} /></button>
              <button onClick={nextReview} aria-label="Next review"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="testimonials__right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                className="review-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote size={28} className="review-card__quote" />
                <p>{TESTIMONIALS[activeReview].quote}</p>
                <div className="review-card__author">
                  <span className="review-card__avatar">{TESTIMONIALS[activeReview].name.charAt(0)}</span>
                  <div>
                    <strong>{TESTIMONIALS[activeReview].name}</strong>
                    <small>{TESTIMONIALS[activeReview].place}</small>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="review-card__dots">
              {TESTIMONIALS.map((_, i) => (
                <span key={i} className={i === activeReview ? 'active' : ''} onClick={() => setActiveReview(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* GALLERY                                                           */}
      {/* ================================================================ */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="rooms__header">
            <SectionTitle icon="🌺" eyebrow="Glimpse of Paradise" heading="Moments to" accent="Remember" />
            <Button variant="outline" icon={ArrowRight} className="rooms__view-all"
              onClick={() => scrollToSection('gallery')}>
              View Gallery
            </Button>
          </div>

          <motion.div
            className="gallery__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div className="gallery__item" key={i} variants={fadeUp}>
                <img src={src} alt={`Marari homestay moment ${i + 1}`} loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <section className="cta" id="cta">
        <div className="cta__bg" style={{ backgroundImage: `url(${CTA_IMAGE})` }} />
        <div className="cta__overlay" />
        <motion.div
          className="container cta__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Your Perfect Beach <span className="italic-accent">Escape</span> Begins Here</h2>
          <p>Book your stay and create beautiful memories that will last a lifetime.</p>
          <div className="cta__actions">
            <Button variant="primary" icon={CalendarDays} onClick={() => scrollToSection('booking')}>
              Book Your Stay
            </Button>
            <Button as="a" href="tel:+919496861903" variant="outline" icon={Phone}>
              Call Now
            </Button>
            <Button
              as="a"
              href={buildWhatsAppLink('Hi! I would like to know more about Marari Beach Homestay and check room availability.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={MessageCircle}
            >
              WhatsApp Us
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* WHY CHOOSE MARARI — FAQ + CONTACT CARD                            */}
      {/* ================================================================ */}
      <section className="why" id="faq">
        <div className="container">
          <SectionTitle icon="🌿" eyebrow="Good to Know" heading="Why Choose" accent="Marari?" align="center" />

          <div className="why__grid">
            {/* FAQ accordion */}
            <div className="faq">
              {FAQS.map((item, i) => (
                <div className={`faq__item ${openFaq === i ? 'faq__item--open' : ''}`} key={item.q}>
                  <button className="faq__question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{item.q}</span>
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        className="faq__answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="faq__answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Luxury contact card */}
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="contact-card__image"
                style={{ backgroundImage: `url(${GALLERY_IMAGES[2]})` }}
              />
              <div className="contact-card__body">
                <h3>Plan Your Stay</h3>
                <p>Reach out directly — we typically respond within the hour.</p>

                <ul className="contact-card__list">
                  <li>
                    <span className="contact-card__icon"><PhoneIcon size={16} /></span>
                    <div>
                      <small>Call Us</small>
                      <p>+91 9562760142</p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-card__icon"><MessageCircle size={16} /></span>
                    <div>
                      <small>WhatsApp</small>
                      <p>+91 8921170356</p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-card__icon"><Mail size={16} /></span>
                    <div>
                      <small>Email</small>
                      <p>mararitraditionalbeachhomestay@gmail.com</p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-card__icon"><MapPin size={16} /></span>
                    <div>
                      <small>Address</small>
                      <p>Marari Traditional Beach Homestay , Kattor PO , Kalavoor , Alappuzha.</p>
                    </div>
                  </li>
                </ul>

                <Button
                  variant="primary"
                  icon={CalendarDays}
                  className="contact-card__btn"
                  onClick={() => scrollToSection('booking')}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home