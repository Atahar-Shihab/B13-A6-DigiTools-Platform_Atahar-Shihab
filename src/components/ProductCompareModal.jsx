import React from 'react';
import { 
  FiX, 
  FiCheck, 
  FiMinus, 
  FiTrash2, 
  FiShoppingCart, 
  FiStar, 
  FiLayers, 
  FiCpu
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const ProductCompareModal = () => {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    removeFromCompare,
    clearCompare,
    formatPrice,
    addToCart,
    cart
  } = useShop();

  if (!isCompareOpen) return null;

  // Gather unique features across all compared products
  const allFeatures = Array.from(
    new Set(compareList.flatMap((product) => product.features || []))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] flex items-center justify-center font-bold">
              <FiLayers className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Side-by-Side Product Comparison
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Comparing {compareList.length} of 3 selected tools
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={() => {
                  sound.remove();
                  clearCompare();
                }}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => {
                sound.click();
                setIsCompareOpen(false);
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close comparison"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-x-auto">
          {compareList.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-400 flex items-center justify-center mx-auto text-2xl font-bold">
                ⚖️
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                No products selected for comparison
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Click the "Compare" button on any product card in the catalog to inspect specifications side-by-side.
              </p>
              <button
                onClick={() => {
                  sound.click();
                  setIsCompareOpen(false);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="min-w-[620px]">
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-100 dark:border-gray-800 items-stretch">
                <div className="flex flex-col justify-end text-left pr-4">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                    Selected Tools
                  </span>
                  <p className="text-xs text-gray-400">
                    Compare technical details, licenses, pricing, and features.
                  </p>
                </div>

                {compareList.map((product) => {
                  const inCart = cart.some((i) => i.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 flex flex-col justify-between relative group"
                    >
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Remove from comparison"
                      >
                        <FiTrash2 size={14} />
                      </button>

                      <div>
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 p-2 flex items-center justify-center border border-gray-200 dark:border-gray-700 mb-3">
                          <img src={product.icon} alt={product.name} className="w-8 h-8 object-contain" />
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 mb-1">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
                          {product.category}
                        </span>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-xl font-black text-gray-900 dark:text-white">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[11px] text-gray-400">/{product.period}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className={`w-full py-2 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                          inCart
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-[#8B5CF6] hover:bg-purple-700'
                        }`}
                      >
                        <FiShoppingCart size={13} />
                        <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  );
                })}

                {/* Empty placeholder slot if < 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400"
                  >
                    <FiCpu className="text-2xl mb-2 opacity-50" />
                    <p className="text-xs font-semibold">Select another product</p>
                    <span className="text-[10px] opacity-75 mt-0.5">Up to 3 items</span>
                  </div>
                ))}
              </div>

              {/* Specification Rows */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {/* Rating Row */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Rating & Reviews</span>
                  {compareList.map((product) => (
                    <div key={product.id} className="flex items-center gap-1 text-amber-400 font-bold">
                      <FiStar className="fill-current text-xs" />
                      <span className="text-gray-900 dark:text-white">{product.rating}</span>
                      <span className="text-gray-400 font-normal text-[11px]">({product.reviewsCount} reviews)</span>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} />
                  ))}
                </div>

                {/* Pricing / Period Row */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Billing Model</span>
                  {compareList.map((product) => (
                    <div key={product.id} className="text-gray-800 dark:text-gray-200 font-semibold">
                      {product.period === 'One-Time' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          One-Time Lifetime
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                          Monthly Subscription
                        </span>
                      )}
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} />
                  ))}
                </div>

                {/* Compatibility Row */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Tech Compatibility</span>
                  {compareList.map((product) => (
                    <div key={product.id} className="flex flex-wrap gap-1">
                      {product.compatibility?.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} />
                  ))}
                </div>

                {/* Commercial License Row */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-center">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Commercial License</span>
                  {compareList.map((product) => (
                    <div key={product.id} className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <FiCheck />
                      <span>Full Commercial Rights</span>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} />
                  ))}
                </div>

                {/* Features Matrix Breakdown */}
                <div className="pt-3">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                    Feature Capabilities
                  </p>
                  {allFeatures.map((feat, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 py-2.5 items-center border-t border-gray-50 dark:border-gray-800/50">
                      <span className="text-gray-600 dark:text-gray-400 font-medium truncate" title={feat}>
                        {feat}
                      </span>
                      {compareList.map((product) => {
                        const hasFeature = product.features?.includes(feat);
                        return (
                          <div key={product.id} className="flex items-center">
                            {hasFeature ? (
                              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <FiCheck size={12} />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center">
                                <FiMinus size={12} />
                              </span>
                            )}
                          </div>
                        );
                      })}
                      {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                        <div key={i} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
