import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import useAxios from '../../hooks/useAxios';

const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
  try {
    // 1. Firebase login
    const result = await signIn(data.email, data.password);
    const user = result.user;

    // 2. Get Firebase ID token
    const idToken = await user.getIdToken();

    // 3. Send to server to store in HTTP-only cookie
    const res = await axiosInstance.post('/jwt', { token: idToken });

    if (res.data.success) {
      Swal.fire("Welcome", "Logged in successfully!", "success");
      navigate(from, { replace: true });
    } else {
      throw new Error("JWT Token Failed");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Login Failed", error?.message?.replace("Firebase: ", "") || "Something went wrong", "error");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};


export default Login;
