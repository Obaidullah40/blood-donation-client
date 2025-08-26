import { Outlet, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useRole from "../hooks/useRole";
import Loading from "../pages/shared/Loading";

// Framer Motion variants for animations
const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { role, loading } = useRole();

  if (loading) return <Loading />;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all ${
      isActive ? "bg-rose-600 text-white" : "text-white hover:bg-rose-400"
    }`;

  const SidebarLinks = () => (
    <>
      <motion.div variants={linkVariants} initial="hidden" animate="visible">
        <NavLink to="/dashboard" className={navLinkClass}>
          <FaHome /> Home
        </NavLink>
      </motion.div>

      {role === "donor" && (
        <>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <NavLink to="/dashboard/create-donation-request" className={navLinkClass}>
              <FaPlusCircle /> Create Request
            </NavLink>
          </motion.div>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <NavLink to="/dashboard/my-donation-requests" className={navLinkClass}>
              <FaListAlt /> My Requests
            </NavLink>
          </motion.div>
        </>
      )}

      {role === "admin" && (
        <>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <NavLink to="/dashboard/all-users" className={navLinkClass}>
              👥 All Users
            </NavLink>
          </motion.div>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
              🩸 All Blood Requests
            </NavLink>
          </motion.div>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <NavLink to="/dashboard/content-management" className={navLinkClass}>
              📝 Content Management
            </NavLink>
          </motion.div>
        </>
      )}

      {role === "volunteer" && (
        <>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <NavLink to="/dashboard/all-blood-donation-request" className={navLinkClass}>
              🩸 All Blood Requests
            </NavLink>
          </motion.div>
          <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <NavLink to="/dashboard/content-management" className={navLinkClass}>
              📝 Content Management
            </NavLink>
          </motion.div>
        </>
      )}

      <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: role === "admin" ? 0.4 : role === "volunteer" ? 0.3 : 0.3 }}>
        <NavLink to="/dashboard/profile" className={navLinkClass}>
          <FaUser /> Profile
        </NavLink>
      </motion.div>
      <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: role === "admin" ? 0.5 : role === "volunteer" ? 0.4 : 0.4 }}>
        <NavLink to="/dashboard/funding" className={navLinkClass}>
          💸 Funding
        </NavLink>
      </motion.div>
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-white dark:bg-gray-800 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top bar for mobile only */}
        <div className="w-full p-4 flex justify-between items-center shadow lg:hidden bg-white dark:bg-gray-800 z-10">
          <label htmlFor="dashboard-drawer" className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-4 py-2">
            ☰
          </label>
          <h2 className="text-lg font-bold text-rose-500">Dashboard</h2>
        </div>

        {/* Main content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="flex justify-between items-center mb-6 flex-wrap gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-rose-400 hover:text-white transition-all"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-400 transition-all"
            >
              <FaHome /> Main Home
            </button>
          </motion.div>

          <div className="rounded-md bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-md border border-gray-300 dark:border-gray-600">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <motion.aside
          className="w-64 bg-rose-500 dark:bg-rose-600 text-white p-6 flex flex-col shadow-lg min-h-screen"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">🩸 Dashboard</h2>
          <nav className="space-y-3">
            <SidebarLinks />
          </nav>
        </motion.aside>
      </div>
    </div>
  );
};

export default DashboardLayout;