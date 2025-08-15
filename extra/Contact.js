import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" 
    
     className="min-h-screen py-20"
      style={{
        background: "#59C173", // fallback
        backgroundImage:
                    "linear-gradient(to right, #5D26C1 20%, #a17fe0 40%, #59C173 80%)",
      }}
    
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-neutral-100 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contact Us
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <div className="space-y-6 text-neutral-100 text-lg">
            <p>
              We'd love to hear from you! Reach out for appointments, questions, or feedback.
            </p>
            <p className="text-neutral-100 text-base">
              📍 <span className="font-medium text-neutral-100">Door 16&17, Gahol Building J.P. Laurel Ave, Bajada, Davao City, 8000 Davao del Sur, Philippines </span>
            </p>
            <p className="text-neutral-100 text-base">
              📞 <span className="text-neutral-100 font-medium">+63822873568</span>
            </p>
            <p className="text-neutral-100 text-base">
              ✉️ <span className="text-neutral-100 font-medium">contact@opalspa.com</span>
            </p>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:scale-105 transition-transform duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.450267261731!2d125.60393407475874!3d7.084676092918274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96da822dbc1b5%3A0xe7c47f77df94da6!2sOpal%20Jhane%20Thai%20Massage%20Spa%20DMSF!5e1!3m2!1sen!2s!4v1748541925732!5m2!1sen!2s"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Opal Spa Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
