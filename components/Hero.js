// D:\opal-spa-website\app\components\Hero.js (Phase 19: Heading Text Wrap Fix)
'use client';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import GradientBackground from './GradientBackground';
import dynamic from 'next/dynamic';

// --- Haptic Feedback Hook (Retained) ---
const useHapticFeedback = () => {
    const trigger = useCallback((type = 'impactLight') => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            switch (type) {
                case 'selection': navigator.vibrate(30); break;
                case 'impactLight': navigator.vibrate(60); break;
                case 'impactHeavy': navigator.vibrate(120); break;
                default: navigator.vibrate(30);
            }
        }
    }, []);
    return { trigger };
};

// --- Video Data with Context & Poster Images ---
// IMPORTANT: Replace desktopSrc and desktopPoster with your actual horizontal video paths!
const allVideos = [
    {
        mobileSrc: '/videos/hero-vertical-1.mp4',
        desktopSrc: '/videos/hero-horizontal-1.mp4', // <--- REPLACE WITH YOUR HORIZONTAL VIDEO PATH
        poster: '/images/hero-vertical-1-poster.jpg',
        desktopPoster: '/images/hero-horizontal-1-poster.jpg', // <--- REPLACE WITH YOUR HORIZONTAL POSTER PATH
        context: 'day, calming, facial', alt: 'Serene facial treatment'
    },
    {
        mobileSrc: '/videos/hero-vertical-2.mp4',
        desktopSrc: '/videos/hero-horizontal-2.mp4', // <--- REPLACE
        poster: '/images/hero-vertical-2-poster.jpg',
        desktopPoster: '/images/hero-horizontal-2-poster.jpg', // <--- REPLACE
        context: 'evening, luxury, massage', alt: 'Luxurious massage therapy'
    },
    {
        mobileSrc: '/videos/hero-vertical-3.mp4',
        desktopSrc: '/videos/hero-horizontal-3.mp4', // <--- REPLACE
        poster: '/images/hero-vertical-3-poster.jpg',
        desktopPoster: '/images/hero-horizontal-3-poster.jpg', // <--- REPLACE
        context: 'spa, treatments, relaxation', alt: 'Relaxing spa ambiance'
    },
    {
        mobileSrc: '/videos/hero-vertical-4.mp4',
        desktopSrc: '/videos/hero-horizontal-4.mp4', // <--- REPLACE
        poster: '/images/hero-vertical-4-poster.jpg',
        desktopPoster: '/images/hero-horizontal-4-poster.jpg', // <--- REPLACE
        context: 'nature, meditation, tranquility', alt: 'Peaceful meditation scene'
    },
    {
        mobileSrc: '/videos/hero-vertical-5.mp4',
        desktopSrc: '/videos/hero-horizontal-5.mp4', // <--- REPLACE
        poster: '/images/hero-vertical-5-poster.jpg',
        desktopPoster: '/images/hero-horizontal-5-poster.jpg', // <--- REPLACE
        context: 'welcome, serene, ambiance', alt: 'Welcoming spa entrance'
    },
    {
        mobileSrc: '/videos/hero-vertical-6.mp4',
        desktopSrc: '/videos/hero-horizontal-6.mp4', // <--- REPLACE
        poster: '/images/hero-vertical-6-poster.jpg',
        desktopPoster: '/images/hero-horizontal-6-poster.jpg', // <--- REPLACE
        context: 'water, sound, tranquility', alt: 'Calming water features'
    },
];

// --- Personalized Content Hooks (Minimal) ---
const usePersonalizedContent = (userProfile = {}) => {
    const getContextualGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };
    const allQuotes = ["Relax. Refresh. Rejuvenate.", "Your journey to peace starts here.", "Unwind. Recharge. Rediscover."];
    const allFeaturedServices = ['Emerald Glow Facial', 'Deep Tissue Bliss Massage'];
    const allBenefits = ['Unlock inner peace.', 'Experience pure serenity.', 'Nourish your soul.'];

    const personalizedGreeting = useMemo(() => getContextualGreeting(), [userProfile]);
    const personalizedQuote = useMemo(() => allQuotes[Math.floor(Math.random() * allQuotes.length)], [userProfile]);
    const personalizedServices = useMemo(() => allFeaturedServices, [userProfile]);
    const personalizedBenefit = useMemo(() => allBenefits[Math.floor(Math.random() * allBenefits.length)], [userProfile]);

    return { personalizedGreeting, personalizedQuote, personalizedServices, personalizedBenefit };
};


export default function Hero() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const { trigger: triggerHaptic } = useHapticFeedback();

    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false); // State for mobile detection
    const [isLoading, setIsLoading] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const userProfile = useMemo(() => ({ lastVisit: 'today', preferences: ['massage'] }), []);
    const { personalizedGreeting, personalizedQuote, personalizedServices, personalizedBenefit } = usePersonalizedContent(userProfile);
    
    const handleVideoLoaded = () => {
        setIsLoading(false);
        setIsVideoLoaded(true);
    };
    
    const handleVideoError = () => {
        setIsLoading(false);
        // Fallback to poster image if video fails to load
    };
    
    const currentVideoData = allVideos[currentVideoIndex];
    // Dynamically select video source and poster based on screen size
    const videoSource = isMobile ? currentVideoData.mobileSrc : currentVideoData.desktopSrc;
    // Fallback to mobile poster if desktopPoster is not provided
    const videoPoster = isMobile ? currentVideoData.poster : (currentVideoData.desktopPoster || currentVideoData.poster);

    const posterSource = isMobile ? currentVideoData.poster : currentVideoData.desktopPoster;

    // --- Dynamic VH Calculation for Mobile (Crucial for no-scroll fullscreen) ---
    useEffect(() => {
        const setDynamicVh = () => {
            // Only apply this fix for smaller screens (e.g., less than md breakpoint)
            // This threshold (768px) typically matches Tailwind's 'md' breakpoint
            if (window.innerWidth < 768) {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            } else {
                // Revert for larger screens
                document.documentElement.style.removeProperty('--vh');
                document.documentElement.style.removeProperty('overflow');
                document.body.style.removeProperty('overflow');
            }
        };

        const checkMobileAndSetVh = () => {
            setIsMobile(window.innerWidth < 768); // Update isMobile state
            setDynamicVh(); // Call VH calculation
        };

        checkMobileAndSetVh(); // Set on initial load
        window.addEventListener('resize', checkMobileAndSetVh); // Update on resize (e.g., orientation change)

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobileAndSetVh);
            // Ensure overflow is reset when component unmounts or navigates away
            document.documentElement.style.removeProperty('--vh');
            document.documentElement.style.removeProperty('overflow'); // Ensure html overflow is also reset
            document.body.style.removeProperty('overflow');
        };
    }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

    // Effect for mobile detection and initial loading
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        // Set a timeout to handle cases where video loading events don't fire
        const loadingTimeout = setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
            }
        }, 3000);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
            clearTimeout(loadingTimeout);
        };
    }, [isLoading]);

    // Function to change video and ensure play state
    const handleVideoChange = useCallback((newIndex) => {
        if (newIndex === currentVideoIndex) return;
        setCurrentVideoIndex(newIndex);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
        // Only set playing if already interacted or if it's the first interaction
        if (hasInteracted) {
            setIsPlaying(true);
        }
        triggerHaptic('selection');
    }, [currentVideoIndex, hasInteracted, triggerHaptic]);

    const goToNextVideo = useCallback(() => {
        handleVideoChange((currentVideoIndex + 1) % allVideos.length);
    }, [currentVideoIndex, handleVideoChange]);

    const goToPrevVideo = useCallback(() => {
        handleVideoChange((currentVideoIndex - 1 + allVideos.length) % allVideos.length);
    }, [currentVideoIndex, handleVideoChange]);

    // --- Video Playback Control Effect ---
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const managePlayback = async () => {
            if (isPlaying) {
                try {
                    await videoElement.play();
                } catch (error) {
                    console.error("Video play failed:", error);
                    setIsPlaying(false);
                }
            } else {
                videoElement.pause();
            }
        };

        managePlayback();

        const handlePlayEvent = () => setIsPlaying(true);
        const handlePauseEvent = () => setIsPlaying(false);
        const handleEndedEvent = () => goToNextVideo();
        const handleErrorEvent = (e) => console.error("Video element error:", e);

        videoElement.addEventListener('play', handlePlayEvent);
        videoElement.addEventListener('pause', handlePauseEvent);
        videoElement.addEventListener('ended', handleEndedEvent);
        videoElement.addEventListener('error', handleErrorEvent);

        return () => {
            if (videoElement) {
                videoElement.pause();
                videoElement.removeEventListener('play', handlePlayEvent);
                videoElement.removeEventListener('pause', handlePauseEvent);
                videoElement.removeEventListener('ended', handleEndedEvent);
                videoElement.removeEventListener('error', handleErrorEvent);
            }
        };
    }, [isPlaying, currentVideoIndex, goToNextVideo]);

    // Global Interaction Handler (for initial interaction / background swipe)
    const handleGlobalInteraction = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
            setIsPlaying(true);
            triggerHaptic('subtlePulse');
        }
    }, [hasInteracted, triggerHaptic]);

    // Play/Pause Button's own specific handler
    const handlePlayPauseButtonClick = useCallback((e) => {
        e.stopPropagation(); // Prevent the global interaction from firing as well
        if (!hasInteracted) {
            setHasInteracted(true);
            setIsPlaying(true);
        } else {
            setIsPlaying((prev) => !prev);
        }
        triggerHaptic('selection');
    }, [hasInteracted, triggerHaptic]);


    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            goToNextVideo();
            if (!hasInteracted) setHasInteracted(true);
            setIsPlaying(true);
        },
        onSwipedRight: () => {
            goToPrevVideo();
            if (!hasInteracted) setHasInteracted(true);
            setIsPlaying(true);
        },
        trackMouse: true, // Allow swiping with mouse on desktop
    });

    return (
        <section
            // Full-screen, mobile-first height, and a default dark background for the section
            className="relative w-full overflow-hidden text-white bg-black h-[calc(var(--vh)*100)] md:h-screen"
            {...swipeHandlers}
            onClick={handleGlobalInteraction}
        >
            
            {/* 🎥 Background Video Container */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center bg-black"
            >
                <AnimatePresence mode="wait">
                    <motion.video
                        key={videoSource} // Key changes when source changes, forcing re-render/reload
                        ref={videoRef}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={videoPoster} // Uses the selected poster
                        className="w-full h-full object-cover" // Ensures video covers the entire container
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <source src={videoSource} type="video/mp4" /> {/* Uses the selected source */}
                        Your browser does not support the video tag.
                    </motion.video>
                </AnimatePresence>
            </div>

            {/* Gradient Background */}
            <GradientBackground className="absolute inset-0 z-10" />

            {/* Dark Overlay for Text Readability (Crucial for contrast over video) */}
            <div className="absolute inset-0 bg-black/40 z-10"></div> 

            {/*
                MODIFIED: Main Text Content (Greeting & Quote)
                - For mobile, 'top-[40%]' changed to 'top-1/2' to shift it further down (vertically centered).
            */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full px-4 text-center
                            md:bottom-24 md:left-24 md:top-auto md:transform-none md:text-left md:max-w-xl md:px-0">
                <div className="text-center md:text-left">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                        className="mb-2"
                    >
                        <div className="text-3xl sm:text-4xl font-medium text-white">
                            {personalizedGreeting},
                        </div>
                    </motion.div>
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    >
                        <span className="relative block">
                            <span className="relative z-10 bg-gradient-to-r from-emerald-300 via-purple-400 to-emerald-300 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                                Welcome to
                            </span>
                        </span>
                    </motion.h1>
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 md:mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                    >
                        <span className="relative block">
                            <span className="relative z-10 bg-gradient-to-r from-emerald-300 via-purple-400 to-emerald-300 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                                Opal Jhane
                            </span>
                        </span>
                    </motion.h1>
                    
                    {/* Icons Container with Star Particles - MODIFIED for equal compact spacing */}
                    <div className="relative w-full max-w-[280px] mx-auto md:max-w-lg md:mx-0 h-14 md:h-16">
                        <style jsx global>{`
                            @keyframes float {
                                0%, 100% { 
                                    transform: translateY(0) scale(0.95);
                                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
                                }
                                50% { 
                                    transform: translateY(-8px) scale(1.05);
                                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
                                }
                            }
                            @keyframes pulse {
                                0%, 100% { transform: scale(1); opacity: 0.8; }
                                50% { transform: scale(1.1); opacity: 1; }
                            }
                        `}</style>
                        <div className="flex justify-center md:justify-start items-center h-full px-1 md:px-2 relative z-20">
                            {[
                                { emoji: '❤️', title: 'Love & Care', color: 'text-pink-400' },
                                { emoji: '⭐', title: 'Excellence', color: 'text-yellow-300' },
                                { emoji: '🛡️', title: 'Trust & Safety', color: 'text-blue-300' },
                                { emoji: '✨', title: 'Transformation', color: 'text-purple-300' },
                                { emoji: '🕊️', title: 'Peace & Relaxation', color: 'text-white' },
                                { emoji: '🌿', title: 'Natural Wellness', color: 'text-emerald-300' },
                                { emoji: '💎', title: 'Luxury & Value', color: 'text-cyan-200' }
                            ].map(({ emoji, title, color }, i) => (
                                <motion.div
                                    key={i}
                                    className="flex flex-col items-center group cursor-pointer flex-shrink-0 w-8 md:w-12"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.5 + (i * 0.1),
                                        duration: 0.6,
                                        ease: 'easeOut'
                                    }}
                                    title={title}
                                >
                                    <motion.div
                                        className={`relative ${color} text-sm md:text-lg leading-none w-6 h-6 md:w-8 md:h-8 flex items-center justify-center`}
                                        animate={{
                                            y: [0, -3, 0],
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.1,
                                            repeatType: 'reverse'
                                        }}
                                    >
                                        <span className="relative z-10">{emoji}</span>
                                        <motion.span
                                            className="absolute inset-0 rounded-full"
                                            initial={{ opacity: 0.6 }}
                                            animate={{ opacity: 0.8 }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                                ease: 'easeInOut'
                                            }}
                                            style={{
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
                                                width: '180%',
                                                height: '180%',
                                                top: '-40%',
                                                left: '-40%',
                                            }}
                                        />
                                    </motion.div>
                                    <motion.span
                                        className="text-white text-xs font-light mt-0.5 md:mt-1 bg-black/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        initial={{ y: 5 }}
                                        whileHover={{ y: 0 }}
                                    >
                                        {title}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl font-light drop-shadow-md opacity-90 mb-6 md:mb-8 mt-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
                >
                    {personalizedQuote} {personalizedBenefit}
                </motion.p>

                {/*
                    MODIFIED: Explore Services CTA Button
                    - Added smooth scroll to the 'services' section.
                */}
                <motion.button
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-4 mx-auto md:mx-0"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('Explore Services clicked');
                        triggerHaptic('impactLight');
                        // ENABLED: Smooth scroll to services section
                        const mainScrollContainer = document.getElementById('__next');
                        const servicesSection = document.getElementById('services');
                        if (mainScrollContainer && servicesSection) {
                            mainScrollContainer.scrollTo({ top: servicesSection.offsetTop, behavior: 'smooth' });
                        } else {
                            console.warn("Could not find '__next' or 'services' element for scrolling.");
                        }
                    }}
                >
                    Explore Our Services
                </motion.button>
            </div>

            {/* Bottom Controls Container - Play Button and Dots - Remains centered at the bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm flex flex-col items-center px-4">
                {/* Play/Pause Button */}
                <motion.button
                    className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center
                                transition-all duration-300 ease-out border border-white/10 opacity-70 mb-4
                                hover:bg-white/20 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    onClick={handlePlayPauseButtonClick}
                >
                    <motion.div
                        key={isPlaying ? "pause" : "play"} // Key changes to re-animate icon on play/pause
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isPlaying ? (
                            <Pause size={28} className="drop-shadow-sm" />
                        ) : (
                            <Play size={28} className="drop-shadow-sm" />
                        )}
                    </motion.div>
                </motion.button>

                {/* Video Progress Indicators (dots) */}
                <div className="flex space-x-2">
                    {allVideos.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentVideoIndex ? 'bg-emerald-300 scale-125' : 'bg-gray-400/50 hover:bg-gray-300/70'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVideoChange(index);
                                if (!hasInteracted) setHasInteracted(true);
                                setIsPlaying(true);
                            }}
                            aria-label={`View video ${index + 1}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Arrows for Discoverability (Absolute positioning, z-index maintained) */}
            <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full text-white/70 bg-white/5 backdrop-blur-sm
                            hover:bg-white/10 transition-colors duration-300 hidden md:flex items-center justify-center border border-white/5 opacity-70
                            hover:opacity-100"
                onClick={(e) => { e.stopPropagation(); goToPrevVideo(); }}
                aria-label="Previous video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <ChevronLeft size={24} />
            </motion.button>
            <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full text-white/70 bg-white/5 backdrop-blur-sm
                            hover:bg-white/10 transition-colors duration-300 hidden md:flex items-center justify-center border border-white/5 opacity-70
                            hover:opacity-100"
                onClick={(e) => { e.stopPropagation(); goToNextVideo(); }}
                aria-label="Next video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <ChevronRight size={24} />
            </motion.button>
        </section>
    );
}