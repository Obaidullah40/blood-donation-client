import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You’ll receive updates about blood donation events.",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
    setEmail("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-6 text-rose-500"
      >
        Stay Updated
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg text-gray-800 dark:text-white text-center mb-8"
      >
        Subscribe to our newsletter for the latest blood donation events and updates.
      </motion.p>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto flex gap-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input input-bordered flex-grow bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
        <button type="submit" className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold">Subscribe</button>
      </motion.form>
    </section>
  );
}