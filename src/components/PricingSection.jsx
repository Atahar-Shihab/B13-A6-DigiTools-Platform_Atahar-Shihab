import React, { useState } from 'react';
import { FiCheck, FiX, FiHelpCircle, FiChevronDown, FiChevronUp, FiZap } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const PricingSection = () => {
  const { formatPrice, setIsCheckoutOpen } = useShop();
  const [isAnnual, setIsAnnual] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

  const toggleBilling = () => {
    sound.click();
    setIsAnnual(!isAnnual);
  };

  const starterPrice = 0;
  const proPrice = isAnnual ? 22 : 29;
  const enterprisePrice = isAnnual ? 74 : 99;

  const handleSelectPlan = (planName) => {
    sound.pop();
    toast.success(`Selected the ${planName} Plan!`, { icon: '🚀' });
    setIsCheckoutOpen(true);
  };

  const featureMatrix = [
    { name: 'Access to Free Production Assets', starter: true, pro: true, enterprise: true },
    { name: 'Commercial Client License', starter: false, pro: true, enterprise: true },
    { name: 'Unlimited Figma Variables & Tokens', starter: false, pro: true, enterprise: true },
    { name: 'React 19 & Tailwind v4 Source Code', starter: false, pro: true, enterprise: true },
    { name: 'AI Generation API Webhooks', starter: false, pro: true, enterprise: true },
    { name: 'Priority Cloud Sync & Updates', starter: false, pro: true, enterprise: true },
    { name: 'Team Multi-Seat Collaboration', starter: false, pro: false, enterprise: true },
    { name: 'Dedicated Account Manager & SLA', starter: false, pro: false, enterprise: true },
    { name: 'Custom Brand Whitelabeling', starter: false, pro: false, enterprise: true }
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Simple, Transparent Plans
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
            Choose the license tier that fits your scale. Upgrade, downgrade, or cancel anytime with zero friction.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleBilling}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={toggleBilling}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/25'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-300 text-amber-900">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-16">
          
          {/* Card 1: Starter */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Starter</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  Free Forever
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Perfect for hobbyists and students exploring modern frontend toolkits.
              </p>

              <div className="mb-6 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                  {formatPrice(starterPrice)}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1.5">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {['Access to 10 free UI toolkits', 'Basic Figma components', 'Community Discord support', 'Personal non-commercial use'].map((f, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <FiCheck className="text-emerald-500 mr-2.5 text-base shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Starter')}
              className="w-full py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-bold text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* Card 2: Pro (Highlighted) */}
          <div className="bg-gradient-to-b from-purple-500 via-[#8B5CF6] to-indigo-600 text-white rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-2xl relative transform lg:-translate-y-3">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-amber-300 text-amber-950 text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
              Most Popular • Best Value
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h3 className="text-2xl font-black">Pro Creator</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  Unlimited
                </span>
              </div>
              <p className="text-xs text-purple-100 mb-6">
                Best for freelancers and frontend developers shipping client apps.
              </p>

              <div className="mb-6 flex items-baseline">
                <span className="text-5xl font-black">
                  {formatPrice(proPrice)}
                </span>
                <span className="text-xs text-purple-200 font-bold ml-1.5">/month {isAnnual ? '(billed annually)' : ''}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Access to all 200+ premium kits',
                  'Full commercial licensing rights',
                  'Figma tokens + React 19 source code',
                  'AI prompt studio & webhooks',
                  'Lifetime updates & priority sync'
                ].map((f, i) => (
                  <li key={i} className="flex items-center text-xs font-medium text-white">
                    <div className="w-4 h-4 rounded-full bg-white text-[#8B5CF6] flex items-center justify-center mr-2.5 shrink-0">
                      <FiCheck className="text-[10px]" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Pro Creator')}
              className="w-full py-4 rounded-xl bg-white text-[#8B5CF6] hover:bg-gray-50 font-black text-xs sm:text-sm shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
            >
              Start 14-Day Free Pro Trial
            </button>
          </div>

          {/* Card 3: Enterprise */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Agency Team</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] dark:text-purple-300">
                  Full Scale
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Engineered for design agencies, software studios, and high-volume teams.
              </p>

              <div className="mb-6 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                  {formatPrice(enterprisePrice)}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1.5">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Pro Creator',
                  'Unlimited seats & team vault',
                  'Custom white-label branding',
                  'Dedicated Slack/Discord private channel',
                  '99.99% SLA uptime guarantee'
                ].map((f, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <FiCheck className="text-emerald-500 mr-2.5 text-base shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Agency Team')}
              className="w-full py-3.5 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Get Agency Access
            </button>
          </div>

        </div>

        {/* Collapsible Feature Comparison Table */}
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => {
              sound.click();
              setShowMatrix(!showMatrix);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <span>{showMatrix ? 'Hide Full Feature Matrix' : 'Compare All Features in Detail'}</span>
            {showMatrix ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {showMatrix && (
            <div className="mt-8 overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md text-left animate-fadeIn">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <th className="p-4 font-bold text-gray-900 dark:text-white">Feature / Deliverable</th>
                    <th className="p-4 font-bold text-center text-gray-900 dark:text-white">Starter</th>
                    <th className="p-4 font-bold text-center text-[#8B5CF6] dark:text-purple-400">Pro</th>
                    <th className="p-4 font-bold text-center text-gray-900 dark:text-white">Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {featureMatrix.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">{item.name}</td>
                      <td className="p-4 text-center">
                        {item.starter ? <FiCheck className="mx-auto text-emerald-500 text-base" /> : <FiX className="mx-auto text-gray-300 dark:text-gray-600 text-base" />}
                      </td>
                      <td className="p-4 text-center bg-purple-50/30 dark:bg-purple-950/10">
                        {item.pro ? <FiCheck className="mx-auto text-[#8B5CF6] text-base font-bold" /> : <FiX className="mx-auto text-gray-300 text-base" />}
                      </td>
                      <td className="p-4 text-center">
                        {item.enterprise ? <FiCheck className="mx-auto text-emerald-500 text-base" /> : <FiX className="mx-auto text-gray-300 text-base" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
