// components/FloatingNav.js
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const navItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'features', label: 'Experience', icon: '✨' },
    { id: 'services', label: 'Treatments', icon: '💆' },
    { id: 'about', label: 'Our Story', icon: '📖' },
    { id: 'testimonials', label: 'Reviews', icon: '⭐' },
    { id: 'contact', label: 'Book Now', icon: '📅' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      for (const item of [...navItems].reverse()) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);
  
  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Floating Navigation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <nav className="glass-card rounded-full px-2 py-2 backdrop-blur-lg border border-white/20 shadow-2xl">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <div className="relative">
                  <button
                    type="button"
                    aria-label={`Scroll to ${item.label}`}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-[#39AD48]/30 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <motion.span
                      className="text-xs absolute -bottom-6 whitespace-nowrap font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: activeSection === item.id ? 1 : 0,
                        y: activeSection === item.id ? 0 : -10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#39AD48]/20"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
}