import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { sound } from '../utils/sound';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollY > 300) {
        setIsVisible(true);
        if (totalHeight > 0) {
          setScrollProgress(Math.min(100, Math.round((scrollY / totalHeight) * 100)));
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // SVG circle circumference: r=18, C = 2 * PI * 18 = 113.1
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
      <button
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full glass-card-pro bg-white/95 dark:bg-gray-900/95 border border-purple-200/80 dark:border-purple-800/80 shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] dark:hover:text-purple-400 hover:scale-110 transition-all duration-300 group cursor-pointer"
        title={`Back to top (${scrollProgress}%)`}
        aria-label="Scroll to top"
      >
        {/* SVG Circular Meter */}
        <svg className="w-12 h-12 absolute -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-gray-200 dark:stroke-gray-800"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-[#8B5CF6] transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <FiArrowUp className="text-base group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
