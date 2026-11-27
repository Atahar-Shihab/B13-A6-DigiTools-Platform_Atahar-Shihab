import React, { useState } from 'react';
import { Search, X, ShoppingCart, Heart, Sun, Moon, DollarSign, Zap, HelpCircle, Layers, Volume2, VolumeX, TrendingUp, Key, GitCommit, Palette, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import productsData from '../data.json';
import { ProductIcon } from './ProductIcon';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    openQuickView,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    setIsShortcutsOpen,
    setIsVaultOpen,
    toggleTheme,
    colorTheme,
    setColorTheme,
    colorThemes,
    toggleSound,
    soundEnabled,
    theme,
    formatPrice
  } = useShop();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const q = query.trim().toLowerCase();
  const filteredTools = productsData.filter((item) =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );

  const filteredThemes = colorThemes.filter((t) =>
    !q ||
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    'theme palette color'.includes(q)
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
          <Search className="text-gray-400 text-lg ml-2" />
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
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X size={18} />
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
                      <div className="w-6 h-6 rounded-md bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-500 dark:text-purple-300 shrink-0">
                        <ProductIcon icon={tool.icon} id={tool.id} name={tool.name} size={14} />
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-purple-500">
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

          {/* Themes & Appearance */}
          {filteredThemes.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
                Color Themes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {filteredThemes.map((preset) => {
                  const isActive = colorTheme === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleAction(() => setColorTheme(preset.id))}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/70'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-gray-800 dark:text-gray-200">
                        <span
                          className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                          style={{
                            background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`
                          }}
                        />
                        <span className="font-semibold">{preset.name}</span>
                      </span>
                      {isActive ? (
                        <Check size={14} className="text-purple-500" />
                      ) : (
                        <Palette size={12} className="text-gray-400" />
                      )}
                    </button>
                  );
                })}
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
                <span className="flex items-center gap-2"><Zap className="text-purple-500" /> Browse Catalog</span>
                <span className="text-gray-400 text-[10px]">#products</span>
              </button>
              <button
                onClick={() => handleScrollTo('roi-calculator')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><TrendingUp className="text-indigo-500" /> ROI & Time Savings Calculator</span>
                <span className="text-gray-400 text-[10px]">#roi-calculator</span>
              </button>
              <button
                onClick={() => handleScrollTo('demo-showcase')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><Zap className="text-purple-500" /> Live Interactive Sandbox</span>
                <span className="text-gray-400 text-[10px]">#demo-showcase</span>
              </button>
              <button
                onClick={() => handleScrollTo('pricing')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><DollarSign className="text-emerald-500" /> View Pricing Plans</span>
                <span className="text-gray-400 text-[10px]">#pricing</span>
              </button>
              <button
                onClick={() => handleScrollTo('changelog')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><GitCommit className="text-purple-500" /> Platform Changelog & Releases</span>
                <span className="text-gray-400 text-[10px]">#changelog</span>
              </button>
              <button
                onClick={() => handleScrollTo('faq')}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2"><HelpCircle className="text-blue-500" /> Frequently Asked Questions</span>
                <span className="text-gray-400 text-[10px]">#faq</span>
              </button>
            </div>
          </div>

          {/* Quick App Actions */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
              Application Actions & Drawers
            </span>
            <div className="space-y-1">
              <button
                onClick={() => handleAction(() => setIsCompareOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><Layers className="text-purple-500" /> Open Product Comparison Matrix</span>
                <span className="text-gray-400 text-[10px]">Hotkey: X</span>
              </button>
              <button
                onClick={() => handleAction(() => setIsCartOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><ShoppingCart className="text-purple-500" /> Open Shopping Cart</span>
                <span className="text-gray-400 text-[10px]">Hotkey: C</span>
              </button>
              <button
                onClick={() => handleAction(() => setIsWishlistOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><Heart className="text-rose-500" /> Open Saved Wishlist</span>
                <span className="text-gray-400 text-[10px]">Hotkey: W</span>
              </button>
              <button
                onClick={() => handleAction(() => setIsVaultOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><Key className="text-purple-500" /> Open License Vault & Entitlements</span>
                <span className="text-gray-400 text-[10px]">Hotkey: V</span>
              </button>
              <button
                onClick={() => handleAction(() => setIsShortcutsOpen(true))}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2"><HelpCircle className="text-blue-500" /> Keyboard Shortcuts Guide</span>
                <span className="text-gray-400 text-[10px]">Hotkey: ?</span>
              </button>
              <button
                onClick={() => handleAction(toggleTheme)}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="text-amber-400" /> : <Moon className="text-indigo-500" />}
                  <span>Toggle Dark / Light Theme</span>
                </span>
                <span className="text-gray-400 text-[10px]">Hotkey: D</span>
              </button>
              <button
                onClick={() => handleAction(toggleSound)}
                className="w-full p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="text-purple-500" /> : <VolumeX className="text-gray-400" />}
                  <span>Toggle Audio Effects</span>
                </span>
                <span className="text-gray-400 text-[10px]">Hotkey: M</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between text-[11px] text-gray-400">
          <span>Tip: Press <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-mono">ESC</kbd> to exit</span>
          <span>⚡ DigiTools Command Engine</span>
        </div>
      </div>
    </div>
  );
};
