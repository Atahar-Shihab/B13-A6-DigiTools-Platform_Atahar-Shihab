import React, { useState } from 'react';
import { 
  FiClock, 
  FiDollarSign, 
  FiTrendingUp, 
  FiZap, 
  FiArrowRight, 
  FiCheckCircle 
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const RoiCalculator = () => {
  const { formatPrice } = useShop();

  const [projectsCount, setProjectsCount] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [complexityTier, setComplexityTier] = useState('standard'); // 'starter', 'standard', 'advanced'

  const hoursPerTier = {
    starter: 45,
    standard: 95,
    advanced: 160
  };

  const hoursSavedPerProject = hoursPerTier[complexityTier];
  const totalHoursSaved = projectsCount * hoursSavedPerProject;
  const totalMoneySaved = totalHoursSaved * hourlyRate;
  const avgToolInvestment = 149; // Approximate average annual tool cost
  const netSavings = Math.max(0, totalMoneySaved - avgToolInvestment);
  const roiMultiplier = Math.round(totalMoneySaved / avgToolInvestment);

  const handleSliderChange = (setter, value) => {
    sound.click();
    setter(value);
  };

  const scrollToProducts = () => {
    sound.click();
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50/40 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
            Value & Efficiency Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Interactive ROI & Time Savings Calculator
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Discover how many engineering hours and thousands of dollars DigiTools pre-built assets save your product team each year.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="glass-card-pro bg-white/95 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Columns: Interactive Sliders */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Slider 1: Projects Per Year */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                    Projects Built Annually:
                  </label>
                  <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] dark:text-purple-300 font-black text-sm font-mono">
                    {projectsCount} {projectsCount === 1 ? 'project' : 'projects'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={projectsCount}
                  onChange={(e) => handleSliderChange(setProjectsCount, Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                  <span>1 Project (Solo)</span>
                  <span>10 Projects (Studio)</span>
                  <span>20+ Projects (Agency)</span>
                </div>
              </div>

              {/* Slider 2: Hourly Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                    Estimated Hourly Rate ($ / hr):
                  </label>
                  <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] dark:text-purple-300 font-black text-sm font-mono">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => handleSliderChange(setHourlyRate, Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                  <span>$30/hr</span>
                  <span>$100/hr (Mid-Level)</span>
                  <span>$200/hr (Senior / Agency)</span>
                </div>
              </div>

              {/* Complexity Tier Segmented Control */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 block">
                  Product Architecture Scope:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'starter', label: 'Starter Kit', time: '~45 hrs saved' },
                    { id: 'standard', label: 'Full System', time: '~95 hrs saved' },
                    { id: 'advanced', label: 'Enterprise OS', time: '~160 hrs saved' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => {
                        sound.click();
                        setComplexityTier(tier.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        complexityTier === tier.id
                          ? 'border-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40 shadow-xs'
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${complexityTier === tier.id ? 'text-[#8B5CF6] dark:text-purple-300' : 'text-gray-800 dark:text-gray-200'}`}>
                        {tier.label}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {tier.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Development Time Comparison Bar */}
              <div className="pt-2">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Velocity Comparison (Average Project Sprint):
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                      <span>Traditional Scratch Coding:</span>
                      <span className="font-bold text-rose-500">180 Hours</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                      <div className="bg-rose-400 h-3 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                      <span>With DigiTools Production Boilerplates:</span>
                      <span className="font-bold text-emerald-500">25 Hours (~86% Faster)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all duration-500" style={{ width: '14%' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Computed Financial & Hourly Summary Cards */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#8B5CF6] via-purple-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full border border-purple-400/30 relative overflow-hidden">
              {/* Background Light Sweep */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Annual Projected Savings
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-300 text-amber-950 shadow-xs">
                    {roiMultiplier}x Estimated ROI
                  </span>
                </div>

                {/* Big Stat 1: Total Money Saved */}
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-white block">
                    {formatPrice(totalMoneySaved)}
                  </span>
                  <span className="text-xs text-purple-200 font-medium">
                    Estimated annual cost savings in developer hours
                  </span>
                </div>

                {/* Key Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                    <div className="flex items-center gap-1.5 text-purple-200 text-xs mb-1">
                      <FiClock />
                      <span>Hours Saved</span>
                    </div>
                    <span className="text-2xl font-black">{totalHoursSaved} hrs</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                    <div className="flex items-center gap-1.5 text-purple-200 text-xs mb-1">
                      <FiTrendingUp />
                      <span>Net Gain</span>
                    </div>
                    <span className="text-2xl font-black">{formatPrice(netSavings)}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-purple-100 mb-8">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-300 text-sm shrink-0" />
                    <span>Instant ROI in less than 4 project days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-300 text-sm shrink-0" />
                    <span>Eliminates boilerplate repetition & tech debt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-300 text-sm shrink-0" />
                    <span>Unlimited commercial client usage rights</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToProducts}
                className="btn-glow w-full py-4 rounded-2xl bg-white text-[#8B5CF6] hover:bg-gray-50 font-black text-xs sm:text-sm shadow-xl shadow-purple-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock Productivity Tools</span>
                <FiArrowRight />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
