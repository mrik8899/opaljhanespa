// components/Features.js - Enhanced with scroll animations
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart, Leaf, Shield } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: <Sparkles size={32} />,
    title: "Luxury Experience",
    desc: "Immerse yourself in five-star ambiance with personalized attention to every detail",
  },
  {
    icon: <Heart size={32} />,
    title: "Holistic Wellness",
    desc: "Treatments designed to harmonize body, mind, and spirit for complete rejuvenation",
  },
  {
    icon: <Leaf size={32} />,
    title: "Natural Products",
    desc: "Premium organic ingredients sourced ethically from nature's finest botanicals",
  },
  {
    icon: <Shield size={32} />,
    title: "Certified Therapists",
    desc: "Expert practitioners trained in both traditional and modern therapeutic techniques",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create staggered animations based on scroll
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

  return (
    <section 
      id="features" 
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background with scroll-based parallax */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-[#3C1F76]/30" />
      
      {/* Animated orbs with scroll-based movement */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            x: useTransform(scrollYProgress, [0, 1], [0, 50])
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#39AD48] rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
        />
        
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 150]),
            x: useTransform(scrollYProgress, [0, 1], [0, -70])
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#B784A7] rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
        />
        
       
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            x: useTransform(scrollYProgress, [0, 1], [0, -30])
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#AFDCEC] rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
        />
      </div>
       
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card glass-card-hover rounded-2xl p-8 h-full text-center relative overflow-hidden">
                {/* Animated background shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Icon with 3D hover effect */}
                <div className="relative z-10">
                  <motion.div 
                    className="inline-flex p-4 bg-gradient-to-br from-[#39AD48]/20 to-[#AFDCEC]/20 rounded-2xl text-[#BEFD73] mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ 
                      rotateY: 180,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with magnetic button effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/80 text-lg mb-6">
            Ready to experience the difference?
          </p>
          <MagneticButton href="#services">
            <Sparkles size={20} />
            Explore Our Services
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// Magnetic Button Component - Creates a magnetic pull effect
function MagneticButton({ children, href, className }) {
  const buttonRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Magnetic pull effect
    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  
  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = 'translate(0, 0)';
  };
  
  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300 ${className || ''}`}
    >
      {children}
    </motion.a>
  );
}