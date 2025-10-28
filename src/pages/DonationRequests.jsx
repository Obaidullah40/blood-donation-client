import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loading from "./shared/Loading";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const DonationRequests = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["public-donation-requests"],
    queryFn: async () => {
      const res = await axios.get("/public/donation-requests?status=pending");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-rose-500"
        >
          Blood Donation Requests 🩸
        </motion.h2>

        {requests.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-700 dark:text-gray-300 text-lg"
          >
            No pending donation requests found.
          </motion.p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-[#1a1a1a] shadow-md rounded-xl p-6 border border-rose-200 dark:border-rose-900 flex flex-col transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-rose-500 mb-3">
                {req.recipientName}
              </h3>
              <div className="space-y-2 text-gray-800 dark:text-gray-300 flex-grow">
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">Blood Group:</strong> {req.bloodGroup}
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">Date:</strong> {req.donationDate}
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">Time:</strong> {req.donationTime}
                </p>
              </div>
              <div className="text-right mt-4 pt-4 border-t border-rose-200 dark:border-rose-900">
                <button
                  className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-5 py-2 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                  onClick={() => handleView(req._id)}
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;