import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you soon.",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-6 text-rose-500"
      >
        Contact Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg text-gray-800 dark:text-gray-300 text-center mb-8"
      >
        Have any questions or suggestions? Reach out to us anytime.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg h-32 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-6 py-3 font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-rose-500">Get in Touch</h3>
          <div className="flex items-start gap-4">
            <span className="text-xl text-rose-500 mt-1">📞</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Phone</h4>
              <p className="text-gray-700 dark:text-gray-300">+880 1234-567890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl text-rose-500 mt-1">✉️</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Email</h4>
              <p className="text-gray-700 dark:text-gray-300">support@blooddonation.org</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl text-rose-500 mt-1">📍</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Address</h4>
              <p className="text-gray-700 dark:text-gray-300">123 Red Crescent Street, Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}