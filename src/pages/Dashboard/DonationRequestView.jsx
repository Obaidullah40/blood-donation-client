import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const DonationRequestView = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, axios]);

  const handleDonateConfirm = async () => {
    try {
      const updatedData = {
        donorName: user.displayName,
        donorEmail: user.email,
        status: "inprogress",
      };
      const res = await axios.patch(`/donation-requests/${id}`, updatedData);
      if (res.data.modifiedCount) {
        Swal.fire("Success", "Donation Confirmed!", "success");
        setShowModal(false);
        navigate("/dashboard"); // Go back or to relevant list
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (loading) return <p className="text-center my-10">Loading...</p>;
  if (!request) return <p className="text-center my-10">Request not found.</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
        Donation Request Details
      </h2>

      <div>
        <p><strong>Requester Name:</strong> {request.requesterName}</p>
        <p><strong>Requester Email:</strong> {request.requesterEmail}</p>
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Address:</strong> {request.fullAddress}</p>
        <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Message:</strong> {request.requestMessage}</p>
        <p><strong>Status:</strong> <span className="capitalize">{request.status}</span></p>
      </div>

      {request.status === "pending" && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="btn bg-red-600 text-white"
          >
            Donate Now
          </button>
        </div>
      )}

      {/* Donate Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center text-red-600">Confirm Donation</h3>
            <p className="mb-2"><strong>Donor Name:</strong> {user?.displayName}</p>
            <p className="mb-4"><strong>Donor Email:</strong> {user?.email}</p>

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
              <button onClick={handleDonateConfirm} className="btn bg-red-600 text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestView;
