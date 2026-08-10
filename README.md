# Marari — Traditional Beach Homestay

A production-ready React + Vite recreation of the Marari Beach Homestay homepage.

## Stack
- React 18 + Vite
- Plain CSS (design tokens in `src/index.css`)
- React Router
- Framer Motion (scroll reveals, accordion, carousel)
- Lenis (smooth scrolling)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Notes
- All photography is temporary, high-quality Unsplash placeholder imagery matching
  the Kerala coastal / homestay aesthetic — swap files in `src/assets/images` and
  update the URLs at the top of `src/pages/Home/Home.jsx` when real photos are ready.
- The logo at `src/assets/images/logo.png` is a placeholder mark — replace with the
  final brand logo (same filename keeps Header/Footer wired automatically).
- The footer map is an embedded Google Maps iframe centered on Marari Beach, Alappuzha —
  swap the `src` query in `src/components/Footer/Footer.jsx` for the exact property pin.
