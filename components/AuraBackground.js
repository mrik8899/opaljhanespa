import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function AuraBackground() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    // On mobile, we can just center the effect or have it subtly drift
    // For this example, we'll let it stay centered if no mouse is detected.
    if (mousePosition.x === null) {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Use Framer Motion's useSpring for a smooth, organic trailing effect
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mousePosition.x, smoothOptions),
    y: useSpring(mousePosition.y, smoothOptions),
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a0936]">
      {/* This is the glowing, animated layer that will be revealed */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'linear-gradient(135deg, #39AD48, #BEFD73, #AFDCEC, #B784A7)',
          backgroundSize: '400% 400%',
          animation: 'shimmer 15s ease infinite',
        }}
      />
      
      {/* The MAGIC: A motion.div that acts as a MASK */}
      {/* It's a radial gradient that is transparent in the center and black elsewhere. */}
      {/* The 'mask-image' property uses this gradient to hide/reveal the layer below. */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: smoothMouse.x,
          y: smoothMouse.y,
          maskImage: 'radial-gradient(circle 250px at center, white, transparent)',
          WebkitMaskImage: 'radial-gradient(circle 250px at center, white, transparent)',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          transform: 'translate(-50%, -50%)', // Center the mask on the cursor
        }}
      />

      {/* A subtle vignette to darken the edges and focus the center */}
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)' }}/>
    </div>
  );
}