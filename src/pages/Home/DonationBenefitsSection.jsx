import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function DonationBenefitsSection() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: "🩺",
      title: "Save Lives",
      desc: "Your donation can save up to three lives, helping patients in surgeries, emergencies, and chronic conditions.",
    },
    {
      icon: "💪",
      title: "Health Benefits",
      desc: "Donating blood reduces iron levels, promotes new blood cell production, and may lower heart disease risk.",
    },
    {
      icon: "🤝",
      title: "Community Impact",
      desc: "Contribute to a reliable blood supply, supporting hospitals and strengthening your community.",
    },
    {
      icon: "🌟",
      title: "Feel Fulfilled",
      desc: "Experience the joy of making a direct, life-changing impact on others’ lives.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-rose-50"
      >
        Benefits of Blood Donation
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="p-6 text-center rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#1a1a1a] shadow-md hover:shadow-rose-200 dark:hover:shadow-rose-800/30 transition-all duration-300 flex flex-col items-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-5xl mb-3">{benefit.icon}</span>
            <h3 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          className="px-6 py-3 rounded-md font-semibold text-white bg-rose-600 hover:bg-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400 border-none transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          onClick={() => navigate("/register")}
        >
          Become a Donor
        </button>
      </motion.div>
    </section>
  );
}
