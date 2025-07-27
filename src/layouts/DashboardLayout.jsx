// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router";
import { FaHome, FaPlusCircle, FaListAlt, FaUser } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-500 text-white p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6 text-center">🩸 Dashboard</h2>
        <ul className="space-y-2">
          <li><NavLink to="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-red-700"><FaHome />Home</NavLink></li>
          <li><NavLink to="/dashboard/create-donation-request" className="flex items-center gap-2 p-2 rounded hover:bg-red-700"><FaPlusCircle />Create Request</NavLink></li>
          <li><NavLink to="/dashboard/my-donation-requests" className="flex items-center gap-2 p-2 rounded hover:bg-red-700"><FaListAlt />My Requests</NavLink></li>
          <li><NavLink to="/dashboard/profile" className="flex items-center gap-2 p-2 rounded hover:bg-red-700"><FaUser />Profile</NavLink></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
