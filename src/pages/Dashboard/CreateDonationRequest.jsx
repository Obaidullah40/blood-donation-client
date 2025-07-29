import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import useUserData from '../../hooks/useUserData';
import districts from '../../assets/districts.json';
import upazilas from '../../assets/upazilas.json';

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (selectedDistrict) {
      const matched = upazilas.filter(u => u.district_id === selectedDistrict);
      setFilteredUpazilas(matched);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    if (userData?.status !== 'active') {
      return Swal.fire('Blocked', 'You are not allowed to create a donation request.', 'warning');
    }

    const districtObj = districts.find(d => d.id === selectedDistrict);

    const requestData = {
      ...data,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientDistrict: districtObj?.name || '', 
      status: 'pending',
      createdAt: new Date().toISOString(),
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
    <div className="card bg-base-100 w-full max-w-2xl mx-auto my-10 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4 text-center text-red-600">🩸 Create Donation Request</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

          {/* Requester Info */}
          <input value={user?.displayName || ''} readOnly className="input input-bordered w-full" />
          <input value={user?.email || ''} readOnly className="input input-bordered w-full" />

          {/* Recipient Name */}
          <div>
            <label className="label">Recipient Name</label>
            <input {...register('recipientName', { required: true })} className="input input-bordered w-full" placeholder="Recipient's Name" />
            {errors.recipientName && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* District → Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Recipient District</label>
              <select
                className="select select-bordered w-full"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Recipient Upazila</label>
              <select {...register('recipientUpazila', { required: true })} className="select select-bordered w-full">
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              {errors.recipientUpazila && <p className="text-red-500 text-sm">Upazila is required</p>}
            </div>
          </div>

          {/* Hospital & Address */}
          <input {...register('hospitalName', { required: true })} className="input input-bordered w-full" placeholder="Hospital Name" />
          <input {...register('fullAddress', { required: true })} className="input input-bordered w-full" placeholder="Full Address" />

          {/* Blood Group */}
          <select {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" {...register('donationDate', { required: true })} className="input input-bordered w-full" />
            <input type="time" {...register('donationTime', { required: true })} className="input input-bordered w-full" />
          </div>

          {/* Message */}
          <textarea {...register('requestMessage', { required: true })} className="textarea textarea-bordered w-full" rows="4" placeholder="Message..." />

          <button type="submit" className="btn w-full mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
