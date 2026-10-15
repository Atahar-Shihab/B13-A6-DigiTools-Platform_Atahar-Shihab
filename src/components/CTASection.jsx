import React, { useState } from 'react';
import { FiMail, FiArrowRight, FiCheckCircle, FiGift } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

export const CTASection = () => {
  const { applyPromo } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.warn('Please enter a valid email address');
      return;
    }
    sound.success();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
    setIsSubscribed(true);
    toast.success('🎉 Welcome! Coupon WELCOME10 unlocked (10% OFF)!');
  };

  const handleScrollTo = (id) => {
    sound.click();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-indigo-600 py-20 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 text-center relative z-10 max-w-3xl">
        <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs inline-block mb-4">
          Instant Launch Studio
        </span>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
          Ready To Transform Your Workflow?
        </h2>

        <p className="text-purple-100 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Join over 50,000+ engineers, designers, and high-velocity creators building next-generation digital products today.
        </p>

        {/* Newsletter / Coupon Unlock Box */}
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/20 mb-8 max-w-xl mx-auto shadow-xl">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiMail className="absolute inset-y-0 left-3.5 my-auto text-purple-200" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to unlock 10% coupon..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/15 border border-white/25 text-white placeholder-purple-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-white text-[#8B5CF6] hover:bg-purple-50 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span>Unlock 10% Off</span>
                <FiArrowRight />
              </button>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left animate-fadeIn">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-2xl text-emerald-300 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Coupon Code: WELCOME10</p>
                  <p className="text-[11px] text-purple-200">10% discount has been unlocked for your order</p>
                </div>
              </div>
              <button
                onClick={() => applyPromo('WELCOME10')}
                className="px-4 py-2 rounded-xl bg-amber-300 text-amber-950 font-black text-xs hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
              >
                Apply Coupon Now
              </button>
            </div>
          )}
        </div>

        {/* Quick Nav Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => handleScrollTo('products')}
            className="bg-white text-[#8B5CF6] hover:bg-purple-50 font-bold text-xs sm:text-sm rounded-2xl px-8 py-3.5 transition-all shadow-md cursor-pointer"
          >
            Explore All 200+ Products
          </button>
          <button
            onClick={() => handleScrollTo('pricing')}
            className="border border-white/40 text-white hover:bg-white/15 font-bold text-xs sm:text-sm rounded-2xl px-8 py-3.5 transition-all cursor-pointer"
          >
            Compare Pricing Plans
          </button>
        </div>

        <p className="text-xs text-purple-200/90 font-medium">
          14-Day Money-Back Guarantee • 100% Commercial License • Instant Cloud Sync
        </p>
      </div>
    </section>
  );
};
