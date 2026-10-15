import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiMessageCircle, FiCheck } from 'react-icons/fi';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      category: 'Licensing & Rights',
      q: 'Can I use DigiTools assets for commercial client projects?',
      a: 'Yes, 100%! All paid digital tools and boilerplates on DigiTools grant you full, non-exclusive commercial rights. You can ship client deliverables, SaaS applications, and commercial products with zero additional licensing fees.'
    },
    {
      category: 'Licensing & Rights',
      q: 'Do I get free future updates when dependencies change?',
      a: 'Absolutely. Whenever a core dependency updates (such as React 19, Tailwind CSS v4, or Figma Tokens API), our team updates the repository. You can re-download the newest version anytime directly from your dashboard.'
    },
    {
      category: 'Payments & Refunds',
      q: 'What is your refund policy if a tool doesn’t fit my project?',
      a: 'We offer an unconditional 14-day money-back guarantee on all product purchases. If an asset fails to meet your technical requirements or expectations, simply email support and we will issue a full refund within 24 hours.'
    },
    {
      category: 'Payments & Refunds',
      q: 'Which payment methods and currencies do you support?',
      a: 'We support all major global credit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, and PayPal. You can also toggle between USD ($), EUR (€), and GBP (£) directly in the navigation bar.'
    },
    {
      category: 'Technical Support',
      q: 'What formats and frameworks do the tools include?',
      a: 'Depending on the asset, downloads include raw Figma design system files (.fig), production React/Tailwind TSX source files, JSON data contracts, and ready-to-run Node.js API endpoints.'
    },
    {
      category: 'Technical Support',
      q: 'How do I access my tools after purchase?',
      a: 'Access is completely instantaneous. As soon as you confirm payment, your lifetime license keys and one-click cloud download links are displayed on screen and emailed to your inbox.'
    }
  ];

  const categories = ['All', 'Licensing & Rights', 'Payments & Refunds', 'Technical Support'];

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter((item) => item.category === activeCategory);

  const toggleAccordion = (idx) => {
    sound.click();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Everything you need to know about licensing, product files, and commercial workflows.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-200 bg-white dark:bg-gray-900"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-850"
                >
                  <span className="flex items-center gap-3">
                    <FiHelpCircle className="text-[#8B5CF6] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <FiChevronDown
                    className={`transform transition-transform duration-300 text-gray-400 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#8B5CF6]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/60 pt-4 bg-purple-50/20 dark:bg-purple-950/10 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-100 dark:border-purple-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
              <FiMessageCircle className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Have a specific technical question?</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Our senior engineering support team is online 24/7.</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.pop();
              toast.info('Connecting to Priority Engineering Support Discord...', { icon: '💬' });
            }}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Ask Support Directly
          </button>
        </div>

      </div>
    </section>
  );
};
