import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests?email=${user.email}`);
        // console.log('API response:', res.data);
        setRequests(res.data.requests || res.data || []); // fallback for different response structures
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, axiosInstance]);

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(req => req.status === filter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const displayedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border rounded">
          <thead className="bg-gray-200">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedRequests.map(req => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>
                <td>
                  <span className={`badge ${
                    req.status === 'pending' ? 'badge-warning' :
                    req.status === 'inprogress' ? 'badge-info' :
                    req.status === 'done' ? 'badge-success' :
                    'badge-error'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-1">
                  <button className="btn btn-xs btn-outline btn-info">View</button>
                  <button className="btn btn-xs btn-outline btn-warning">Edit</button>
                  <button className="btn btn-xs btn-outline btn-error">Delete</button>
                </td>
              </tr>
            ))}
            {displayedRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">No donation requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-active' : 'btn-outline'}`}
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
