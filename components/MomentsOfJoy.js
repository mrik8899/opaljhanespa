// D:\opal-spa-website\app\components\MomentsOfJoy.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

// --- Haptic Feedback Hook (Simulated/Conceptual) ---
const useHapticFeedback = () => {
    const trigger = useCallback((type = 'impactLight') => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            // Basic vibration, enhance for more sophisticated haptics if needed
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

// Define your images with specific alt text, captions, and bento grid span properties
const images = [
    // REVISED ORDER based on your provided diagram (image_5d3f3c.png) and 4-column grid logic:

    { // Position 1: group1 (NOW 3 columns, 2 rows on md+ / desktop)
        src: '/group/group1.jpg',
        alt: 'Joyful group of friends enjoying a spa day together.',
        caption: 'Shared moments of bliss and laughter that last a lifetime.',
        span: 'col-span-2 md:col-span-3 md:row-span-2', // Full width on mobile (2 of 2 cols), NOW 3 columns and 2 rows on md+
        orientation: 'square'
    },
    { // Position 2: group2 (1 column, 1 row on md+ / desktop, forced to start in 4th column)
        src: '/group/group2.jpg',
        alt: 'Clients receiving relaxing foot massages in a bright, inviting room.',
        caption: 'Experience ultimate comfort and care with our therapeutic foot treatments.',
        span: 'col-span-1 md:col-span-1 md:col-start-4', // Half width on mobile (1 of 2 cols), 1 column starting in the 4th column on md+
        orientation: 'portrait'
    },
    { // Position 3: group4 (1 column, 1 row on md+ / desktop, forced to start in 4th column, auto-stacks below group2)
        src: '/group/group4.jpg',
        alt: 'A serene spa setting with a client receiving a back massage.',
        caption: 'Melt away stress and tension with our deeply therapeutic body massages.',
        span: 'col-span-1 md:col-span-1 md:col-start-4', // Half width on mobile, 1 column starting in the 4th column on md+
        orientation: 'landscape' // Assuming landscape for this content
    },
    { // Position 4: group9 (1 column, 1 row on md+ / desktop, starts below group1)
        src: '/group/group9.jpg',
        alt: 'A guest receiving a calming head and shoulder massage.',
        caption: 'Targeted relief for stress and tension in the neck and shoulders.',
        span: 'col-span-1 md:col-span-1', // Half width on mobile, 1 column on md+
        orientation: 'portrait'
    },
    { // Position 5: group10 (1 column, 1 row on md+ / desktop, right of group9)
        src: '/group/group10.jpg',
        alt: 'Customer relaxing in a cozy massage chair, completely at ease.',
        caption: 'Sink into pure tranquility and let your worries melt away.',
        span: 'col-span-1 md:col-span-1', // Half width on mobile, 1 column on md+
        orientation: 'portrait'
    },
    { // Position 6: group7 (2 columns, 1 row on md+ / desktop, right of group10, filling row)
        src: '/group/group7.jpg',
        alt: 'Close-up of hands receiving a calming and precise hand massage.',
        caption: 'Every touch meticulously designed to bring you ultimate comfort.',
        span: 'col-span-2 md:col-span-2', // Full width on mobile, 2 columns on md+ (to fill row)
        orientation: 'landscape' // Assuming landscape for wider image
    },
    { // Position 7: group5 (1 column, 1 row on md+ / desktop, starts below group9)
        src: '/group/group5.jpg',
        alt: 'Happy customer smiling after a full body spa treatment.',
        caption: 'Leave feeling radiant, revitalized, and utterly refreshed.',
        span: 'col-span-1 md:col-span-1', // Half width on mobile, 1 column on md+
        orientation: 'portrait'
    },
    { // Position 8: group8 (3 columns, 1 row on md+ / desktop, right of group5)
        src: '/group/group8.jpg',
        alt: 'Friends enjoying a foot spa session together, laughing and bonding.',
        caption: 'Perfect for a relaxing outing with friends – pampering and bonding combined.',
        span: 'col-span-2 md:col-span-3', // Full width on mobile, 3 columns on md+
        orientation: 'landscape'
    },
    { // Position 9: group3 (4 columns, NOW 2 rows on md+ / desktop, full width)
        src: '/group/group3.jpg',
        alt: 'Guest enjoying a refreshing facial treatment at the spa.',
        caption: 'Rejuvenate your skin and spirit with our signature facial services.',
        span: 'col-span-2 md:col-span-4 md:row-span-2', // Full width on mobile, 4 columns and NOW 2 rows on md+
        orientation: 'landscape'
    },
    { // Position 10: group11 (PLACEHOLDER - 1 column, 1 row on md+ / desktop)
        src: '/group/group11.jpg', // <--- IMPORTANT: Update this image source!
        alt: 'Client enjoying a relaxing head massage.', // <--- IMPORTANT: Update this alt text!
        caption: 'Experience pure bliss and relaxation for your mind and body.', // <--- IMPORTANT: Update this caption!
        span: 'col-span-1 md:col-span-1', // Half width on mobile, 1 column on md+
        orientation: 'portrait'
    },
    { // Position 11: group6 (3 columns, 2 rows on md+ / desktop, right of group11/group12)
        src: '/group/group6.jpg',
        alt: 'Another joyful group portrait of spa guests after their treatments.',
        caption: 'Making lasting memories of relaxation and well-being with friends and family.',
        span: 'col-span-2 md:col-span-3 md:row-span-2', // Full width on mobile, 3 columns and 2 rows on md+
        orientation: 'square'
    },
    { // Position 12: group12 (PLACEHOLDER - 1 column, 1 row on md+ / desktop, below group11)
        src: '/group/group12.jpg', // <--- IMPORTANT: Update this image source!
        alt: 'A close-up of a soothing aromatherapy candle in the spa.', // <--- IMPORTANT: Update this alt text!
        caption: 'Enhance your spa journey with our calming aromatherapy options.', // <--- IMPORTANT: Update this caption!
        span: 'col-span-1 md:col-span-1', // Half width on mobile, 1 column on md+
        orientation: 'portrait'
    },
];

const floatVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95, filter: "blur(5px)" },
    animate: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            delay: i * 0.08,
            duration: 0.9,
            ease: 'easeOut',
        },
    }),
};

export default function MomentsOfJoy() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { trigger: triggerHaptic } = useHapticFeedback();

    const handleKeyDown = useCallback((e) => {
        if (selectedIndex !== null) {
            if (e.key === 'Escape') {
                setSelectedIndex(null);
                triggerHaptic('selection');
            }
            if (e.key === 'ArrowRight') {
                setSelectedIndex((prev) => (prev + 1) % images.length);
                triggerHaptic('selection');
            }
            if (e.key === 'ArrowLeft') {
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                triggerHaptic('selection');
            }
        }
    }, [selectedIndex, images.length, triggerHaptic]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (selectedIndex !== null) {
                setSelectedIndex((prev) => (prev + 1) % images.length);
                triggerHaptic('selection');
            }
        },
        onSwipedRight: () => {
            if (selectedIndex !== null) {
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                triggerHaptic('selection');
            }
        },
        trackMouse: true,
    });

    const handleImageClick = useCallback((index) => {
        setSelectedIndex(index);
        triggerHaptic('impactLight');
    }, [triggerHaptic]);

    const handleCloseLightbox = useCallback(() => {
        setSelectedIndex(null);
        triggerHaptic('impactHeavy');
    }, [triggerHaptic]);

    return (
        <section
            id="moments"
            className="relative w-full py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Background Container for potential overlays/blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Overlay for MomentsOfJoy section - Continues the blending chain */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom,
                                    rgba(60, 31, 118, 0.05) 0%,
                                    rgba(60, 31, 118, 0.15) 100%
                                )`
                    }}
                />

                {/* Animated Blobs - Keep these as they are */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#39AD48] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#B784A7] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob-medium" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#AFDCEC] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob-fast" />
            </div>

            {/* Heading */}
            <div className="relative z-10 text-center mb-14">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
                >
                    Moments of{' '}
                    <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">
                        Joy
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-0"
                >
                    A glimpse into the genuine smiles and serene experiences of our cherished guests.
                </motion.p>
                {/*
                    MODIFIED: Added flex-col for mobile, flex-row for medium screens and up.
                    Added a div wrapper for the stars to treat them as a single unit when stacking.
                    Adjusted gap for better spacing on mobile.
                */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    // Added flex-col for mobile, md:flex-row for desktop
                    // Increased gap for vertical spacing on mobile
                    className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-1 mt-4 text-amber-400"
                >
                    {/* Wrapped stars in a div to manage their layout as a single unit */}
                    <div className="flex justify-center items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={24} fill="currentColor" stroke="none" />
                        ))}
                    </div>
                    {/* Removed ml-2 from mobile, added md:ml-2 for desktop */}
                    <span className="text-white/80 text-lg md:ml-2">5-star experiences, every time.</span>
                </motion.div>
            </div>

            {/* Image Grid (Bento Grid Style) */}
            {/* grid-cols-2 for mobile (default), sm:grid-cols-3 for tablets, lg:grid-cols-4 for desktop */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]">
                {images.map((image, i) => (
                    <motion.div
                        key={image.src}
                        custom={i}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={floatVariants}
                        className={`${image.span} rounded-3xl overflow-hidden group relative cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-[1.02] transition-transform duration-500 transform-gpu`}
                        onClick={() => handleImageClick(i)}
                        whileHover={{ translateY: -8, boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            // Optimized sizes for responsive images
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, (max-width: 1024px) 75vw, 1280vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={i < 4}
                        />
                        {/* Text overlay only visible on desktop hover, hidden by default (mobile), flex on md+ */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center p-4 text-center">
                            <span className="text-white text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity delay-100 line-clamp-2">
                                {image.alt}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        {...(selectedIndex !== null ? swipeHandlers : {})}
                    >
                        <button
                            onClick={handleCloseLightbox}
                            className="absolute top-5 right-5 text-white hover:text-red-300 z-50 p-2 rounded-full bg-black/30 transition-colors"
                            aria-label="Close image gallery"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            key={images[selectedIndex].src}
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0.5 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full h-full max-w-5xl flex items-center justify-center"
                        >
                            <Image
                                src={images[selectedIndex].src}
                                alt={images[selectedIndex].alt}
                                // Adjusted width/height for common portrait/landscape ratios, will be constrained by max-w/h
                                width={images[selectedIndex].orientation === 'portrait' ? 800 : 1200}
                                height={images[selectedIndex].orientation === 'portrait' ? 1000 : 800}
                                className="w-auto h-auto max-w-full max-h-[calc(100vh-140px)] sm:max-h-[calc(100vh-180px)] object-contain rounded-2xl shadow-xl border border-white/20"
                                priority
                            />
                            {/* Arrows */}
                            <button
                                onClick={() => {
                                    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
                                    triggerHaptic('selection');
                                }}
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-white/30 transition-all z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedIndex((selectedIndex + 1) % images.length);
                                    triggerHaptic('selection');
                                }}
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-white/30 transition-all z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight size={32} />
                            </button>
                            {/* Image Caption - Always shown in Lightbox */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-lg max-w-[80%] text-center"
                            >
                                {images[selectedIndex].caption}
                            </motion.p>
                        </motion.div>

                        {/* Thumbnail strip */}
                        <div className="mt-6 flex flex-row justify-center gap-2 max-w-full overflow-x-auto p-2 scrollbar-hide flex-nowrap">
                            {images.map((image, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setSelectedIndex(idx);
                                        triggerHaptic('selection');
                                    }}
                                    className={`w-16 h-16 relative flex-shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300
                                            ${idx === selectedIndex ? 'border-[#BEFD73] shadow-md scale-110' : 'border-white/10 opacity-70 hover:opacity-100'}`}
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
                )}
            </AnimatePresence>
        </section>
    );
}