import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/dashboard';
  const axiosInstance = useAxios();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // ✅ Get Firebase ID token
      const idToken = await user.getIdToken();

      // ✅ Set HTTP-only cookie on server
      const jwtRes = await axiosInstance.post('/jwt', { token: idToken });
      if (!jwtRes.data.success) throw new Error("Failed to set auth cookie");

      // ✅ Prepare user info to save in DB
      const userInfo = {
        email: user.email,
        name: user.displayName,
        role: 'donor', // default
        status: 'active',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      // ✅ Save user to DB
      try {
        await axiosInstance.post('/users', userInfo);
      } catch (err) {
        if (err.response?.status === 409) {
          console.log("User already exists in DB");
        } else {
          console.error("Failed to save user:", err);
        }
      }

      Swal.fire("Success", "Logged in successfully!", "success");
      navigate(from);

    } catch (error) {
      console.error(error);
      Swal.fire("Login Failed", error.message, "error");
    }
  };

  return (
    <div className='text-center'>
      <p className='mb-4'>OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g>
            <path d="m0 0H512V512H0" fill="#fff" />
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
