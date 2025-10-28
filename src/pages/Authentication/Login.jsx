import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      Swal.fire("Welcome", "Logged in successfully!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Login Failed", error?.message?.replace("Firebase: ", "") || "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-lg rounded-xl border border-rose-200 dark:border-rose-900 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-rose-500 text-white p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <span className="text-4xl">🩸</span>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-rose-100">Login to continue saving lives</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email', { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                {...register('password', { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              />
            </div>
            {errors.password && (
              <p className="text-rose-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-500 text-white hover:bg-rose-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="border-t border-rose-200 dark:border-rose-900 p-6 text-center bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            New here?{" "}
            <Link
              to="/register"
              className="text-rose-500 font-semibold hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;