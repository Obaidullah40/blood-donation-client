import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests?email=${user.email}`);
        setRequests(res.data.requests || res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchRequests();
  }, [user?.email, axiosInstance]);

  const filteredRequests = filter === "all" ? requests : requests.filter((req) => req.status === filter);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const displayedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this donation request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E11D48",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/donation-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      Swal.fire("Deleted!", "Donation request removed successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to delete request.", "error");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-500">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-red-600 dark:text-rose-400">
        🩸 My Donation Requests
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 ${
              filter === status
                ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-gray-700 dark:to-gray-800 text-red-700 dark:text-rose-300 uppercase">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedRequests.length > 0 ? (
              displayedRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td><span className="font-semibold">{req.bloodGroup}</span></td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "inprogress"
                          ? "bg-blue-100 text-blue-700"
                          : req.status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center mt-1">
                    <Link
                      to={`/donation-request/${req._id}`}
                      className="px-3 py-1 rounded-md text-sm bg-gradient-to-r from-red-400 to-rose-500 text-white hover:from-red-500 hover:to-rose-600 transition-all"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/edit-donation-request/${req._id}`}
                      className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                currentPage === idx + 1
                  ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
