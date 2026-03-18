import React, { useEffect, useState } from 'react';
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Duplicar itens para marquee suave (loop infinito)
  const marqueeItems = [...infoItems, ...infoItems];

  return (
    <div className="w-full bg-[#F4F6F9] border-y border-[#E0E0E0]">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          overflow: hidden;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          flex-shrink: 0;
          min-width: max-content;
          width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0 1rem;
          padding-right: 20px;
          white-space: nowrap;
          border-right: 1px solid #E0E0E0;
        }

        .marquee-item:last-child {
          border-right: none;
        }

        .marquee-item span {
          font-size: 14px;
          font-weight: 500;
          color: #00205B;
        }

        .marquee-item svg {
          flex-shrink: 0;
          color: #C8102E;
        }
      `}</style>

      <div className="max-w-[100rem] mx-auto">
        {/* Desktop: Marquee animation */}
        <div className="hidden md:block h-[70px]">
          <div className="marquee-container h-full">
            <div className="marquee-content h-full">
              {marqueeItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="marquee-item">
                    <Icon size={20} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical stacked layout */}
        <div className="md:hidden flex flex-col gap-0">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3 px-4 py-4 min-w-0 overflow-hidden ${
                  idx < infoItems.length - 1 ? 'border-b border-[#E0E0E0]' : ''
                }`}
              >
                <Icon size={18} className="text-[#C8102E] flex-shrink-0" />
                <span className="text-[14px] font-medium text-[#00205B] text-center" style={{ whiteSpace: 'nowrap' }}>
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
