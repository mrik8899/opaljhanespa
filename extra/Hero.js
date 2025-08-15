import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

useEffect(() => {
  const video = document.createElement('video');
  video.src = '/videos/hero.mp4';
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.oncanplaythrough = () => setVideoLoaded(true);
}, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex justify-center items-center text-white overflow-hidden scroll-smooth">
      {/* 🔥 Background Video or Fallback */}
     {videoLoaded ? (
  <video
    autoPlay
    muted={isMuted}
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover z-0"
    poster="/images/hero-fallback.jpg"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
) : (
  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black z-[-1]">
    <div className="w-14 h-14 border-[5px] border-t-transparent border-white rounded-full animate-spin border-dashed"></div>
  </div>
)}

      {/* 🧠 Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* 🌟 Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="text-center z-10 px-4"
      >
        {/* 🚀 Logo */}
        <img
          src="/images/logo-white.png"
          alt="Logo"
          className="mx-auto w-60 mb-6"
        />

       {/* ✨ Headline */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight text-center">
    Rediscover Your Inner Glow
  </h1>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
>
  <p className="text-lg sm:text-2xl max-w-2xl mx-auto mb-8 text-center text-neutral-100">
    Indulge in luxurious spa treatments that restore balance, beauty, and peace of mind.
  </p>
</motion.div>

        {/* 🚀 Smooth Scroll Button */}
        <button
          onClick={scrollToFeatures}
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full shadow hover:bg-indigo-100 transition duration-300"
        >
          Get Started
        </button>
      </motion.div>

      {/* 🔇 Mute/Unmute */}
      {!isMobile && videoLoaded && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 right-6 bg-white/70 text-black text-sm font-medium px-4 py-2 rounded shadow z-10 hover:bg-white transition"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      )}

      {/* ⬇️ Scroll Down Arrow */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button onClick={scrollToFeatures}>
         
        </button>
      </div>
     {/*  <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>*/}
    </section>
  );
}
