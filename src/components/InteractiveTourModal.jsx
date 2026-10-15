import React, { useState } from 'react';
import { FiX, FiCheck, FiPlay, FiZap, FiLayers, FiDownloadCloud, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const InteractiveTourModal = () => {
  const { isDemoModalOpen, setIsDemoModalOpen } = useShop();
  const [activeStep, setActiveStep] = useState(0);

  if (!isDemoModalOpen) return null;

  const steps = [
    {
      title: '1. Curated Asset Intelligence',
      badge: 'Discovery Phase',
      desc: 'Browse hundreds of vetted developer boilerplates, UI libraries, and AI automations. Filter by framework, technology stack, and licensing terms with sub-second latency.',
      icon: FiZap,
      highlight: '99.8% Code Quality Score'
    },
    {
      title: '2. Frictionless 1-Click Licensing',
      badge: 'Checkout Experience',
      desc: 'No confusing subscriptions or lock-ins. Every asset comes with instant commercial licensing rights, unlimited client deployment permissions, and automated tax invoicing.',
      icon: FiLayers,
      highlight: 'Unlimited Client Deployments'
    },
    {
      title: '3. Real-Time Cloud Sync & Updates',
      badge: 'Post-Purchase Life',
      desc: 'Stay ahead of breaking changes. When Tailwind, React, or Figma releases a major version update, your purchased kits are updated automatically in your personal vault.',
      icon: FiDownloadCloud,
      highlight: 'Lifetime Zero-Cost Upgrades'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] flex items-center justify-center">
              <FiPlay className="text-lg fill-current ml-0.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                DigiTools Masterclass Tour
              </h2>
              <p className="text-xs text-gray-400">See how modern engineering teams move 10x faster</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              setIsDemoModalOpen(false);
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Stepper Tabs */}
        <div className="flex gap-2 my-6">
          {steps.map((st, i) => (
            <button
              key={i}
              onClick={() => {
                sound.click();
                setActiveStep(i);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeStep === i
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Step {i + 1}
            </button>
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#8B5CF6] text-white">
              {steps[activeStep].badge}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <FiCheck /> {steps[activeStep].highlight}
            </span>
          </div>

          <h3 className="text-xl font-black text-gray-900 dark:text-white">
            {steps[activeStep].title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {steps[activeStep].desc}
          </p>
        </div>

        {/* Footer CTAs */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              sound.click();
              setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Previous
          </button>

          <button
            onClick={() => {
              sound.click();
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
              } else {
                setIsDemoModalOpen(false);
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>{activeStep === steps.length - 1 ? 'Start Using DigiTools' : 'Next Step'}</span>
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
