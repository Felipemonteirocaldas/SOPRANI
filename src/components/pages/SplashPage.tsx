import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function SplashPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with Video */}
      <div className="absolute inset-0 bg-black/20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://video.wixstatic.com/video/9bbed2_37cad7d1812b4f7d9bb5dd524a7185b4/file" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>



      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200" />
        </div>
        <p className="text-white text-sm font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
