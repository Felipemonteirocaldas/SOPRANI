import { motion } from 'framer-motion';
import { Zap, Cog, Globe, Cpu } from 'lucide-react';
import { useState } from 'react';

export default function PremiumCTASection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#0a192f] overflow-hidden py-20 md:py-32">
      {/* Italian Flag Line at Top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[2px] w-24 flex">
        <div className="flex-1 bg-green-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-red-500"></div>
      </div>

      {/* Technical Grid Background with Gradient Fade */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#gridFade)" />
        </svg>
      </div>

      {/* Blueprint Lines - Floating Translucent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-96 h-96 border border-blue-400"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-80 h-80 border border-blue-300"
        />
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
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-none backdrop-blur-sm">
                <span className="font-mono text-xs text-blue-400 tracking-widest">
                  [SYSTEM_STATUS: OPTIMIZED]
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <p className="text-xs text-blue-400 tracking-[0.2em] font-mono uppercase mb-4">
                ENGINEERING EXCELLENCE
              </p>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to{' '}
                <span className="text-blue-400 font-black">Optimize</span>{' '}
                your Production Standards?
              </h2>
            </div>

            {/* Body Text */}
            <p className="font-paragraph text-lg text-gray-300 leading-relaxed max-w-lg">
              Consult our engineering experts to leverage Europe's premier machinery network, precision spare parts ecosystem, and global material trading hub, streamlining your entire supply chain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Button 1 - Solid White */}
              <motion.button
                onHoverStart={() => setHoveredButton('consult')}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 bg-white text-[#0a192f] font-mono font-bold text-sm tracking-widest rounded-none overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 bg-blue-400 transition-all duration-300 ${
                    hoveredButton === 'consult' ? 'opacity-20' : 'opacity-0'
                  }`}
                />
                <span className="relative z-10">[ CONSULT EXPERTS ]</span>
                {hoveredButton === 'consult' && (
                  <motion.div
                    layoutId="consultGlow"
                    className="absolute inset-0 rounded-none shadow-lg shadow-blue-400/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>

              {/* Button 2 - Outline Electric Blue */}
              <motion.button
                onHoverStart={() => setHoveredButton('quotation')}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 border-2 border-blue-400 text-blue-400 font-mono font-bold text-sm tracking-widest rounded-none overflow-hidden group"
              >
                <motion.div
                  animate={{
                    backgroundColor:
                      hoveredButton === 'quotation'
                        ? 'rgba(96, 165, 250, 0.1)'
                        : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                />
                <span className="relative z-10">[ REQUEST QUOTATION ]</span>
                {hoveredButton === 'quotation' && (
                  <motion.div
                    layoutId="quotationGlow"
                    className="absolute inset-0 rounded-none shadow-lg shadow-blue-400/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Data Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-full min-h-96"
          >
            {/* Glassmorphism Card */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
              {/* MPH Background Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="font-mono text-9xl font-bold text-white">MPH</span>
              </div>

              {/* Content Grid */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                {/* Top Section - Machinery */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-blue-400 rounded-full"
                    />
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-300 font-mono">Machinery Network</span>
                    </div>
                  </div>
                  <div className="ml-6 text-xs text-gray-400 font-mono">
                    Europe's Premier Hub
                  </div>
                </motion.div>

                {/* Middle Section - Spare Parts */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-3 h-3 bg-green-400 rounded-full"
                    />
                    <div className="flex items-center gap-2">
                      <Cog className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300 font-mono">Spare Parts</span>
                    </div>
                  </div>
                  <div className="ml-6 text-xs text-gray-400 font-mono">
                    Precision Ecosystem
                  </div>
                </motion.div>

                {/* Bottom Section - Material Trading */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-3 h-3 bg-red-400 rounded-full"
                    />
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-red-400" />
                      <span className="text-sm text-gray-300 font-mono">Material Trading</span>
                    </div>
                  </div>
                  <div className="ml-6 text-xs text-gray-400 font-mono">
                    Global Supply Hub
                  </div>
                </motion.div>
              </div>

              {/* Neon Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ boxShadow: '0 0 0px rgba(96, 165, 250, 0)' }}
                whileHover={{ boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Floating Accent Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 border border-blue-400/20 rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-12 -left-12 w-40 h-40 border border-blue-300/10 rounded-full pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
