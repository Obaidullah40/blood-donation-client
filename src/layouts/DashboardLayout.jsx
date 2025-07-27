// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-red-50 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-red-500 to-red-600 text-white p-6 hidden md:flex flex-col shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">🩸 Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`
            }
          >
            <FaPlusCircle /> Create Request
          </NavLink>
          <NavLink
            to="/dashboard/my-donation-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`
            }
          >
            <FaListAlt /> My Requests
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8 bg-white rounded-tl-3xl shadow-inner">
        {/* Top Navigation Controls */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all shadow"
          >
            <FaArrowLeft /> Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow"
          >
            <FaHome /> Main Home
          </button>
        </div>

        {/* Nested Routes */}
        <div className="rounded-xl bg-white p-4 md:p-6 shadow-md border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
