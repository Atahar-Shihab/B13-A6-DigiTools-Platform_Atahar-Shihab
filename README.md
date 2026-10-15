# 🚀 DigiTools Platform — Masterclass Frontend Showcase

Welcome to **DigiTools**, an enterprise-grade, high-performance digital asset marketplace and interactive SaaS platform engineered with **React 19**, **Tailwind CSS v4**, **Framer Motion**, and modern frontend design systems.

🌐 **Live Deployment:** [digi-tools-platform-shihab.vercel.app](https://digi-tools-platform-shihab.vercel.app)

---

## 🌟 Masterclass Highlights & Key Features

### 1. 🛍️ Dual-Mode E-Commerce Architecture
* **Slide-Over Cart Drawer:** Instant off-canvas cart sheet accessible anywhere on the page with quantity controllers (`+`/`-`), trash actions, and live financial breakdown.
* **Inline Catalog Cart:** Full dual-tab product/cart switching matching the original design requirements.
* **Tiered Free Bonus Progress Bar:** Interactive unlock meter (*"Add $X more to unlock the VIP Creator Bundle!"*).
* **Promo Engine:** Dynamic coupon validation (`DIGI20` for 20% off, `CREATOR15`, `WELCOME10`) with live discount recalculation and confetti celebrations.

### 2. ⚡ Command Palette (`⌘K` / `Ctrl+K`) & Keyboard Navigation
* Deep instant fuzzy search across digital products, categories, and technical descriptions.
* Quick section shortcuts (`#products`, `#demo-showcase`, `#pricing`, `#reviews`, `#faq`).
* Hotkey actions: toggle theme, trigger sound FX, open drawers, switch currencies.

### 3. 💱 Multi-Currency & 🌗 Theme Engine
* Real-time currency conversion across **USD ($)**, **EUR (€)**, and **GBP (£)** with persistent `localStorage` synchronization.
* Complete **Dark & Light Mode** support respecting OS preference and user toggle with zero layout shift.

### 4. 🎛️ Interactive Developer & Designer Sandbox
* **AI Prompt Studio:** Test and generate simulated high-converting copy and prompt pipelines in real time.
* **Design System Token Inspector:** Live theme accent color switcher, border-radius token tweaker, and style variant previewer.
* **Real-Time Edge Metrics:** Live dashboard ticker displaying edge response latency (12ms) and 99.99% system uptime.

### 5. 💳 3-Step Checkout Simulation & License Generator
* Realistic credit card interactive preview that updates cardholder name and number as you type.
* Multi-payment simulation (Credit Card, Apple Pay, PayPal).
* **Automated Order Receipt:** Produces a unique order ID (`DIGI-XXXXXX`), itemized breakdown, lifetime license keys (`PRO-XXXX-XXXX-LIFETIME`), and one-click receipt printing (`window.print()`).

### 6. 🔍 Deep Filtering, Sorting & View Modes
* Category selector pills (*All, AI & Automation, UI/UX Design, Development, Business & Marketing*).
* Instant search query filter with instant clear.
* Billing period filters (*All, Monthly, One-Time*).
* Sort by: Featured, Price (Low to High), Price (High to Low), Highest Rated, Most Popular.
* Dual View Modes: **Grid View** (responsive 3-column cards) vs **List View** (horizontal cards).

### 7. 🔊 Web Audio API Sound Effects (Haptic Micro-interactions)
* Synthesized subtle audio feedback for button clicks, cart pops, removals, and checkout fanfares.
* Easily toggled on/off from the navigation bar.

---

## 🛠️ Technology Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern reactive state management & component lifecycle |
| **Vite** | Blazing-fast build tool and module bundler |
| **Tailwind CSS v4** | Next-gen CSS engine with custom `@theme` variables and utility styling |
| **DaisyUI v5** | Tailored UI components and accessible primitives |
| **Lucide Icons & React Icons** | Modern, retina-ready vector iconography |
| **Canvas Confetti** | Celebratory particle physics engine for checkout and promo unlocks |
| **React-Toastify** | High-polish notification alerts and toast toasts |
| **Web Audio API** | Real-time procedural audio synthesis for micro-interactions |

---

## 📁 Modular Project Structure

```
src/
├── assets/                  # Hero and vector graphics
├── components/
│   ├── CartDrawer.jsx       # Slide-over cart sheet & coupon validation
│   ├── CheckoutModal.jsx    # 3-step checkout simulation & license generator
│   ├── CommandPalette.jsx   # ⌘K instant search & shortcut palette
│   ├── CTASection.jsx       # Newsletter subscription & coupon unlock
│   ├── FAQSection.jsx       # Searchable accordion FAQ
│   ├── FeatureShowcase.jsx  # 3-step onboarding & live interactive sandbox
│   ├── FilterBar.jsx        # Category tabs, live search, sorting, view toggle
│   ├── Footer.jsx           # System status, links, and creator credits
│   ├── Hero.jsx             # Ambient glow, live ticker, and trust badges
│   ├── InteractiveTourModal.jsx # Multi-step platform walkthrough tour
│   ├── Navbar.jsx           # Glassmorphic header with currency/theme/cart controls
│   ├── PricingSection.jsx   # Monthly/Annual billing switcher & comparison matrix
│   ├── ProductCard.jsx      # Responsive card with Grid/List support & quick view
│   ├── ProductQuickViewModal.jsx # Multi-tab detailed modal with sandbox & reviews
│   ├── StatsCounter.jsx     # High-impact creator statistics
│   ├── TestimonialsSection.jsx # Verified social proof & review submission
│   └── WishlistDrawer.jsx   # Saved items & 1-click move to cart
├── context/
│   └── ShopContext.jsx      # Unified global state (Cart, Wishlist, Theme, Currency)
├── utils/
│   └── sound.js             # Web Audio API sound synthesis engine
├── App.jsx                  # Main application orchestrator
├── data.json                # Curated digital tools dataset with specs and ratings
└── index.css                # Tailwind CSS v4 styling & dark mode variants
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘K` or `Ctrl + K` | Open Command Palette & Quick Search |
| `Escape` | Close any active modal, drawer, or search palette |

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Atahar-Shihab/B13-A6-DigiTools-Platform_Atahar-Shihab.git

# Navigate to project folder
cd B13-A6-DigiTools-Platform_Atahar-Shihab

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run lint checks
npm run lint
```

---

## 👤 Author & Credits
Designed and engineered with ❤️ by **Atahar Shihab**.
Portfolio Masterclass Showcase Project.