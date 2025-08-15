import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
       className="min-h-screen py-20"
      style={{
        background: "#59C173", // fallback
        backgroundImage:
                    "linear-gradient(to right, #5D26C1 20%, #a17fe0 40%, #59C173 80%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/images/about-us.jpg"
          alt="About us"
          className="rounded-3xl shadow-xl w-full object-cover"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-neutral-100">About Opal Spa</h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            We blend ancient techniques with modern wellness. At Opal Spa, every treatment is a step toward peace.
          </p>
          <ul className="space-y-3 text-neutral-100 text-lg max-w-xl">
            <li>🌿 Founded in 2015 with passion for wellness</li>
            <li>🌎 Serving clients from 30+ countries</li>
            <li>💎 Rated 5 stars consistently on Google</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
