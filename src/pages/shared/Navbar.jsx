import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/blood.webp";
import { useState } from "react";
import { FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/donation-request", label: "Donation Requests" },
  { to: "/blogs", label: "Blog" },
  { to: "/search", label: "Search Donors", auth: true },
  { to: "/about", label: "About", auth: true },
];

const Navbar = () => {
  const { user, logOut, setLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
        setLoading(false);
        setIsLoggingOut(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Logout Failed", error.message, "error");
        setIsLoggingOut(false);
      });
  };

  const renderNavItems = (isMobile = false) => (
    <>
      {navItems.map((item) => (
        (!item.auth || user) && (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isMobile
                  ? `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-rose-500 text-white font-semibold"
                        : "text-gray-800 dark:text-gray-100 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                    }`
                  : `relative text-white hover:text-white/80 transition-colors duration-200 px-3 py-2 ${
                      isActive
                        ? "font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
                        : ""
                    }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        )
      ))}
    </>
  );

  // Framer Motion variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <nav className="w-full bg-gradient-to-r from-rose-600 to-rose-500 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="Blood Donation Home"
        >
          <motion.img
            src={logo}
            alt="Blood Donation Logo"
            className="h-10 w-7"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          />
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Blood Donation
          </span>
        </Link>

        {/* Center: Desktop Menu */}
        <ul className="hidden lg:flex gap-8 font-medium text-lg">{renderNavItems()}</ul>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="bg-white text-rose-500 hover:bg-rose-50 rounded-lg px-5 py-2 font-semibold transition-colors duration-200 shadow-md">
                  Login
                </button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <button className="bg-rose-700 text-white hover:bg-rose-800 rounded-lg px-5 py-2 font-semibold transition-colors duration-200 shadow-md">
                  Join as Donor
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full ring-2 ring-white ring-offset-2 ring-offset-rose-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-200 overflow-hidden"
                onClick={() => document.getElementById('user-dropdown').classList.toggle('hidden')}
                aria-label="User menu"
              >
                <img
                  src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"}
                  alt={`${user.displayName || "User"}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </button>
              
              <AnimatePresence>
                <motion.div
                  id="user-dropdown"
                  className="hidden absolute right-0 mt-3 w-56 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-rose-200 dark:border-rose-900 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="px-4 py-3 bg-rose-50 dark:bg-rose-900/30 border-b border-rose-200 dark:border-rose-900">
                    <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                    >
                      <FaTachometerAlt className="text-rose-500" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaSignOutAlt className="text-rose-500" />
                      )}
                      Logout
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#1a1a1a] shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-rose-500">Menu</h3>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-800 dark:text-gray-100 hover:text-rose-500 transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <ul className="space-y-2">
                  {renderNavItems(true)}
                </ul>

                <div className="border-t border-rose-200 dark:border-rose-900 my-4" />

                {!user ? (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-5 py-3 font-semibold transition-colors">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full bg-rose-700 text-white hover:bg-rose-800 rounded-lg px-5 py-3 font-semibold transition-colors">
                        Join as Donor
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="bg-rose-50 dark:bg-rose-900/30 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                      >
                        <FaTachometerAlt className="text-rose-500" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FaSignOutAlt className="text-rose-500" />
                        )}
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;