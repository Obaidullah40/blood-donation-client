import { Outlet } from "react-router";
import { motion } from "framer-motion";
import bdImg from "../assets/blood-donation.jpg"
const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">

      {/* Animated Left Banner */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-red-100 via-white to-red-50 flex flex-col justify-center items-center p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-red-600 text-center mb-4"
        >
          Welcome to <br /> BloodConnect 🩸
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 text-center max-w-sm mb-6"
        >
          Join the mission to save lives. Login or register to get started.
        </motion.p>
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
          src={bdImg}
          alt="blood-donation"
          className="w-full max-w-sm rounded-2xl shadow-xl"
        />
      </motion.div>

      {/* Animated Right Form Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center bg-white p-6 md:p-12"
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