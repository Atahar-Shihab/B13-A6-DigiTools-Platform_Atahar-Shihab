import React from 'react';
import { FiX, FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setIsCartOpen
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    sound.pop();
    wishlist.forEach((product) => {
      addToCart(product);
    });
    toast.success(`Moved ${wishlist.length} saved tools to your cart!`, { icon: '🛒' });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col justify-between border-l border-gray-100 dark:border-gray-800 animate-slideLeft relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
              <FiHeart className="text-lg fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Saved Wishlist
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              setIsWishlistOpen(false);
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-300 flex items-center justify-center mb-4">
                <FiHeart size={36} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                Click the heart icon on any digital tool to save it for later or compare features.
              </p>
              <button
                onClick={() => {
                  sound.click();
                  setIsWishlistOpen(false);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 cursor-pointer"
              >
                Discover Tools
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 p-2 flex items-center justify-center border border-gray-200 dark:border-gray-700 shrink-0">
                    <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#8B5CF6] dark:text-purple-400">
                      {formatPrice(item.price)} <span className="text-[10px] text-gray-400">/{item.period}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item);
                    }}
                    className="p-2 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                    title="Move to Cart"
                  >
                    <FiShoppingCart size={14} />
                  </button>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3.5 rounded-2xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FiShoppingCart />
              <span>Move All to Cart</span>
              <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
