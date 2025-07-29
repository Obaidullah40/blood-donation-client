import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user, auth, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoading(true);
        Swal.fire("Logged out", "", "success");
        navigate("/");
      })
      .catch(console.error);
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-request"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : "text-gray-700"
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : "text-gray-700"
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : "text-gray-700"
          }
        >
          Search Donors
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
      {/* Left: Brand + Mobile menu */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Join as Donor</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold ml-2">
          🩸 Blood Donation
        </Link>
      </div>

      {/* Center: Desktop nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
      </div>

      {/* Right: Auth Buttons or Avatar */}
      <div className="navbar-end hidden lg:flex">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm btn-outline mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Join as Donor
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-ghost avatar tooltip tooltip-bottom"
              data-tip={user?.displayName || "User"}
            >
              <div className="w-8 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              {user?.displayName && (
                <li className="px-3 py-1 text-sm font-semibold text-gray-800">
                  {user.displayName}
                </li>
              )}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
