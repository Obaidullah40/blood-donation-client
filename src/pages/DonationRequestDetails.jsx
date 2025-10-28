import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "./shared/Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  
  const { data: request, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center">
        <p className="text-center text-rose-500 text-xl font-semibold">Request not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-rose-200 dark:border-rose-900 overflow-hidden"
      >
        <div className="bg-rose-500 text-white p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Donation Request Details
          </h2>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="space-y-3 text-gray-800 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Requester Name:</strong>{" "}
                {request.requesterName}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Requester Email:</strong>{" "}
                {request.requesterEmail}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Recipient Name:</strong>{" "}
                {request.recipientName}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Hospital:</strong>{" "}
                {request.hospitalName}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Location:</strong>{" "}
                {request.recipientDistrict}, {request.recipientUpazila}
              </p>
            </div>

            <div className="space-y-3 text-gray-800 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Blood Group:</strong>{" "}
                <span className="text-rose-500 font-bold text-lg">{request.bloodGroup}</span>
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Date:</strong>{" "}
                {request.donationDate}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Time:</strong>{" "}
                {request.donationTime}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Status:</strong>{" "}
                <span className={`capitalize px-3 py-1 rounded-md text-sm font-medium ${
                  request.status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                    : request.status === "inprogress"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                }`}>
                  {request.status}
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 border-t border-rose-200 dark:border-rose-900"
          >
            <p className="text-gray-800 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Full Address:</strong>{" "}
              {request.fullAddress}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 border-t border-rose-200 dark:border-rose-900"
          >
            <p className="text-gray-800 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">Request Message:</strong>
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              {request.requestMessage}
            </p>
          </motion.div>

          {request.status === "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center pt-6"
            >
              <button
                className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-8 py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-colors duration-200"
                onClick={() => {
                  Swal.fire({
                    title: "Confirm Donation?",
                    html: `
                      <div class="text-left space-y-2 mt-4">
                        <p><strong>Donor Name:</strong> ${user?.displayName}</p>
                        <p><strong>Donor Email:</strong> ${user?.email}</p>
                      </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Yes, Confirm",
                    confirmButtonColor: "#f43f5e",
                    cancelButtonColor: "#6b7280",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      donate();
                    }
                  });
                }}
              >
                Donate Now
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DonationRequestDetails;