import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/blood.webp";
import { useState } from "react";
import { FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion

// Define nav items (Dashboard removed from main nav)
const navItems = [
  { to: "/", label: "Home" },
  { to: "/donation-request", label: "Donation Requests" },
  { to: "/blogs", label: "Blog" },
  { to: "/search", label: "Search Donors", auth: true },
];

// Reusable Button component with DaisyUI
const Button = ({ children, onClick, className, disabled }) => (
  <button
    className={`btn btn-sm bg-white text-rose-600 hover:bg-rose-100 transition-colors duration-300 font-semibold capitalize ${className} ${
      disabled ? "btn-disabled" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

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

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        (!item.auth || user) && (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `relative text-white/90 hover:text-white transition-colors duration-200 px-3 py-2 ${
                  isActive
                    ? "font-semibold text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-all"
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

  // Framer Motion variants for dropdown and mobile menu
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <nav className="w-full bg-gradient-to-r from-rose-600 to-rose-400 sticky top-0 z-50 shadow-lg">
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
            whileHover={{ scale: 1.05 }}
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
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-rose-100 text-rose-700 hover:bg-white">
                  Join as Donor
                </Button>
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="User menu"
              >
                <div className="w-10 rounded-full ring ring-white ring-offset-2">
                  <img
                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"}
                    alt={`${user.displayName || "User"}'s avatar`}
                  />
                </div>
              </label>
              <AnimatePresence>
                <motion.ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-box w-52"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <li className="font-semibold text-gray-700 px-3 py-2">
                    {user.displayName || "User"}
                  </li>
                  <div className="divider my-1" />
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-2"
                    >
                      {isLoggingOut ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaSignOutAlt />
                      )}
                      Logout
                    </button>
                  </li>
                </motion.ul>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost text-white focus:outline-none focus:ring-2 focus:ring-white"
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
          </label>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.ul
                className="lg:hidden menu menu-sm dropdown-content mt-3 p-4 shadow-lg bg-base-100 rounded-box w-64 absolute right-4 top-16"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {renderNavItems()}
                <div className="divider my-1" />
                {!user ? (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register" className="text-rose-600 font-semibold">
                        Join as Donor
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <FaTachometerAlt /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2"
                      >
                        {isLoggingOut ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <FaSignOutAlt />
                        )}
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;