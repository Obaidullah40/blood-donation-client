import { motion } from "framer-motion";
import { useNavigate } from "react-router";

// Framer Motion variants for animations
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-rose-500"
      >
        Benefits of Blood Donation
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2 border flex flex-col text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <span className="text-4xl mb-2">{benefit.icon}</span>
            <h3 className="text-xl font-semibold text-rose-500">{benefit.title}</h3>
            <p className="text-gray-800 dark:text-white flex-grow">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold"
          onClick={() => navigate("/register")}
        >
          Become a Donor
        </button>
      </motion.div>
    </section>
  );
}