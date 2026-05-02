# ATTT — Agence Technique des Transports Terrestres
### UI/UX Redesign Project

> A complete redesign of the official Tunisian technical vehicle inspection portal, focused on usability, accessibility, and modern web standards.

---

## 📌 Project Overview

This project is a **UI/UX redesign** of the existing ATTT government website ([www.attt.com.tn](http://www.attt.com.tn)), which handles vehicle technical inspection appointments for Tunisian citizens.

The original website suffered from a dated interface, complex navigation, no online payment capability, and a poor mobile experience. This redesign addresses all of these issues through a user-centered approach — from research and journey mapping to a fully coded, production-ready React application.

---

## 🎯 Design Objectives

| Problem (As-Is) | Solution (To-Be) |
|---|---|
| Complex multi-step navigation with no clear flow | Linear guided wizard with progress stepper |
| No online payment — users had to pay in person | Integrated secure online payment (card, virement) |
| No real-time slot availability | Live time slot consultation per center and date |
| Non-responsive design, unusable on mobile | Fully responsive layout (mobile-first breakpoints) |
| Outdated visual identity, low readability | Clean design system with consistent tokens |
| Scattered information architecture | Unified portal: reservation, quittance, report, availability |

---

## 👥 User Journey — To-Be

```
1. Receive expiry reminder notification
        ↓
2. Access ATTT portal (direct link or search)
        ↓
3. Land on clear homepage with primary actions visible
        ↓
4. Select "Visite Technique" → Reservation
        ↓
5. Step 1 — Enter vehicle info (plate + chassis)
        ↓
6. Step 2 — Select city, center, date & time slot (real-time)
        ↓
7. Step 3 — Review summary, choose payment method
        ↓
8. Step 4 — Secure online payment
        ↓
9. Step 5 — Confirmation + downloadable receipt
```

---

## 🖥️ Pages & Features

| Page | Description |
|---|---|
| **Home** | Hero section, service shortcuts, latest news, À propos |
| **Reservation** | 5-step guided wizard (identify → schedule → recap → pay → confirm) |
| **Disponibilités** | Real-time slot availability lookup by city, center and date |
| **Réédition de quittance** | Retrieve and reprint payment receipt by vehicle info |
| **Reporter un RDV** | Reschedule an existing appointment |
| **Nos Services** | Overview of all 4 digital services with stats and process guide |
| **À propos** | Agency presentation, legal form, mission, staff data, contact info |
| **Actualités** | Official news and announcements |
| **Contact** | Contact form + center locations |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (functional components only) |
| Routing | React Router v6 |
| Styling | CSS Modules + CSS custom properties (design tokens) |
| Build tool | Vite 8 |
| Typography | DM Sans + DM Serif Display (Google Fonts) |
| Icons | Inline SVG (no external icon library dependency) |
| State management | useState / useReducer (no Redux) |
| API layer | Mock service layer (services/api.js) — ready for backend swap |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable design system components
│   │   ├── Button              # Variants: primary, secondary, ghost, danger
│   │   ├── Card                # Generic container with optional header
│   │   ├── FormField           # Label + input/select + inline error
│   │   ├── Stepper             # 5-step progress indicator
│   │   ├── Badge               # Status tags (success, info, warning, error)
│   │   └── ServiceCard         # Animated feature card with hover effects
│   ├── layout/
│   │   ├── Navbar              # Sticky, responsive, mobile hamburger
│   │   └── Footer              # Dark footer, 4-column layout
│   └── reservation/
│       ├── StepIdentification  # Vehicle lookup + validation
│       ├── StepSchedule        # Dynamic center/date/slot selection
│       ├── StepRecap           # Summary + payment method choice
│       ├── StepPayment         # Card form or wire transfer instructions
│       └── StepSuccess         # Confirmation screen
├── pages/                      # One file per route
├── layouts/                    # AppLayout wrapping Navbar + Footer
├── services/
│   └── api.js                  # Mock API — swap for real endpoints
├── hooks/
│   └── index.js                # useAsync, useReservation
└── styles/
    └── globals.css             # Design tokens (CSS variables), reset, utilities
```

---

## 🎨 Design System

All visual decisions are driven by CSS custom properties defined in `globals.css`:

```css
--navy: #0D1B3E        /* Primary dark — headings, footer */
--blue: #1A56DB        /* Brand blue — CTAs, links, accents */
--blue-light: #EBF1FF  /* Backgrounds, hover states */
--blue-mid: #BFCFFF    /* Borders, subtle accents */
--success: #16A34A     /* Confirmations, available slots */
--error: #DC2626       /* Validation errors, full slots */
--gray-50 to gray-900  /* Full neutral scale */
--font-body: 'DM Sans'
--font-display: 'DM Serif Display'
--shadow-sm/md/lg      /* Consistent elevation levels */
--radius-sm/md/lg/xl   /* Border radius scale */
```

---

## 🚀 Getting Started

```bash
# 1. Unzip the project
unzip attt-react-app.zip
cd attt-app

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

**Requirements:** Node.js 18+

---

## 🔌 Backend Integration

The project is architected for easy backend integration. All API calls are centralized in `src/services/api.js`. To connect a real backend, replace the mock functions with actual fetch or axios calls:

```js
// Current (mock)
export const vehicleService = {
  async verify({ type, plate, chassis }) {
    await delay(800);
    return { id: '...', plate, brand: 'Volkswagen', ... };
  }
};

// Replace with
export const vehicleService = {
  async verify(payload) {
    const res = await fetch('/api/vehicles/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Véhicule introuvable');
    return res.json();
  }
};
```

No changes needed in any component — the service layer is the only integration point.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 1024px | Full desktop — 2-column grids, side-by-side cards |
| 768px – 1024px | Tablet — single column, stacked sections |
| < 768px | Mobile — hamburger nav, full-width forms, stacked CTAs |

---

## ✅ UX Improvements Over Original

- **Reduced clicks to reservation** from 7+ steps to 4 guided steps
- **Inline validation** on all form fields — no full-page error reloads
- **Real-time availability** shown as visual chips (green/red) before booking
- **Sticky navigation** — user always knows where they are
- **Notification banner** on homepage simulating SMS/email reminder flow
- **Print/download** receipt directly from confirmation screen
- **Accessible** — semantic HTML, keyboard navigable, ARIA labels on interactive elements

---

## 👤 Authors

This project was developed as part of a UI/UX design course focusing on the redesign and optimization of public-sector digital services in Tunisia.

---

## 📄 License

Academic project — not affiliated with or endorsed by the official ATTT agency.
