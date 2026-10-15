import React from 'react';
import { FiPlay, FiArrowRight, FiShield, FiDownload, FiRefreshCw, FiStar, FiZap } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const Hero = () => {
  const { setIsDemoModalOpen } = useShop();

  const handleScrollToProducts = () => {
    sound.click();
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:py-24 bg-gradient-to-b from-purple-50/60 via-white to-white dark:from-purple-950/20 dark:via-gray-950 dark:to-gray-950">
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Headline and CTAs */}
          <div className="w-full lg:w-1/2 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 text-[#8B5CF6] dark:text-purple-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
              </span>
              <span>Next-Gen AI & Digital Assets Studio • Over 50,000+ Creators</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
              Supercharge Your <br />
              <span className="bg-gradient-to-r from-[#8B5CF6] via-indigo-600 to-purple-500 bg-clip-text text-transparent">
                Digital Workflow
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              Access curated high-performance AI engines, production UI systems, marketing toolkits, and automation pipelines. Built from the ground up for modern developers, designers, and fast-growing founders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleScrollToProducts}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Explore Products</span>
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.click();
                  setIsDemoModalOpen(true);
                }}
                className="px-7 py-4 rounded-2xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-bold text-base hover:-translate-y-0.5 transition-all flex items-center gap-2.5 shadow-sm cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-[#8B5CF6]">
                  <FiPlay className="text-sm ml-0.5 fill-current" />
                </div>
                <span>Watch Interactive Tour</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <FiDownload className="text-[#8B5CF6] text-base shrink-0" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-[#8B5CF6] text-base shrink-0" />
                <span>Commercial Rights</span>
              </div>
              <div className="flex items-center gap-2">
                <FiRefreshCw className="text-[#8B5CF6] text-base shrink-0" />
                <span>Lifetime Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-amber-400 text-base fill-current shrink-0" />
                <span>4.9 / 5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Overlays */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Banner Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gradient-to-tr from-purple-100/50 to-indigo-100/50 dark:from-gray-900 dark:to-purple-950/40 p-2 sm:p-3">
                <img
                  src="/assets/banner.png"
                  alt="DigiTools Digital Ecosystem"
                  className="w-full h-auto rounded-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Floating Glassmorphic Widget 1: Creator Rating */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3.5 animate-bounce-slow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-[#8B5CF6]">
                  <FiZap className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Rated #1 Digital Platform</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Used by 50,000+ teams</p>
                </div>
              </div>

              {/* Floating Glassmorphic Widget 2: Live Purchase Alert */}
              <div className="hidden sm:flex absolute -top-4 -right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-gray-900 dark:text-white">Live Activity</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Someone just grabbed UI/UX System</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
