/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

const ShopContext = createContext();

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP (£)' }
};

const PROMO_CODES = {
  DIGI20: { discount: 0.20, label: '20% OFF Masterclass Discount' },
  CREATOR15: { discount: 0.15, label: '15% OFF Creator Community' },
  WELCOME10: { discount: 0.10, label: '10% OFF Welcome Bonus' },
  MASTERCLASS: { discount: 0.25, label: '25% OFF Elite VIP Pass' }
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('digitools_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('digitools_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare List state (up to 3 products)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('digitools_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Theme state persisted
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('digitools_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Currency
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('digitools_currency') || 'USD';
    } catch {
      return 'USD';
    }
  });

  // Sound FX enabled
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('digitools_sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechStack, setSelectedTechStack] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [billingPeriod, setBillingPeriod] = useState('all');

  // Sync theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('digitools_theme', theme);
  }, [theme]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('digitools_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('digitools_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist compare list
  useEffect(() => {
    localStorage.setItem('digitools_compare', JSON.stringify(compareList));
  }, [compareList]);

  // Persist currency
  useEffect(() => {
    localStorage.setItem('digitools_currency', currency);
  }, [currency]);

  // Sync sound
  useEffect(() => {
    sound.enabled = soundEnabled;
    localStorage.setItem('digitools_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Toggle Functions
  const toggleTheme = () => {
    sound.click();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) sound.click();
      return next;
    });
  };

  // Global Keyboard Shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is actively focused on an input, textarea, or select
      const activeTag = document.activeElement ? document.activeElement.tagName.toUpperCase() : '';
      const isInputFocused = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';

      // ⌘K or Ctrl+K for Command Palette (works even in input)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Escape closes everything
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsQuickViewOpen(false);
        setIsCheckoutOpen(false);
        setIsCommandPaletteOpen(false);
        setIsDemoModalOpen(false);
        setIsCompareOpen(false);
        setIsShortcutsOpen(false);
        return;
      }

      // If user is typing in a form field, don't trigger single-key hotkeys
      if (isInputFocused) return;

      // Single-key global shortcuts
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        sound.click();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        sound.click();
        setIsCartOpen((prev) => !prev);
      } else if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        sound.click();
        setIsWishlistOpen((prev) => !prev);
      } else if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        sound.click();
        setIsCompareOpen((prev) => !prev);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        toggleTheme();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleSound();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        sound.click();
        setIsDemoModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatPrice = (amountInUSD) => {
    const current = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountInUSD * current.rate;
    return `${current.symbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
  };

  const addToCart = (product, quantity = 1) => {
    sound.pop();
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.info(`Increased quantity for ${product.name}`, { icon: '🛒' });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        toast.success(`Added ${product.name} to cart!`, { icon: '✨' });
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    sound.click();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    sound.remove();
    const removedItem = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error(`Removed ${removedItem ? removedItem.name : 'item'} from cart`, { icon: '🗑️' });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    sound.click();
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.info(`Removed ${product.name} from wishlist`, { icon: '🤍' });
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`Saved ${product.name} to wishlist!`, { icon: '❤️' });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const isInCart = (id) => cart.some((item) => item.id === id);

  // Compare Functions
  const toggleCompare = (product) => {
    sound.compare();
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.info(`Removed ${product.name} from comparison`, { icon: '⚖️' });
        return prev.filter((item) => item.id !== product.id);
      } else {
        if (prev.length >= 3) {
          toast.warn('You can compare a maximum of 3 products at a time.', { icon: '⚠️' });
          return prev;
        }
        toast.success(`Added ${product.name} to comparison!`, { icon: '⚖️' });
        return [...prev, product];
      }
    });
  };

  const removeFromCompare = (id) => {
    sound.remove();
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => {
    sound.click();
    setCompareList([]);
  };

  const isInCompare = (id) => compareList.some((item) => item.id === id);

  const applyPromo = (code) => {
    sound.click();
    const cleaned = code.trim().toUpperCase();
    if (PROMO_CODES[cleaned]) {
      setAppliedPromo({ code: cleaned, ...PROMO_CODES[cleaned] });
      toast.success(`🎉 Applied ${PROMO_CODES[cleaned].label}!`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      return true;
    } else {
      toast.error('Invalid coupon code. Try DIGI20, CREATOR15, or WELCOME10');
      return false;
    }
  };

  const removePromo = () => {
    sound.remove();
    setAppliedPromo(null);
    setPromoCode('');
    toast.info('Coupon code removed');
  };

  const openQuickView = (product) => {
    sound.click();
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Calculations
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discountAmount = appliedPromo ? rawSubtotal * appliedPromo.discount : 0;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const taxAmount = rawSubtotal > 0 ? subtotalAfterDiscount * 0.05 : 0; // 5% platform service tax
  const totalAmount = subtotalAfterDiscount + taxAmount;
  const totalItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const triggerCheckoutSuccess = () => {
    sound.success();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
    setCart([]);
    setAppliedPromo(null);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        theme,
        currency,
        currencies: CURRENCY_RATES,
        soundEnabled,
        promoCode,
        appliedPromo,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isQuickViewOpen,
        selectedProduct,
        isCommandPaletteOpen,
        isDemoModalOpen,
        isCompareOpen,
        isShortcutsOpen,
        searchQuery,
        selectedCategory,
        selectedTechStack,
        sortBy,
        viewMode,
        billingPeriod,
        rawSubtotal,
        discountAmount,
        subtotalAfterDiscount,
        taxAmount,
        totalAmount,
        totalItemCount,
        toggleTheme,
        toggleSound,
        setCurrency,
        formatPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isInCart,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        setPromoCode,
        applyPromo,
        removePromo,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsQuickViewOpen,
        setSelectedProduct,
        setIsCommandPaletteOpen,
        setIsDemoModalOpen,
        setIsCompareOpen,
        setIsShortcutsOpen,
        openQuickView,
        setSearchQuery,
        setSelectedCategory,
        setSelectedTechStack,
        setSortBy,
        setViewMode,
        setBillingPeriod,
        triggerCheckoutSuccess
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
