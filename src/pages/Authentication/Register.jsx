import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(url, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error(err);
      Swal.fire("Image upload failed", "", "error");
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="label">Profile Picture</label>
            <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
            {profilePic && (
              <img src={profilePic} alt="Profile" className="w-20 h-20 mt-2 rounded-full object-cover border" />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* District and Upazila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">District</label>
              <select
                {...register("district", { required: true })}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Upazila</label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="At least 6 characters"
              className="input input-bordered w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Re-enter password"
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <button className="btn btn-error w-full text-white tracking-wide">Register</button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm mt-6">
          Already have an account?
          <Link to="/login" className="ml-1 text-red-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};


export default Register;
