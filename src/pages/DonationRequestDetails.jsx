import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

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

  if (!request) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Request Details</h2>
      <div className="space-y-1">
        <p><strong>Recipient:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Message:</strong> {request.requestMessage}</p>
      </div>

      {request.status === "pending" && (
        <button
          className="btn btn-success"
          onClick={() => {
            Swal.fire({
              title: "Confirm Donation?",
              html: `
                <p><strong>Name:</strong> ${user?.displayName}</p>
                <p><strong>Email:</strong> ${user?.email}</p>
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
      )}
    </div>
  );
};

export default DonationRequestDetails;
