import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Sun, Moon, Volume2, VolumeX, Search, Menu, X, Zap, Layers, HelpCircle, Key, Palette, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const Navbar = () => {
  const {
    wishlist,
    compareList,
    purchasedLicenses,
    theme,
    setTheme,
    toggleTheme,
    colorTheme,
    setColorTheme,
    colorThemes,
    currency,
    currencies,
    setCurrency,
    soundEnabled,
    toggleSound,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    setIsShortcutsOpen,
    setIsCommandPaletteOpen,
    setIsVaultOpen,
    totalItemCount
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [themeMenuOpen]);

  const activeThemeObj = colorThemes.find((t) => t.id === colorTheme) || colorThemes[0];

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'ROI Calculator', href: '#roi-calculator' },
    { name: 'Interactive Demo', href: '#demo-showcase' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Changelog', href: '#changelog' },
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Zap className="text-xl" />
          </div>
          <div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              DigiTools
            </span>
            <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
              PRO
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-[14px] xl:text-[15px] font-semibold text-gray-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sound.click();
              setIsCommandPaletteOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="text-sm" />
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
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={soundEnabled ? 'Disable Sound Effects (M)' : 'Enable Sound Effects (M)'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 size={18} className="text-purple-500" /> : <VolumeX size={18} />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode (D)' : 'Switch to Dark Mode (D)'}
            aria-label="Toggle Light or Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>

          {/* Multi-Theme Palette Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => {
                sound.click();
                setThemeMenuOpen((prev) => !prev);
              }}
              className={`relative p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                themeMenuOpen
                  ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-500 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={`Theme: ${activeThemeObj.name}`}
              aria-label="Open Theme Selector"
              aria-expanded={themeMenuOpen}
            >
              <Palette size={18} className="text-purple-500" />
              <span
                className="w-2 h-2 rounded-full ring-1 ring-white dark:ring-gray-900"
                style={{ backgroundColor: activeThemeObj.primary }}
              />
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-68 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-3.5 z-50 animate-fadeIn">
                <div className="flex items-center justify-between px-1 pb-2.5 mb-2.5 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Appearance & Theme
                  </span>
                  <span className="text-[10px] font-mono text-purple-500 font-bold">
                    {activeThemeObj.name}
                  </span>
                </div>

                {/* Light / Dark Segmented Mode */}
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
                  <button
                    onClick={() => {
                      sound.click();
                      setTheme('light');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Sun size={13} className={theme === 'light' ? 'text-amber-500' : ''} />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.click();
                      setTheme('dark');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-gray-900 text-white shadow-xs'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Moon size={13} className={theme === 'dark' ? 'text-purple-400' : ''} />
                    <span>Dark</span>
                  </button>
                </div>

                {/* Curated Color Themes */}
                <div className="space-y-1">
                  {colorThemes.map((preset) => {
                    const isSelected = colorTheme === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setColorTheme(preset.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/70'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/70 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-5 h-5 rounded-full shadow-xs ring-2 ring-white dark:ring-gray-800 shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`
                            }}
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                              {preset.name}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
                              {preset.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && <Check size={14} className="text-purple-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Compare Button (When items added) */}
          {compareList.length > 0 && (
            <button
              onClick={() => {
                sound.compare();
                setIsCompareOpen(true);
              }}
              className="relative p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all cursor-pointer"
              title="Compare Products (X)"
              aria-label="Compare Products"
            >
              <Layers size={18} />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {compareList.length}
              </span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => {
              sound.click();
              setIsWishlistOpen(true);
            }}
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title="View Wishlist (W)"
            aria-label="Wishlist"
          >
            <Heart size={19} className={wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* License Vault Button */}
          <button
            onClick={() => {
              sound.click();
              setIsVaultOpen(true);
            }}
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 hover:text-purple-500 transition-colors cursor-pointer"
            title="License Vault & Entitlements (V)"
            aria-label="License Vault"
          >
            <Key size={18} />
            {purchasedLicenses.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {purchasedLicenses.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              sound.click();
              setIsCartOpen(true);
            }}
            className="relative p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all flex items-center cursor-pointer"
            title="View Cart (C)"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={19} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Keyboard Shortcuts Help Button */}
          <button
            onClick={() => {
              sound.click();
              setIsShortcutsOpen(true);
            }}
            className="hidden md:flex p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard Shortcuts"
          >
            <HelpCircle size={18} />
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="block py-2 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-purple-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            {/* Mobile Color Theme Bar */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                <Palette size={14} className="text-purple-500" />
                <span>Theme</span>
              </span>
              <div className="flex items-center gap-2">
                {colorThemes.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setColorTheme(preset.id)}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      colorTheme === preset.id
                        ? 'scale-115 ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-gray-900'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`
                    }}
                    title={preset.name}
                    aria-label={`Select ${preset.name} theme`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                sound.click();
                setIsVaultOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-sm font-bold text-purple-500 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
            >
              <Key /> License Vault ({purchasedLicenses.length})
            </button>
            <button
              onClick={() => {
                sound.click();
                setIsCommandPaletteOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <Search /> Quick Search (⌘K)
            </button>
            <button
              onClick={() => {
                sound.click();
                setIsShortcutsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-xs font-bold text-purple-500 dark:text-purple-300"
            >
              <HelpCircle /> View Keyboard Shortcuts (?)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
