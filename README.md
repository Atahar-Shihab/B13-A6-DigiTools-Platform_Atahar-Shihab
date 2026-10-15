# DigiTools Platform

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://digi-tools-platform-shihab.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

DigiTools is a modern, high-performance web platform designed for discovering, evaluating, and acquiring premium digital assets, UI frameworks, AI prompt workflows, and developer boilerplates. Built with **React 19**, **Tailwind CSS v4**, and **DaisyUI**, it delivers an accessible, responsive, and interactive user experience across desktop and mobile devices.

🌐 **Live Application:** [digi-tools-platform-shihab.vercel.app](https://digi-tools-platform-shihab.vercel.app)

---

## Overview

DigiTools provides digital creators, frontend engineers, and product teams with a streamlined interface for browsing curated tools. The platform includes a dual-mode shopping cart experience, instant search via a global command palette, real-time multi-currency conversion, an interactive developer sandbox, and a full three-step checkout simulation with automated license key generation.

---

## Key Features

### 1. Catalog & Advanced Filtering
* **Categorized Discovery:** Filter tools across categories including *AI & Automation*, *UI/UX Design*, *Development*, and *Business & Marketing*.
* **Real-Time Search & Sorting:** Instant client-side search query filtering with sorting options for price, rating, popularity, and featured assets.
* **Dual View Modes:** Toggle between a multi-column responsive grid view and a horizontal list view.
* **Quick View Modal:** Inspect technical specifications, file formats (.FIG, .TSX, .JSON), compatibility details, and verified user reviews without leaving the page.
* **Wishlist Management:** Save products to a persistent favorites list with one-click migration to the shopping cart.

### 2. Dual-Mode Cart & Checkout System
* **Off-Canvas Slide-Over Cart:** Accessible across all sections with item quantity incrementation, removal actions, and instant total recalculations.
* **Inline Catalog Cart:** Embedded dual-tab catalog switcher for toggling between product browsing and cart review.
* **Tiered Incentive Progress Bar:** Dynamic reward meter calculating remaining spend to unlock complimentary toolkits.
* **Promotional Discount Engine:** Integrated coupon validator supporting promo codes (`DIGI20`, `CREATOR15`, `WELCOME10`) with automated tax and subtotal computation.
* **3-Step Checkout Simulation:** Interactive credit card visualization, billing verification, and order completion modal generating unique Order IDs and lifetime license keys.

### 3. Command Palette (`Ctrl + K` / `Cmd + K`)
* Keyboard-driven global search interface for rapid navigation across catalog items, site anchors, drawers, and modal views.
* Quick actions for toggling themes, switching currencies, and opening the shopping cart.

### 4. Interactive Developer Sandbox
* **AI Prompt Studio:** Test and preview generated copy variations with simulated response streams.
* **Design System Token Inspector:** Live customization controls for primary theme colors, corner radii, and button style variants (solid, outline, glass).
* **System Metrics Monitor:** Real-time telemetry simulation displaying edge latency and platform uptime metrics.

### 5. Personalization & Accessibility
* **Multi-Currency Engine:** Seamless conversion between **USD ($)**, **EUR (€)**, and **GBP (£)** with persistent client storage.
* **Theme System:** Native dark and light mode support respecting system color scheme preferences with zero flash of unstyled content.
* **Web Audio Synthesis:** Gentle synthesized audio cues powered by the Web Audio API for interactive feedback, toggleable from the navigation bar.
* **Scroll Depth Progress:** Top-mounted gradient indicator displaying active scroll position.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **UI Framework** | React 19, React DOM |
| **Styling & Design System** | Tailwind CSS v4, DaisyUI v5 |
| **Bundler & Tooling** | Vite, PostCSS, Autoprefixer |
| **Icons & Visuals** | Lucide React, React Icons |
| **Notifications & FX** | React-Toastify, Canvas Confetti |
| **Audio** | Native Web Audio API |
| **Linting & Code Quality** | ESLint 9 (Flat Config), React Hooks & Refresh Plugins |

---

## Project Structure

```
├── public/
│   └── assets/                  # Product iconography and media
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx       # Slide-over cart panel with promo validation
│   │   ├── CheckoutModal.jsx    # 3-step checkout simulation and receipt generator
│   │   ├── CommandPalette.jsx   # Global keyboard-driven command palette
│   │   ├── CTASection.jsx       # Newsletter subscription & coupon unlock
│   │   ├── FAQSection.jsx       # Categorized accordion FAQ
│   │   ├── FeatureShowcase.jsx  # Onboarding walkthrough & interactive sandbox
│   │   ├── FilterBar.jsx        # Search, category pills, and sorting controls
│   │   ├── Footer.jsx           # System status, links, and attribution
│   │   ├── Hero.jsx             # Hero section with 3D floating feature cards
│   │   ├── InteractiveTourModal.jsx # Multi-step platform walkthrough
│   │   ├── LiveSalesTicker.jsx  # Floating social proof notification
│   │   ├── Navbar.jsx           # Sticky glassmorphic navigation header
│   │   ├── PricingSection.jsx   # Plan comparisons with annual/monthly toggle
│   │   ├── ProductCard.jsx      # Responsive card supporting grid and list modes
│   │   ├── ProductQuickViewModal.jsx # Detailed multi-tab product modal
│   │   ├── ScrollProgressBar.jsx# Viewport scroll depth indicator
│   │   ├── StatsCounter.jsx     # Platform statistics
│   │   ├── TestimonialsSection.jsx # User reviews with rating filters
│   │   └── WishlistDrawer.jsx   # Saved items drawer
│   ├── context/
│   │   └── ShopContext.jsx      # Global context provider for application state
│   ├── utils/
│   │   └── sound.js             # Web Audio API sound synthesis module
│   ├── App.jsx                  # Main application orchestrator
│   ├── data.json                # Structured catalog dataset
│   ├── index.css                # Global styles and Tailwind directives
│   └── main.jsx                 # React root entry point
├── eslint.config.js             # ESLint configuration
├── package.json                 # Project dependencies and scripts
└── vite.config.js               # Vite build configuration
```

---

## Getting Started

### Prerequisites

* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Atahar-Shihab/B13-A6-DigiTools-Platform_Atahar-Shihab.git
   cd B13-A6-DigiTools-Platform_Atahar-Shihab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run linting checks:
   ```bash
   npm run lint
   ```

---

## Keyboard Navigation

| Key Binding | Function |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Toggle Command Palette |
| `Escape` | Dismiss any active modal, drawer, or search overlay |

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Atahar Shihab**  
GitHub: [@Atahar-Shihab](https://github.com/Atahar-Shihab)