import React from 'react';
import {
  Share2,
  Layout,
  Bot,
  Briefcase,
  ShoppingCart,
  Layers,
  ShieldCheck,
  Terminal,
  Code2,
  Box,
  TrendingUp,
  Smartphone,
  Sparkles,
  Package
} from 'lucide-react';

const ICON_MAP = {
  // Direct icon keys
  Share2,
  Layout,
  Bot,
  Briefcase,
  ShoppingCart,
  Layers,
  ShieldCheck,
  Terminal,
  Code2,
  Box,
  TrendingUp,
  Smartphone,
  Sparkles,
  Package,

  // Fallbacks by legacy file paths
  'social-media.png': Share2,
  'design-tool.png': Layout,
  'writing_2327400 1.png': Bot,
  'operation.png': Briefcase,
  'shopping-cart.png': ShoppingCart,
  'portfolio.png': Layers,

  // Fallbacks by product ID
  1: Share2,
  2: Layout,
  3: Bot,
  4: Briefcase,
  5: ShoppingCart,
  6: Layers,
  7: ShieldCheck,
  8: Terminal,
  9: Code2,
  10: Box,
  11: TrendingUp,
  12: Smartphone
};

export const ProductIcon = ({ 
  icon, 
  id, 
  name, 
  size = 20, 
  className = '',
  variant = 'icon', // 'icon' or 'badge'
  badgeSize = 'md'   // 'sm', 'md', 'lg'
}) => {
  // Resolve icon component
  let IconComponent = Sparkles;

  if (icon && ICON_MAP[icon]) {
    IconComponent = ICON_MAP[icon];
  } else if (icon && typeof icon === 'string') {
    const filename = icon.split('/').pop();
    if (ICON_MAP[filename]) {
      IconComponent = ICON_MAP[filename];
    } else if (ICON_MAP[icon]) {
      IconComponent = ICON_MAP[icon];
    }
  } else if (id && ICON_MAP[id]) {
    IconComponent = ICON_MAP[id];
  } else if (name) {
    const lower = name.toLowerCase();
    if (lower.includes('social')) IconComponent = Share2;
    else if (lower.includes('design') || lower.includes('ui/ux')) IconComponent = Layout;
    else if (lower.includes('writing') || lower.includes('assistant') || lower.includes('ai')) IconComponent = Bot;
    else if (lower.includes('business') || lower.includes('operations')) IconComponent = Briefcase;
    else if (lower.includes('commerce') || lower.includes('cart')) IconComponent = ShoppingCart;
    else if (lower.includes('portfolio')) IconComponent = Layers;
    else if (lower.includes('security') || lower.includes('guard')) IconComponent = ShieldCheck;
    else if (lower.includes('prompt') || lower.includes('crafter')) IconComponent = Terminal;
    else if (lower.includes('saas') || lower.includes('boilerplate')) IconComponent = Code2;
    else if (lower.includes('3d') || lower.includes('webgl')) IconComponent = Box;
    else if (lower.includes('seo') || lower.includes('ranking')) IconComponent = TrendingUp;
    else if (lower.includes('flutter') || lower.includes('mobile')) IconComponent = Smartphone;
  }

  if (variant === 'badge') {
    const sizeClasses = {
      sm: 'w-10 h-10 rounded-xl',
      md: 'w-12 h-12 rounded-2xl',
      lg: 'w-16 h-16 rounded-3xl'
    }[badgeSize] || 'w-12 h-12 rounded-2xl';

    const iconSizes = {
      sm: 18,
      md: 22,
      lg: 30
    }[badgeSize] || size;

    return (
      <div className={`${sizeClasses} bg-gradient-to-tr from-purple-100 to-indigo-100 dark:from-purple-950/60 dark:to-indigo-950/60 flex items-center justify-center text-purple-500 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        <IconComponent size={iconSizes} className={className} />
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};
