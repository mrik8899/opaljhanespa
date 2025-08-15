// components/AnimatedForm.js - Enhanced form with animations
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Check } from 'lucide-react';

export default function AnimatedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };
  
  const inputVariants = {
    focused: {
      scale: 1.02,
      borderColor: 'rgba(57, 173, 72, 0.8)',
      boxShadow: '0 0 15px rgba(57, 173, 72, 0.3)',
      transition: { duration: 0.3 }
    },
    unfocused: {
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: 'none',
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02, boxShadow: '0 0 20px rgba(57, 173, 72, 0.4)' },
    tap: { scale: 0.98 },
    success: { 
      backgroundColor: '#39AD48',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Calendar className="text-[#BEFD73]" />
        Book an Appointment
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            variants={inputVariants}
            animate={focused === 'name' ? 'focused' : 'unfocused'}
          >
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          
          <motion.div
            variants={inputVariants}
            animate={focused === 'email' ? 'focused' : 'unfocused'}
          >
            <motion.input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              required
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
        
        <motion.div
          variants={inputVariants}
          animate={focused === 'phone' ? 'focused' : 'unfocused'}
        >
          <motion.input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none transition-colors"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            onFocus={() => setFocused('phone')}
            onBlur={() => setFocused(null)}
            required
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          animate={focused === 'service' ? 'focused' : 'unfocused'}
        >
          <motion.select
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none transition-colors"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            onFocus={() => setFocused('service')}
            onBlur={() => setFocused(null)}
            required
            whileFocus={{ scale: 1.02 }}
          >
            <option value="" className="bg-[#3C1F76]">Select a Service</option>
            <option value="swedish-massage" className="bg-[#3C1F76]">Swedish Harmony Massage</option>
            <option value="gold-facial" className="bg-[#3C1F76]">24K Gold Radiance Facial</option>
            <option value="salt-glow" className="bg-[#3C1F76]">Himalayan Salt Glow</option>
            <option value="couples-package" className="bg-[#3C1F76]">Couples Retreat Package</option>
            <option value="other" className="bg-[#3C1F76]">Other / Multiple Services</option>
          </motion.select>
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          animate={focused === 'message' ? 'focused' : 'unfocused'}
        >
          <motion.textarea
            placeholder="Special requests or preferred appointment times..."
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none transition-colors resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          animate={submitted ? 'success' : 'idle'}
          className="w-full py-4 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-xl font-semibold text-lg hover:shadow-glow transition-all duration-300 relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: submitted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Check className="mr-2" size={20} />
            Appointment Requested
          </motion.div>
          
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: submitted ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Request Appointment
          </motion.span>
        </motion.button>
      </form>
    </motion.div>
  );
}