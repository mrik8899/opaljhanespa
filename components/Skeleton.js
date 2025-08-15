'use client';

import { motion } from 'framer-motion';

export function Skeleton({ className = '', count = 1, circle = false, style = {} }) {
  const elements = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className={`overflow-hidden ${className}`}>
      {elements.map((_, index) => (
        <motion.div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 rounded-md ${
            circle ? 'rounded-full' : ''
          }`}
          style={{
            ...style,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export function ImageSkeleton({ className = '', circle = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Skeleton 
        className={`w-full h-full ${circle ? 'rounded-full' : 'rounded'}`}
        circle={circle}
      />
    </div>
  );
}

export function TextSkeleton({ lines = 3, className = '', lastLineWidth = '70%' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-4 w-full"
          style={i === lines - 1 ? { width: lastLineWidth } : {}}
        />
      ))}
    </div>
  );
}
