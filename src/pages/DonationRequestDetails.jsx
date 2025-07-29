import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "./shared/Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const { data: request } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axios.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const { mutate: donate } = useMutation({
    mutationFn: () => axios.patch(`/donation-requests/${id}`, { status: "inprogress" }),
    onSuccess: () => {
      Swal.fire("Success", "Donation confirmed!", "success");
    },
  });

  if (!request) return <div className="text-center mt-8">
    <Loading />
  </div>;

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
        Donation Request Details
      </h2>
      <div className="space-y-1">
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
            className="btn bg-red-600 text-white"
            onClick={() => {
              Swal.fire({
                title: "Confirm Donation?",
                html: `
                <p className="mb-2"><strong>Donor Name:</strong> ${user?.displayName}</p>
            <p className="mb-4"><strong>Donor Email:</strong> ${user?.email}</p>

              `,
                showCancelButton: true,
                confirmButtonText: "Yes, Confirm",
              }).then((result) => {
                if (result.isConfirmed) {
                  donate();
                }
              });
            }}
          >
            Donate Now
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
