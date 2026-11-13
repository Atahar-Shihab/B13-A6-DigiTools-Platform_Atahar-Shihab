import React, { useState, useMemo } from 'react';
import {
  FiX,
  FiKey,
  FiDownload,
  FiCopy,
  FiSearch,
  FiCheckCircle,
  FiTerminal,
  FiShield,
  FiPackage,
  FiPlusCircle
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const LicenseVaultDrawer = () => {
  const {
    isVaultOpen,
    setIsVaultOpen,
    purchasedLicenses,
    addPurchasedLicenses,
    openCliModal
  } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('All');
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredLicenses = useMemo(() => {
    return purchasedLicenses.filter((lic) => {
      const matchSearch =
        lic.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lic.licenseKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lic.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchSearch) return false;
      if (filterTier === 'All') return true;
      return lic.tier.toLowerCase().includes(filterTier.toLowerCase()) ||
             lic.tierBadge.toLowerCase().includes(filterTier.toLowerCase());
    });
  }, [purchasedLicenses, searchTerm, filterTier]);

  if (!isVaultOpen) return null;

  const handleCopyKey = (key) => {
    sound.click();
    navigator.clipboard.writeText(key);
    toast.success('License key copied to clipboard!', { icon: '📋' });
  };

  const handleDownloadPackage = (lic) => {
    sound.click();
    setDownloadingId(lic.id);
    toast.info(`Preparing secure package for ${lic.productName}...`, { autoClose: 1500 });
    
    setTimeout(() => {
      setDownloadingId(null);
      sound.success();
      toast.success(`Download started: ${lic.productName.toLowerCase().replace(/\s+/g, '-')}-bundle.zip`, {
        icon: '📦'
      });
    }, 1600);
  };

  const handleClaimStarterLicense = () => {
    sound.success();
    const demoLicense = {
      id: `lic-claimed-${Date.now()}`,
      orderId: `DIGI-${Math.floor(100000 + Math.random() * 900000)}`,
      productName: 'Autonomous SEO Content Pipeline',
      productId: 11,
      licenseKey: `FREE-COMMUNITY-${Math.random().toString(36).substring(2, 6).toUpperCase()}-PASS`,
      tier: 'Community Developer',
      tierBadge: 'Claimed Perk',
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pricePaid: 0,
      status: 'Active',
      downloadsRemaining: 'Unlimited',
      version: 'v2.4.0',
      techStack: ['Python', 'OpenAI', 'Next.js']
    };
    addPurchasedLicenses([demoLicense]);
    toast.success('🎁 Complimentary Community Starter License added to your Vault!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 text-lg">
                <FiKey />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">
                    License Vault
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {purchasedLicenses.length} Active
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Offline packages, authentication keys & entitlements
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.click();
                setIsVaultOpen(false);
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 bg-gray-50/80 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 space-y-3">
            <div className="relative">
              <FiSearch className="absolute inset-y-0 left-3.5 my-auto text-gray-400 text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by toolkit name, order # or license key..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'Commercial', 'Lifetime', 'Community'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      sound.click();
                      setFilterTier(tier);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      filterTier === tier
                        ? 'bg-[#8B5CF6] text-white shadow-sm'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <button
                onClick={handleClaimStarterLicense}
                className="text-[11px] font-bold text-[#8B5CF6] dark:text-purple-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                title="Claim a complimentary community license"
              >
                <FiPlusCircle /> Claim Starter Pass
              </button>
            </div>
          </div>

          {/* Licenses List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {filteredLicenses.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-400 flex items-center justify-center mx-auto text-2xl">
                  <FiPackage />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    No matching licenses found
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-1">
                    Try refining your search keyword or claim a free community starter license below.
                  </p>
                </div>
                <button
                  onClick={handleClaimStarterLicense}
                  className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Claim Free Community License
                </button>
              </div>
            ) : (
              filteredLicenses.map((lic) => (
                <div
                  key={lic.id}
                  className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  {/* Top Badge Row */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
                          {lic.productName}
                        </h4>
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <FiCheckCircle size={10} /> {lic.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Order Ref: <span className="font-mono font-semibold">{lic.orderId}</span> • Purchased on {lic.purchaseDate}
                      </p>
                    </div>

                    <span className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-[#8B5CF6] dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {lic.tierBadge}
                    </span>
                  </div>

                  {/* License Key Box */}
                  <div className="bg-gray-50 dark:bg-gray-900/90 rounded-xl p-3 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 my-3">
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                        Production License Key
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-black text-gray-800 dark:text-gray-200 select-all truncate block">
                        {lic.licenseKey}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyKey(lic.licenseKey)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#8B5CF6] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
                      title="Copy License Key"
                    >
                      <FiCopy size={12} />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                  </div>

                  {/* Tech stack compatibility tags */}
                  {lic.techStack && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                      {lic.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {lic.version} • {lic.tier}
                      </span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => handleDownloadPackage(lic)}
                      disabled={downloadingId === lic.id}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                    >
                      <FiDownload size={13} />
                      <span>{downloadingId === lic.id ? 'Packaging Archive...' : 'Download ZIP Bundle'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.click();
                        setIsVaultOpen(false);
                        openCliModal({ name: lic.productName, id: lic.productId });
                      }}
                      className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="View CLI Command"
                    >
                      <FiTerminal size={13} />
                      <span className="hidden sm:inline">CLI Install</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <FiShield className="text-emerald-500" /> All assets verified SHA-256
            </span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Total Entitlements: {purchasedLicenses.length}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
