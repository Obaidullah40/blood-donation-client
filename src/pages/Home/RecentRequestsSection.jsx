import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";

// Framer Motion variants for animations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function RecentRequestsSection() {
  const navigate = useNavigate();
  const axios = useAxios();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["recent-donation-requests"],
    queryFn: async () => {
      const res = await axios.get("/public/donation-requests?status=pending&limit=3");
      return res.data.requests;
    },
  });

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
        <div className="text-center">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-rose-500"
      >
        Recent Donation Requests
      </motion.h2>

      {/* Request Count */}
      <p className="text-center text-gray-800 dark:text-white mb-6">
        Showing {requests.length} recent {requests.length === 1 ? "request" : "requests"}
      </p>

      {requests.length === 0 && (
        <p className="text-center text-gray-800 dark:text-white">No recent donation requests found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req, index) => (
          <motion.div
            key={req._id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 space-y-2 border flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-rose-500">{req.recipientName}</h3>
              <span className="text-sm font-medium text-white bg-rose-500 px-2 py-1 rounded-md capitalize">
                {req.status}
              </span>
            </div>
            <p><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
            <p><strong>Date:</strong> {req.donationDate}</p>
            <p><strong>Time:</strong> {req.donationTime}</p>
            <div className="text-right mt-auto">
              <button
                className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-4 py-2 font-semibold"
                onClick={() => navigate(`/donation-request/${req._id}`)}
              >
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {requests.length > 0 && (
        <div className="text-center mt-8">
          <button
            className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold"
            onClick={() => navigate("/donation-request")}
          >
            View All Requests
          </button>
        </div>
      )}
    </section>
  );
}