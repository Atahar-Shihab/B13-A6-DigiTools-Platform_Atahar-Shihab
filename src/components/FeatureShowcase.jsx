import React, { useState } from 'react';
import { 
  FiCheck, 
  FiZap, 
  FiSliders, 
  FiActivity, 
  FiTerminal, 
  FiCopy, 
  FiArrowRight,
  FiCode
} from 'react-icons/fi';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState('prompt');

  // AI Prompt Studio state
  const [promptInput, setPromptInput] = useState('Create a high-converting landing page headline for a SaaS productivity tool');
  const [promptOutput, setPromptOutput] = useState(
    '✨ "Stop wasting 12 hours a week on manual spreadsheets. Automate your entire product pipeline with intelligent workflows."'
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Design System Inspector state
  const [themeColor, setThemeColor] = useState('#8B5CF6');
  const [borderRadius, setBorderRadius] = useState('16px');
  const [buttonVariant, setButtonVariant] = useState('gradient');

  const handleGenerate = () => {
    sound.click();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPromptOutput(
        `✨ Generated Variant for: "${promptInput}"\n\n🎯 Option 1: "The all-in-one digital assets command center for modern teams."\n⚡ Option 2: "Ship 3x faster with 5,000+ audited Figma & React components."\n🔥 Option 3: "Unlock elite engineering productivity without hiring extra headcount."`
      );
    }, 500);
  };

  const handleCopy = (text) => {
    sound.click();
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { icon: '📋' });
  };

  return (
    <section className="py-24 bg-gray-50/60 dark:bg-gray-950/60 border-y border-gray-100 dark:border-gray-800" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Onboarding: 3 Steps */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
            Frictionless Setup
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Get Started In 3 Easy Steps
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Start using premium digital tools in minutes, not hours. Zero complex onboarding or lock-ins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative group transition-all duration-300">
            <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md shadow-purple-500/25">
              01
            </div>
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="/assets/user.png" alt="User Account" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              Sign up in seconds. No credit card required to explore the platform and free starter templates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative group transition-all duration-300">
            <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md shadow-purple-500/25">
              02
            </div>
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="/assets/package.png" alt="Select Package" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Choose Your Tools
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              Browse our catalog of AI tools, UI kits, and boilerplates tailored to your tech stack.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative group transition-all duration-300">
            <div className="absolute top-6 right-6 bg-[#8B5CF6] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md shadow-purple-500/25">
              03
            </div>
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="/assets/rocket.png" alt="Start Launching" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Start Shipping Fast
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              Download assets, sync cloud license keys, and launch production apps 10x faster.
            </p>
          </div>
        </div>

        {/* Live Interactive Developer & Designer Playground */}
        <div id="demo-showcase" className="max-w-5xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Playground Top Bar */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-950/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="ml-2 text-xs font-mono font-bold text-gray-500">digi-playground.app</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2">
                Live Interactive Sandbox
              </h3>
            </div>

            {/* Playground Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300">
              <button
                onClick={() => {
                  sound.click();
                  setActiveTab('prompt');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'prompt'
                    ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                    : 'hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FiZap /> AI Prompt Studio
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setActiveTab('design');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'design'
                    ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                    : 'hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FiSliders /> Design System
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setActiveTab('analytics');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-white dark:bg-gray-900 text-[#8B5CF6] dark:text-purple-400 shadow-xs'
                    : 'hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FiActivity /> Live Metrics
              </button>
            </div>
          </div>

          {/* Playground Tab Contents */}
          <div className="p-6 sm:p-8">
            {/* TAB 1: AI Prompt Studio */}
            {activeTab === 'prompt' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    placeholder="Enter custom prompt..."
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer disabled:opacity-50"
                  >
                    <FiZap />
                    <span>{isGenerating ? 'Synthesizing...' : 'Run Generation'}</span>
                  </button>
                </div>

                <div className="relative p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-line leading-relaxed">
                  <button
                    onClick={() => handleCopy(promptOutput)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-500 hover:text-purple-600 shadow-xs border border-gray-200 dark:border-gray-700 transition-colors"
                    title="Copy Result"
                  >
                    <FiCopy />
                  </button>
                  {promptOutput}
                </div>
              </div>
            )}

            {/* TAB 2: Design System Inspector */}
            {activeTab === 'design' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                      Brand Accent Color:
                    </label>
                    <div className="flex gap-2">
                      {['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'].map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            sound.click();
                            setThemeColor(c);
                          }}
                          style={{ backgroundColor: c }}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${
                            themeColor === c ? 'scale-115 border-gray-900 dark:border-white shadow-md' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                      Corner Radius:
                    </label>
                    <div className="flex gap-2">
                      {['4px', '12px', '16px', '9999px'].map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            sound.click();
                            setBorderRadius(r);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                            borderRadius === r
                              ? 'border-[#8B5CF6] text-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {r === '9999px' ? 'Pill' : r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">
                      Style Variant:
                    </label>
                    <div className="flex gap-2">
                      {['solid', 'outline', 'glass'].map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            sound.click();
                            setButtonVariant(v);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold capitalize transition-all ${
                            buttonVariant === v
                              ? 'border-[#8B5CF6] text-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Rendered Component */}
                <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center space-y-4">
                  <div
                    style={{
                      borderRadius: borderRadius,
                      backgroundColor: buttonVariant === 'solid' ? themeColor : buttonVariant === 'glass' ? `${themeColor}22` : 'transparent',
                      borderColor: themeColor,
                      borderWidth: buttonVariant === 'outline' ? '2px' : '1px',
                      color: buttonVariant === 'solid' ? '#ffffff' : themeColor
                    }}
                    className="p-5 font-bold shadow-lg text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer hover:opacity-95 backdrop-blur-xs"
                  >
                    <FiCheck />
                    <span>Dynamic Styled Component</span>
                  </div>
                  <span className="font-mono text-[11px] text-gray-400">
                    token: primary-color({themeColor}), radius({borderRadius}), variant({buttonVariant})
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: Live Metrics Dashboard */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-left">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Edge Response</span>
                  <p className="text-2xl font-black text-emerald-500 mt-1">12ms</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Global edge distribution</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-left">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">System Uptime</span>
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">99.99%</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Automated failover protocol</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-left">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">Monthly API Calls</span>
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">4.8M+</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Zero throttled queries</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
