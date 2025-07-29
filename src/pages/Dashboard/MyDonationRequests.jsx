import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

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
        setRequests(res.data.requests || res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email, axiosInstance]);

  const filteredRequests = filter === 'all' ? requests : requests.filter(req => req.status === filter);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const displayedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    // Add your delete logic here
    console.log("Deleting request:", id);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">🩸 My Donation Requests</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            className={`btn btn-sm ${filter === status ? 'btn-error text-white' : 'btn-outline'}`}
            onClick={() => handleFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-red-50 text-red-700 uppercase">
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
              displayedRequests.map(req => (
                <tr key={req._id} className="hover">
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td><span className="font-semibold">{req.bloodGroup}</span></td>
                  <td>
                    <span className={`badge px-3 py-1 capitalize 
                      ${req.status === 'pending' ? 'badge-warning' :
                        req.status === 'inprogress' ? 'badge-info' :
                          req.status === 'done' ? 'badge-success' :
                            'badge-error'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <Link to={`/donation-request/${req._id}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                    <Link to={`/dashboard/edit-donation-request/${req._id}`} className="btn btn-sm btn-info text-white">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">No donation requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-active btn-error text-white' : 'btn-outline'}`}
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
