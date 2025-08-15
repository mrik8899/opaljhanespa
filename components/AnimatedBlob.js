import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBlob = ({ 
  size = 'md',
  color = 'from-emerald-200 to-teal-300',
  className = '',
  delay = 0,
  position = 'top-right',
  blur = true
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32 md:w-40 md:h-40',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-80 md:h-80',
    xl: 'w-80 h-80 md:w-96 md:h-96',
  };

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      }}
      className={`absolute ${sizeClasses[size]} ${positionClasses[position]} ${className} ${blur ? 'blur-2xl' : ''} rounded-full bg-gradient-to-br ${color} mix-blend-multiply filter`}
      style={{
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBlob;
