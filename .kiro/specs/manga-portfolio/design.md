# Manga Portfolio — Design Spec
**Project:** Rakshit Trivedi's Manga-Style Developer Portfolio  
**Stack:** React + Vite · Framer Motion · Node/Express (serverless contact) · Firebase Hosting  
**Theme:** Full black-and-white manga aesthetic — ink strokes, screentone textures, panel compositions, dramatic contrast

---

## Architecture Overview

```
portfolio/
├── public/
│   ├── textures/          # Screentone PNGs, ink-stroke SVGs
│   └── fonts/             # Manga/comic fonts (Bangers, Wild Words)
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, MangaPanel wrapper, PageLayout
│   │   ├── hero/          # HeroSection, KnightSilhouette, SpeedLines
│   │   ├── about/         # AboutSection, SpeechBubble, PoetryText
│   │   ├── projects/      # ProjectsSection, ProjectPanel, PageTurnCard
│   │   ├── contact/       # ContactSection, ContactForm
│   │   ├── games/         # GameHub, TicTacToe, RockPaperScissors, AnimeQuiz
│   │   └── shared/        # ScreentoneOverlay, InkBorder, SFXText, ParticleBurst
│   ├── hooks/
│   │   ├── useSpeedLines.js
│   │   ├── useParticles.js
│   │   └── useScrollReveal.js
│   ├── utils/
│   │   ├── aiMinimax.js   # Minimax AI for Tic Tac Toe
│   │   └── rpsLogic.js    # RPS game logic
│   ├── data/
│   │   ├── projects.js    # Project metadata
│   │   └── animeQuiz.js   # Quiz questions + character data
│   ├── styles/
│   │   ├── global.css     # CSS vars, font imports, base reset
│   │   ├── manga.css      # Screentone, ink-border, panel utilities
│   │   └── animations.css # Keyframes for speed lines, panel flips
│   ├── App.jsx
│   └── main.jsx
├── api/
│   └── contact.js         # Serverless function (Firebase/Vercel) — Nodemailer
├── .github/
│   └── workflows/
│       └── deploy.yml     # Auto-deploy to Firebase on push to main
├── firebase.json
├── vite.config.js
└── package.json
```

---

## Component Design

### 1. Layout Shell
- `MangaPanel` — reusable wrapper with ink-stroke borders, optional screentone fill, and panel-number badge
- `Navbar` — fixed top, manga-style with speed-line hover effects, section jump links
- `PageLayout` — handles scroll snap between sections on desktop

### 2. Hero Section
- Full-viewport manga panel split into 3 diagonal sub-panels on entry
- `KnightSilhouette` — CSS/SVG 3D knight character, rotates subtly on scroll
- Entry animation: panels slide in from edges with Framer Motion `staggerChildren`
- Speed lines radiate from center on load
- SFX text overlays: "WHOOSH", "BOOM", dramatic kanji-style stamps
- Headline: *"Witness the chaos architect of Udaipur — Rakshit Trivedi, bending React like it's chakra control."*

### 3. About Section
- Two-panel manga layout: left panel = character art placeholder, right panel = speech bubbles
- Text appears as if being "typed" into speech bubbles with staggered reveal
- Poetic sarcastic copy with screentone background fill
- Timeline/stats rendered as manga chapter headings: "Chapter 1: The Origin Arc"

### 4. Projects Section
- Grid of manga panels, each project = one panel
- `PageTurnCard` — 3D CSS page-turn on hover/tap, reveals project details on back
- Entry: panels "slam" into view with ink-splash particle burst
- Stack badges styled as manga SFX text
- CTA buttons styled as action stamps

### 5. Contact Section
- Manga speech-bubble styled form fields
- Submit triggers a "SEND IT!" SFX animation with particle burst
- Backend: serverless function calls Nodemailer → sends email to Rakshit's inbox
- Success/error states shown as manga reaction panels

### 6. Games Hub
- Accessible via floating action button ("SIDE QUEST") or dedicated section
- `TicTacToe` — minimax AI, X/O replaced with manga icons, win triggers speed-line explosion
- `RockPaperScissors` — anime battle animation on reveal, shake/clash effects
- `AnimeQuiz` — silhouette-reveal mechanic, 10 questions, score shown as "Power Level"

---

## Animation Strategy (Framer Motion)

| Effect | Implementation |
|---|---|
| Panel entrance | `motion.div` with `x: -200, opacity: 0` → `x: 0, opacity: 1` |
| Speed lines | Canvas-drawn radial lines, animated opacity burst |
| Page turn | `rotateY: 0 → -180` with `backfaceVisibility: hidden` |
| Particle burst | `useParticles` hook — sand-like dots scatter on trigger |
| Stagger reveal | `staggerChildren: 0.1` on container variants |
| Scroll trigger | `useInView` from Framer Motion |
| SFX text pop | `scale: 0 → 1.2 → 1` spring animation |

---

## Backend — Contact Form

- **Provider:** Firebase Functions (or Vercel serverless if not using Firebase)
- **Flow:** Form → POST `/api/contact` → Nodemailer → Gmail SMTP → Rakshit's inbox
- **Validation:** Zod schema on server, honeypot field on client
- **Rate limiting:** 5 requests/IP/hour via in-memory store or Upstash Redis

---

## Deployment Pipeline

- **Host:** Firebase Hosting (CDN, free SSL, custom domain ready)
- **CI/CD:** GitHub Actions — on push to `main` → `npm run build` → `firebase deploy`
- **Env vars:** `VITE_` prefixed for client, Firebase Functions config for server secrets

---

## Design Tokens

```css
:root {
  --ink-black: #0a0a0a;
  --paper-white: #f5f0e8;
  --screentone-dot: rgba(0,0,0,0.08);
  --border-ink: 3px solid #0a0a0a;
  --border-thick: 6px solid #0a0a0a;
  --font-manga: 'Bangers', cursive;
  --font-body: 'Comic Neue', cursive;
  --shadow-panel: 8px 8px 0px #0a0a0a;
  --transition-snap: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## Responsive Strategy

- **Mobile:** Single-column panel stack, swipe gestures for project cards
- **Tablet:** 2-column panel grid
- **Desktop:** Full manga-page multi-panel layouts with diagonal splits
- Breakpoints: 480 / 768 / 1024 / 1440px
