import React, { useState, useEffect } from 'react';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiSun, 
  FiMoon, 
  FiVolume2, 
  FiVolumeX, 
  FiSearch, 
  FiMenu, 
  FiX, 
  FiCommand,
  FiZap
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const Navbar = () => {
  const {
    wishlist,
    theme,
    toggleTheme,
    currency,
    currencies,
    setCurrency,
    soundEnabled,
    toggleSound,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCommandPaletteOpen,
    totalItemCount
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Interactive Demo', href: '#demo-showcase' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.click();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav bg-white/85 dark:bg-gray-950/85 shadow-md border-b border-gray-100 dark:border-gray-800/80 py-3.5'
          : 'bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800/50 py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault();
            sound.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <FiZap className="text-xl" />
          </div>
          <div>
            <span className="text-2xl font-black bg-gradient-to-r from-[#8B5CF6] via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              DigiTools
            </span>
            <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
              PRO
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-7 text-[15px] font-semibold text-gray-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#8B5CF6] dark:hover:text-purple-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B5CF6] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sound.click();
              setIsCommandPaletteOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-colors border border-gray-200 dark:border-gray-700"
            title="Open Command Palette (Ctrl+K)"
          >
            <FiSearch className="text-sm" />
            <span className="hidden md:inline">Quick Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600 font-mono shadow-xs">
              ⌘K
            </kbd>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => {
                sound.click();
                setCurrency(e.target.value);
              }}
              className="appearance-none bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl px-2.5 py-1.5 pr-6 cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              aria-label="Currency Selector"
            >
              {Object.keys(currencies).map((cur) => (
                <option key={cur} value={cur}>
                  {currencies[cur].name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-500">
              ▼
            </div>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={soundEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <FiVolume2 size={18} className="text-[#8B5CF6]" /> : <FiVolumeX size={18} />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} className="text-indigo-600" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              sound.click();
              setIsWishlistOpen(true);
            }}
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="View Wishlist"
            aria-label="Wishlist"
          >
            <FiHeart size={20} className={wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              sound.click();
              setIsCartOpen(true);
            }}
            className="relative p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#8B5CF6] dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all flex items-center"
            title="View Cart"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart size={20} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8B5CF6] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-4 pb-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <button
              onClick={() => {
                sound.click();
                setIsCommandPaletteOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <FiSearch /> Quick Search (⌘K)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
