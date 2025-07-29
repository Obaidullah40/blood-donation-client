import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import districts from "../../assets/districts.json";
import upazilas from "../../assets/upazilas.json";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";

const EditDonationRequest = () => {
  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Load donation request data
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`/donation-requests/${id}`);
        setRequest(res.data);

        const fields = [
          "recipientName", "recipientDistrict", "recipientUpazila",
          "hospitalName", "fullAddress", "bloodGroup",
          "donationDate", "donationTime", "requestMessage"
        ];
        fields.forEach(field => setValue(field, res.data[field]));

        setSelectedDistrict(res.data.recipientDistrict);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load donation request.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, axios, setValue]);

  // Update upazila options based on district
  useEffect(() => {
    const matchedDistrict = districts.find(d => d.name === selectedDistrict);
    if (matchedDistrict) {
      const filtered = upazilas.filter(u => u.district_id === matchedDistrict.id);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.patch(`/donation-requests/${id}`, data);
      if (res.data.modifiedCount) {
        Swal.fire("Updated", "Donation request updated successfully!", "success");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update request.", "error");
    }
  };

  if (loading) return <Loading/>;
  if (!request) return <p className="text-center my-10">Request not found.</p>;
  if (["done", "canceled"].includes(request.status)) {
    return <p className="text-center text-red-500">This request cannot be edited.</p>;
  }

  return (
    <div className="card bg-base-100 w-full max-w-2xl mx-auto my-10 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4 text-center text-red-600">✏️ Edit Donation Request</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

          {/* Recipient Name */}
          <div>
            <label className="label">Recipient Name</label>
            <input {...register("recipientName", { required: true })} className="input input-bordered w-full" />
            {errors.recipientName && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* District → Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Recipient District</label>
              <select
                className="select select-bordered w-full"
                {...register("recipientDistrict", { required: true })}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.recipientDistrict && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Recipient Upazila</label>
              <select {...register("recipientUpazila", { required: true })} className="select select-bordered w-full">
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              {errors.recipientUpazila && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Hospital & Address */}
          <input {...register("hospitalName", { required: true })} className="input input-bordered w-full" placeholder="Hospital Name" />
          <input {...register("fullAddress", { required: true })} className="input input-bordered w-full" placeholder="Full Address" />

          {/* Blood Group */}
          <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" {...register("donationDate", { required: true })} className="input input-bordered w-full" />
            <input type="time" {...register("donationTime", { required: true })} className="input input-bordered w-full" />
          </div>

          {/* Message */}
          <textarea {...register("requestMessage", { required: true })} className="textarea textarea-bordered w-full" rows="4" placeholder="Message..." />

          <button type="submit" className="btn w-full mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white">
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
