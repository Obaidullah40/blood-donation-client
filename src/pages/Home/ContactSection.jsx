import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useState } from "react";

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

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-base-200 py-16 px-4">
      <div className="max-w-7xl mb-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-32"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </motion.div>

        {/* Right - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-neutral">Get in Touch</h3>
          <p className="text-gray-600">Have any questions or suggestions? Reach out to us anytime.</p>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-xl text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+880 1234-567890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@blooddonation.org</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>123 Red Crescent Street, Dhaka, Bangladesh</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
