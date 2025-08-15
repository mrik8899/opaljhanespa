// D:\opal-spa-website\app\components\Navbar.js
'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// ===============================================================
// FIX: Corrected path for ThemeContext import
// ===============================================================
import { ThemeContext } from '../pages/_app'; // <-- THIS IS THE CORRECTED PATH
// ===============================================================

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseAtTop, setIsMouseAtTop] = useState(false); // Tracks if mouse is at the top of the screen
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);

  const { theme, toggleTheme } = React.useContext(ThemeContext);

  // Detect if the device supports hover (typically desktop with a mouse)
  // This helps us apply the hide/show on hover behavior and glass effect only where it makes sense.
  const isHoverDevice = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Treatments' },
    { id: 'about', label: 'Our Story' },
    { id: 'testimonials', label: 'Reviews' },
  ];

  useEffect(() => {
    const mainScrollContainer = document.getElementById('__next');

    if (!mainScrollContainer) {
      console.warn("Main scroll container #__next not found. Navbar scroll effects may not function correctly.");
    }

    const handleScroll = () => {
      // Use mainScrollContainer.scrollTop for scroll detection
      const newScrolledState = mainScrollContainer ? mainScrollContainer.scrollTop > 80 : false; // Trigger after scrolling past 80px
      setIsScrolled(newScrolledState);

      // Active section logic
      for (const item of [...navItems].reverse()) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(item.id);
          break;
        } else if (item.id === 'hero' && rect.top >= -50 && rect.top < window.innerHeight / 2) {
          setActiveSection(item.id);
          break;
        }
      }
      
      // Also check the contact section
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const rect = contactElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection('contact');
        }
      }
    };

    // Mouse movement handler for detecting if cursor is at the top (for desktop hover effect)
    const handleMouseMove = (e) => {
      if (isHoverDevice) {
        // If the mouse's Y-coordinate is within the top 50 pixels of the viewport
        setIsMouseAtTop(e.clientY < 50);
      }
    };

    // Attach scroll event listener to the main scroll container
    if (mainScrollContainer) {
      mainScrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once on mount to set initial scroll state
    }

    // Attach mousemove event listener to the window, but only for hover-capable devices
    if (isHoverDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (mainScrollContainer) {
        mainScrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (isHoverDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [navItems, isHoverDevice]); // Add isHoverDevice to dependencies

  // Handle navigation link clicks with smooth scrolling and no URL hash change
  const handleLinkClick = useCallback((e, id) => {
    e.preventDefault();
    const mainScrollContainer = document.getElementById('__next');

    // If we're on mobile, close the menu after clicking a link
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Get the target element
    const targetElement = document.getElementById(id);

    if (targetElement) {
      // Use the main scroll container for smooth scrolling if it exists
      if (mainScrollContainer) {
        // Calculate the position to scroll to
        const targetPosition = targetElement.offsetTop - 80; // Adjust for fixed header
        
        // Use smooth scrolling on the main container
        mainScrollContainer.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to default behavior if main container not found
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
      // Update active section
      setActiveSection(id);
    }
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen to dependencies

  // --- Dynamic Class Calculation for Navbar Behavior ---
  // MODIFIED: width calculation is now w-full for mobile, w-[calc(100%-17px)] for desktop
  let headerClasses = `fixed top-0 left-0 z-[999] transition-all duration-500 w-full md:w-[calc(100%-17px)]`;

  if (isScrolled) {
    // If scrolled past the initial 80px threshold:

    // NEW: Apply glass effect and shadow ONLY if it's a hover device (desktop)
    if (isHoverDevice) {
      headerClasses += ` glass-nebula-effect shadow-lg`;
    }

    if (isHoverDevice) {
  // On desktop (hover-capable device): always visible, no auto-hide
  headerClasses += ` translate-y-0 opacity-100`;
} else {
  // On mobile/touch device: keep original behavior
  headerClasses += ` translate-y-0 opacity-100`;
}

  } else {
    // If not scrolled (within the first 80px): always transparent and visible for ALL devices
    headerClasses += ` bg-transparent translate-y-0 opacity-100`;
  }

  // Variants for Framer Motion mobile menu animations
  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <header
      ref={navRef}
      className={headerClasses} // Dynamically assigned classes
    >
      {/*
        MODIFIED: Padding for mobile changed from px-2 to px-2.5 to move content slightly left.
        Desktop padding (md:px-6) remains the same.
      */}
      <nav className="max-w-7xl mx-auto px-2.5 md:px-6 py-4 flex justify-between items-center">
        <button 
        onClick={(e) => handleLinkClick(e, 'hero')} 
        className="flex items-center group bg-transparent border-none p-0 cursor-pointer"
      >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/images/logo-white.png"
              alt="Opal Spa"
              width={40}
              height={40}
              className="relative z-10"
              priority
            />
          </motion.div>
        </button>

        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.id}>
                <button
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`text-white font-medium relative group py-2 bg-transparent border-none p-0 cursor-pointer
                    ${activeSection === item.id ? 'text-[#BEFD73]' : ''}
                    hover:text-[#BEFD73]
                    dark:text-gray-200 dark:hover:text-[#BEFD73]`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#BEFD73] transition-all duration-300 ${
                      activeSection === item.id
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:text-[#BEFD73] transition-colors duration-300
                                dark:text-gray-200 dark:hover:text-[#BEFD73] focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-gray-600"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Sun size={24} />
              ) : (
                <Moon size={24} />
              )}
            </button>
          </li>
          <li>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="px-6 py-2 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-full font-semibold hover:shadow-glow transition-all duration-300 flex items-center gap-2 relative overflow-hidden group border-none cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Book Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </button>
            </motion.div>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-white hover:text-[#BEFD73] transition-colors duration-300
                                dark:text-gray-200 dark:hover:text-[#BEFD73] focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-gray-600"
                aria-label="Toggle dark mode"
            >
                {theme === 'light' ? (
                <Sun size={24} />
                ) : (
                <Moon size={24} />
                )}
            </button>

            <motion.button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                    <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    >
                    <X size={28} />
                    </motion.div>
                ) : (
                    <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    >
                    <Menu size={28} />
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-card border-t border-white/10 backdrop-blur-lg dark:border-white/5"
          >
            <div className="px-6 py-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`block w-full text-left py-4 text-white font-medium relative group hover:text-[#BEFD73] bg-transparent border-none p-0 cursor-pointer ${
                      activeSection === item.id ? 'text-[#BEFD73]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-[#BEFD73]"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </button>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/10 dark:bg-white/5" />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <button
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="w-full py-3 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-xl font-semibold text-center border-none cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    <span>Book Your Experience</span>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}