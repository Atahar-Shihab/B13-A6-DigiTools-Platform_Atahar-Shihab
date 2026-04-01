import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import productsData from './data.json';

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const addToCart = (product) => {
    const isAlreadyInCart = cart.find((item) => item.id === product.id);
    if (isAlreadyInCart) {
      toast.info('This product is already in your cart!');
    } else {
      setCart([...cart, product]);
      toast.success('Successfully added to cart!');
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.error('Product removed from cart.');
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.warn('Your cart is empty!');
      return;
    }
    toast.success('Proceeding to checkout! All items cleared.');
    setCart([]);
    setActiveTab('products');
  };

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <nav className="flex justify-between items-center px-8 py-5 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-[#8B5CF6] tracking-tight">DigiTools</h1>
        
        <div className="hidden md:flex space-x-8 text-[15px] font-medium text-gray-600">
          <a href="#" className="hover:text-[#8B5CF6] transition-colors">Products</a>
          <a href="#" className="hover:text-[#8B5CF6] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#8B5CF6] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#8B5CF6] transition-colors">Testimonials</a>
          <a href="#" className="hover:text-[#8B5CF6] transition-colors">FAQ</a>
        </div>

        <div className="flex space-x-6 items-center">
          <button onClick={() => setActiveTab('cart')} className="relative text-gray-700 hover:text-[#8B5CF6] transition-colors flex items-center">
            <FiShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="bg-[#8B5CF6] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute -top-1.5 -right-2 border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
          <button className="text-[15px] text-gray-600 font-medium hover:text-[#8B5CF6] transition-colors">Login</button>
          <button className="bg-[#8B5CF6] text-white hover:bg-purple-700 px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors">Get Started</button>
        </div>
      </nav>

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
            <button className="bg-[#8B5CF6] text-white hover:bg-purple-700 px-7 py-3 rounded-full font-semibold text-[15px] transition-colors">
              Explore Products
            </button>
            <button className="border border-[#8B5CF6] text-[#8B5CF6] hover:bg-purple-50 px-7 py-3 rounded-full font-semibold text-[15px] flex items-center gap-2 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src="/assets/banner.png" alt="Hero Banner" className="w-[90%] h-auto rounded-3xl object-cover" />
        </div>
      </section>

      <section className="bg-[#8B5CF6] py-14">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-center items-center text-white text-center">
            
            <div className="flex-1">
              <h2 className="text-5xl font-extrabold mb-2">50K+</h2>
              <p className="text-purple-200 text-[15px] font-medium">Active Users</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-purple-400 opacity-50"></div>

            <div className="flex-1 mt-8 md:mt-0">
              <h2 className="text-5xl font-extrabold mb-2">200+</h2>
              <p className="text-purple-200 text-[15px] font-medium">Premium Tools</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-purple-400 opacity-50"></div>

            <div className="flex-1 mt-8 md:mt-0">
              <h2 className="text-5xl font-extrabold mb-2">4.9</h2>
              <p className="text-purple-200 text-[15px] font-medium">Rating</p>
            </div>

          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-20">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Digital Tools</h2>
          <p className="text-gray-500 text-[15px] mb-8 max-w-xl mx-auto">Choose from our curated collection of premium digital products designed to boost your productivity and creativity.</p>
          
          <div className="bg-gray-50 p-1.5 rounded-full inline-flex border border-gray-100">
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-8 py-2.5 rounded-full font-bold text-[14px] transition-all ${activeTab === 'products' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('cart')}
              className={`px-8 py-2.5 rounded-full font-bold text-[14px] transition-all ${activeTab === 'cart' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productsData.map((product) => {
              const inCart = cart.find(item => item.id === product.id);

              return (
                <div key={product.id} className="card bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-8 rounded-2xl hover:shadow-xl transition-shadow flex flex-col">
                  <div className="flex justify-between items-start mb-5">
                    <img src={product.icon} alt={product.name} className="w-11 h-11" />
                    {product.tag && (
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${product.tagType}`}>
                        {product.tag}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-6 flex-grow">{product.description}</p>
                  
                  <p className="mb-6 flex items-baseline">
                    <span className="text-[28px] font-extrabold text-gray-900">${product.price}</span>
                    <span className="text-gray-400 text-[14px] font-medium ml-1">/{product.period}</span>
                  </p>

                  <ul className="mb-8 space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-[14px] text-gray-600">
                        <FiCheck className="text-green-500 mr-2.5 text-[16px]" /> {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => addToCart(product)}
                    className={`w-full py-3 rounded-xl text-white font-bold text-[15px] transition-colors mt-auto ${inCart ? 'bg-green-500 hover:bg-green-600' : 'bg-[#8B5CF6] hover:bg-purple-700'}`}
                  >
                    {inCart ? 'Added to Cart' : 'Buy Now'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-3xl mx-auto bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-12 text-[15px] font-medium">Your cart is completely empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-[#F8F9FA] p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2.5 rounded-full shadow-sm">
                        <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[15px] text-gray-900">{item.name}</h4>
                        <p className="text-[13px] text-gray-500 font-medium">${item.price}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-[#FF477E] hover:text-pink-700 text-[13px] font-medium px-4 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-10 mb-6 px-1">
                  <span className="text-gray-500 font-medium text-[15px]">Total:</span>
                  <span className="text-2xl font-extrabold text-gray-900">${totalPrice}</span>
                </div>

                <button 
                  onClick={proceedToCheckout}
                  className="w-full bg-[#8B5CF6] hover:bg-purple-700 text-white py-3.5 rounded-xl font-bold text-[15px] transition-colors"
                >
                  Proceed To Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="bg-[#F8F9FA] py-24 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Get Started In 3 Steps</h2>
        <p className="text-gray-500 text-[15px] mb-14">Start using premium digital tools in minutes, not hours.</p>
        
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative">
             <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">01</div>
             <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-5">
               <img src="/assets/user.png" alt="User" className="w-7 h-7" />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-2">Create Account</h3>
             <p className="text-gray-500 text-[14px] leading-relaxed">Sign up for free in seconds. No credit card required to get started.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative">
             <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">02</div>
             <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-5">
               <img src="/assets/package.png" alt="Package" className="w-7 h-7" />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-2">Choose Products</h3>
             <p className="text-gray-500 text-[14px] leading-relaxed">Browse our catalog and select the tools that fit your needs.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative">
             <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">03</div>
             <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-5">
               <img src="/assets/rocket.png" alt="Rocket" className="w-7 h-7" />
             </div>
             <h3 className="font-bold text-lg text-gray-900 mb-2">Start Creating</h3>
             <p className="text-gray-500 text-[14px] leading-relaxed">Download and start using your premium tools immediately.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-[15px] mb-16">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center text-left">
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-[22px] font-bold mb-1 text-gray-900">Starter</h3>
              <p className="text-gray-500 mb-6 text-[14px]">Perfect for getting started</p>
              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-500 font-medium text-[15px] ml-1">/Month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Access to 10 free tools', 'Basic templates', 'Community support', '1 project per month'].map((f, i) => (
                  <li key={i} className="flex items-center text-gray-600 text-[14px] font-medium"><FiCheck className="text-green-500 mr-3 text-lg" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3.5 rounded-xl bg-[#8B5CF6] text-white font-bold text-[15px] hover:bg-purple-700 transition-colors">Get Started Free</button>
            </div>

            <div className="bg-[#8B5CF6] text-white p-10 md:p-12 rounded-3xl shadow-xl relative transform md:-translate-y-4">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FEF08A] text-yellow-800 text-[11px] font-bold px-4 py-1 rounded-full shadow-sm">
                Most Popular
              </div>
              <h3 className="text-[22px] font-bold mb-1">Pro</h3>
              <p className="text-purple-200 mb-6 text-[14px]">Best for professionals</p>
              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-extrabold">$29</span>
                <span className="text-purple-200 font-medium text-[15px] ml-1">/Month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Access to all premium tools', 'Unlimited templates', 'Priority support', 'Unlimited projects', 'Cloud sync', 'Advanced analytics'].map((f, i) => (
                  <li key={i} className="flex items-center text-white text-[14px] font-medium"><FiCheck className="text-white mr-3 text-lg" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3.5 rounded-xl bg-white text-[#8B5CF6] font-bold text-[15px] hover:bg-gray-50 transition-colors">Start Pro Trial</button>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-[22px] font-bold mb-1 text-gray-900">Enterprise</h3>
              <p className="text-gray-500 mb-6 text-[14px]">For teams and businesses</p>
              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">$99</span>
                <span className="text-gray-500 font-medium text-[15px] ml-1">/Month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'Custom branding'].map((f, i) => (
                  <li key={i} className="flex items-center text-gray-600 text-[14px] font-medium"><FiCheck className="text-green-500 mr-3 text-lg" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3.5 rounded-xl bg-[#8B5CF6] text-white font-bold text-[15px] hover:bg-purple-700 transition-colors">Contact Sales</button>
            </div>
            
          </div>
        </div>
      </section>

      <section className="bg-[#8B5CF6] py-20 text-center text-white">
        <h2 className="text-[32px] font-bold mb-4 tracking-tight">Ready To Transform Your Workflow?</h2>
        <p className="text-purple-200 mb-10 text-[15px] max-w-xl mx-auto font-medium leading-relaxed">Join thousands of professionals who are already using DigiTools to work smarter. Start your free trial today.</p>
        <div className="flex justify-center gap-4 mb-6">
          <button className="bg-white text-[#8B5CF6] hover:bg-gray-100 font-bold text-[15px] rounded-full px-8 py-3 transition-colors shadow-sm">Explore Products</button>
          <button className="border border-white text-white hover:bg-white hover:text-[#8B5CF6] font-bold text-[15px] rounded-full px-8 py-3 transition-colors">View Pricing</button>
        </div>
        <p className="text-[13px] text-purple-200">14-day free trial • No credit card required • Cancel anytime</p>
      </section>

      <footer className="bg-[#111827] text-white pt-20 pb-8">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
          <div className="md:col-span-2 pr-8">
            <span className="text-2xl font-bold text-white tracking-tight mb-4 block">DigiTools</span>
            <p className="text-gray-400 text-[13px] leading-relaxed">Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white text-[15px]">Product</h4>
            <ul className="space-y-3 text-gray-400 text-[14px] font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white text-[15px]">Company</h4>
            <ul className="space-y-3 text-gray-400 text-[14px] font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white text-[15px]">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-[14px] font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white text-[15px]">Social Links</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white text-[#111827] rounded-full flex items-center justify-center font-bold text-[12px] hover:bg-gray-200 transition-colors">in</a>
              <a href="#" className="w-8 h-8 bg-white text-[#111827] rounded-full flex items-center justify-center font-bold text-[12px] hover:bg-gray-200 transition-colors">f</a>
              <a href="#" className="w-8 h-8 bg-white text-[#111827] rounded-full flex items-center justify-center font-bold text-[12px] hover:bg-gray-200 transition-colors">X</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500 font-medium">
          <p>© 2026 DigiTools. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;