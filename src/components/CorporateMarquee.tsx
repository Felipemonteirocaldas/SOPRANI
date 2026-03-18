import { motion } from 'framer-motion';
import { MapPin, Zap, TrendingUp, ShoppingCart, Globe } from 'lucide-react';

const CorporateMarquee = () => {
  const items = [
    {
      icon: MapPin,
      text: 'Italy · Europe · MENA · Asia · Americas',
    },
    {
      icon: Zap,
      text: '24/7 Technical Support',
    },
    {
      icon: TrendingUp,
      text: 'Spare Parts for All Major OEMs',
    },
    {
      icon: ShoppingCart,
      text: 'Tinplate & Aluminum Trading',
    },
    {
      icon: Globe,
      text: '100+ Partners Worldwide',
    },
  ];

  // Duplicate items once to ensure seamless infinite loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-[#F4F6F9] h-[60px] overflow-hidden flex items-center">
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: '-50%' }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        initial={{ x: 0 }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-6 flex-shrink-0 h-full"
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                className="text-[#C8102E] flex-shrink-0"
              />
              <span className="text-[14px] text-[#00205B] font-medium whitespace-nowrap flex-shrink-0">
                {item.text}
              </span>
              {index < duplicatedItems.length - 1 && (
                <div className="w-px h-6 bg-gray-300 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CorporateMarquee;
