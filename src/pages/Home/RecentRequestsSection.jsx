import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../shared/Loading";

// Framer Motion variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function RecentRequestsSection() {
  const navigate = useNavigate();
  const axios = useAxios();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["recent-donation-requests"],
    queryFn: async () => {
      const res = await axios.get(
        "/public/donation-requests?status=pending&limit=3"
      );
      return res.data.requests;
    },
  });

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
        <div className="text-center">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-rose-500"
      >
        Recent Donation Requests
      </motion.h2>

      {/* Request Count */}
      <p className="text-center text-gray-800 dark:text-gray-300 mb-6">
        Showing {requests.length} recent{" "}
        {requests.length === 1 ? "request" : "requests"}
      </p>

      {/* Empty State */}
      {requests.length === 0 && (
        <p className="text-center text-gray-800 dark:text-gray-300">
          No recent donation requests found.
        </p>
      )}

      {/* Requests Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req, index) => (
          <motion.div
            key={req._id}
            className="bg-white dark:bg-[#1a1a1a] shadow-md rounded-xl p-6 border border-rose-200 dark:border-rose-900 flex flex-col transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(244, 63, 94, 0.2)",
            }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-rose-500">
                {req.recipientName}
              </h3>
              <span className="text-sm font-medium text-white bg-rose-500 px-3 py-1 rounded-md capitalize">
                {req.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-gray-800 dark:text-gray-300">
              <p>
                <strong>Location:</strong> {req.recipientDistrict},{" "}
                {req.recipientUpazila}
              </p>
              <p>
                <strong>Blood Group:</strong> {req.bloodGroup}
              </p>
              <p>
                <strong>Date:</strong> {req.donationDate}
              </p>
              <p>
                <strong>Time:</strong> {req.donationTime}
              </p>
            </div>

            <div className="text-right mt-auto pt-4">
              <button
                onClick={() => navigate(`/donation-request/${req._id}`)}
                className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-5 py-2 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Requests Button */}
      {requests.length > 0 && (
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={() => navigate("/donation-request")}
            className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-colors duration-200"
          >
            View All Requests
          </button>
        </motion.div>
      )}
    </section>
  );
}