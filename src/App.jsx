import React, { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingBag, FiArrowRight, FiTrash2, FiPlus, FiMinus, FiRotateCcw, FiTag, FiGift } from 'react-icons/fi';

import productsData from './data.json';
import { ShopProvider, useShop } from './context/ShopContext';
import { sound } from './utils/sound';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InteractiveTourModal } from './components/InteractiveTourModal';
import { CommandPalette } from './components/CommandPalette';
import { FeatureShowcase } from './components/FeatureShowcase';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

function MainShopContent() {
  const {
    cart,
    theme,
    searchQuery,
    selectedCategory,
    sortBy,
    viewMode,
    billingPeriod,
    rawSubtotal,
    discountAmount,
    taxAmount,
    totalAmount,
    totalItemCount,
    appliedPromo,
    applyPromo,
    removePromo,
    formatPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    setBillingPeriod
  } = useShop();

  const [activeCatalogTab, setActiveCatalogTab] = useState('products');
  const [cartCouponInput, setCartCouponInput] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All'];
    productsData.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Billing period filter
        if (billingPeriod === 'monthly' && product.period.toLowerCase() !== 'mo') {
          return false;
        }
        if (billingPeriod === 'onetime' && product.period.toLowerCase() !== 'one-time') {
          return false;
        }
        // Search query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCategory = product.category?.toLowerCase().includes(q);
          const matchFeatures = product.features?.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCategory && !matchFeatures) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'popular') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        return a.id - b.id; // default featured
      });
  }, [searchQuery, selectedCategory, sortBy, billingPeriod]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!cartCouponInput.trim()) return;
    if (applyPromo(cartCouponInput)) {
      setCartCouponInput('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === 'dark' ? 'dark' : 'light'}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Animated Metrics / Stats Counter */}
      <StatsCounter />

      {/* Main Digital Tools Catalog Section */}
      <section id="products" className="container mx-auto px-4 sm:px-8 py-20">
        
        {/* Section Heading & Products / Cart Tab Switcher */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
            Digital Asset Store
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Premium Digital Tools & Frameworks
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Choose from our curated collection of production-ready digital products designed to boost your productivity, code quality, and creative output.
          </p>

          {/* Classic Dual Tab Switcher */}
          <div className="bg-gray-100 dark:bg-gray-850 p-1.5 rounded-full inline-flex border border-gray-200 dark:border-gray-800 shadow-xs">
            <button
              onClick={() => {
                sound.click();
                setActiveCatalogTab('products');
              }}
              className={`px-8 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCatalogTab === 'products'
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Browse Products
            </button>
            <button
              onClick={() => {
                sound.click();
                setActiveCatalogTab('cart');
              }}
              className={`px-8 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'cart'
                  ? 'bg-[#8B5CF6] text-white shadow-md shadow-purple-500/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>View Cart</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeCatalogTab === 'cart' ? 'bg-white/25 text-white' : 'bg-purple-100 dark:bg-purple-900/60 text-[#8B5CF6] dark:text-purple-300'
              }`}>
                {totalItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: PRODUCTS BROWSER */}
        {activeCatalogTab === 'products' && (
          <div>
            {/* Filter, Search, and Sort Bar */}
            <FilterBar
              categories={categories}
              totalResults={filteredProducts.length}
            />

            {/* Product Cards Grid or List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  No matching digital tools found
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  We couldn't find any tools matching your search criteria or category filter.
                </p>
                <button
                  onClick={() => {
                    sound.click();
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSortBy('featured');
                    setBillingPeriod('all');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                >
                  <FiRotateCcw /> Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-w-5xl mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="list" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INLINE CART VIEW */}
        {activeCatalogTab === 'cart' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiShoppingBag className="text-[#8B5CF6]" />
                <span>Your Selected Products</span>
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    sound.remove();
                    clearCart();
                  }}
                  className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-400 flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Your cart is completely empty</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Browse through our 8+ production toolkits and click "Add to Cart" to start building your checkout order.
                </p>
                <button
                  onClick={() => {
                    sound.click();
                    setActiveCatalogTab('products');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Explore Products Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                          <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#8B5CF6] dark:text-purple-400 font-semibold mt-0.5">
                            {formatPrice(item.price)} <span className="text-[11px] text-gray-400">/{item.period}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200 dark:border-gray-700">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="text-sm font-black text-gray-900 dark:text-white min-w-[70px] text-right">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Remove from Cart"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <FiTag className="absolute inset-y-0 left-3 my-auto text-gray-400 text-xs" />
                      <input
                        type="text"
                        value={cartCouponInput}
                        onChange={(e) => setCartCouponInput(e.target.value)}
                        placeholder="Discount code (e.g. DIGI20, WELCOME10)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>✓ {appliedPromo.label} ({appliedPromo.code})</span>
                      <button onClick={removePromo} className="underline text-[11px] text-emerald-700">Remove</button>
                    </div>
                  )}
                </div>

                {/* Total Price & Checkout */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-5 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{formatPrice(rawSubtotal)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Discount ({Math.round(appliedPromo.discount * 100)}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Platform Tax (5%):</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg sm:text-xl font-black text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>Grand Total:</span>
                    <span className="text-2xl text-[#8B5CF6] dark:text-purple-400">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.click();
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Proceed To Checkout Simulation</span>
                  <FiArrowRight />
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 3 Steps Onboarding & Live Interactive Developer Sandbox */}
      <FeatureShowcase />

      {/* Pricing Plans & Comparison Matrix */}
      <PricingSection />

      {/* Verified Reviews & Testimonials Slider */}
      <TestimonialsSection />

      {/* Interactive FAQ Section */}
      <FAQSection />

      {/* Newsletter & Launch CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickViewModal />
      <CheckoutModal />
      <InteractiveTourModal />
      <CommandPalette />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <MainShopContent />
    </ShopProvider>
  );
}

export default App;