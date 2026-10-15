import React from 'react';
import { FiArrowUp, FiZap, FiGithub, FiTwitter, FiLinkedin, FiHeart } from 'react-icons/fi';
import { sound } from '../utils/sound';

export const Footer = () => {
  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-12 border-t border-gray-900 relative">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 pr-0 md:pr-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-indigo-600 flex items-center justify-center text-white shadow-md">
                <FiZap className="text-xl" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                DigiTools
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              The premier digital asset engine and curated marketplace for ambitious designers, software developers, and product creators.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational • 99.99%</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Products</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li><a href="#products" className="hover:text-purple-400 transition-colors">UI Design System</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">AI Prompt Studio</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">E-Commerce Headless</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">Full Stack Boilerplates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Resources</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li><a href="#demo-showcase" className="hover:text-purple-400 transition-colors">Interactive Sandbox</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Licensing Guide</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">Support FAQ</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing Matrix</a></li>
            </ul>
          </div>

          {/* Community & Company */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Company</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About DigiTools</a></li>
              <li><a href="#reviews" className="hover:text-purple-400 transition-colors">Verified Reviews</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers (Hiring!)</a></li>
            </ul>
          </div>

          {/* Social Links & Back to Top */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Connect</h4>
            <div className="flex gap-2.5 mb-6">
              <a
                href="https://github.com/Atahar-Shihab"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <FiGithub size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Twitter Profile"
              >
                <FiTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin size={16} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 hover:bg-purple-950/60 hover:border-purple-800 text-xs font-bold text-gray-300 hover:text-purple-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FiArrowUp />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p className="flex items-center gap-1.5">
            <span>© 2026 DigiTools Platform. Designed & Engineered with</span>
            <FiHeart className="text-rose-500 fill-current" />
            <span className="font-bold text-gray-300">by Atahar Shihab</span>
          </p>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Commercial Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
