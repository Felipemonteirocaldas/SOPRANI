import React from 'react';
import { MapPin, Zap, TrendingUp, ShoppingCart, Globe } from 'lucide-react';

const InfoBar: React.FC = () => {
  const infoItems = [
    {
      icon: MapPin,
      text: 'Italy · Europe · MENA · Asia · Americas'
    },
    {
      icon: Zap,
      text: '24/7 Technical Support'
    },
    {
      icon: TrendingUp,
      text: 'Spare Parts for All Major OEMs'
    },
    {
      icon: ShoppingCart,
      text: 'Tinplate & Aluminum Trading'
    },
    {
      icon: Globe,
      text: '100+ Partners Worldwide'
    }
  ];

  return (
    <div className="w-full bg-[#F4F6F9] border-y border-[#E0E0E0]">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:grid grid-cols-5 gap-0 h-[70px]">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3 px-4 ${
                  idx < infoItems.length - 1 ? 'border-r border-[#E0E0E0]' : ''
                }`}
              >
                <Icon size={20} className="text-[#C8102E] flex-shrink-0" />
                <span className="text-[14px] md:text-[16px] font-medium text-[#00205B] whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical stacked layout */}
        <div className="md:hidden flex flex-col gap-0">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3 px-4 py-4 ${
                  idx < infoItems.length - 1 ? 'border-b border-[#E0E0E0]' : ''
                }`}
              >
                <Icon size={18} className="text-[#C8102E] flex-shrink-0" />
                <span className="text-[14px] font-medium text-[#00205B] text-center">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
