'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = Array.from({ length: 20 }, (_, i) => `/group/group${i + 1}.jpg`);

const floatVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const generateRandomGridStyles = (count) => {
  const styles = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    if (rand > 0.85) styles.push('col-span-2 row-span-2');
    else if (rand > 0.7) styles.push('col-span-2');
    else styles.push('');
  }
  return styles;
};

export default function MomentsOfJoy() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gridStyles = useMemo(() => generateRandomGridStyles(images.length), []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setLightboxIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length),
    onSwipedDown: () => setLightboxIndex(null),
    trackMouse: true,
  });

  return (
    <section
      id="moments"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden"
    >
      {/* Background and Orbs Matching EnhancedBentoGrid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(60, 31, 118, 0.15) 0%, rgba(60, 31, 118, 0.15) 30%, rgba(60, 31, 118, 0.20) 100%)`,
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#39AD48] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#B784A7] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#AFDCEC] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 text-center mb-14">
        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] text-transparent bg-clip-text">
            Moments of Joy
          </span>
        </h2>
        <p className="text-white/70 text-lg sm:text-xl font-light">
          Captured smiles from our cherished guests
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-4 max-w-7xl mx-auto">
        {images.map((src, i) => (
          <motion.div
            key={src}
            custom={i}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={floatVariants}
            className={`relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl transition-transform duration-500 hover:scale-105 cursor-pointer ${gridStyles[i]}`}
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={src}
              alt={`Guest ${i + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          {...handlers}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-red-400"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
              className="absolute left-0 text-white px-3 py-2"
            >
              <ChevronLeft size={32} />
            </button>
            <div className="w-full h-[80vh] relative">
              <Image
                src={images[lightboxIndex]}
                alt={`Large view ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
              className="absolute right-0 text-white px-3 py-2"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex overflow-x-auto gap-2 mt-6 px-4">
            {images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`thumb ${i}`}
                width={80}
                height={80}
                className={`rounded-lg border ${i === lightboxIndex ? 'border-[#BEFD73]' : 'border-transparent'} cursor-pointer hover:opacity-80`}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
