# ACE Solutions Landing Page

Marketing landing page for ACE Technologies, built with **Next.js**, **React 19**, **GSAP**, and **Three.js**.

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- React 19
- GSAP + ScrollTrigger
- Three.js (hero particle scene)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint (Next.js config) |

## Project structure

```
src/
  app/           # Next.js App Router (layout, page, globals.css)
  components/    # UI sections (Navbar, Hero, FAQ, etc.)
  landing/       # LandingPage client entry
  hooks/         # GSAP animations, reduced motion
  three/         # Hero 3D scene
  gsap/          # GSAP plugin setup
  styles/        # Design tokens + landing styles
public/          # Static assets (favicon, icons)
design-system/   # ACE Solutions design system docs
```

## Migration note

This project was migrated from Vite to Next.js on branch `feat/next-migration`. Component markup and styles were preserved; only the toolchain and app entry changed.
