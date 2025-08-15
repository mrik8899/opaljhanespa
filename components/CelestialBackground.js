import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';
import InteractiveParticles from './InteractiveParticles';

export default function CelestialBackground() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY, radius: 150 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothMouse = {
    x: useSpring(mousePosition.x, { damping: 40, stiffness: 400, mass: 1 }),
    y: useSpring(mousePosition.y, { damping: 40, stiffness: 400, mass: 1 }),
  };

  return (
    <div className="absolute inset-0 bg-[#0c031a] overflow-hidden">
      {/* Layer 1: The Marble Floor (Image) */}
      <Image
        src="/dark-marble.jpg" // IMPORTANT: Find a dark, subtle marble/slate texture
        alt="Dark marble texture floor of the celestial pool"
        layout="fill"
        objectFit="cover"
        className="opacity-20 z-0"
      />
      
      {/* Layer 2: The Deep Light (Blobs) */}
      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#39AD48] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob z-10" />
      <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B784A7] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-3000 z-10" />

      {/* Layer 3: The Water Surface (Video) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-overlay opacity-30"
        src="/gentle-ripples.mp4" // IMPORTANT: Find a subtle, dark water ripple video
      />

      {/* Layer 4: The Bioluminescent Life (Particles) */}
      <InteractiveParticles mousePosition={mousePosition} />
      
      {/* Layer 5: The User's Ripple (Aura) */}
      {/* This is a mask revealing a soft light, simulating a ripple */}
      <div 
        className="absolute inset-0 z-30"
        style={{
          maskImage: `radial-gradient(circle ${mousePosition.radius}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle ${mousePosition.radius}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 70%)`,
        }}
      >
        <div className="absolute inset-0 bg-white opacity-10 filter blur-xl" />
      </div>

      {/* Layer 6: The Star Reflections (Your original stars!) */}
      {/* We reuse your star component logic here, slightly simplified */}
      <div className="absolute inset-0 z-40 mix-blend-color-dodge">
        {/* Simplified stars for reflection effect */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`
            }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}