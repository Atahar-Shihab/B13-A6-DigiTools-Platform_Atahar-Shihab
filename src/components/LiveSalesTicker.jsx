import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import productsData from '../data.json';

const BUYER_PROFILES = [
  { name: 'Marcus K.', city: 'Berlin, DE', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { name: 'Sophia L.', city: 'San Francisco, US', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { name: 'Kenji T.', city: 'Tokyo, JP', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Elena V.', city: 'London, UK', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { name: 'David S.', city: 'Toronto, CA', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
];

export const LiveSalesTicker = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const triggerNotification = () => {
      const randomBuyer = BUYER_PROFILES[Math.floor(Math.random() * BUYER_PROFILES.length)];
      const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
      
      setCurrentNotification({
        buyer: randomBuyer,
        product: randomProduct,
        timeAgo: 'Just now'
      });
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // First trigger after 4s, then interval of 16s
    const initialTimer = setTimeout(triggerNotification, 4000);
    const intervalTimer = setInterval(triggerNotification, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [dismissed]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-auto animate-bounce-slow">
      <div className="glass-card-pro bg-white/95 dark:bg-gray-900/95 border border-purple-200/80 dark:border-purple-900/60 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
        <div className="relative shrink-0">
          <img
            src={currentNotification.buyer.avatar}
            alt={currentNotification.buyer.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 dark:border-purple-700"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
            <FiCheckCircle className="text-[8px] text-white" />
          </span>
        </div>

        <div className="flex-1 text-left overflow-hidden">
          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
            {currentNotification.buyer.name} <span className="text-[10px] font-normal text-gray-400">({currentNotification.buyer.city})</span>
          </p>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 truncate">
            Licensed <span className="font-bold text-[#8B5CF6] dark:text-purple-400">{currentNotification.product.name}</span>
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
            Verified Commercial License • Just now
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
          title="Dismiss alerts"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};
