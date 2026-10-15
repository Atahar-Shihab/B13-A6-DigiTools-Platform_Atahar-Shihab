import React from 'react';
import { 
  FiSearch, 
  FiX, 
  FiGrid, 
  FiList, 
  FiSliders, 
  FiCheck,
  FiRotateCcw
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const FilterBar = ({ categories, totalResults }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    billingPeriod,
    setBillingPeriod
  } = useShop();

  const handleCategorySelect = (category) => {
    sound.click();
    setSelectedCategory(category);
  };

  const resetFilters = () => {
    sound.remove();
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setBillingPeriod('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || billingPeriod !== 'all' || sortBy !== 'featured';

  return (
    <div className="mb-10 space-y-5">
      {/* Search and Secondary Filter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <FiSearch className="text-lg" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, templates, or features..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:bg-white dark:focus:bg-gray-950 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                sound.click();
                setSearchQuery('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear Search"
            >
              <FiX className="text-base" />
            </button>
          )}
        </div>

        {/* Right Controls: Billing Type, Sort Dropdown & View Mode */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Billing Type Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300">
            <button
              onClick={() => {
                sound.click();
                setBillingPeriod('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingPeriod === 'all'
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                  : 'hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All Pricing
            </button>
            <button
              onClick={() => {
                sound.click();
                setBillingPeriod('monthly');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                  : 'hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                sound.click();
                setBillingPeriod('onetime');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingPeriod === 'onetime'
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                  : 'hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              One-Time
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                sound.click();
                setSortBy(e.target.value);
              }}
              className="appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl px-3 py-2 pr-7 cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              aria-label="Sort products by"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[10px] text-gray-400">
              ▼
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => {
                sound.click();
                setViewMode('grid');
              }}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={() => {
                sound.click();
                setViewMode('list');
              }}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="List View"
              aria-label="List View"
            >
              <FiList size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Category Pills Slider / Row */}
      <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/25 scale-102'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span>{totalResults} {totalResults === 1 ? 'tool' : 'tools'} found</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[#8B5CF6] dark:text-purple-400 hover:underline cursor-pointer"
            >
              <FiRotateCcw className="text-xs" /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
