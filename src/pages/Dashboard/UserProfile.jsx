import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user profile from DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/profile', { withCredentials: true });
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch profile", "error");
      }
    };
    fetchProfile();
  }, [axiosInstance]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.patch(`/users/${profile._id}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated", "Profile updated successfully", "success");
        setProfile(formData);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

//   if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input
            className="input input-bordered w-full"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            className="input input-bordered w-full"
            name="email"
            value={formData.email || ''}
            disabled
          />
        </div>
        <div>
          <label className="label">District</label>
          <input
            className="input input-bordered w-full"
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="label">Upazila</label>
          <input
            className="input input-bordered w-full"
            name="upazila"
            value={formData.upazila || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="label">Blood Group</label>
          <select
            className="select select-bordered w-full"
            name="blood_group"
            value={formData.blood_group || ''}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="label">Avatar URL</label>
          <input
            className="input input-bordered w-full"
            name="photoURL"
            value={formData.photoURL || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
