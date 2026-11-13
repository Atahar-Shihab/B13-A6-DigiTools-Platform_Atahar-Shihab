import React, { useState } from 'react';
import { 
  FiX, 
  FiTerminal, 
  FiCopy, 
  FiPlay, 
  FiCheck, 
  FiCode, 
  FiPackage,
  FiExternalLink
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const CliTerminalModal = () => {
  const {
    isCliModalOpen,
    setIsCliModalOpen,
    cliProduct
  } = useShop();

  const [activeManager, setActiveManager] = useState('pnpm');
  const [copied, setCopied] = useState(false);
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  if (!isCliModalOpen) return null;

  const productSlug = cliProduct?.name
    ? cliProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : 'digitools-starter';

  const commands = {
    pnpm: `pnpm create digitools-app --template ${productSlug} my-project`,
    npm: `npx create-digitools-app --template ${productSlug} my-project`,
    yarn: `yarn create digitools-app --template ${productSlug} my-project`,
    bun: `bun create digitools-app --template ${productSlug} my-project`,
    curl: `curl -fsSL https://get.digitools.dev/${productSlug} | sh`
  };

  const currentCommand = commands[activeManager] || commands.pnpm;

  const handleCopy = () => {
    sound.click();
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    toast.success(`Copied ${activeManager.toUpperCase()} command to clipboard!`, { icon: '💻' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    if (isRunningSimulation) return;
    sound.click();
    setIsRunningSimulation(true);
    setTerminalLogs([
      `$ ${currentCommand}`,
      `[1/4] 🔍 Resolving package manifest and cryptographic checksums...`,
      `[2/4] 📦 Downloading production assets and component primitives...`
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[3/4] ⚡ Scaffolding directory tree into ./my-project...`,
        `[4/4] 🔒 Verifying SHA-256 integrity: 100% MATCH (0 vulnerabilities found)`
      ]);
    }, 900);

    setTimeout(() => {
      sound.success();
      setIsRunningSimulation(false);
      setTerminalLogs((prev) => [
        ...prev,
        `✨ Success! Created ./my-project with ${cliProduct?.name || 'Digitools Bundle'}.`,
        `👉 Run "cd my-project && ${activeManager === 'curl' ? 'npm' : activeManager} dev" to start your live development server.`
      ]);
      toast.success('Simulated CLI scaffold completed successfully!', { icon: '🚀' });
    }, 1900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full shadow-2xl relative flex flex-col overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gray-900/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono font-bold text-gray-400 ml-2 flex items-center gap-1.5">
              <FiTerminal className="text-[#8B5CF6]" />
              <span>digitools-cli — {cliProduct?.name || 'Developer Toolkit'}</span>
            </span>
          </div>

          <button
            onClick={() => {
              sound.click();
              setIsCliModalOpen(false);
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FiPackage className="text-[#8B5CF6]" />
              <span>Scaffold via Command-Line</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Initialize a clean, production-ready codebase directly in your terminal using your preferred package manager.
            </p>
          </div>

          {/* Package Manager Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-900 p-1.5 rounded-xl border border-gray-800">
            {['pnpm', 'npm', 'yarn', 'bun', 'curl'].map((pm) => (
              <button
                key={pm}
                onClick={() => {
                  sound.click();
                  setActiveManager(pm);
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeManager === pm
                    ? 'bg-[#8B5CF6] text-white shadow-xs'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>

          {/* Code Command Display Box */}
          <div className="bg-black/90 rounded-2xl border border-gray-800 p-4 font-mono text-xs sm:text-sm relative group">
            <div className="flex items-center justify-between gap-3">
              <div className="overflow-x-auto text-emerald-400 font-semibold select-all scrollbar-none py-1">
                <span className="text-purple-400 mr-2">$</span>
                <span>{currentCommand}</span>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border border-gray-700"
                title="Copy Command"
              >
                {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Simulated Execution Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 flex items-center gap-1.5">
                <FiCode /> Sandbox Terminal Output:
              </span>

              <button
                onClick={handleRunSimulation}
                disabled={isRunningSimulation}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
              >
                <FiPlay size={12} />
                <span>{isRunningSimulation ? 'Executing...' : 'Simulate Terminal Run'}</span>
              </button>
            </div>

            <div className="bg-black rounded-2xl border border-gray-800/90 p-4 min-h-[140px] max-h-[220px] overflow-y-auto font-mono text-[11px] sm:text-xs text-gray-300 space-y-1.5">
              {terminalLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 py-6 text-center">
                  <span>Click "Simulate Terminal Run" to preview the scaffolding process without leaving the browser.</span>
                </div>
              ) : (
                terminalLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      log.startsWith('✨')
                        ? 'text-emerald-400 font-bold'
                        : log.startsWith('👉')
                        ? 'text-purple-300 font-bold'
                        : log.startsWith('$')
                        ? 'text-gray-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs text-gray-400">
            <span>Requires Node.js 18+ or Bun 1.0+</span>
            <a
              href="https://github.com/Atahar-Shihab/DigiTools-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 flex items-center gap-1 transition-colors"
            >
              <span>CLI Documentation</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
