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
    <section className="bg-gradient-to-r from-[#8B5CF6] via-purple-600 to-indigo-600 py-12 relative overflow-hidden shadow-inner">
      {/* Background Subtle Wave Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 text-white text-center">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white mb-3 group-hover:bg-white group-hover:text-[#8B5CF6] transition-all">
                  <IconComponent className="text-2xl" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-purple-100 font-bold text-sm sm:text-base">
                  {stat.label}
                </p>
                <p className="text-purple-200/70 text-xs mt-0.5 hidden sm:block">
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
