
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

// Framer Motion variants for animations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function HowItWorksSection() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: "1️⃣",
      title: "Register as Donor",
      desc: "Sign up on our platform with your details, including blood group and location.",
    },
    {
      icon: "2️⃣",
      title: "Search or Request Blood",
      desc: "Search for donors or create a donation request if you need blood.",
    },
    {
      icon: "3️⃣",
      title: "Connect and Donate",
      desc: "Connect with recipients or donors and schedule a donation at a nearby hospital.",
    },
    {
      icon: "4️⃣",
      title: "Save Lives",
      desc: "Complete the donation and track your impact through our platform.",
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
        How It Works
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2 border flex flex-col text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <span className="text-4xl mb-2">{step.icon}</span>
            <h3 className="text-xl font-semibold text-rose-500">{step.title}</h3>
            <p className="text-gray-800 dark:text-white flex-grow">{step.desc}</p>
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
          Get Started
        </button>
      </motion.div>
    </section>
  );
}
