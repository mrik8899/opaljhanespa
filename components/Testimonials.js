'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Trophy } from 'lucide-react';
import Image from 'next/image';

// ✅ Your testimonial data (ensure all objects have `rating`)
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "The Swedish Harmony massage was absolutely divine. The therapist's technique was flawless.",
    treatment: "Swedish Harmony Massage",
    avatarSrc: "/images/avatars/sarah-johnson.jpg"
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "After years of stress-related tension, the deep tissue massage at Opal Jhane Spa was life-changing.",
    treatment: "Deep Tissue Therapy",
    avatarSrc: "/images/avatars/michael-chen.jpg"
  },
  {
    name: "Emma Rodriguez",
    location: "Davao City, Philippines",
    rating: 5,
    text: "The 24K Gold Facial left my skin glowing for weeks! This is more than a spa—it's a sanctuary.",
    treatment: "24K Gold Radiance Facial",
    avatarSrc: "/images/avatars/emma-rodriguez.jpg"
  },
  {
    name: "David Thompson",
    location: "London, UK",
    rating: 5,
    text: "Couples Retreat package made our anniversary unforgettable. We'll be back!",
    treatment: "Couples Retreat Package",
    avatarSrc: "/images/avatars/david-thompson.jpg"
  },
  {
    name: "Aisha Patel",
    location: "Dubai, UAE",
    rating: 5,
    text: "The Himalayan Salt Glow treatment was exceptional. My skin has never felt so smooth and renewed.",
    treatment: "Himalayan Salt Glow",
    avatarSrc: "/images/avatars/aisha-patel.jpg"
  }
];

const achievements = [
  {
    value: "500+",
    label: "5-Star Reviews",
    icon: <Star size={32} className="fill-[#F7D560] text-[#F7D560]" />
  },
  {
    value: "10K+",
    label: "Happy Clients",
    icon: <Users size={32} />
  },
  {
    value: "8+",
    label: "Years of Excellence",
    icon: <Trophy size={32} />
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (e, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) prev();
    else if (info.offset.x < -threshold) next();
  };

  const cardStates = {
    left: {
      x: 'calc(-50% - 420px)', scale: 0.7, opacity: 0.3, zIndex: 1,
      filter: 'blur(3px) brightness(0.6)', pointerEvents: 'none'
    },
    center: {
      x: 'calc(-50% + 0px)', scale: 1.1, opacity: 1, zIndex: 2,
      filter: 'blur(0px) brightness(1)', pointerEvents: 'auto'
    },
    right: {
      x: 'calc(-50% + 420px)', scale: 0.7, opacity: 0.3, zIndex: 1,
      filter: 'blur(3px) brightness(0.6)', pointerEvents: 'none'
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* ✅ Perfect blending gradient from About.js */}
   <div
  className="absolute inset-0 z-0"
  style={{
    background: `linear-gradient(to bottom,
      rgba(60, 31, 118, 0.23) 0%,
      rgba(60, 31, 118, 0.26) 100%)`
  }}
/>
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Verified <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            What our clients say after experiencing Opal Jhane’s luxurious treatments.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="absolute top-1/2 -left-4 md:-left-12 z-30 -translate-y-1/2">
            <button onClick={prev} className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-12 z-30 -translate-y-1/2">
            <button onClick={next} className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="relative h-[550px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              {[
                { offset: -1, position: 'left' },
                { offset: 0, position: 'center' },
                { offset: 1, position: 'right' }
              ].map(({ offset, position }) => {
                const index = (currentIndex + offset + testimonials.length) % testimonials.length;
                const t = testimonials[index];

                if (!t || typeof t.rating !== 'number') return null;

                return (
                 <motion.div
  key={index}
  initial={cardStates[position]}
  animate={cardStates[position]}
  exit={direction > 0 ? cardStates.left : cardStates.right}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  drag="x"
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  className="glass-card absolute rounded-2xl p-6 sm:p-8 flex flex-col justify-between w-[75vw] sm:w-96 h-[480px] sm:h-[490px]"
  style={{ left: '50%', transform: 'translateX(-50%)' }}
>
                    <Quote className="absolute top-4 right-4 w-12 h-12 text-white/10" />

                    <div className="flex gap-1 mb-4">
                      {Array(t.rating).fill().map((_, i) => (
                        <Star key={i} size={18} className="fill-[#F7D560] text-[#F7D560]" />
                      ))}
                    </div>

                    <blockquote className="text-white/90 text-lg leading-relaxed mb-6 flex-grow italic">
                      "{t.text}"
                    </blockquote>

                    <div className="mb-4">
                      <span className="px-3 py-1 bg-[#39AD48]/20 text-[#BEFD73] rounded-full text-sm">
                        {t.treatment}
                      </span>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#39AD48]/30 to-[#B784A7]/30 border border-white/10 overflow-hidden relative">
                        <Image
                          src={t.avatarSrc}
                          alt={`${t.name}'s avatar`}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                        <div>
                          <h4 className="text-white font-semibold">{t.name}</h4>
                          <p className="text-white/60 text-sm">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-[#BEFD73] w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges / Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ y: -12 }}
            >
              <div className="inline-flex p-4 bg-[#39AD48]/20 rounded-2xl text-[#BEFD73] mb-4">
                {a.icon}
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent mb-2">
                {a.value}
              </p>
              <p className="text-white/70">{a.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    
    </section>
  );
}