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
      text: "We’ll get back to you soon.",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
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
        className="text-lg text-gray-800 dark:text-white text-center mb-8"
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
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            ></textarea>
            <button
              type="submit"
              className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold w-full"
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
              <h4 className="font-semibold text-gray-800 dark:text-white">Phone</h4>
              <p className="text-gray-800 dark:text-white">+880 1234-567890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl text-rose-500 mt-1">✉️</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Email</h4>
              <p className="text-gray-800 dark:text-white">support@blooddonation.org</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl text-rose-500 mt-1">📍</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Address</h4>
              <p className="text-gray-800 dark:text-white">123 Red Crescent Street, Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}