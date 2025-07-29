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
  const from = location.state?.from?.pathname || "/dashboard";

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
      const result = await createUser(data.email, data.password);
      const user = result.user;

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
      const idToken = await user.getIdToken();
      await axiosInstance.post("/jwt", { token: idToken });

      Swal.fire("Success", "Account Created", "success");
      navigate(from);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
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
    <div className="max-w-md mx-auto mt-10 shadow-xl bg-white rounded-xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name", { required: true })} placeholder="Full Name" className="input input-bordered w-full" />
          <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
          <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />

          {/* District & Upazila */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>District</label>
              <select
                className="select select-bordered w-full"
                {...register("district", { required: true })}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Upazila</label>
              <select
                className="select select-bordered w-full"
                {...register("upazila", { required: true })}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Blood Group */}
          <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* Password */}
          <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="Password" className="input input-bordered w-full" />
          <input type="password" {...register("confirmPassword", { required: true })} placeholder="Confirm Password" className="input input-bordered w-full" />

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
