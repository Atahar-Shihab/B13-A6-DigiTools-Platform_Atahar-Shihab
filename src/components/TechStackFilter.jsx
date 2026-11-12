import React from 'react';
import { FiCode, FiX, FiCheck } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import productsData from '../data.json';

export const TechStackFilter = () => {
  const { selectedTechStack, setSelectedTechStack } = useShop();

  // Distinct list of popular tech stacks
  const popularStacks = [
    { name: 'All Stacks', id: 'All' },
    { name: 'React', id: 'React' },
    { name: 'Tailwind CSS', id: 'Tailwind' },
    { name: 'Figma', id: 'Figma' },
    { name: 'Next.js', id: 'Next.js' },
    { name: 'Stripe', id: 'Stripe' },
    { name: 'Node.js', id: 'Node.js' },
    { name: 'Canva', id: 'Canva' },
    { name: 'TypeScript', id: 'TypeScript' }
  ];

  // Calculate count for each stack
  const getCountForStack = (stackId) => {
    if (stackId === 'All') return productsData.length;
    return productsData.filter((p) =>
      p.compatibility?.some((c) => c.toLowerCase().includes(stackId.toLowerCase()))
    ).length;
  };

  const handleSelect = (stackId) => {
    sound.toggle();
    setSelectedTechStack(stackId);
  };

  return (
    <div className="py-6 border-b border-gray-100 dark:border-gray-800/80 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2 text-xs font-black text-gray-800 dark:text-gray-200">
          <FiCode className="text-[#8B5CF6] text-sm" />
          <span>Filter by Technology Compatibility:</span>
        </div>

        {selectedTechStack !== 'All' && (
          <button
            onClick={() => handleSelect('All')}
            className="text-xs font-semibold text-[#8B5CF6] dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <FiX size={12} /> Clear tech filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {popularStacks.map((stack) => {
          const count = getCountForStack(stack.id);
          const isSelected = selectedTechStack === stack.id;
          return (
            <button
              key={stack.id}
              onClick={() => handleSelect(stack.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-indigo-600 text-white shadow-md shadow-purple-500/20 scale-102'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/80'
              }`}
            >
              {isSelected && <FiCheck size={12} />}
              <span>{stack.name}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                isSelected ? 'bg-white/25 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
