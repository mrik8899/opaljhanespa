import { motion } from "framer-motion";
import { Leaf, Droplets, Flower, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: <Flower />,
    title: "Botanical Facials",
    desc: "Nourish your skin with plant-based luxury treatments.",
  },
  {
    icon: <Droplets />,
    title: "Hydration Therapy",
    desc: "Replenish and glow with our intense hydration rituals.",
  },
  {
    icon: <HeartHandshake />,
    title: "Personalized Care",
    desc: "Tailored treatments that honor your unique beauty.",
  },
  {
    icon: <Leaf />,
    title: "Natural Ingredients",
    desc: "We use only the purest, earth-sourced products.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
     className="min-h-screen py-20"
      style={{
        background: "#59C173", // fallback
        backgroundImage:
                    "linear-gradient(to right, #5D26C1 20%, #a17fe0 40%, #59C173 80%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-neutral-100 mb-16"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="p-10 min-h-[300px] bg-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-indigo-600 text-4xl mb-4 mx-auto">{f.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
