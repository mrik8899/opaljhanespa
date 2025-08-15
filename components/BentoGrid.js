// components/BentoGrid.js - Refined version
import { motion } from 'framer-motion';
import { Sparkles, Heart, Leaf, Shield, Star, Award, Clock, Droplet } from 'lucide-react';
import Image from 'next/image';

export default function BentoGrid() {
  return (
    <section id="bento" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3C1F76]/5 to-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#39AD48]/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#AFDCEC]/5 rounded-full filter blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Curated <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Experiences</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our thoughtfully designed treatments that blend ancient wisdom with modern luxury
          </p>
        </motion.div>

        {/* BentoGrid Layout with refined spacing */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Featured Item - Spans 2 columns and 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="md:col-span-2 md:row-span-2 glass-card rounded-3xl overflow-hidden group relative"
          >
            <div className="relative h-full w-full">
              {/* Placeholder for image - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3C1F76]/60 to-[#3C1F76]/90 z-10" />
              <div className="w-full h-96 md:h-full bg-[#39AD48]/20 overflow-hidden">
                {/* Add subtle animation to the background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-[#39AD48]/20 via-transparent to-[#AFDCEC]/20"
                  animate={{
                    background: [
                      "linear-gradient(to top right, rgba(57, 173, 72, 0.2), transparent, rgba(175, 220, 236, 0.2))",
                      "linear-gradient(to top right, rgba(175, 220, 236, 0.2), transparent, rgba(57, 173, 72, 0.2))",
                      "linear-gradient(to top right, rgba(57, 173, 72, 0.2), transparent, rgba(175, 220, 236, 0.2))"
                    ]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-[#39AD48]/20 backdrop-blur-sm rounded-full text-[#BEFD73] text-sm font-medium">
                    Signature Treatment
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-[#BEFD73] transition-colors duration-300">
                  Bamboo Harmony Ritual
                </h3>
                <p className="text-white/80 mb-6 max-w-lg leading-relaxed">
                  Our signature treatment combines warm bamboo massage techniques with 
                  organic essential oils to release deep tension and restore balance to 
                  body and mind. This exclusive ritual includes a gentle exfoliation and 
                  concludes with a scalp massage.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[#BEFD73]" />
                    <span className="text-white/80">90 minutes</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/5"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Regular Items - Refined with more specific content */}
          <BentoItem 
            title="Aromatherapy Journey"
            description="Custom-blended essential oils from sustainable sources to enhance your treatment"
            icon={<Leaf className="text-[#BEFD73]" />}
            color="#39AD48"
            delay={0.1}
          />
          
          <BentoItem 
            title="Couples Sanctuary"
            description="Side-by-side treatments in our private suite with champagne and chocolate"
            icon={<Heart className="text-[#BEFD73]" />}
            color="#B784A7"
            delay={0.2}
          />
          
          <BentoItem 
            title="Himalayan Salt Therapy"
            description="Detoxifying treatment using warm salt stones to release tension"
            icon={<Droplet className="text-[#BEFD73]" />}
            color="#AFDCEC"
            delay={0.3}
          />
          
          <BentoItem 
            title="Expert Therapists"
            description="Internationally certified professionals with minimum 5 years experience"
            icon={<Award className="text-[#BEFD73]" />}
            color="#3C1F76"
            delay={0.4}
          />
          
          {/* Wide Item - Spans 2 columns with refined design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="md:col-span-2 glass-card rounded-3xl overflow-hidden p-8 group"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Circular image with refined styling */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#39AD48]/20 to-[#AFDCEC]/20 flex items-center justify-center flex-shrink-0 border border-white/10">
                <Clock size={28} className="text-[#BEFD73]" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#BEFD73] transition-colors duration-300">
                  Extended Evening Hours
                </h3>
                <p className="text-white/80 leading-relaxed">
                  We now offer twilight appointments until 9pm on weekdays and 10pm on weekends.
                  Perfect for after-work relaxation or as the ideal start to your weekend.
                  Enjoy complimentary herbal tea and access to our relaxation lounge.
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/5 flex-shrink-0"
              >
                View Schedule
              </motion.button>
            </div>
          </motion.div>
          
          {/* Testimonial Item - Refined with more authentic content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="glass-card rounded-3xl overflow-hidden p-8 group"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F7D560] text-[#F7D560]" />
                ))}
              </div>
              
              <p className="text-white/80 italic flex-1 leading-relaxed">
                "The Bamboo Harmony Ritual was transformative. I arrived stressed from work and left feeling completely renewed. The therapist's technique was exceptional, and the attention to detail throughout was impressive."
              </p>
              
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Avatar with gradient background */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#39AD48]/30 to-[#B784A7]/30 flex items-center justify-center text-white font-bold border border-white/10">
                  SJ
                </div>
                <div>
                  <p className="text-white font-medium">Sarah Johnson</p>
                  <p className="text-white/60 text-sm">New York, USA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA Section - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(57, 173, 72, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-full font-semibold text-lg transition-all duration-300"
          >
            <Sparkles size={20} />
            Explore All Treatments
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Individual Bento Item Component - Refined
function BentoItem({ title, description, icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="glass-card rounded-3xl p-8 group h-full"
    >
      <div className="flex flex-col h-full">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10"
          style={{ backgroundColor: `${color}15` }} // 15 is hex for 8% opacity
        >
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#BEFD73] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-white/70 flex-1 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
          <motion.button
            whileHover={{ x: 5 }}
            className="text-[#BEFD73] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
          >
            Learn more
            <span>→</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}