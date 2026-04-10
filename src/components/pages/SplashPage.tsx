import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(() => {
        setShouldFadeOut(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [videoEnded]);

  useEffect(() => {
    if (shouldFadeOut) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldFadeOut, navigate]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleEnter = () => {
    setShouldFadeOut(true);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldFadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
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
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://video.wixstatic.com/video/9bbed2_37cad7d1812b4f7d9bb5dd524a7185b4/file" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Loading indicator - shows while video is playing */}
      {!videoEnded && (
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
      )}

      {/* Enter button - shows after video ends */}
      {videoEnded && !shouldFadeOut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={handleEnter}
            className="px-8 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Enter
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
