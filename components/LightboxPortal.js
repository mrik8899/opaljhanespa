'use client'; // This component must be client-side

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
//                                            ↓ ADD useState HERE
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom'; // Import createPortal

// Rest of your LightboxPortal.js code...

// --- Haptic Feedback Hook (Copied from SpaGallery) ---
const useHapticFeedback = () => {
    const trigger = useCallback((type = 'impactLight') => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            switch (type) {
                case 'selection':
                    navigator.vibrate(50);
                    break;
                case 'impactLight':
                    navigator.vibrate(100);
                    break;
                case 'impactHeavy':
                    navigator.vibrate(200);
                    break;
                default:
                    navigator.vibrate(50);
            }
        }
    }, []);
    return { trigger };
};

export default function LightboxPortal({ selectedImage, closeLightbox, navigateLightbox, filteredImages }) {
    const [mounted, setMounted] = useState(false);
    const { trigger: triggerHaptic } = useHapticFeedback();

    useEffect(() => {
        setMounted(true);
        // Ensure body overflow is hidden when lightbox is open
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    // Keyboard navigation for lightbox
    const handleKeyDown = useCallback((e) => {
        if (selectedImage !== null) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
            if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
            if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            }
        }
    }, [selectedImage, closeLightbox, navigateLightbox]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Swipe handlers for mobile lightbox navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => navigateLightbox('next'),
        onSwipedRight: () => navigateLightbox('prev'),
        trackMouse: true,
    });

    if (!mounted || !selectedImage) {
        return null; // Don't render anything until mounted and an image is selected
    }

    return createPortal(
        <AnimatePresence>
            {selectedImage && ( // Double check selectedImage here due to AnimatePresence
                <motion.div
                    className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-4 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeLightbox}
                    {...swipeHandlers}
                >
                    <motion.div
                        // Finalized classes for inner lightbox content
                        // Retaining the specific height calc, flex setup, and temp background for your debugging
                        className="relative w-full max-w-7xl h-[calc(100vh-32px)] flex flex-col items-center justify-between p-4 md:p-8 rounded-lg bg-black/20" // KEEP bg-black/20 FOR YOUR TESTING
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-50 rounded-full bg-black/30 hover:bg-black/50"
                            aria-label="Close image"
                        >
                            <X size={28} />
                        </button>

                        {/* Main Image Container */}
                        <div className="relative flex-grow w-full max-w-full flex items-center justify-center overflow-hidden">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                sizes="(max-width: 768px) 90vw, 80vw"
                                className="object-contain rounded-lg shadow-2xl"
                                priority
                            />
                        </div>

                        <p className="text-white text-lg text-center max-w-[90vw] mt-4 mb-4">
                            {selectedImage.alt}
                        </p>

                        {/* Navigation Arrows */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors z-50 rounded-full bg-black/30 hover:bg-black/50 hidden md:block"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors z-50 rounded-full bg-black/30 hover:bg-black/50 hidden md:block"
                            aria-label="Next image"
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Thumbnail strip */}
                        <div className="flex flex-row justify-center gap-2 max-w-full overflow-x-auto p-2 scrollbar-hide flex-nowrap">
                            {filteredImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        navigateLightbox(idx); // Update: Pass index to navigateLightbox
                                        triggerHaptic('selection');
                                    }}
                                    className={`w-16 h-16 relative flex-shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300
                                                ${image.src === selectedImage.src ? 'border-[#BEFD73] shadow-md scale-110' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body // This is where the portal renders the lightbox
    );
}