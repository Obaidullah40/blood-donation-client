import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useRole from "../../../hooks/useRole";
import RequestRow from "./RequestRow";
import Loading from "../../shared/Loading";
import useUserData from "../../../hooks/useUserData";
import { motion } from "framer-motion";

const AllDonationRequests = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const { userData } = useUserData();
  const {role, loading: roleLoading } = useRole();

  const limit = 10;
    

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!userData?.email && !roleLoading,
    queryKey: ["all-donation-requests", page, status],
    queryFn: async () => {
      const res = await axios.get(
        `/admin/all-donation-requests?email=${userData.email}&page=${page}&limit=${limit}&status=${status}`
      );
      return res.data;
    },
  });

  const { total = 0, requests = [] } = data;
  const totalPages = Math.ceil(total / limit);

  if (isLoading || roleLoading)
    return (
      <div className="text-center mt-16">
        <Loading />
      </div>
    );

  return (
    <motion.div
      className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-red-600"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        🩸 All Blood Donation Requests
      </motion.h2>

      {/* Filter Buttons */}
      <motion.div
        className="flex gap-2 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {["all", "pending", "inprogress", "done", "canceled"].map((stat) => (
          <button
            key={stat}
            onClick={() => {
              setStatus(stat);
              setPage(1);
            }}
            className={`btn btn-sm capitalize ${
              status === stat ? "btn-primary" : "btn-outline"
            }`}
          >
            {stat}
          </button>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        className="overflow-x-auto shadow-lg border rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="table table-zebra w-full">
          <thead className="bg-red-50 text-red-700">
            <tr>
              <th>Recipient</th>
              <th>Requester</th>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <RequestRow
                  key={request._id}
                  request={request}
                  refetchKey={refetch}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center gap-2 mt-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllDonationRequests;
