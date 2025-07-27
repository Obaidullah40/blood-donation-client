import React from "react";
import { FaHandsHelping, FaTint, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    icon: <FaHandsHelping className="text-red-600 w-12 h-12" />,
    title: "Connect Donors & Recipients",
    desc: "Easily find and connect donors with those in need of blood in your community.",
  },
  {
    id: 2,
    icon: <FaTint className="text-red-600 w-12 h-12" />,
    title: "Manage Blood Donations",
    desc: "Create, track, and update blood donation requests with real-time status updates.",
  },
  {
    id: 3,
    icon: <FaUsers className="text-red-600 w-12 h-12" />,
    title: "Role-Based Access",
    desc: "Secure platform supporting admins, donors, and volunteers with custom permissions.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Why Choose Our Blood Donation Platform?
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {features.map(({ id, icon, title, desc }) => (
          <motion.div
            key={id}
            className="card bg-base-100 shadow-xl p-6 rounded-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: id * 0.2 }}
          >
            <div>{icon}</div>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-red-700">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
