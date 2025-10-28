import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";

const UserProfile = () => {
  const axiosInstance = useAxios();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile");
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch profile", "error");
      }
    };
    fetchProfile();
  }, [axiosInstance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  if (!profile)
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );

  return (
    <div
      className="max-w-3xl mx-auto my-10 bg-gradient-to-br from-white to-rose-50 
                 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-2xl p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-rose-500 text-center sm:text-left">
          My Profile
        </h2>
        <button
          className={`btn ${
            isEditing
              ? "bg-green-500 hover:bg-green-400"
              : "bg-rose-500 hover:bg-rose-400"
          } text-white border-none px-5`}
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={
            formData.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-rose-200 shadow-md object-cover"
        />
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            className="input input-bordered w-full"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            className="input input-bordered w-full"
            name="email"
            value={formData.email || ""}
            disabled
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            District
          </label>
          <input
            className="input input-bordered w-full"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Upazila
          </label>
          <input
            className="input input-bordered w-full"
            name="upazila"
            value={formData.upazila || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Blood Group
          </label>
          <select
            className="select select-bordered w-full"
            name="blood_group"
            value={formData.blood_group || ""}
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

        {/* Avatar URL */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Avatar URL
          </label>
          <input
            className="input input-bordered w-full"
            name="photoURL"
            value={formData.photoURL || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
