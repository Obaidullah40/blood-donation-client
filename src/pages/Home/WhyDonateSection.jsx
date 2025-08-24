import { motion } from "framer-motion";

export default function WhyDonateSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Why Donate Blood?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-lg text-gray-600 mb-6">
          Blood donation saves lives every day. Your single donation can help up to three people,
          supporting patients in surgeries, accident victims, and those with chronic illnesses.
        </p>
        <button
          className="btn btn-primary text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Join Now
        </button>
      </motion.div>
    </section>
  );
}