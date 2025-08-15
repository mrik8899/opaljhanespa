import { motion } from "framer-motion";

const services = [
  {
    title: "Spa & Relaxation",
    desc: "Experience tranquility with expert care and serene ambiance that soothes the soul.",
    icon: "/icons/spa.jpg"
  },
  {
    title: "Skin Treatment",
    desc: "Revitalize your skin with botanical formulas designed for glowing results.",
    icon: "/icons/skin.jpg"
  },
  {
    title: "Massage Therapy",
    desc: "Feel the healing touch with techniques that relieve stress and restore energy.",
    icon: "/icons/massage.jpg"
  }
];

export default function Services() {
  return (
    <section
      id="services"
      className="min-h-screen py-20"
      style={{
        background: "#59C173", // fallback
        backgroundImage:
          "linear-gradient(to right, #5D26C1 20%, #a17fe0 40%, #59C173 80%)", // Your original gradient
      }}
    >
      {/* Top Curve - still commented out as per your original code */}
      {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M1200 0L0 0 892.25 114.72 1200 0z" fill="#fff"></path>
        </svg>
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center text-neutral-100 mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              // --- ONLY THIS CLASSNAME HAS CHANGED FOR THE GLASS EFFECT ---
              className="relative rounded-2xl p-8 flex flex-col items-center text-center
                         backdrop-blur-md bg-white/10 border border-white/20 shadow-lg
                         hover:shadow-xl transition-all duration-300 group cursor-pointer" // Adjusted hover shadow
            >
              {/* Image (no changes to its classes) */}
              <img
                src={s.icon}
                alt={s.title}
                className="w-28 h-28 rounded-full object-cover mb-6 shadow-md"
              />
              {/* Title & Description (adjusted text color for better contrast on transparent background) */}
              <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-sm"> {/* Changed to text-white, added drop-shadow */}
                {s.title}
              </h3>
              <p className="text-neutral-200 text-sm drop-shadow-sm">{s.desc}</p> {/* Changed to text-neutral-200, added drop-shadow */}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}