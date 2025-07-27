import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import axios from 'axios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';


    const onSubmit = async (data) => {
        // ✅ Check image uploaded or not
        if (!profilePic) {
            return Swal.fire("Hold on", "Please wait until your image is uploaded", "warning");
        }

        // ✅ Confirm password match check
        if (data.password !== data.confirmPassword) {
            return Swal.fire("Oops", "Passwords do not match", "error");
        }

        try {
            const result = await createUser(data.email, data.password);

            // Save user to database
            const userInfo = {
                email: data.email,
                name: data.name,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                role: 'donor',
                status: 'active',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            };


            await axiosInstance.post('/users', userInfo);

            // Update Firebase profile
            const userProfile = {
                displayName: data.name,
                photoURL: profilePic
            };

            await updateUserProfile(userProfile);

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
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl font-bold mb-4 text-center">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset space-y-2">
                        {/* Name */}
                        <label className="label">Your Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500">Name is required</p>}

                        {/* Profile Picture */}
                        <label className="label">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                        />

                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        {/* Blood Group */}
                        <label className="label">Blood Group</label>
                        <select
                            {...register('bloodGroup', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>
                        {errors.bloodGroup && <p className="text-red-500">Blood group is required</p>}

                        {/* District */}
                        <label className="label">District</label>
                        <select
                            {...register('district', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select District</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Khulna</option>
                            <option>Barisal</option>
                            <option>Sylhet</option>
                            <option>Rajshahi</option>
                            <option>Mymensingh</option>
                            <option>Rangpur</option>
                        </select>
                        {errors.district && <p className="text-red-500">District is required</p>}

                        {/* Upazila */}
                        <label className="label">Upazila</label>
                        <select
                            {...register('upazila', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Upazila</option>
                            <option>Savar</option>
                            <option>Mirpur</option>
                            <option>Dhanmondi</option>
                            <option>Kotwali</option>
                            <option>Panchlaish</option>
                        </select>
                        {errors.upazila && <p className="text-red-500">Upazila is required</p>}

                        {/* Password */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Minimum 6 characters</p>}

                        {/* Confirm Password */}
                        <label className="label">Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <p className='text-red-500'>Please confirm your password</p>}

                        {/* Submit */}
                        <button className="btn w-full mt-4 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold shadow-md transition-all duration-300">
                            Register
                        </button>
                    </fieldset>

                    <p className="text-center mt-4">
                        <small>Already have an account? <Link className="text-blue-600 underline" to="/login">Login</Link></small>
                    </p>
                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;