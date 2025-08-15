'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Heart, Leaf, Shield, Star, Award, Clock, Droplet } from 'lucide-react';
import Image from 'next/image';

// --- Image Imports ---
// Assuming these images exist in your public/images folder
import SignatureMassagesImage from '@/public/images/swedish-massage.jpg';
import SpecializedMassagesImage from '@/public/images/thai-massage-therapy.jpg';
import SarahJohnsonAvatar from '@/public/images/sarah-johnson-avatar.jpg'; // This is used for the testimonial avatar
import ExtendedHoursBgImage from '@/public/images/extended-hours-bg.jpg';
import CtaBgImage from '@/public/images/cta-background.jpg';

// --- Define individual service details (re-declared for clarity in this component) ---
// In a full application, consider importing these from a shared data file (e.g., `data/services.js`)
const swedishMassageDetails = {
    id: 'swedish-massage',
    title: "Swedish Massage",
    shortDescription: "Classic full-body relaxation for stress relief.",
    longDescription: "Our Swedish Massage utilizes long, flowing strokes, kneading, deep circular movements, vibration, and tapping. It's designed to relax muscles, improve circulation, and promote overall relaxation. Ideal for those seeking stress relief and gentle muscle relaxation.",
    features: ["Relaxing strokes", "Muscle tension relief", "Improved circulation", "Stress reduction"],
    pricingOptions: [{ duration: "60 mins", price: "P 450.00" }, { duration: "90 mins", price: "P 650.00" }, { duration: "120 mins", price: "P 900.00" }],
};

const thaiMassageDetails = {
    id: 'thai-massage',
    title: "Thai Massage",
    shortDescription: "Ancient healing art with acupressure, yoga-like stretches.",
    longDescription: "Traditional Thai massage is a dry massage performed on a mat on the floor, with the client fully clothed. It involves deep stretching, rhythmic pressing, and gentle rocking to relieve tension, improve flexibility, and balance the body’s energy lines.",
    features: ["Acupressure techniques", "Yoga-like stretching", "Improved flexibility", "Energy balance"],
    pricingOptions: [{ duration: "60 mins", price: "P 400.00" }, { duration: "90 mins", price: "P 600.00" }, { duration: "120 mins", price: "P 800.00" }],
};


export default function EnhancedBentoGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const features = [
    { // Index 0: F1 - Unrivaled Luxury
      icon: <Sparkles size={28} />,
      title: "Unrivaled Luxury",
      desc: "Immerse yourself in a tranquil sanctuary meticulously designed for your ultimate comfort and profound relaxation.",
      color: "#BEFD73", // Vibrant color
      bgColor: "#39AD48" // Darker background hint
    },
    { // Index 1: F2 - Mind-Body Harmony
      icon: <Heart size={28} />,
      title: "Mind-Body Harmony",
      desc: "Our diverse range of therapies, from massages to wellness services, are crafted to harmonize your body, calm your mind, and uplift your spirit.",
      color: "#F7D560", // Vibrant color
      bgColor: "#B784A7" // Darker background hint
    },
    { // Index 2: F3 - Pure Botanical Essence
      icon: <Leaf size={28} />,
      title: "Pure Botanical Essence",
      desc: "We exclusively use potent, organic, and ethically sourced ingredients to ensure maximum purity and efficacy in every treatment.",
      color: "#AFDCEC", // Vibrant color
      bgColor: "#BEFD73" // Darker background hint
    },
    { // Index 3: F4 - Masterful Practitioners
      icon: <Shield size={28} />,
      title: "Masterful Practitioners",
      desc: "Entrust your well-being to our highly skilled and certified therapists, masters in both traditional techniques and advanced modern practices.",
      color: "#BEFD73", // Vibrant color
      bgColor: "#3C1F76" // Darker background hint
    },
  ];

  const treatments = [
    {
      title: swedishMassageDetails.title,
      category: "Signature Massage",
      description: swedishMassageDetails.longDescription + " Experience deep relaxation, improved circulation, and stress relief tailored to your needs.",
      duration: "Starting from " + swedishMassageDetails.pricingOptions[0].duration,
      color: "#39AD48",
      image: SignatureMassagesImage
    },
    {
      title: thaiMassageDetails.title,
      category: "Specialized Massage",
      description: thaiMassageDetails.longDescription + " This invigorating and balancing experience is perfect for improving flexibility and relieving deep-seated tension.",
      duration: "Starting from " + thaiMassageDetails.pricingOptions[0].duration,
      color: "#AFDCEC",
      image: SpecializedMassagesImage
    }
  ];

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Function to handle smooth scroll to the services section
  const handleScrollToServices = (e) => {
      e.preventDefault(); // Prevent default anchor link behavior
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  // Helper function to render a feature card with specific content and index
  const renderFeatureCard = (featureData, index) => (
    <motion.div
      key={index}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-card rounded-3xl p-6 sm:p-8 group h-full"
    >
      <div className="flex flex-col h-full">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10"
          style={{ backgroundColor: `${featureData.bgColor}15` }}
        >
          <motion.div
            whileHover={{
              rotateY: 180,
              transition: { duration: 0.6 }
            }}
            className={`text-[${featureData.color}]`}
          >
            {featureData.icon}
          </motion.div>
        </div>

        <h3
          className={`text-xl font-bold text-white mb-3 group-hover:text-[${featureData.color}] transition-colors duration-300`}
        >
          {featureData.title}
        </h3>

        <p className="text-white/70 flex-1 leading-relaxed">
          {featureData.desc}
        </p>

        <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
          {/* Using onClick to handle smooth scroll */}
          <motion.a
            href="#services" // Keep href for accessibility/fallback, but onClick will override
            onClick={handleScrollToServices}
            whileHover={{ x: 5 }}
            className={`text-[${featureData.color}] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300`}
          >
            Learn more
            <span>→</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );


  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
        {/* NEW Background overlay div for seamless blending */}
    <div
        className="absolute inset-0 z-0"
        style={{
            background: `linear-gradient(to bottom,
                                rgba(60, 31, 118, 0.15) 0%,  /* Starts matching MomentsOfJoy's end (0.15) */
                                rgba(60, 31, 118, 0.18) 100% /* Ends at its original 0.18 target */
                            )`
        }}
    />


      {/* Animated orbs with scroll-based movement */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1, x: x1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#39AD48] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />

        <motion.div
          style={{ y: y2, x: x2 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#B784A7] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />

        <motion.div
          style={{ y: y3, x: x3 }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#AFDCEC] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Opal Jhane</span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Discover what makes us Davao City's premier destination for luxury wellness and relaxation
          </motion.p>
        </motion.div>

        {/* BentoGrid Layout - Optimized Auto-Flow for Desired Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 1. Featured Treatment 1 (e.g., Swedish Massage - 2x2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="md:col-span-2 md:row-span-2 glass-card rounded-3xl overflow-hidden group relative min-h-[400px]"
          >
            {/* Main background image for Featured Treatment 1 */}
            <Image
              src={treatments[0].image}
              alt={`Image for ${treatments[0].title}`}
              fill
              className="object-cover object-center"
              priority
            />

            {/* Animated gradient overlay (on top of the image) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[#39AD48]/20 via-transparent to-[#AFDCEC]/20 z-[1]"
              animate={{
                background: [
                  "linear-gradient(to top right, rgba(57, 173, 72, 0.2), transparent, rgba(175, 220, 236, 0.2))",
                  "linear-gradient(to top right, rgba(175, 220, 236, 0.2), transparent, rgba(57, 173, 72, 0.2))",
                  "linear-gradient(to top right, rgba(57, 173, 72, 0.2), transparent, rgba(175, 220, 236, 0.2))"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Darker overlay for improved text readability (covers the whole card) */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content layer for Featured Treatment 1 - Heading & Description at bottom */}
            <div className="relative z-20 p-6 sm:p-8 flex flex-col h-full">
              {/* Category badge (acts as the "icon" for this card) - stays at top */}
              <div className="mb-4">
                <span className="px-3 py-1 bg-[#39AD48]/20 backdrop-blur-sm rounded-full text-[#BEFD73] text-sm font-medium">
                  {treatments[0].category}
                </span>
              </div>

              {/* This div pushes the content to the bottom */}
              <div className="mt-auto">
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-[#BEFD73] transition-colors duration-300">
                  {treatments[0].title}
                </h3>
                <p className="text-white/80 mb-6 max-w-lg leading-relaxed">
                  {treatments[0].description}
                </p>

                {/* Duration & Button */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#BEFD73]" />
                    <span className="text-white/80">{treatments[0].duration}</span>
                  </div>
                  <MagneticButton
                    href="#contact"
                    className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/5"
                  >
                    Book Now
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. F1 - Unrivaled Luxury (Feature 0) */}
          {renderFeatureCard(features[0], 0)}

          {/* 3. F2 - Mind-Body Harmony (Feature 1) */}
          {renderFeatureCard(features[1], 1)}

          {/* 4. Featured Treatment 2 (e.g., Thai Massage - 2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="md:col-span-2 glass-card rounded-3xl overflow-hidden group relative"
          >
            {/* Background image for Featured Treatment 2 */}
            <Image
              src={treatments[1].image}
              alt={`Image for ${treatments[1].title}`}
              fill
              className="object-cover object-center"
            />
            {/* Darker overlay for improved text readability on top of image */}
            <div className="absolute inset-0 bg-black/30 via-[#3C1F76]/60 to-[#3C1F76]/90 z-10" />

            <div className="relative z-20 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 h-full">
              {/* Treatment icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#AFDCEC]/20 to-[#39AD48]/20 flex items-center justify-center flex-shrink-0 border border-white/10">
                <Droplet size={28} className="text-[#AFDCEC]" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="mb-2">
                  <span className="px-2 py-0.5 bg-[#AFDCEC]/20 text-[#AFDCEC] text-xs rounded-full">
                    {treatments[1].category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#AFDCEC] transition-colors duration-300">
                  {treatments[1].title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {treatments[1].description}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={14} />
                  <span>{treatments[1].duration}</span>
                </div>
                <MagneticButton
                  href="#contact"
                  className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/5 text-sm"
                >
                  Book Now
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* 5. T - Testimonial Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card rounded-3xl overflow-hidden p-6 sm:p-8 group"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F7D560] text-[#F7D560]" />
                ))}
              </div>

              <p className="text-white/80 italic flex-1 leading-relaxed">
                "Every visit to Opal Jhane is a truly rejuvenating escape. Their massage therapies melt away all my stress, and the personalized attention from the therapists is simply unparalleled. It's my go-to place for pure bliss."
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Avatar Image component */}
                <Image
                  src={SarahJohnsonAvatar}
                  alt="Avatar of a satisfied client, Jessica Lee."
                  width={48}
                  height={48}
                  className="rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-white font-medium">Jessica Lee</p>
                  <p className="text-white/60 text-sm">Davao City</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 6. F3 - Pure Botanical Essence (Feature 2) */}
          {renderFeatureCard(features[2], 2)}

          {/* 7. F4 - Masterful Practitioners (Feature 3) */}
          {renderFeatureCard(features[3], 3)}

          {/* 8. EH - Extended Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card rounded-3xl overflow-hidden p-6 sm:p-8 group relative"
          >
            {/* Subtle background image */}
            <Image
              src={ExtendedHoursBgImage}
              alt="Abstract background representing calm and relaxation, with gentle light trails."
              fill
              className="object-cover opacity-20"
            />
            {/* Ensure content is above the background image */}
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10 bg-[#F7D560]/10">
                <Clock size={28} className="text-[#F7D560]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F7D560] transition-colors duration-300">
                Extended Hours
              </h3>

              <p className="text-white/70 flex-1 leading-relaxed">
                We now offer extended evening appointments, available until 9 PM on weekdays and 10 PM on weekends, ensuring you can find your perfect moment of relaxation after a busy day.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-[#F7D560] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  View Schedule
                  <span>→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section - Retains original look */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          {/* Background image for the CTA block */}
          <Image
            src={CtaBgImage}
            alt="Serene spa ambiance with soft lighting and plants, encouraging relaxation."
            fill
            className="object-cover opacity-30"
          />
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/50 z-[1]"></div>

          {/* Content layer */}
          <div className="relative z-10">
            <p className="text-white/80 text-lg mb-6">
              Ready to experience the difference?
            </p>
            <MagneticButton
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
            >
              <Sparkles size={20} />
              Explore All Treatments
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Magnetic Button Component - No changes needed
function MagneticButton({ children, href, className }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isHovered) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Magnetic pull effect
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}