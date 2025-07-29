import { Outlet, useNavigate } from "react-router";
import { motion } from "framer-motion";
import bdImg from "../assets/blood-donation.jpg";
import { ArrowLeft, Home } from "lucide-react";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white font-sans relative">

      {/* 🔙 Back & Home Buttons */}
      <div className="absolute top-4 left-4 z-50 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <Home size={16} />
          Home
        </button>
      </div>

      {/* Left Banner with Animation */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-red-100 to-white flex flex-col justify-center items-center px-10 py-12 shadow-md"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-extrabold text-red-600 leading-tight text-center mb-6"
        >
          BloodConnect 🩸
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-700 text-center text-lg max-w-md mb-8"
        >
          Empower your kindness. Register or login to become a life-saving donor or request blood in critical times.
        </motion.p>

        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
          src={bdImg}
          alt="Blood donation illustration"
          className="w-full max-w-xs md:max-w-sm rounded-xl shadow-lg"
        />
      </motion.div>

      {/* Right Side Auth Form */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center bg-white px-6 md:px-16 py-10"
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
