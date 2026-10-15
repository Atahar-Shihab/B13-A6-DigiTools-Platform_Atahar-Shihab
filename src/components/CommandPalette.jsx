import React, { useState } from 'react';
import { 
  FiSearch, 
  FiX, 
  FiShoppingCart, 
  FiHeart, 
  FiSun, 
  FiMoon, 
  FiDollarSign, 
  FiZap,
  FiHelpCircle
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import productsData from '../data.json';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    openQuickView,
    setIsCartOpen,
    setIsWishlistOpen,
    toggleTheme,
    theme,
    formatPrice
  } = useShop();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const filteredTools = productsData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (callback) => {
    sound.click();
    setIsCommandPaletteOpen(false);
    callback();
  };

  const handleScrollTo = (id) => {
    sound.click();
    setIsCommandPaletteOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <FiSearch className="text-gray-400 text-lg ml-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search digital tools..."
            className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => {
              sound.click();
              setIsCommandPaletteOpen(false);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Results / Commands Body */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Tools Matching Search */}
          {filteredTools.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
                Digital Tools ({filteredTools.length})
              </span>
              <div className="space-y-1">
                {filteredTools.slice(0, 5).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleAction(() => openQuickView(tool))}
                    className="w-full p-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                      <div>
                        <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#8B5CF6]">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-2">({tool.category})</span>
                      </div>
                    </div>
                    <span className="font-mono text-gray-500 font-bold">{formatPrice(tool.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Navigations */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
              Navigation Shortcuts
            </span>
            <div className="space-y-1">
              <button
                onClick={() => handleScrollTo('products')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiZap className="text-[#8B5CF6]" /> Browse Catalog</span>
                <span className="text-gray-400 text-[10px]">#products</span>
              </button>
              <button
                onClick={() => handleScrollTo('demo-showcase')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiZap className="text-[#8B5CF6]" /> Live Interactive Sandbox</span>
                <span className="text-gray-400 text-[10px]">#demo-showcase</span>
              </button>
              <button
                onClick={() => handleScrollTo('pricing')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiDollarSign className="text-emerald-500" /> View Pricing Plans</span>
                <span className="text-gray-400 text-[10px]">#pricing</span>
              </button>
              <button
                onClick={() => handleScrollTo('faq')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiHelpCircle className="text-blue-500" /> Frequently Asked Questions</span>
                <span className="text-gray-400 text-[10px]">#faq</span>
              </button>
            </div>
          </div>

          {/* Quick App Actions */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
              Application Actions
            </span>
            <div className="space-y-1">
              <button
                onClick={() => handleAction(() => setIsCartOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiShoppingCart className="text-purple-500" /> Open Shopping Cart</span>
                <span className="text-gray-400 text-[10px]">Drawer</span>
              </button>
              <button
                onClick={() => handleAction(() => setIsWishlistOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><FiHeart className="text-rose-500" /> Open Saved Wishlist</span>
                <span className="text-gray-400 text-[10px]">Drawer</span>
              </button>
              <button
                onClick={() => handleAction(toggleTheme)}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon className="text-indigo-500" />}
                  <span>Toggle Dark / Light Theme</span>
                </span>
                <span className="text-gray-400 text-[10px]">Current: {theme}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between text-[11px] text-gray-400">
          <span>Tip: Press <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-mono">ESC</kbd> anytime to exit</span>
          <span>⚡ DigiTools Command Engine</span>
        </div>
      </div>
    </div>
  );
};
