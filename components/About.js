'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Award, Users, Clock, Sparkles, MapPin, Phone, ArrowRight, UserCheck } from 'lucide-react';
import Image from 'next/image';

import Modal from './Modal';
import SpaGallery from './SpaGallery';
import AnimatedBlob from './AnimatedBlob';

// --- IMPORTANT: Video Path Placeholder ---
const BACKGROUND_VIDEO_PATH = '/videos/spa-background-loop.mp4';
const BACKGROUND_VIDEO_WEBM_PATH = '/videos/spa-background-loop.webm';
const VIDEO_PLACEHOLDER_PATH = '/images/video-placeholder.jpg';

const curatedAboutImages = [
    { src: '/images/spa-facility/reception-area-1.jpg', alt: 'Welcoming spa reception area' },
    { src: '/images/spa-facility/massage-room-1.jpg', alt: 'Serene single massage room' },
    { src: '/images/spa-facility/sauna.jpg', alt: 'Modern spa sauna interior' },
];

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


export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const { trigger: triggerHaptic } = useHapticFeedback();
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    // --- NEW: State to detect mobile view ---
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- MODIFIED: Conditionally apply parallax based on isMobile ---
    const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [150, -150]);
    const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [70, -70]);
    const bgElement1Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const bgElement2Y = useTransform(scrollYProgress, [0, 1], [0, 250]);
    // --- END MODIFIED ---

    const openGalleryModal = () => setIsGalleryModalOpen(true);
    const closeGalleryModal = () => setIsGalleryModalOpen(false);

    const achievements = [
        { icon: <Award aria-hidden="true" />, value: '15+', label: 'Industry Awards' },
        { icon: <Sparkles aria-hidden="true" />, value: '30+', label: 'Premium Treatments' },
        { icon: <UserCheck aria-hidden="true" />, value: '50+', label: 'Expert Therapists' }
    ];

    const locations = [
        {
            name: "Main Branch",
            address: "Door 16 & 17 Gahol bldg., J.P Laurel Ave., Bajada Davao city",
            cell: "0907 722 7079",
            telephone: "(082) 287 3658"
        },
        {
            name: "Branch 1",
            address: "Lacson St. Barrio Obrero, Bajada Davao City",
            cell: "0912 895 7391",
            telephone: "(082) 226 8882"
        },
        {
            name: "Branch 2",
            address: "City North Inn Bldg., Ground floor., Bajada Davao City",
            cell: "0985 223 3923",
            telephone: "(082) 293 3680"
        }
    ];

    return (
        <section id="about" ref={containerRef} className="relative py-12 md:py-16 overflow-hidden transition-colors duration-500">
            {/* Animated Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <AnimatedBlob 
                    size="lg" 
                    color="from-emerald-100 to-teal-200" 
                    position="top-right" 
                    delay={0.2}
                    className="opacity-30 dark:opacity-20"
                />
                <AnimatedBlob 
                    size="md" 
                    color="from-purple-100 to-pink-200" 
                    position="bottom-left" 
                    delay={0.4}
                    className="opacity-30 dark:opacity-20"
                />
            </div>
            {/* Background: Seamless blend from Services */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(to bottom,
                        rgba(60, 31, 118, 0.18) 0%,
                        rgba(60, 31, 118, 0.20) 100%
                    )`
                }}
            />
            {/* Animated background elements (can also be conditionally disabled for mobile if they cause performance issues) */}
            <motion.div
                style={{ y: isMobile ? 0 : bgElement1Y }} // Disabled on mobile
                className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#39AD48]/10 rounded-full filter blur-3xl opacity-70 z-10"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0], opacity: [0.7, 0.8, 0.7] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                style={{ y: isMobile ? 0 : bgElement2Y }} // Disabled on mobile
                className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#AFDCEC]/10 rounded-full filter blur-3xl opacity-70 z-10"
                animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0], opacity: [0.7, 0.8, 0.7] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />

            {/* Main content wrapper, raised higher with z-index */}
            <div className="relative z-20 max-w-7xl mx-auto px-6">
                {/* --- Full-width Main Heading --- */}
                <motion.h2
                    className="text-5xl md:text-6xl font-bold text-white mb-2 text-center"
                    initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Opal Jhane <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Thai Massage Spa</span>
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* --- LEFT COLUMN: Text Content Section --- */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: isMobile ? 0 : -120,
                            rotateY: isMobile ? 0 : -10
                        }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ y: isMobile ? 0 : contentY }}
                    >
                        <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                            <motion.p
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                Whether you need a little pampering after a long day of work, or just want to try something new and interesting, our spa services are designed with you in mind.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                At Opal Jhane Thai Massage Spa, we offer a comprehensive range of services including Body Massage (Swedish, Thai, Foot Reflexology), Sauna, Body/Foot Scrub, and specialized Add-ons like Ventosa, Hot Stone, Ear Candling, and Head & Shoulder Massage.
                            </motion.p>
                        </div>

                        {/* --- Our Philosophy card (remains in left column) --- */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="mt-8 p-6 glass-card rounded-2xl relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[#39AD48] shadow-[0_0_15px_rgba(57,173,72,0.8)]"
                                animate={{
                                    height: ["0%", "100%"],
                                    y: ["100%", "0%"]
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                    delay: 1.2
                                }}
                            />

                            <h3 className="text-xl font-semibold text-white mb-2">Our Philosophy</h3>
                            <p className="text-white/80 italic">
                                "At Opal Jhane Thai Massage Spa, our philosophy is to blend ancient Thai healing traditions with modern wellness practices to create a harmonious retreat. We are dedicated to providing exceptional spa experiences that soothe the body, calm the mind, and rejuvenate the spirit, leaving every client feeling balanced and refreshed."
                            </p>
                        </motion.div>

                        {/* --- Established box (remains here) --- */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, y: 80 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="
                                mt-10 mx-auto w-[calc(100%-3rem)] max-w-xs
                                p-6 md:p-8
                                glass-card rounded-2xl shadow-2xl z-50 text-center
                            "
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#39AD48]/20 to-[#AFDCEC]/20 flex items-center justify-center border border-white/10 overflow-hidden">
                                    <div className="relative w-9 h-9">
                                        <Image
                                            src="/images/logo-white.png"
                                            alt="Opal Spa Logo"
                                            fill
                                            sizes="36px"
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">2015</p>
                            </div>
                            <p className="text-2xl md:text-4xl font-semibold text-white">Established</p>
                        </motion.div>

                        {/* --- "Book Your Appointment Now" Button (New Alignment) --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            // MODIFIED: Container for button
                            className="
                                mt-10
                                px-6             /* Provides spacing from screen edges on mobile */
                                max-w-full       /* Allows container to take full width on mobile */
                                text-left        /* Default: Left align button on mobile */

                                sm:max-w-sm      /* Restricts max width for tablets */
                                sm:mx-auto       /* Centers container for tablets */
                                sm:text-center   /* Centers button within container for tablets */

                                lg:max-w-none    /* Desktop: Remove any max-width limits set by sm */
                                lg:w-[calc(100%-14rem)] /* Desktop: Apply specific width calculation */
                                lg:mx-auto       /* Desktop: Center the container */
                                lg:text-center   /* Desktop: Center the button within its container */
                            "
                        >
                            <a href="#contact"
                                // MODIFIED: Increased horizontal padding for the button
                                className="inline-flex items-center px-10 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1"
                                onClick={() => triggerHaptic('impactLight')}
                            >
                                Book Your Appointment Now
                                <ArrowRight size={20} className="ml-2" />
                            </a>
                        </motion.div>

                        {/* --- Achievements (Awards) - MOVED HERE & Adjusted --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
                        >
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.7, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    whileHover={{ y: -12, transition: { duration: 0.3 }, boxShadow: "0 8px 20px rgba(57,173,72,0.4)" }}
                                >
                                    <motion.div
                                        className="inline-flex p-4 bg-[#39AD48]/20 rounded-2xl text-[#BEFD73] mb-4"
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                    >
                                        {achievement.icon}
                                    </motion.div>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent mb-2">
                                        {achievement.value}
                                    </p>
                                    <p className="text-white/70">{achievement.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                    </motion.div> {/* END OF LEFT COLUMN */}

                    {/* --- RIGHT COLUMN: Primary Video Visual Block & Moved Gallery Card --- */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: isMobile ? 0 : 120,
                            rotateY: isMobile ? 0 : 10
                        }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex flex-col items-center pt-20 lg:pt-0"
                        style={{ y: isMobile ? 0 : videoY }}
                    >
                        {/* Video Container (remains in right column) */}
                        <motion.div
                            className="relative w-full aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black/30"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.5, ease: "anticipate" }}
                        >
                            <video
                                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                aria-hidden="true"
                                poster={VIDEO_PLACEHOLDER_PATH}
                            >
                                <source src={BACKGROUND_VIDEO_WEBM_PATH} type="video/webm" />
                                <source src={BACKGROUND_VIDEO_PATH} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute inset-0 bg-black/20 z-[1]" />

                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-[#39AD48]/30 via-transparent to-[#AFDCEC]/30 z-[2]"
                                animate={{
                                    background: [
                                        "linear-gradient(to top right, rgba(57, 173, 72, 0.3), transparent, rgba(175, 220, 236, 0.3))",
                                        "linear-gradient(to top right, rgba(175, 220, 236, 0.3), transparent, rgba(57, 173, 72, 0.3))"
                                    ],
                                    opacity: [0.7, 1, 0.7],
                                    rotate: [0, 3, 0]
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        {/* --- Curated Image Section for About Page (remains below video) --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="mt-10 p-6 glass-card rounded-2xl relative overflow-hidden w-full"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">A Glimpse Inside Our Sanctuary</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {curatedAboutImages.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md cursor-pointer group"
                                        whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => triggerHaptic('selection')}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 15vw"
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <p className="text-white text-sm text-center">{img.alt}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => {
                                        openGalleryModal();
                                        triggerHaptic('impactLight');
                                    }}
                                    className="inline-flex items-center px-6 py-2 rounded-full text-white font-semibold text-md bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-0.5"
                                >
                                    View Full Gallery
                                    <ArrowRight size={18} className="ml-2" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div> {/* END OF RIGHT COLUMN */}
                </div> {/* END OF GRID */}

                {/* --- Locations Horizontal Card (Remains outside the main grid) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="mt-20 md:mt-24 lg:mt-40 p-8 glass-card rounded-2xl relative overflow-hidden"
                >
                    <h3 className="text-3xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-3">
                        <MapPin size={28} className="text-[#BEFD73}" /> Our Convenient Locations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
                        {locations.map((loc, i) => (
                            <motion.div
                                key={i}
                                className="text-center md:text-left p-4 rounded-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 + 0.7, duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.5 }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 8px 20px rgba(57,173,72,0.3)",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                                }}
                            >
                                <p className="font-bold text-lg text-white mb-2">{loc.name}:</p>
                                <p className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <MapPin size={18} className="text-white/60 flex-shrink-0" /> {loc.address}
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <Phone size={18} className="text-white/60 flex-shrink-0" /> Cell: <a href={`tel:${loc.cell.replace(/\s/g, '')}`} className="hover:text-[#BEFD73] transition-colors" onClick={() => triggerHaptic('selection')}>{loc.cell}</a>
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <Phone size={18} className="text-white/60 flex-shrink-0" /> Tel: <a href={`tel:${loc.telephone.replace(/\s/g, '').replace('(082)', '082')}`} className="hover:text-[#BEFD73] transition-colors" onClick={() => triggerHaptic('selection')}>{loc.telephone}</a>
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Render the SpaGallery in a Modal */}
            <Modal isOpen={isGalleryModalOpen} onClose={closeGalleryModal}>
                <SpaGallery />
            </Modal>
        </section>
    );
}