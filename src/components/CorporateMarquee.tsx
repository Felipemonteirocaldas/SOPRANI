import { motion } from 'framer-motion';
import { MapPin, Zap, TrendingUp, ShoppingCart, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CorporateMarquee = () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: MapPin,
      text: t('infoBar.regions'),
    },
    {
      icon: Zap,
      text: t('infoBar.support'),
    },
    {
      icon: TrendingUp,
      text: t('infoBar.spareParts'),
    },
    {
      icon: ShoppingCart,
      text: t('infoBar.trading'),
    },
    {
      icon: Globe,
      text: t('infoBar.partners'),
    },
  ];

  // Duplicate items once to ensure seamless infinite loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-background-alt h-[60px] overflow-hidden flex items-center border-y border-border-light/50">
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
                className="text-accent flex-shrink-0"
              />
              <span className="text-sm text-primary font-medium whitespace-nowrap flex-shrink-0">
                {item.text}
              </span>
              {index < duplicatedItems.length - 1 && (
                <div className="w-px h-6 bg-border-light flex-shrink-0" />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CorporateMarquee;
