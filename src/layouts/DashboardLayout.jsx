import { Outlet, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Loading from "../pages/shared/Loading";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { role, loading } = useRole();

  if (loading) return <Loading />;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
      isActive ? "bg-white/20" : "hover:bg-white/10"
    }`;

  const SidebarLinks = () => (
    <>
      <NavLink to="/dashboard" className={navLinkClass}>
        <FaHome /> Home
      </NavLink>

      {role === "donor" && (
        <>
          <NavLink to="/dashboard/create-donation-request" className={navLinkClass}>
            <FaPlusCircle /> Create Request
          </NavLink>
          <NavLink to="/dashboard/my-donation-requests" className={navLinkClass}>
            <FaListAlt /> My Requests
          </NavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <NavLink to="/dashboard/all-users" className={navLinkClass}>
            👥 All Users
          </NavLink>
          <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
            🩸 All Blood Requests
          </NavLink>
          <NavLink to="/dashboard/content-management" className={navLinkClass}>
            📝 Content Management
          </NavLink>
        </>
      )}

      {role === "volunteer" && (
        <>
          <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
            🩸 All Blood Requests
          </NavLink>
          <NavLink to="/dashboard/content-management" className={navLinkClass}>
            📝 Content Management
          </NavLink>
        </>
      )}

      <NavLink to="/dashboard/profile" className={navLinkClass}>
        <FaUser /> Profile
      </NavLink>
      <NavLink to="/dashboard/funding" className={navLinkClass}>
        💸 Funding
      </NavLink>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top bar for mobile only */}
        <div className="w-full p-4 flex justify-between items-center shadow lg:hidden bg-base-100 z-10">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost">
            ☰
          </label>
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>

        {/* Main content */}
        <main className="px-4 py-6 md:px-8">
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

          <div className="rounded-xl bg-white p-4 md:p-6 shadow-md border border-gray-200">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-gradient-to-br from-red-500 to-red-600 text-white p-6 flex flex-col shadow-lg min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">🩸 Dashboard</h2>
          <nav className="space-y-3">
            <SidebarLinks />
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
