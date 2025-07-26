import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      Swal.fire("Welcome", "Logged in successfully!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email Field */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter email"
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold shadow-md transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            <small>New here? <Link to="/register" className="text-blue-600 underline">Create Account</Link></small>
          </p>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
