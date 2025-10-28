import { Outlet, useNavigate } from "react-router";
import { motion } from "framer-motion";
import bdImg from "../assets/blood-donation.jpg";
import { ArrowLeft, Home } from "lucide-react";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 font-sans relative">

      {/* Back & Home Buttons */}
      <div className="absolute top-4 left-4 z-50 flex gap-3">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-white dark:bg-[#1a1a1a] border border-rose-200 dark:border-rose-900 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors shadow-md"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors shadow-md"
        >
          <Home size={16} />
          Home
        </motion.button>
      </div>

      {/* Left Banner with Animation */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-rose-500 to-rose-600 flex flex-col justify-center items-center px-10 py-12 shadow-lg relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight text-center mb-4">
            BloodConnect
          </h1>
          <div className="flex justify-center mb-6">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🩸
            </motion.span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/90 text-center text-lg max-w-md mb-8 relative z-10 leading-relaxed"
        >
          Empower your kindness. Join our community to become a life-saving donor or request blood in critical times.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative z-10"
        >
          <img
            src={bdImg}
            alt="Blood donation illustration"
            className="w-full max-w-xs md:max-w-sm rounded-xl shadow-2xl border-4 border-white/20"
          />
        </motion.div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-700/50 to-transparent" />
      </motion.div>

      {/* Right Side Auth Form */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center bg-[#fff5f5] dark:bg-[#0f0f0f] px-6 md:px-16 py-10 transition-colors duration-500"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;