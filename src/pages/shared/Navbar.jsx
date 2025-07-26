import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const { user,auth, setLoading } = useAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setLoading(true);
                Swal.fire("Logged out", "success");
            })
            .catch(console.error);
    };

    const navItems = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700"}>
                Home </NavLink></li>
            <li><NavLink to="/donation-requests" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700"}>Donation Requests</NavLink></li>
            <li><NavLink to="/blogs">Blog</NavLink></li>
            <li><NavLink to="/search">Search Donors</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 px-4 shadow">
            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold">🩸 Blood Donation</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-sm btn-outline mr-2">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary">Join as Donor</Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost avatar">
                            <div className="w-8 rounded-full">
                                <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"} />
                            </div>
                        </div>
                        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
