import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import useUserData from '../../hooks/useUserData';

const CreateDonationRequest = () => {
  const { user } = useAuth();
const { userData, loading } = useUserData(); // assumes userData has role, status, etc.
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    
    if (userData?.status !== 'active') {
      return Swal.fire('Blocked', 'You are not allowed to create a donation request.', 'warning');
    }

    const requestData = {
      ...data,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axiosInstance.post('/donation-requests', requestData);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Donation request submitted!', 'success');
        navigate('/dashboard/my-donation-requests');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to submit request.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        {/* Requester Info */}
        <div>
          <label className="label">Requester Name</label>
          <input value={user?.displayName} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Requester Email</label>
          <input value={user?.email} readOnly className="input input-bordered w-full" />
        </div>

        {/* Recipient Info */}
        <div>
          <label className="label">Recipient Name</label>
          <input {...register('recipientName', { required: true })} className="input input-bordered w-full" />
          {errors.recipientName && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Recipient District</label>
            <select {...register('recipientDistrict', { required: true })} className="select select-bordered w-full">
              <option value="">Select District</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              {/* Add more as needed */}
            </select>
          </div>
          <div>
            <label className="label">Recipient Upazila</label>
            <select {...register('recipientUpazila', { required: true })} className="select select-bordered w-full">
              <option value="">Select Upazila</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Kotwali">Kotwali</option>
              {/* Add more as needed */}
            </select>
          </div>
        </div>

        {/* Hospital & Address */}
        <div>
          <label className="label">Hospital Name</label>
          <input {...register('hospitalName', { required: true })} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Full Address</label>
          <input {...register('fullAddress', { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input type="date" {...register('donationDate', { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Donation Time</label>
            <input type="time" {...register('donationTime', { required: true })} className="input input-bordered w-full" />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="label">Request Message</label>
          <textarea {...register('requestMessage', { required: true })} className="textarea textarea-bordered w-full" rows="4" />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">Submit Request</button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
