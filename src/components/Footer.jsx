import React from 'react';
import { ArrowUp, Zap, GitBranch, Share2, Globe, Heart, Key, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { setIsVaultOpen, setIsCommandOpen } = useShop();

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
                <Zap className="text-xl" />
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
            <h4 className="font-bold mb-4 text-white text-sm">Toolkits</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li><a href="#products" className="hover:text-purple-400 transition-colors">UI Design Systems</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">AI & Prompt Suites</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">E-Commerce & SaaS</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">3D & WebGL Graphics</a></li>
              <li><a href="#products" className="hover:text-purple-400 transition-colors">Mobile & Flutter Kit</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Resources</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li><a href="#changelog" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Changelog v2.4</a></li>
              <li><a href="#roi-calculator" className="hover:text-purple-400 transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Commercial Licensing</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">Developer FAQ</a></li>
              <li><a href="#reviews" className="hover:text-purple-400 transition-colors">Verified Feedback</a></li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm">Developer</h4>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    sound.click();
                    setIsVaultOpen(true);
                  }}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Key className="text-[#8B5CF6] text-xs" />
                  <span>License Vault</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.click();
                    setIsCommandOpen(true);
                  }}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Terminal className="text-[#8B5CF6] text-xs" />
                  <span>Command Palette</span>
                </button>
              </li>
              <li><a href="#tech-stack" className="hover:text-purple-400 transition-colors">Tech Compatibility</a></li>
              <li><a href="#demo-showcase" className="hover:text-purple-400 transition-colors">Interactive Sandbox</a></li>
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
                <GitBranch size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Twitter Profile"
              >
                <Share2 size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Globe size={16} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 hover:bg-purple-950/60 hover:border-purple-800 text-xs font-bold text-gray-300 hover:text-purple-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ArrowUp />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p className="flex items-center gap-1.5">
            <span>© 2026 DigiTools Platform. Designed & Engineered with</span>
            <Heart className="text-rose-500 fill-current" />
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
