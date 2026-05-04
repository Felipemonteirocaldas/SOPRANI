import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('soprani_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('soprani_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[9999] md:max-w-xl md:left-auto"
        >
          <div className="bg-[#001F5F] text-white p-6 shadow-2xl border-l-4 border-[#C41230] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={80} className="-rotate-12 translate-x-8 translate-y-4" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C41230]">
                  Cookie Compliance
                </h4>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-sm text-slate-300 mb-6 leading-relaxed font-paragraph">
                {t('privacyPage.cookieNotice')}{' '}
                <Link to="/cookie-policy" className="text-white font-bold underline decoration-[#C41230] underline-offset-4 hover:text-[#C41230] transition-colors">
                  {t('footer.cookies')}
                </Link>
              </p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 bg-[#C41230] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#001F5F] transition-all duration-300"
                >
                  Accept & Close
                </button>
                <Link 
                  to="/cookie-policy"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
