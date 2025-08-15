'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setSubmitError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessHours = [
    { day: 'Daily', hours: '01:00 PM - 02:00 AM' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // The direct navigation link provided from your screenshot
  const directMapsLink = 'https://maps.app.goo.gl/Pbe85uxMuRDssvNw9';
  // The address for the embedded map (confirmed working previously)
  const embeddedMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3558976123413!2d125.60393407475874!3d7.084676092918274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96da822dbc1b5%3A0xe7c47f77df94da6!2sOpal%20Jhane%20Thai%20Massage%20Spa%20DMSF!5e0!3m2!1sen!2s!4v1752604878764!5m2!1sen!2s";


  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(60, 31, 118, 0.26) 0%,
            rgba(32, 21, 80, 0.24) 50%,
            rgba(26, 22, 46, 0.28) 100%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Book Your <span className="bg-gradient-to-r from-brand-green via-brand-lime to-brand-blue bg-clip-text text-transparent">Escape</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to begin your journey to relaxation? Contact us to schedule your personalized spa experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="text-brand-lime" />
              Book an Appointment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brand-green transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brand-green transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number (e.g., +6382xxxxxxx)"
                aria-label="Phone Number"
                pattern="[0-9+() -]*"
                title="Please enter a valid phone number (digits, +, spaces, hyphens allowed)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brand-green transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
              />

              <select
                aria-label="Select a Service"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-green transition-colors"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                  required
              >
                <option value="" className="bg-brand-dark-purple">Select a Service</option>
                <option value="thai-massage" className="bg-brand-dark-purple">Traditional Thai Massage</option>
                <option value="swedish-massage" className="bg-brand-dark-purple">Swedish Harmony Massage</option>
                <option value="hot-stone-therapy" className="bg-brand-dark-purple">Hot Stone Therapy</option>
                <option value="aromatherapy" className="bg-brand-dark-purple">Aromatherapy Massage</option>
                <option value="foot-reflexology" className="bg-brand-dark-purple">Foot Reflexology</option>
                <option value="gold-facial" className="bg-brand-dark-purple">24K Gold Radiance Facial</option>
                <option value="salt-glow" className="bg-brand-dark-purple">Himalayan Salt Glow</option>
                <option value="couples-package" className="bg-brand-dark-purple">Couples Retreat Package</option>
                <option value="other" className="bg-brand-dark-purple">Other / Multiple Services</option>
              </select>

              <textarea
                placeholder="Tell us about your preferences, allergies, or preferred appointment dates/times (e.g., 'August 5th, evening')."
                aria-label="Special requests or preferred appointment times"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brand-green transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />

              <div className="w-full flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar size={20} /> Request Appointment
                    </>
                  )}
                </motion.button>
              </div>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-brand-lime mt-4 font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> Appointment request sent successfully! We'll be in touch soon.
                </motion.div>
              )}

              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-400 mt-4 font-medium"
                >
                  Oops! Something went wrong. Please check your inputs and try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Get in Touch & Business Hours Container */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="text-brand-lime" />
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a href="tel:+63822873568" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                  <div className="p-3 bg-brand-green/20 rounded-xl group-hover:bg-brand-green/30 transition-colors">
                    <Phone size={20} className="text-brand-lime" />
                  </div>
                  <div>
                    <p className="font-semibold">+63 82 287 3568</p>
                    <p className="text-sm text-white/60">Call for immediate booking</p>
                    <p className="text-xs text-white/50">Typically responds within minutes during business hours</p>
                  </div>
                </a>

                <a href="mailto:info@opalspa.ph" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                  <div className="p-3 bg-brand-green/20 rounded-xl group-hover:bg-brand-green/30 transition-colors">
                    <Mail size={20} className="text-brand-lime" />
                  </div>
                  <div>
                    <p className="font-semibold">info@opalspa.ph</p>
                    <p className="text-sm text-white/60">Email us anytime</p>
                    <p className="text-xs text-white/50">Expect a reply within 24-48 hours</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-green/20 rounded-xl">
                    <MapPin size={20} className="text-brand-lime" />
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Door 16 & 17, Gahol Building</p>
                    <p className="text-sm text-white/60">J.P. Laurel Ave, Bajada, Davao City</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Hours Section - IMPROVED */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="text-brand-lime" />
                Business Hours
              </h3>

              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {businessHours.map((schedule, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white/80 text-lg md:text-xl">{schedule.day}</span>
                    <span className="text-white font-semibold text-lg md:text-xl">{schedule.hours}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <p className="mt-4 text-sm text-white/70">
                * Last appointment accepted 1 hour before closing.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Google Map Section (iframe) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl overflow-hidden shadow-2xl h-[400px] glass-card p-1"
        >
          {/* This src should correctly display your embedded map */}
          <iframe
            src={embeddedMapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Opal Jhane Spa Location"
            className="rounded-xl"
          />
        </motion.div>

        {/* Get Directions Button (direct navigation link) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          {/* Using the direct share link from your screenshot for the button */}
          <a
            href={directMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
          >
            <MapPin size={20} /> Get Directions on Google Maps
          </a>
        </motion.div>

      </div>
    </section>
  );
}