// components/BackToTop.js - Adjusted to scroll to #__next
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Get the main scrollable element
    const mainScrollContainer = document.getElementById('__next');

    if (!mainScrollContainer) {
      console.warn("Main scroll container #__next not found. BackToTop may not function correctly.");
      return; // Exit if the element isn't found
    }

    const toggleVisibility = () => {
      // Check scroll position of the main scroll container
      setVisible(mainScrollContainer.scrollTop > 300);
    };

    // Add event listener to the main scroll container
    mainScrollContainer.addEventListener('scroll', toggleVisibility);

    // Initial check in case the page loads already scrolled down
    toggleVisibility();

    // Clean up the event listener when the component unmounts
    return () => mainScrollContainer.removeEventListener('scroll', toggleVisibility);
  }, []); // Empty dependency array means this effect runs once on mount

  const scrollToTop = () => {
    const mainScrollContainer = document.getElementById('__next');
    if (mainScrollContainer) {
      // Scroll the main scroll container to its top
      mainScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          // MODIFIED:
          // - bottom-8 to bottom-6 (slightly higher)
          // - right-8 to right-4 (closer to the right edge for both mobile & desktop)
          // - p-4 to p-3 (reduced padding for smaller overall button size)
          className="fixed bottom-6 right-4 z-50 p-3 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-full shadow-lg hover:shadow-glow transition-all duration-300"
          aria-label="Back to top"
        >
          {/* MODIFIED: size={24} to size={20} (smaller icon) */}
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}