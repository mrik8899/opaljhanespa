// components/AnimatedCursor.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', mouseMove);
    
    // Add event listeners for interactive elements
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => setCursorVariant('hover'));
      link.addEventListener('mouseleave', () => setCursorVariant('default'));
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => setCursorVariant('hover'));
        link.removeEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };
  }, []);
  
  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(57, 173, 72, 0.3)',
      mixBlendMode: 'difference'
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: 'rgba(190, 253, 115, 0.4)',
      mixBlendMode: 'difference'
    }
  };
  
  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full border-2 border-[#39AD48] pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          height: 48,
          width: 48,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.03 }}
      />
    </>
  );
}