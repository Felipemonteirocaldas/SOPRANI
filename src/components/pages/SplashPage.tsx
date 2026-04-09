import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SplashPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVideoEnd = () => {
      navigate('/');
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, [navigate]);

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleSkip}
        className="absolute top-6 right-6 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors z-10"
      >
        Skip
      </motion.button>

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
