import { useQuery } from "@tanstack/react-query";
import {useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loading from "./shared/Loading";

const DonationRequests = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

 const { data: requests = [], isLoading } = useQuery({
    queryKey: ["public-donation-requests"],
    queryFn: async () => {
      const res = await axios.get("/admin/all-donation-requests?status=pending");
      return res.data.requests;
    },
  });

  const handleView = (id) => {
    if (!user) {
      Swal.fire("Login Required", "Please login to view details.", "info");
      navigate("/login");
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  if (isLoading) return <p className="text-center mt-8"><Loading/></p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-center text-red-600">Blood Donation Requests 🩸</h2>

      {requests.length === 0 && (
        <p className="text-center text-gray-500">No pending donation requests found.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req._id} className="bg-white shadow rounded-lg p-4 space-y-2 border">
            <h3 className="text-xl font-semibold text-red-500">{req.recipientName}</h3>
            <p><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
            <p><strong>Date:</strong> {req.donationDate}</p>
            <p><strong>Time:</strong> {req.donationTime}</p>
            <div className="text-right">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleView(req._id)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
