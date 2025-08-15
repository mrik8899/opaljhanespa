import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah J.",
    text: "Incredible service, relaxing experience every time.",
    image: "/avatars/sarah.jpg"
  },
  {
    name: "Mike D.",
    text: "Truly the best spa I’ve been to in Asia!",
    image: "/avatars/mike.jpg"
  },
  {
    name: "Emily R.",
    text: "The ambiance, staff, and treatments — 10/10!",
    image: "/avatars/emily.jpg"
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
     className="min-h-screen py-20"
      style={{
        background: "#59C173", // fallback
        backgroundImage:
                    "linear-gradient(to right, #5D26C1 20%, #a17fe0 40%, #59C173 80%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12 text-neutral-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-xl backdrop-blur-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-pink-200"
              />
              <p className="text-gray-700 italic mb-4 leading-relaxed">"{t.text}"</p>
              <h4 className="text-lg font-semibold text-pink-700">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
