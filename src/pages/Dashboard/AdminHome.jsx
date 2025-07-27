import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaUserFriends, FaHandHoldingUsd, FaTint } from "react-icons/fa";

const AdminHome = () => {
  const axios = useAxios();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    axios.get("/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, [axios]);

  return (
    <div className="space-y-10">
      {/* ✅ Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
        <p className="text-gray-600 mt-2">
          Manage the users, requests and content all in one place.
        </p>
      </div>

      {/* ✅ Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUserFriends className="text-white text-3xl" />}
          count={stats.totalUsers}
          title="Total Donors"
          color="from-green-400 to-green-600"
        />
        <StatCard
          icon={<FaHandHoldingUsd className="text-white text-3xl" />}
          count={`$${stats.totalFunds}`}
          title="Total Funds"
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          icon={<FaTint className="text-white text-3xl" />}
          count={stats.totalRequests}
          title="Donation Requests"
          color="from-red-400 to-red-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, count, title, color }) => (
  <div className={`bg-gradient-to-br ${color} text-white rounded-xl shadow-lg p-6 flex items-center gap-6`}>
    <div className="bg-white/20 p-4 rounded-full">{icon}</div>
    <div>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm">{title}</p>
    </div>
  </div>
);

export default AdminHome;
