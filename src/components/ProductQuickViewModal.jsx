import React, { useState } from 'react';
import { 
  FiX, 
  FiCheck, 
  FiStar, 
  FiHeart, 
  FiShoppingCart, 
  FiShield, 
  FiDownload, 
  FiLayers, 
  FiCode, 
  FiCpu,
  FiSend
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';

export const ProductQuickViewModal = () => {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    selectedProduct,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useShop();

  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const [demoPrompt, setDemoPrompt] = useState('Generate a viral LinkedIn hook for modern AI SaaS');
  const [demoOutput, setDemoOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isQuickViewOpen || !selectedProduct) return null;

  const inWishlist = isInWishlist(selectedProduct.id);

  const handleSimulateAI = () => {
    sound.click();
    setIsGenerating(true);
    setDemoOutput('');
    setTimeout(() => {
      setIsGenerating(false);
      setDemoOutput(
        `🚀 "Most founders spend 40 hours building features nobody asked for.\nHere is the 3-step rapid prototyping playbook we used to scale DigiTools to 50k users:"\n\n1. Validate with zero-code mockups\n2. Automate asset delivery\n3. Iterate based on live analytics.`
      );
    }, 600);
  };

  const handleAddWithQuantity = () => {
    addToCart(selectedProduct, quantity);
    setIsQuickViewOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 p-2 flex items-center justify-center border border-purple-100 dark:border-purple-900/40">
              <img src={selectedProduct.icon} alt={selectedProduct.name} className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                {selectedProduct.name}
              </h2>
              <span className="text-xs font-semibold text-[#8B5CF6] dark:text-purple-400">
                {selectedProduct.category}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              setIsQuickViewOpen(false);
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="px-6 border-b border-gray-100 dark:border-gray-800 flex gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              sound.click();
              setActiveTab('overview');
            }}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#8B5CF6] text-[#8B5CF6] dark:text-purple-400 font-bold'
                : 'border-transparent hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('specs');
            }}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-[#8B5CF6] text-[#8B5CF6] dark:text-purple-400 font-bold'
                : 'border-transparent hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Specifications & Stack
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('interactive');
            }}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'interactive'
                ? 'border-[#8B5CF6] text-[#8B5CF6] dark:text-purple-400 font-bold'
                : 'border-transparent hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveTab('reviews');
            }}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#8B5CF6] text-[#8B5CF6] dark:text-purple-400 font-bold'
                : 'border-transparent hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Reviews ({selectedProduct.reviewsCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                  About this Product
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {selectedProduct.description} This production asset bundle has been audited for security, accessibility standards (WCAG 2.1 AAA), and peak developer experience.
                </p>
              </div>

              {/* What's Included */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  Included Features & Modules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProduct.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <FiCheck className="text-xs" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-center">
                <div>
                  <FiDownload className="mx-auto text-[#8B5CF6] text-lg mb-1" />
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Instant File Sync</p>
                  <p className="text-[10px] text-gray-500">Cloud delivered</p>
                </div>
                <div>
                  <FiShield className="mx-auto text-[#8B5CF6] text-lg mb-1" />
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Commercial Rights</p>
                  <p className="text-[10px] text-gray-500">Unlimited clients</p>
                </div>
                <div>
                  <FiCpu className="mx-auto text-[#8B5CF6] text-lg mb-1" />
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Lifetime Updates</p>
                  <p className="text-[10px] text-gray-500">No hidden fees</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                Ecosystem & Integrations
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.compatibility?.map((c) => (
                  <span key={c} className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold">
                    {c}
                  </span>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 font-mono text-xs text-gray-700 dark:text-gray-300 space-y-2 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">Version:</span>
                  <span className="font-bold">v3.4.2 (Latest Release)</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">License:</span>
                  <span className="font-bold">Full Extended Commercial License</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                  <span className="text-gray-400">File Formats:</span>
                  <span className="font-bold">.FIG, .JSON, .TSX, .CSS, API Webhooks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Support:</span>
                  <span className="font-bold text-emerald-500">24/7 Priority Discord & Email</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interactive' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                Live Interactive Sandbox
              </h4>
              <p className="text-xs text-gray-500">
                Experience the engine in action right here before adding to your workflow:
              </p>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                  Interactive Test Input:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={demoPrompt}
                    onChange={(e) => setDemoPrompt(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  <button
                    onClick={handleSimulateAI}
                    disabled={isGenerating}
                    className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <FiSend /> {isGenerating ? 'Processing...' : 'Run Test'}
                  </button>
                </div>

                {demoOutput && (
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-gray-800 dark:text-gray-200 font-mono whitespace-pre-line animate-fadeIn">
                    {demoOutput}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <div className="w-9 h-9 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Jordan Drake • Senior Product Designer</span>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    "This kit saved our design sprint at least 2 weeks. The token system and auto-layout are world class!"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                <div className="w-9 h-9 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  MK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Maya Lin • Agency Founder</span>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    "Worth every single penny. My clients were blown away by the speed and polish of our deliverables."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Quantity, Wishlist, Total Price, Add to Cart */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">Unit Price</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  {formatPrice(selectedProduct.price * quantity)}
                </span>
                <span className="text-xs text-gray-400 ml-1">/{selectedProduct.period}</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 p-1">
              <button
                onClick={() => {
                  sound.click();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm font-bold"
              >
                -
              </button>
              <span className="w-7 text-center text-xs font-bold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => {
                  sound.click();
                  setQuantity(quantity + 1);
                }}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(selectedProduct)}
              className={`p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                inWishlist ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-300' : 'text-gray-400'
              }`}
              title="Save to Wishlist"
            >
              <FiHeart className={`text-lg ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleAddWithQuantity}
              className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
