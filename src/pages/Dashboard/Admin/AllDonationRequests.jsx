import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import RequestRow from "./RequestRow";

const AllDonationRequests = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const limit = 10;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["all-donation-requests", page, status],
    queryFn: async () => {
      const res = await axios.get(`/admin/all-donation-requests?page=${page}&limit=${limit}&status=${status}`);
      return res.data;
    },
  });

  const { total = 0, requests = [] } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">All Blood Donation Requests 🩸</h2>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "pending", "inprogress", "done", "canceled"].map((stat) => (
          <button
            key={stat}
            onClick={() => setStatus(stat)}
            className={`btn btn-sm ${status === stat ? "btn-primary" : "btn-outline"}`}
          >
            {stat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
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
            {requests.map((request) => (
              <RequestRow key={request._id} request={request} refetchKey="all-donation-requests" />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllDonationRequests;
