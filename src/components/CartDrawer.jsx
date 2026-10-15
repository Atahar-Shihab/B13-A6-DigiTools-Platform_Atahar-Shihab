import React, { useState } from 'react';
import { 
  FiX, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiShoppingBag, 
  FiTag, 
  FiArrowRight, 
  FiCheckCircle, 
  FiGift 
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    rawSubtotal,
    discountAmount,
    taxAmount,
    totalAmount,
    totalItemCount,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const vipThreshold = 100;
  const progressPercent = Math.min(100, Math.round((rawSubtotal / vipThreshold) * 100));
  const remainingForVip = Math.max(0, vipThreshold - rawSubtotal);

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyPromo(inputCode);
    if (ok) setInputCode('');
  };

  const handleCheckoutClick = () => {
    sound.click();
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      {/* Drawer Panel */}
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col justify-between border-l border-gray-100 dark:border-gray-800 animate-slideLeft relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] flex items-center justify-center">
              <FiShoppingBag className="text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Your Cart
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={() => {
                  sound.remove();
                  clearCart();
                }}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 px-2 py-1"
                title="Empty Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                sound.click();
                setIsCartOpen(false);
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close Cart"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Free VIP Bonus Reward Progress Bar */}
        {cart.length > 0 && (
          <div className="bg-purple-50/80 dark:bg-purple-950/40 px-6 py-3 border-b border-purple-100 dark:border-purple-900/50">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                <FiGift />
                {remainingForVip === 0
                  ? '🎉 VIP Creator Toolkit Unlocked Free!'
                  : `Add ${formatPrice(remainingForVip)} more for Free VIP Toolkit`}
              </span>
              <span className="text-purple-600 dark:text-purple-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8B5CF6] to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-400 flex items-center justify-center mb-4">
                <FiShoppingBag size={36} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                Explore our catalog of premium digital tools and add them to supercharge your workflow.
              </p>
              <button
                onClick={() => {
                  sound.click();
                  setIsCartOpen(false);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
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

                <div className="flex items-center gap-3">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white text-xs font-bold"
                    >
                      <FiMinus size={11} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white text-xs font-bold"
                    >
                      <FiPlus size={11} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer with Promo & Totals */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80 space-y-4">
            {/* Promo Code Input */}
            <div className="space-y-2">
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute inset-y-0 left-3 my-auto text-gray-400 text-xs" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter coupon (e.g. DIGI20)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] uppercase font-mono font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Quick Coupon Suggestions */}
              {!appliedPromo && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-gray-400">Try:</span>
                  <button
                    onClick={() => applyPromo('DIGI20')}
                    className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] dark:text-purple-300 font-bold hover:bg-purple-200 cursor-pointer"
                  >
                    DIGI20 (20% OFF)
                  </button>
                  <button
                    onClick={() => applyPromo('WELCOME10')}
                    className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] dark:text-purple-300 font-bold hover:bg-purple-200 cursor-pointer"
                  >
                    WELCOME10 (10% OFF)
                  </button>
                </div>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5 font-bold">
                    <FiCheckCircle />
                    <span>{appliedPromo.label} ({appliedPromo.code})</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-[11px] underline hover:text-emerald-900 font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatPrice(rawSubtotal)}
                </span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({Math.round(appliedPromo.discount * 100)}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Estimated Platform Tax (5%):</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 pt-2">
                <span>Total Amount:</span>
                <span className="text-[#8B5CF6] dark:text-purple-400">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
