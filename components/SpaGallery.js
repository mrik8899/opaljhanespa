'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'; // Keep this for now, though it moves to portal
import LightboxPortal from './LightboxPortal'; // Import the new LightboxPortal component

// --- Haptic Feedback Hook (Now primarily used in SpaGallery for initial clicks) ---
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

const facilityImages = [
    { src: '/images/spa-facility/reception-area-1.jpg', alt: 'Spacious and elegantly lit spa reception area', category: 'welcome' },
    { src: '/images/spa-facility/reception-area-2.jpg', alt: 'Welcoming spa reception desk with modern decor', category: 'welcome' },
    { src: '/images/spa-facility/reception-area-3.jpg', alt: 'Comfortable seating in the spa reception lounge', category: 'welcome' },
    { src: '/images/spa-facility/receiption-area-4.jpg', alt: 'Lush plant decor and seating in spa reception', category: 'welcome' },
    { src: '/images/spa-facility/reception-area-5.jpg', alt: 'Panoramic view of the inviting spa reception area', category: 'welcome' },

    { src: '/images/spa-facility/first-floor-1.jpg', alt: 'First floor hallway leading to treatment rooms', category: 'details' },
    { src: '/images/spa-facility/first-floor-2.jpg', alt: 'Overhead view of the spa’s first floor interior', category: 'details' },

    { src: '/images/spa-facility/massage-room-1.jpg', alt: 'Serene single massage treatment room', category: 'rooms' },
    { src: '/images/spa-facility/massage-room-2.jpg', alt: 'Cozy massage room with warm ambient lighting', category: 'rooms' },
    { src: '/images/spa-facility/massage-room-3.jpg', alt: 'Traditional Thai massage room setup', category: 'rooms' },
    { src: '/images/spa-facility/massage-room-4.jpg', alt: 'Relaxing massage room with elegant interior', category: 'rooms' },
    { src: '/images/spa-facility/massage-room-5.jpg', alt: 'Intimate massage room designed for tranquility', category: 'rooms' },

    { src: '/images/spa-facility/foot-massage-1.jpg', alt: 'Comfortable foot massage station with plush chairs', category: 'rooms' },
    { src: '/images/spa-facility/foot-massage-2.jpg', alt: 'Foot massage area with relaxing ambiance', category: 'rooms' },

    { src: '/images/spa-facility/sauna.jpg', alt: 'Interior of a modern and spacious sauna', category: 'amenities' },
    { src: '/images/spa-facility/shower.jpg', alt: 'Clean and modern spa shower facility', category: 'amenities' },
];

const categories = [
    { label: 'All', value: 'all' },
    { label: 'Welcome Areas', value: 'welcome' },
    { label: 'Treatment Rooms', value: 'rooms' },
    { label: 'Wellness Amenities', value: 'amenities' },
    { label: 'Other Areas', value: 'details' },
];

export default function SpaGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const { trigger: triggerHaptic } = useHapticFeedback();

    const filteredImages = currentCategory === 'all'
        ? facilityImages
        : facilityImages.filter(img => img.category === currentCategory);

    const openLightbox = useCallback((image) => {
        setSelectedImage(image);
        // document.body.style.overflow handled by LightboxPortal useEffect
        triggerHaptic('impactLight');
    }, [triggerHaptic]);

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
        // document.body.style.overflow handled by LightboxPortal useEffect
        triggerHaptic('impactHeavy');
    }, [triggerHaptic]);

    // MODIFIED navigateLightbox to handle both directions and direct index for thumbnails
    const navigateLightbox = useCallback((directionOrIndex) => {
        if (!selectedImage) return;

        let nextIndex;
        if (typeof directionOrIndex === 'string') { // It's a 'next' or 'prev' string
            const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
            if (directionOrIndex === 'next') {
                nextIndex = (currentIndex + 1) % filteredImages.length;
            } else { // 'prev'
                nextIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
            }
        } else { // It's a direct index from thumbnail click
            nextIndex = directionOrIndex;
        }

        setSelectedImage(filteredImages[nextIndex]);
        triggerHaptic('selection');
    }, [selectedImage, filteredImages, triggerHaptic]);

    // Keyboard navigation is now handled within LightboxPortal
    // Body overflow is also handled within LightboxPortal's useEffect

    return (
        <div id="gallery-content" className="max-w-7xl mx-auto px-6 h-full flex flex-col">
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-6 text-center pt-8 md:pt-0"
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Explore Our <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Facilities</span>
            </motion.h2>
            <motion.p
                className="text-center text-white/70 text-lg mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
                Step into our world of tranquility. Browse through our state-of-the-art facilities, designed for your ultimate relaxation and rejuvenation.
            </motion.p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                    <motion.button
                        key={category.value}
                        onClick={() => {
                            setCurrentCategory(category.value);
                            triggerHaptic('selection');
                        }}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out ${
                            currentCategory === category.value
                                ? 'bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white shadow-lg'
                                : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.label}
                    </motion.button>
                ))}
            </div>

            {/* Image Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow overflow-y-auto pr-2 scrollbar-hide"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                    hidden: {},
                }}
            >
                {filteredImages.length > 0 ? (
                    filteredImages.map((image, index) => (
                        <motion.div
                            key={image.src}
                            className="relative w-full h-64 rounded-xl overflow-hidden shadow-xl cursor-pointer group"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 20 },
                                visible: { opacity: 1, scale: 1, y: 0 },
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openLightbox(image)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={index < 4}
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-4 text-white/90 text-lg font-semibold opacity-0 group-hover:opacity-100">
                                {image.alt}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        className="col-span-full text-center text-white/70 text-xl py-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        No images found for this category.
                    </motion.p>
                )}
            </motion.div>

            {/* LIGHTBOX IS NOW PORTALED */}
            {selectedImage && (
                <LightboxPortal
                    selectedImage={selectedImage}
                    closeLightbox={closeLightbox}
                    navigateLightbox={navigateLightbox}
                    filteredImages={filteredImages}
                />
            )}
        </div>
    );
}