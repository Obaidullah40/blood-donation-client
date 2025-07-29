import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/blood.webp";

const Navbar = () => {
  const { user, logOut, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged out", "", "success");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Logout Failed", error.message, "error");
      });
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
    <div className="navbar bg-white shadow-md px-4 lg:px-12 py-3 sticky top-0 z-50">
      {/* Left: Brand */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Blood Donation" className="w-6 h-8" />
          <span className="text-xl font-bold text-red-600">Blood Donation</span>
        </Link>
      </div>

      {/* Center: Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 font-medium">{navItems}</ul>
      </div>

      {/* Right: Auth Section */}
      <div className="navbar-end">
        {/* Mobile menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
            <div className="divider my-1" />
            {!user ? (
              <>
                <li>
                  <Link to="/login" className="text-sm">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-sm">Join as Donor</Link>
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

        {/* Desktop Auth Buttons / Avatar */}
        {!user ? (
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Join as Donor</Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end hidden lg:flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              data-tip={user?.displayName || "User"}
            >
              <div className="w-9 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="text-sm px-3 py-1 text-gray-700">
                {user.displayName || "User"}
              </li>
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
