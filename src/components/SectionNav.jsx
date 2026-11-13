import React, { useState, useEffect } from 'react';
import { 
  FiGrid, 
  FiCpu, 
  FiPercent, 
  FiDollarSign, 
  FiGitCommit, 
  FiStar, 
  FiHelpCircle 
} from 'react-icons/fi';
import { sound } from '../utils/sound';

const NAV_ITEMS = [
  { id: 'products', label: 'Toolkits', icon: FiGrid },
  { id: 'tech-stack', label: 'Tech Stack', icon: FiCpu },
  { id: 'roi-calculator', label: 'ROI Engine', icon: FiPercent },
  { id: 'pricing', label: 'Pricing Plans', icon: FiDollarSign },
  { id: 'changelog', label: 'Changelog', icon: FiGitCommit },
  { id: 'reviews', label: 'Reviews', icon: FiStar },
  { id: 'faq', label: 'FAQ', icon: FiHelpCircle }
];

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState('products');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    sound.click();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-18 z-30 py-2.5 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none mx-auto sm:mx-0 w-full sm:w-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#8B5CF6] text-white shadow-sm shadow-purple-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={12} className={isActive ? 'text-white' : 'text-[#8B5CF6]'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick status pill on right (desktop only) */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Catalog Online: 12 Production Toolkits</span>
        </div>
      </div>
    </div>
  );
};
