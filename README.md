# DigiTools Platform

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://digi-tools-platform-shihab.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

DigiTools is an enterprise-grade digital asset marketplace, developer toolkit showcase, and interactive SaaS platform built with **React 19**, **Tailwind CSS v4**, and **DaisyUI**. Designed with deep attention to UI/UX craft, it combines responsive design systems, micro-interactions, accessible keyboard navigation, and real-time state synchronization.

🌐 **Live Application:** [digi-tools-platform-shihab.vercel.app](https://digi-tools-platform-shihab.vercel.app)

---

## Overview

DigiTools provides digital creators, frontend engineers, and technology leaders with a streamlined interface for evaluating and acquiring curated digital assets. The platform features an interactive product comparison matrix, a dynamic ROI and engineering time savings calculator, technology ecosystem filtering, a global keyboard command palette, real-time multi-currency conversions, and an end-to-end checkout simulation with automated license key generation.

---

## Key Features

### 1. Catalog, Ecosystem Filtering & Comparison Matrix
* **Categorized Discovery:** Filter tools across *AI & Automation*, *UI/UX Design*, *Development*, and *Business & Marketing*.
* **Tech Ecosystem Filter:** Quick-filter assets by underlying technology stack (React, Tailwind CSS, Figma, Next.js, Stripe, Node.js, Canva, TypeScript).
* **Side-by-Side Comparison Matrix:** Compare up to 3 digital tools across technical features, licensing models, compatibility badges, ratings, and pricing.
* **Floating Comparison Dock:** Seamlessly track selected tools from any scroll position with one-click comparison launch and item removal.
* **Direct Asset Sharing:** One-click direct link copy with anchor hashtags and haptic notification feedback.
* **Dual View Modes:** Responsive 3-column grid view and horizontal list layout.
* **Quick View Modal:** Deep inspection of technical specifications, file formats (.FIG, .TSX, .JSON), compatibility details, and verified user reviews.
* **Wishlist Management:** Persistent client favorites list with single-click migration to the shopping cart.

### 2. Dual-Mode Cart & Simulated Checkout
* **Slide-Over Sheet Cart:** Instant off-canvas drawer accessible across all sections with quantity controllers (`+`/`-`), trash actions, and live financial breakdown.
* **Inline Catalog Cart:** Embedded dual-tab catalog switcher for toggling between browsing and cart management.
* **Tiered Incentive Progress Bar:** Dynamic reward meter calculating remaining spend to unlock complimentary toolkits.
* **Promotional Discount Engine:** Integrated coupon validator supporting promo codes (`DIGI20`, `CREATOR15`, `WELCOME10`, `MASTERCLASS`) with automated tax and subtotal computation.
* **3-Step Checkout Simulation:** Interactive credit card visualization, billing verification, and order completion modal generating unique Order IDs and lifetime license keys with one-click receipt printing (`window.print()`).
* **Instant Vault Sync:** Automatically registers completed order licenses into the persistent client-side License Vault upon checkout completion.

### 3. Digital License Vault & Entitlements
* **Persistent License Storage:** Tracks purchased licenses, order reference numbers, acquisition dates, and validity tiers with `localStorage` persistence.
* **License Key Inspector:** One-click copy utility for cryptographically styled production keys (`PRO-XXXX-XXXX-LIFETIME`).
* **Offline Package Downloader:** Simulated archive packager (.zip bundle) with progress indicator, Web Audio completion chime, and toast feedback.
* **Starter License Claimer:** Allows new developers to claim a complimentary community developer starter license with a single click.

### 4. Developer CLI Terminal Scaffolder
* **Multi-Package Manager Commands:** Generates tailored starter commands across **pnpm**, **npm**, **yarn**, **bun**, and **curl**.
* **Simulated Terminal Sandbox:** Interactive shell window with realistic logging stream (`resolving checksums`, `scaffolding directory`, `verifying SHA-256 signatures`).
* **One-Click Product Scaffolding:** Launch terminal commands directly from any product card or quick view modal.

### 5. Platform Release Changelog & Timeline
* **Interactive Release History:** Visual timeline displaying version milestones (`v2.0.0` through `v2.4.0`), release dates, and category tags.
* **Filter by Tag:** Filter releases by Major Feature, Interactive Tools, Polish & UX, E-Commerce, or Core Architecture.
* **Expandable Feature Diffs:** Collapsible release notes highlighting key architectural updates and security audits.
* **RSS Feed Copy:** One-click copy for the platform's release atom feed.

### 6. Interactive ROI & Time Savings Calculator
* **Customizable Parameters:** Interactive sliders for annual project volume, developer/designer hourly rates, and architecture complexity tiers.
* **Live Computed Metrics:** Real-time calculation of annual engineering hours saved, monetary savings, net return, and estimated ROI multipliers.
* **Sprint Velocity Visualization:** Visual comparison comparing scratch development timelines (months) against accelerated workflows (days).

### 7. Interactive Developer Sandbox
* **AI Prompt Studio:** Test and preview generated copy variations with simulated response streams.
* **Design System Token Inspector:** Live customization controls for primary theme colors, corner radii, and button style variants (solid, outline, glass).
* **System Metrics Monitor:** Real-time telemetry simulation displaying edge latency and platform uptime metrics.

### 8. Keyboard Navigation, Quick-Jump Sub-Nav & Command Palette (`⌘K` / `Ctrl+K`)
* **Sticky Quick-Jump Sub-Navigation:** Header pill bar with real-time scroll-spy dynamically highlighting the active section.
* **Global Command Palette:** Instant fuzzy search across catalog items, site anchors, drawers, and modal views.
* **Power User Hotkeys:** Dedicated single-key shortcuts (`C` for cart, `W` for wishlist, `V` for vault, `X` for compare, `D` for theme, `M` for audio, `T` for tour, `?` for shortcuts).
* **Shortcuts Reference Sheet:** Categorized dialog overview triggered anytime via `?` (Shift + /).

### 9. Personalization & Accessibility
* **Multi-Currency Engine:** Seamless conversion between **USD ($)**, **EUR (€)**, and **GBP (£)** with persistent client storage.
* **Theme System:** Native dark and light mode support respecting system color scheme preferences with zero layout shifts.
* **Web Audio Synthesis:** Gentle synthesized audio cues powered by the Web Audio API for interactive feedback, toggleable from the navigation bar.
* **Scroll Depth Progress & Back-to-Top:** Top-mounted gradient indicator displaying active scroll position and a floating circular progress meter button.

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
│   │   ├── ChangelogSection.jsx # Visual platform release timeline and notes
│   │   ├── CheckoutModal.jsx    # 3-step checkout simulation and receipt generator
│   │   ├── CliTerminalModal.jsx # Multi-package manager terminal scaffolding modal
│   │   ├── CommandPalette.jsx   # Global keyboard-driven command palette
│   │   ├── CompareDock.jsx      # Floating bottom dock for compared assets
│   │   ├── CTASection.jsx       # Newsletter subscription & coupon unlock
│   │   ├── FAQSection.jsx       # Categorized accordion FAQ
│   │   ├── FeatureShowcase.jsx  # Onboarding walkthrough & interactive sandbox
│   │   ├── FilterBar.jsx        # Search, category pills, and sorting controls
│   │   ├── Footer.jsx           # System status, links, and attribution
│   │   ├── Hero.jsx             # Hero section with 3D floating feature cards
│   │   ├── InteractiveTourModal.jsx # Multi-step platform walkthrough
│   │   ├── KeyboardShortcutsModal.jsx # Global keyboard shortcuts cheat sheet
│   │   ├── LicenseVaultDrawer.jsx# Digital license vault & package downloader drawer
│   │   ├── LiveSalesTicker.jsx  # Floating social proof notification
│   │   ├── Navbar.jsx           # Sticky glassmorphic navigation header
│   │   ├── PricingSection.jsx   # Plan comparisons with annual/monthly toggle
│   │   ├── ProductCard.jsx      # Responsive card supporting grid and list modes
│   │   ├── ProductCompareModal.jsx # Side-by-side spec comparison table
│   │   ├── ProductQuickViewModal.jsx # Detailed multi-tab product modal
│   │   ├── RoiCalculator.jsx    # Interactive ROI & engineering time savings calculator
│   │   ├── ScrollProgressBar.jsx# Viewport scroll depth indicator
│   │   ├── ScrollToTop.jsx      # Floating back-to-top button with circular SVG meter
│   │   ├── SectionNav.jsx       # Sticky sub-navigation quick-jump bar with scroll spy
│   │   ├── StatsCounter.jsx     # Platform statistics
│   │   ├── TechStackFilter.jsx  # Technology ecosystem filter bar
│   │   ├── TestimonialsSection.jsx # User reviews with rating filters
│   │   └── WishlistDrawer.jsx   # Saved items drawer
│   ├── context/
│   │   └── ShopContext.jsx      # Global context provider for application state
│   ├── data/
│   │   └── changelog.json       # Version release milestones & highlight notes
│   ├── utils/
│   │   └── sound.js             # Web Audio API sound synthesis module
│   ├── App.jsx                  # Main application orchestrator
│   ├── data.json                # Structured catalog dataset (12 production assets)
│   ├── index.css                # Global styles, Tailwind directives, and keyframes
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
| `?` or `Shift + /` | Open Keyboard Shortcuts Reference |
| `C` | Toggle Shopping Cart Drawer |
| `W` | Toggle Saved Wishlist |
| `V` | Open Digital License Vault & Entitlements |
| `X` | Toggle Product Comparison Matrix |
| `D` | Toggle Dark / Light Theme |
| `M` | Mute / Unmute Interactive Audio |
| `T` | Launch Platform Tour |
| `Escape` | Dismiss active modal, drawer, or search overlay |

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Atahar Shihab**  
GitHub: [@Atahar-Shihab](https://github.com/Atahar-Shihab)
