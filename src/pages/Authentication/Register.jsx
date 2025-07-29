import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import axios from 'axios';
import divisions from '../../assets/divisions.json';
import districts from '../../assets/districts.json';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/dashboard';

  const [selectedDivision, setSelectedDivision] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  useEffect(() => {
    if (selectedDivision) {
      const matched = districts.filter(d => d.division_id === selectedDivision);
      setFilteredDistricts(matched);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedDivision]);

  const onSubmit = async (data) => {
    if (!profilePic) {
      return Swal.fire("Hold on", "Please wait until your image is uploaded", "warning");
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
        role: 'donor',
        status: 'active',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post('/users', userInfo);
      const idToken = await user.getIdToken();
      const jwtRes = await axiosInstance.post("/jwt", { token: idToken });

      if (!jwtRes.data.success) {
        throw new Error("Failed to set cookie");
      }

      Swal.fire("Success", "Account Created Successfully!", "success");
      navigate(from);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
      Swal.fire("Uploaded", "Profile picture uploaded", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-xl bg-white rounded-xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input {...register('name', { required: true })} placeholder="Full Name" className="input input-bordered w-full" />
            {errors.name && <span className="text-sm text-red-500">Name is required</span>}
          </div>

          <div>
            <label className="label">Profile Picture</label>
            <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full" accept="image/*" />
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })} placeholder="example@email.com" className="input input-bordered w-full" />
            {errors.email && <span className="text-sm text-red-500">Email is required</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Division</label>
              <select value={selectedDivision} onChange={e => setSelectedDivision(e.target.value)} className="select select-bordered w-full">
                <option value="">Select Division</option>
                {divisions.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">District</label>
              <select {...register('district', { required: true })} className="select select-bordered w-full">
                <option value="">Select District</option>
                {filteredDistricts.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.district && <span className="text-sm text-red-500">District is required</span>}
            </div>
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
              <option value="">Select</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>
            {errors.bloodGroup && <span className="text-sm text-red-500">Required</span>}
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered w-full" />
            {errors.password && <span className="text-sm text-red-500">Minimum 6 characters</span>}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input type="password" {...register('confirmPassword', { required: true })} className="input input-bordered w-full" />
            {errors.confirmPassword && <span className="text-sm text-red-500">Required</span>}
          </div>

          <button className="btn bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white w-full mt-2">
            Create Account
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link className="text-blue-600 underline" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
