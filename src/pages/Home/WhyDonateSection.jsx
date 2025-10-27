import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaHeartbeat, FaUsers, FaHandHoldingHeart } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyDonateSection() {
  const navigate = useNavigate();

  const reasons = [
    {
      icon: <FaHeartbeat className="text-rose-500 text-5xl mb-3 mx-auto" />,
      title: "Save Lives",
      desc: "Your blood donation can save up to three lives, helping patients in surgeries, accident victims, and those with chronic illnesses.",
    },
    {
      icon: <FaUsers className="text-rose-500 text-5xl mb-3 mx-auto" />,
      title: "Support Community",
      desc: "Join a network of compassionate donors to ensure a steady and reliable blood supply for hospitals and clinics in your area.",
    },
    {
      icon: <FaHandHoldingHeart className="text-rose-500 text-5xl mb-3 mx-auto" />,
      title: "Improve Health",
      desc: "Donating blood reduces excess iron levels, promotes new cell production, and improves your overall cardiovascular health.",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 
                 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500"
    >
      <motion.h2
        variants={cardVariants}
        className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-rose-500"
      >
        Why Donate Blood?
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(244, 63, 94, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-[#1a1a1a] shadow-md rounded-xl p-8 text-center border border-rose-200 
                       dark:border-rose-900 transition-all duration-300 flex flex-col"
          >
            {reason.icon}
            <h3 className="text-xl font-semibold text-rose-500 mb-2">
              {reason.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 flex-grow leading-relaxed">
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={cardVariants}
        className="text-center mt-12"
      >
        <button
          onClick={() => navigate("/register")}
          className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg 
                     px-8 py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-colors duration-200"
        >
          Join as Donor
        </button>
      </motion.div>
    </motion.section>
  );
}