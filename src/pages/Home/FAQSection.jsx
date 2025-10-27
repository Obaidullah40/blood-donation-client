import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Who can donate blood?",
    answer: "Healthy individuals aged 18–65, weighing at least 50kg, can donate blood.",
  },
  {
    question: "How often can I donate?",
    answer: "You can donate every 3 months to ensure your body has time to recover.",
  },
  {
    question: "Is donating blood safe?",
    answer: "Yes, it’s safe when done at certified centers with sterile equipment.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-rose-500"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="border border-rose-200 dark:border-rose-900 rounded-xl shadow-md overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-5 bg-white dark:bg-[#1a1a1a] text-left text-gray-800 dark:text-gray-100 font-medium text-lg hover:bg-rose-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="flex items-center gap-2">
                {openIndex === index ? (
                  <FaMinus className="text-rose-500" />
                ) : (
                  <FaPlus className="text-rose-500" />
                )}
                {faq.question}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
