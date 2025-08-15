// components/BlobBackground.js
import React from 'react';
import { motion } from 'framer-motion';

export default function BlobBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {/* Purple Blob */}
      <motion.div
        className="absolute rounded-full bg-purple-400 opacity-30 blur-3xl"
        style={{ width: 300, height: 300, top: '10%', left: '5%' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blue Blob */}
      <motion.div
        className="absolute rounded-full bg-blue-400 opacity-30 blur-3xl"
        style={{ width: 300, height: 300, top: '10%', right: '10%' }}
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Green Blob */}
      <motion.div
        className="absolute rounded-full bg-green-300 opacity-30 blur-3xl"
        style={{ width: 350, height: 350, bottom: '15%', left: '35%' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
