import React from 'react';
import { FiX, FiCommand, FiShoppingBag, FiHeart, FiLayers, FiSun, FiVolume2, FiHelpCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const KeyboardShortcutsModal = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useShop();

  if (!isShortcutsOpen) return null;

  const shortcutGroups = [
    {
      category: 'Navigation & Discovery',
      items: [
        { keys: ['⌘', 'K'], label: 'Open Command Palette & Fuzzy Search' },
        { keys: ['?'], label: 'Open / Close Keyboard Shortcuts' },
        { keys: ['T'], label: 'Launch Interactive Platform Tour' },
        { keys: ['ESC'], label: 'Dismiss active modal or drawer' }
      ]
    },
    {
      category: 'Commerce & Workflow',
      items: [
        { keys: ['C'], label: 'Toggle Shopping Cart Drawer' },
        { keys: ['W'], label: 'Toggle Saved Wishlist' },
        { keys: ['X'], label: 'Toggle Product Comparison Matrix' }
      ]
    },
    {
      category: 'Customization & Audio',
      items: [
        { keys: ['D'], label: 'Toggle Dark / Light Theme Mode' },
        { keys: ['M'], label: 'Mute / Unmute Interactive Audio Cues' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] flex items-center justify-center font-bold">
              <FiHelpCircle className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-gray-400">Navigate DigiTools like a power user</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              setIsShortcutsOpen(false);
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-3">
                {group.category}
              </span>
              <div className="space-y-2">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-1 text-xs font-mono font-bold bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400">
            Press <kbd className="px-1.5 py-0.5 font-mono text-[11px] bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">ESC</kbd> to return to workspace
          </p>
        </div>
      </div>
    </div>
  );
};
