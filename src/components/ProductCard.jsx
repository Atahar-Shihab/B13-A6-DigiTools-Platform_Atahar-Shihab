import React from 'react';
import { 
  FiCheck, 
  FiHeart, 
  FiEye, 
  FiShoppingCart, 
  FiStar
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const {
    formatPrice,
    addToCart,
    cart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useShop();

  const inWishlist = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="glass-card-pro glow-card bg-white/90 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800/80 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 group relative overflow-hidden backdrop-blur-md">
        {/* Top Hover Gradient Light Line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Left: Icon & Tag */}
        <div className="relative shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 p-4 border border-purple-100 dark:border-purple-900/50 group-hover:scale-105 transition-transform duration-300">
          <img
            src={product.icon}
            alt={product.name}
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Center: Details */}
        <div className="flex-1 text-left w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {product.category}
            </span>
            {product.tag && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase ${product.tagType}`}>
                {product.tag}
              </span>
            )}
            <div className="flex items-center gap-1 text-amber-400 text-xs ml-auto">
              <FiStar className="fill-current text-xs" />
              <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
              <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-[#8B5CF6] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Compatibility Chips */}
          <div className="flex flex-wrap gap-1.5">
            {product.compatibility?.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Pricing & Actions */}
        <div className="w-full md:w-auto shrink-0 flex md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-left md:text-right">
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-400 font-semibold ml-1">/{product.period}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                inWishlist ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200' : 'text-gray-400'
              }`}
              title="Save to Wishlist"
            >
              <FiHeart className={`text-base ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => openQuickView(product)}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Quick Preview"
            >
              <FiEye className="text-base" />
            </button>

            <button
              onClick={() => addToCart(product)}
              className={`btn-glow px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                cartQuantity > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25'
              }`}
            >
              <FiShoppingCart className="text-sm" />
              <span>{cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Masterpiece Card)
  return (
    <div className="glass-card-pro glow-card bg-white/95 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-purple-300 dark:hover:border-purple-600/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md">
      
      {/* Top Hover Gradient Light Line */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Bar: Icon, Tag & Wishlist Button */}
      <div>
        <div className="flex justify-between items-start mb-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 p-2.5 flex items-center justify-center border border-purple-100 dark:border-purple-900/40 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <img
                src={product.icon}
                alt={product.name}
                className="w-9 h-9 object-contain"
              />
            </div>
            {cartQuantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-md">
                {cartQuantity}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {product.tag && (
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide uppercase shadow-xs ${product.tagType}`}>
                {product.tag}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                inWishlist 
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' 
                  : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <FiHeart className={`text-base ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-black text-[#8B5CF6] dark:text-purple-400 tracking-wide uppercase text-[11px]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <FiStar className="fill-current text-xs" />
            <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
            <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#8B5CF6] transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-[13px] leading-relaxed mb-5 min-h-[40px]">
          {product.description}
        </p>

        {/* Feature Checkpoints */}
        <ul className="mb-6 space-y-2 border-t border-gray-100 dark:border-gray-800/60 pt-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
              <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-2 shrink-0">
                <FiCheck className="text-[10px]" />
              </span>
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Price & Buttons */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-400 text-xs font-semibold ml-1">/{product.period}</span>
          </div>
          <button
            onClick={() => openQuickView(product)}
            className="text-xs font-bold text-[#8B5CF6] dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FiEye className="text-xs" /> Quick View
          </button>
        </div>

        <button
          onClick={() => addToCart(product)}
          className={`btn-glow w-full py-3.5 rounded-xl font-black text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            cartQuantity > 0
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
              : 'bg-gradient-to-r from-[#8B5CF6] via-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-600/25 hover:shadow-purple-600/40'
          }`}
        >
          {cartQuantity > 0 ? (
            <>
              <FiCheck className="text-base" />
              <span>Added ({cartQuantity} in Cart)</span>
            </>
          ) : (
            <>
              <FiShoppingCart className="text-base" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
