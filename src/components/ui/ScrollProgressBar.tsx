import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10001] h-[4px]"
      style={{
        scaleX,
        transformOrigin: 'left',
        background: 'linear-gradient(to right, #008C45, #F4F5F0, #CD212A)'
      }}
      aria-hidden="true"
    />
  );
};
