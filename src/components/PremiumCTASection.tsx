import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function PremiumCTASection() {
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
      className="relative w-full bg-[#0a192f] overflow-hidden py-20 md:py-32"
    >
      {/* Italian Flag Line at Top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[2px] w-32 flex">
        <div className="flex-1 bg-green-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-red-500"></div>
      </div>
      {/* Pulsing Radar/Technical Mesh Background */}
      <div className="absolute inset-0 opacity-8">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techMesh" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="white" opacity="0.3" />
              <path d="M 25 0 L 25 50 M 0 25 L 50 25" stroke="white" strokeWidth="0.5" opacity="0.2" />
            </pattern>
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#techMesh)" />
          <rect width="100%" height="100%" fill="url(#radarPulse)" />
          {/* Concentric circles for radar effect */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="10%"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.1"
            animate={{ r: ['10%', '30%'], opacity: [0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="5%"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.1"
            animate={{ r: ['5%', '25%'], opacity: [0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
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
                <span className="font-paragraph text-xs text-blue-400 tracking-widest font-semibold">
                  [ SOPRANI_ENGINEERING: ACTIVE_GLOBAL_SUPPORT ]
                </span>
              </div>
            </div>

            {/* Main Title with Varied Weights */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Precision Engineering for the{' '}
                <span className="font-black text-blue-400">Global</span>{' '}
                Metal Packaging Industry
              </h2>
            </div>

            {/* Body Text */}
            <p className="font-paragraph text-lg text-gray-300 leading-relaxed max-w-lg">
              From machinery sourcing and revamping projects to high-precision spare parts and technical assistance, we provide the industrial expertise to keep your production lines at peak performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 rounded-lg">
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
                <span className="relative z-10">[ CONSULT OUR ENGINEERS ]</span>
              </motion.button>

              {/* Button 2 - Outline with Subtle Glow */}
              <motion.button
                onHoverStart={() => setHoveredButton('quote')}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 border-2 border-blue-400 text-blue-400 font-paragraph font-bold text-sm tracking-widest overflow-hidden group"
              >
                <motion.div
                  animate={{
                    backgroundColor:
                      hoveredButton === 'quote'
                        ? 'rgba(96, 165, 250, 0.1)'
                        : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-lg border-gray-200 border border-none"
                />
                <span className="relative z-10">[ REQUEST TECHNICAL QUOTE ]</span>
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
            <div className="absolute inset-0 bg-white/3 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Gear/Mechanical Component SVG with Parallax */}
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
                {/* Main Gear - Center */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '200px 200px' }}
                >
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.8" />
                  {/* Gear teeth */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <rect
                      key={i}
                      x="190"
                      y="130"
                      width="20"
                      height="15"
                      fill="#60a5fa"
                      opacity="0.6"
                      transform={`rotate(${(i * 30)} 200 200)`}
                    />
                  ))}
                </motion.g>

                {/* Smaller Gear - Top Right */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '300px 120px' }}
                >
                  <circle cx="300" cy="120" r="40" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.7" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect
                      key={i}
                      x="292"
                      y="75"
                      width="16"
                      height="12"
                      fill="#34d399"
                      opacity="0.5"
                      transform={`rotate(${(i * 45)} 300 120)`}
                    />
                  ))}
                </motion.g>

                {/* Smaller Gear - Bottom Left */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '100px 280px' }}
                >
                  <circle cx="100" cy="280" r="35" fill="none" stroke="#f87171" strokeWidth="2" opacity="0.7" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect
                      key={i}
                      x="93"
                      y="240"
                      width="14"
                      height="10"
                      fill="#f87171"
                      opacity="0.5"
                      transform={`rotate(${(i * 45)} 100 280)`}
                    />
                  ))}
                </motion.g>

                {/* Connection Lines */}
                <motion.line x1="260" y1="160" x2="340" y2="100" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
                <motion.line x1="140" y1="240" x2="160" y2="160" stroke="#f87171" strokeWidth="1.5" opacity="0.4" />

                {/* Pulsing Center Point */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="8"
                  fill="#60a5fa"
                  animate={{ r: [8, 12, 8], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.svg>

              {/* Performance Indicators Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                {/* Top Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <div className="text-xs text-blue-400 font-mono tracking-widest">EFFICIENCY_INDEX</div>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-300"
                      animate={{ width: ['0%', '94%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                </motion.div>

                {/* Middle Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="text-xs text-green-400 font-mono tracking-widest">GLOBAL_LOGISTICS</div>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-green-300"
                      animate={{ width: ['0%', '88%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Bottom Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <div className="text-xs text-red-400 font-mono tracking-widest">TECHNICAL_ACCURACY</div>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-400 to-red-300"
                      animate={{ width: ['0%', '96%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Accent Rings */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 border border-blue-400/20 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 0.9, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-12 -left-12 w-40 h-40 border border-blue-300/10 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
