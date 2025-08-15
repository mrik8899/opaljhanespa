'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // For the close button

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    // This is the translucent background overlay that fills the screen
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose} // Close when clicking outside content
                >
                    {/* This is the actual modal content box */}
                    <motion.div
                        // REVERTED to be a standard modal for the gallery grid.
                        // The lightbox from SpaGallery will render on top of this.
                        className="relative bg-white/10 glass-card rounded-2xl p-6 md:p-8 max-w-full max-h-[90vh] overflow-y-auto z-50 transform"
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white hover:text-[#AFDCEC] transition-colors duration-200 z-10"
                            aria-label="Close modal"
                        >
                            <X size={28} />
                        </button>
                        <div className="modal-content mt-8 md:mt-0 w-full h-full"> {/* Ensure content div takes full space */}
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}