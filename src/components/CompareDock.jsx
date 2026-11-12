import React from 'react';
import { FiLayers, FiX, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const CompareDock = () => {
  const {
    compareList,
    setIsCompareOpen,
    removeFromCompare,
    clearCompare
  } = useShop();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-slideUp">
      <div className="glass-card-pro bg-white/95 dark:bg-gray-900/95 border border-purple-200/80 dark:border-purple-800/80 rounded-2xl p-2.5 sm:px-4 sm:py-3 shadow-2xl flex items-center gap-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/30">
            <FiLayers />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-gray-900 dark:text-white leading-tight">
              Compare Tools
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              {compareList.length}/3 selected
            </p>
          </div>
        </div>

        {/* Thumbnail Avatars */}
        <div className="flex items-center gap-1.5 pl-1 sm:border-l sm:border-gray-200 dark:sm:border-gray-800 sm:pl-3">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="relative group w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1"
            >
              <img src={product.icon} alt={product.name} className="w-5 h-5 object-contain" />
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                title="Remove"
              >
                <FiX size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.compare();
              setIsCompareOpen(true);
            }}
            className="btn-glow px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Compare ({compareList.length})</span>
            <FiArrowRight size={13} />
          </button>

          <button
            onClick={() => {
              sound.remove();
              clearCompare();
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Clear comparison list"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
