// components/ServiceDetailModal.js
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Tag, Package, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ServiceDetailModal({ treatment, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!treatment || !treatment.nestedServices) {
    return null;
  }

  const modalImage = treatment.image;
  const modalTitle = treatment.title;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-30"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Image Section (uses the group image) */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <Image
              src={modalImage}
              alt={`Detailed image for ${modalTitle}`}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C1F76]/70 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-lg font-semibold text-white">
                {modalTitle}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 text-white">
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">Overview:</h4>
              <p className="text-white/80 leading-relaxed">{treatment.description}</p>
            </div>

            {treatment.nestedServices.map((service, serviceIndex) => (
              <div key={service.id} className={`mb-8 ${serviceIndex < treatment.nestedServices.length - 1 ? 'border-b border-white/10 pb-6' : ''}`}>
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">
                  {service.title}
                </h4>
                <p className="text-white/80 leading-relaxed mb-4">{service.longDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-4">
                  <div>
                    <p className="font-semibold text-white mb-2">Duration & Pricing:</p>
                    <ul className="space-y-1 text-white/80 ml-5 list-disc">
                      {service.pricingOptions && service.pricingOptions.map((option, i) => ( // Added check for pricingOptions
                        <li key={i}>{option.duration}: {option.price}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-white mb-2">Key Benefits/Includes:</p>
                    <ul className="space-y-1 text-white/80">
                      {service.features && service.features.map((feature, i) => ( // Added check for features
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[#BEFD73] flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-white/10 flex justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Book Now</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}