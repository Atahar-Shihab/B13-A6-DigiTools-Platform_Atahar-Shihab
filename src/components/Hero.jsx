import React from 'react';
import { FiPlay, FiArrowRight, FiShield, FiDownload, FiRefreshCw, FiStar, FiZap, FiCode, FiLayers } from 'react-icons/fi';
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

  const creatorAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:py-28 bg-gradient-to-b from-purple-50/80 via-white to-white dark:from-purple-950/30 dark:via-gray-950 dark:to-gray-950 bg-grid-pattern">
      {/* Dynamic Ambient Glowing Orbs */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-purple-500/15 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-36 right-10 w-[420px] h-[420px] bg-indigo-500/15 dark:bg-pink-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          
          {/* Left Column: Typography & Conversion Core */}
          <div className="w-full lg:w-1/2 text-left z-10">
            {/* Pill Tag with Pulsing Ping */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-[#8B5CF6] dark:text-purple-300 text-xs sm:text-sm font-bold mb-6 shadow-xs backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B5CF6]"></span>
              </span>
              <span>Next-Gen AI & Digital Assets Studio • Version 2.0</span>
            </div>

            {/* Shimmering Animated Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-6">
              Supercharge Your <br />
              <span className="bg-gradient-to-r from-[#8B5CF6] via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                Digital Workflow
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              Empower your projects with production-vetted AI algorithms, scalable UI design systems, and automation pipelines. Designed for developers, founders, and digital teams who ship fast.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={handleScrollToProducts}
                className="btn-glow px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <span>Explore Products</span>
                <FiArrowRight className="text-lg group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.click();
                  setIsDemoModalOpen(true);
                }}
                className="px-7 py-4 rounded-2xl bg-white/90 dark:bg-gray-900/90 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-bold text-base hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 shadow-md backdrop-blur-md cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-[#8B5CF6]">
                  <FiPlay className="text-sm ml-0.5 fill-current" />
                </div>
                <span>Watch Interactive Tour</span>
              </button>
            </div>

            {/* Social Proof Avatars Stack */}
            <div className="flex items-center gap-3.5 mb-8">
              <div className="flex -space-x-2.5 overflow-hidden">
                {creatorAvatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Active Creator"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-xs">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-current text-[11px]" />
                  ))}
                  <span className="font-bold text-gray-800 dark:text-white ml-1.5">4.95 / 5</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                  Trusted by 50,000+ creators worldwide
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200/80 dark:border-gray-800/80 text-gray-500 dark:text-gray-400 text-xs font-semibold">
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
                <FiZap className="text-amber-500 text-base shrink-0" />
                <span>Zero Latency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Multi-Layered Floating 3D Widgets */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Outer Glow Halo behind main container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform scale-105 pointer-events-none" />

              {/* Main Banner Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-gray-700/60 glass-card-pro p-2.5 sm:p-3.5 group">
                <div className="overflow-hidden rounded-2xl relative">
                  <img
                    src="/assets/banner.png"
                    alt="DigiTools Digital Ecosystem"
                    className="w-full h-auto rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Top Inner Light Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-white/20 pointer-events-none" />
                </div>
              </div>

              {/* Floating Glassmorphic 3D Widget 1: Rating & Trust (Bottom Left) */}
              <div className="absolute -bottom-8 -left-4 sm:left-2 glass-card-pro bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-purple-200/80 dark:border-purple-800/80 flex items-center gap-3.5 animate-float-slow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                  <FiZap className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">Rated #1 Digital Platform</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Used by 50,000+ teams</p>
                </div>
              </div>

              {/* Floating Glassmorphic 3D Widget 2: Production Components (Top Right) */}
              <div className="hidden sm:flex absolute -top-6 -right-4 glass-card-pro bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-purple-200/80 dark:border-purple-800/80 items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-[#8B5CF6] flex items-center justify-center">
                  <FiLayers className="text-lg" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-gray-900 dark:text-white">400+ Production Tokens</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Figma & React 19 Ready
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphic 3D Widget 3: Code Speed (Center Left) */}
              <div className="hidden md:flex absolute top-1/2 -left-8 -translate-y-1/2 glass-card-pro bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl px-3.5 py-2.5 rounded-xl shadow-xl border border-indigo-200/80 dark:border-indigo-800/80 items-center gap-2.5 animate-float-reverse">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FiCode className="text-sm" />
                </div>
                <span className="text-xs font-black text-gray-900 dark:text-white">65% Faster Time-to-Market</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
