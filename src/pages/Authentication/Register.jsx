import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import districts from "../../assets/districts.json";
import upazilas from "../../assets/upazilas.json";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (selectedDistrict) {
      const selected = districts.find(d => d.name === selectedDistrict);
      if (selected) {
        const matched = upazilas.filter(u => u.district_id === selected.id);
        setFilteredUpazilas(matched);
      } else {
        setFilteredUpazilas([]);
      }
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    if (!profilePic) {
      return Swal.fire("Wait", "Upload profile picture", "warning");
    }

    if (data.password !== data.confirmPassword) {
      return Swal.fire("Oops", "Passwords do not match", "error");
    }

    setSubmitting(true);

    try {
      await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      const userInfo = {
        email: data.email,
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: "donor",
        status: "active",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

      Swal.fire("Success", "Account Created", "success");
      navigate(from);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(url, formData);
      setProfilePic(res.data.data.url);
      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Profile picture uploaded successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Image upload failed", "", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] shadow-lg rounded-xl border border-rose-200 dark:border-rose-900 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-rose-500 text-white p-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Create Your Account</h2>
          <p className="text-rose-100">Join our life-saving community today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
            />
            {errors.name && (
              <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Profile Picture <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={uploading}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-500 hover:file:bg-rose-100 dark:file:bg-rose-900/30 dark:file:text-rose-400 disabled:opacity-50"
            />
            {uploading && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Uploading...</p>
            )}
            {profilePic && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-rose-200 dark:border-rose-900 shadow-md"
                />
                <p className="text-sm text-green-600 dark:text-green-400">✓ Uploaded successfully</p>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
            />
            {errors.email && (
              <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* District and Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                District <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("district", { required: "District is required" })}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.district && (
                <p className="text-rose-500 text-sm mt-1">{errors.district.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                Upazila <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                disabled={!selectedDistrict}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              {errors.upazila && (
                <p className="text-rose-500 text-sm mt-1">{errors.upazila.message}</p>
              )}
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Blood Group <span className="text-rose-500">*</span>
            </label>
            <select
              {...register("bloodGroup", { required: "Blood group is required" })}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-rose-500 text-sm mt-1">{errors.bloodGroup.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
            />
            {errors.password && (
              <p className="text-rose-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword", { required: "Please confirm your password" })}
              placeholder="Re-enter password"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-rose-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-rose-500 text-white hover:bg-rose-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-colors duration-200"
          >
            {submitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Already have an account */}
        <div className="border-t border-rose-200 dark:border-rose-900 p-6 text-center bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-500 font-semibold hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;