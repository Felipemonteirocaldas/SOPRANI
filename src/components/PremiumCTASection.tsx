import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PremiumCTASection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full from-[#00205B] via-[#041e42] to-[#0a192f] overflow-hidden py-20 md:py-32 opacity-[1] bg-primary"
    >
      {/* Italian Flag Line at Top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[2px] w-32 flex">

      </div>
      {/* Main Content Container */}
      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <div className="inline-block">
              <div className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="font-paragraph text-xs tracking-widest font-semibold text-border-light">{t('premiumCta.badge')}</span>
              </div>
            </div>

            {/* Main Title with Varied Weights */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('premiumCta.title1')}{' '}
                <span className="font-black text-accent">{t('premiumCta.titleHighlight')}</span>{' '}
                {t('premiumCta.title2')}
              </h2>
            </div>

            {/* Body Text */}
            <p className="font-paragraph text-lg text-gray-300 leading-relaxed max-w-lg">
              {t('premiumCta.desc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 rounded-lg bg-primary">
              {/* Button 1 - Solid High Contrast */}
              <motion.button
                onHoverStart={() => setHoveredButton('engineers')}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 bg-white text-[#0a192f] font-paragraph font-bold text-sm tracking-widest overflow-hidden group rounded-none"
              >
                <div
                  className={`absolute inset-0 bg-blue-400 transition-all duration-300 ${
                    hoveredButton === 'engineers' ? 'opacity-20' : 'opacity-0'
                  }`}
                />
                <span className="relative z-10">{t('premiumCta.btnConsult')}</span>
              </motion.button>

              {/* Button 2 - Outline with Subtle Glow */}
              <motion.button
                onClick={() => navigate('/products')}
                onHoverStart={() => setHoveredButton('quote')}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 font-paragraph font-bold text-sm tracking-widest overflow-hidden group text-[#e2e8f0ff] border-2 border-solid border-[#e2e8f0ff]"
              >
                <motion.div
                  animate={{
                    backgroundColor:
                      hoveredButton === 'quote'
                        ? 'rgba(96, 165, 250, 0.1)'
                        : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-lg border-gray-200 border border-none text-border-light bg-[#0f172aff]"
                />
                <span className="relative z-10">{t('premiumCta.btnQuote')}</span>
                {hoveredButton === 'quote' && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      boxShadow: '0 0 20px rgba(96, 165, 250, 0.4), inset 0 0 20px rgba(96, 165, 250, 0.1)',
                    }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Technical Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-full min-h-96"
          >
            {/* Technical Diagram Container */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">

              {/* Can Production Line SVG with Parallax */}
              <motion.svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  x: mousePosition.x * 20 - 10,
                  y: mousePosition.y * 20 - 10,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              >
                {/* 1. The Conveyor Belt (Track) */}
                <path d="M 0 250 L 400 250" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                <path d="M 0 260 L 400 260" stroke="#475569" strokeWidth="4" opacity="0.3" />

                {/* 2. Roller Wheels under the belt */}
                {[50, 150, 250, 350].map((cx, i) => (
                  <motion.circle
                    key={`roller-${i}`}
                    cx={cx}
                    cy="265"
                    r="5"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: `${cx}px 265px` }}
                    opacity="0.6"
                  />
                ))}

                {/* 3. Station 1: Shaping/Press (Left) */}
                <g opacity="0.8">
                  <rect x="40" y="150" width="40" height="90" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <motion.rect
                    x="50"
                    y="150"
                    width="20"
                    height="30"
                    fill="#60a5fa"
                    opacity="0.5"
                    animate={{ y: [150, 200, 150] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Raw material line feeding in */}
                  <path d="M 0 200 L 40 200" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
                </g>

                {/* 4. Station 2: Seaming/Welding (Center) */}
                <g opacity="0.8">
                  <rect x="180" y="130" width="60" height="110" fill="none" stroke="#34d399" strokeWidth="2" />
                  {/* Rotating welding head */}
                  <motion.circle
                    cx="210"
                    cy="180"
                    r="15"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '210px 180px' }}
                  />
                  {/* Laser/Welding beam */}
                  <motion.line
                    x1="210"
                    y1="195"
                    x2="210"
                    y2="240"
                    stroke="#34d399"
                    strokeWidth="2"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </g>

                {/* 5. Station 3: Inspection/Scanning (Right) */}
                <g opacity="0.8">
                  <path d="M 320 180 L 360 180 L 350 240 L 330 240 Z" fill="none" stroke="#f87171" strokeWidth="2" />
                  {/* Scanning beam */}
                  <motion.line
                    x1="320"
                    y1="210"
                    x2="360"
                    y2="210"
                    stroke="#f87171"
                    strokeWidth="1"
                    opacity="0.6"
                    animate={{ y1: [190, 230, 190], y2: [190, 230, 190] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </g>

                {/* 6. The Moving Cans! */}
                <motion.g
                  animate={{ x: [0, 100] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  {/* Array of cans spaced out along the belt */}
                  {[-100, 0, 100, 200, 300, 400].map((startX, i) => {
                    // Change style based on position to simulate states
                    let color = "#475569"; // Raw/Default
                    let opacity = 0.4;
                    let height = 30;

                    if (startX >= 100) { color = "#60a5fa"; opacity = 0.6; } // Shaped
                    if (startX >= 200) { color = "#34d399"; opacity = 0.8; } // Welded
                    if (startX >= 300) { color = "#f87171"; opacity = 0.9; } // Inspected

                    return (
                      <g key={`can-${i}`} transform={`translate(${startX}, 210)`}>
                        {/* Can Body */}
                        <rect x="15" y={40 - height} width="20" height={height} fill="none" stroke={color} strokeWidth="1.5" opacity={opacity} />
                        {/* Can Top/Bottom details (only show if it passed station 1) */}
                        {startX >= 100 && (
                          <>
                            <ellipse cx="25" cy={40 - height} rx="10" ry="3" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
                            <ellipse cx="25" cy="40" rx="10" ry="3" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
                          </>
                        )}
                      </g>
                    );
                  })}
                </motion.g>

                {/* Overlay Tech Grid to tie it together */}
                {/* Removed - grid overlay deleted for clean corporate aesthetic */}
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
