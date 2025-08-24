

import { motion } from "framer-motion";
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="collapse collapse-arrow bg-base-100 shadow-md rounded-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <input
              type="checkbox"
              checked={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            />
            <div className="collapse-title text-xl font-medium flex items-center gap-2">
              {openIndex === index ? <FaMinus /> : <FaPlus />}
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}