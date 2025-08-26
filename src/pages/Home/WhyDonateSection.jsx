import { motion } from "framer-motion";
import { useNavigate } from "react-router";

// Framer Motion variants for animations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function WhyDonateSection() {
  const navigate = useNavigate();

  const reasons = [
    {
      icon: "🩺",
      title: "Save Lives",
      desc: "Your blood donation can save up to three lives, helping patients in surgeries, accident victims, and those with chronic illnesses.",
    },
    {
      icon: "🤝",
      title: "Support Community",
      desc: "Join a community of donors to ensure a steady blood supply for hospitals and clinics in your area.",
    },
    {
      icon: "💪",
      title: "Improve Health",
      desc: "Donating blood can improve your own health by reducing iron levels and promoting new blood cell production.",
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
        Why Donate Blood?
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2 border flex flex-col text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <span className="text-4xl mb-2">{reason.icon}</span>
            <h3 className="text-xl font-semibold text-rose-500">{reason.title}</h3>
            <p className="text-gray-800 dark:text-white flex-grow">{reason.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button
          className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold"
          onClick={() => navigate("/register")}
        >
          Join as Donor
        </button>
      </motion.div>
    </section>
  );
}