import React from 'react';
import { FiUsers, FiLayers, FiSmile, FiTrendingUp } from 'react-icons/fi';

export const StatsCounter = () => {
  const stats = [
    {
      id: 1,
      icon: FiUsers,
      value: '50K+',
      label: 'Active Creators',
      detail: 'Designers & Developers worldwide'
    },
    {
      id: 2,
      icon: FiLayers,
      value: '200+',
      label: 'Premium Assets',
      detail: 'Curated and updated monthly'
    },
    {
      id: 3,
      icon: FiSmile,
      value: '99.8%',
      label: 'Satisfaction Rate',
      detail: 'Backed by 14-day refund policy'
    },
    {
      id: 4,
      icon: FiTrendingUp,
      value: '4.95',
      label: 'App Store Rating',
      detail: 'From 12,000+ verified ratings'
    }
  ];

  return (
    <section className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-indigo-600 py-14 relative overflow-hidden shadow-inner">
      {/* Background Subtle Wave Texture & Ambient Rings */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-white text-center">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col items-center group transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/20 hover:border-white/40 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white mb-3 group-hover:bg-white group-hover:text-[#8B5CF6] transition-all duration-300 shadow-md">
                  <IconComponent className="text-2xl" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-1 text-white drop-shadow-sm">
                  {stat.value}
                </h3>
                <p className="text-purple-100 font-bold text-sm sm:text-base">
                  {stat.label}
                </p>
                <p className="text-purple-200/80 text-xs mt-0.5 hidden sm:block">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
