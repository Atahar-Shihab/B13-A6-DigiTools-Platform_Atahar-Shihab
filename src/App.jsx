import React, { useState } from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import productsData from './data.json';

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const addToCart = (product) => {
    const isAlreadyInCart = cart.find((item) => item.id === product.id);
    if (isAlreadyInCart) alert('This product is already in your cart!');
    else setCart([...cart, product]);
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const proceedToCheckout = () => {
    if (cart.length === 0) return alert('Your cart is empty!');
    alert('Proceeding to checkout! All items cleared.');
    setCart([]);
    setActiveTab('products');
  };

  let totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <nav className="flex justify-between items-center px-8 py-5 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-[#8B5CF6] tracking-tight">DigiTools</h1>
        <div className="hidden md:flex space-x-8 text-[15px] font-medium text-gray-600">
          <a href="#" className="hover:text-[#8B5CF6]">Products</a>
          <a href="#" className="hover:text-[#8B5CF6]">Features</a>
          <a href="#pricing" className="hover:text-[#8B5CF6]">Pricing</a>
        </div>
        <div className="flex space-x-6 items-center">
          <button onClick={() => setActiveTab('cart')} className="relative text-gray-700 hover:text-[#8B5CF6] flex items-center">
            <FiShoppingCart size={22} />
            {cart.length > 0 && <span className="bg-[#8B5CF6] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute -top-1.5 -right-2 border-2 border-white">{cart.length}</span>}
          </button>
          <button className="text-[15px] text-gray-600 font-medium hover:text-[#8B5CF6]">Login</button>
          <button className="bg-[#8B5CF6] text-white hover:bg-purple-700 px-6 py-2.5 rounded-full text-[15px] font-semibold">Get Started</button>
        </div>
      </nav>
      {/* OTHER SECTIONS WILL GO HERE */}
    </div>
  );
}
{/* ================= HERO BANNER ================= */}
      <section className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="bg-[#F3E8FF] text-[#8B5CF6] px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6 inline-flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full"></div>
            New: AI-Powered Tools Available
          </div>
          <h1 className="text-5xl md:text-[56px] font-extrabold mb-6 leading-[1.15] text-gray-900 tracking-tight">
            Supercharge Your <br/> Digital Workflow
          </h1>
          <p className="text-gray-500 mb-8 text-[17px] leading-relaxed max-w-lg">
            Access premium AI tools, design assets, templates, and productivity software—all in one place. Start creating faster today.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#8B5CF6] text-white hover:bg-purple-700 px-7 py-3 rounded-full font-semibold text-[15px]">Explore Products</button>
            <button className="border border-[#8B5CF6] text-[#8B5CF6] hover:bg-purple-50 px-7 py-3 rounded-full font-semibold text-[15px] flex items-center gap-2">Watch Demo</button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src="/assets/banner.png" alt="Hero Banner" className="w-[90%] h-auto rounded-3xl object-cover" />
        </div>
      </section>
export default App;