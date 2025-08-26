import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";

// Framer Motion variants for animations
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AllUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  // fetch users for page / filter
  const fetchUsers = async () => {
    const res = await axios.get(
      `/users?status=${statusFilter}&page=${page}&limit=${limit}`
    );
    setUsers(res.data.users);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, page]);

  // ✅ Optimistic Update (without refetching whole list)
  const handleUpdate = async (id, updates) => {
    const prevUsers = [...users];

    // optimistic update: update UI instantly
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, ...updates } : u))
    );

    try {
      await axios.patch(`/users/${id}`, updates);
      Swal.fire("Success", "User updated", "success");
    } catch (err) {
      console.error(err);
      // rollback if error
      setUsers(prevUsers);
      Swal.fire("Error", "Could not update user", "error");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-4 text-rose-500 text-center"
      >
        All Users
      </motion.h2>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-4 space-x-2">
        {["all", "active", "blocked"].map((status) => (
          <motion.button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-md font-semibold ${
              statusFilter === status
                ? "bg-rose-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-rose-400 hover:text-white"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-rose-500 text-white">
              <th className="p-2">Avatar</th>
              <th className="p-2">Email</th>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <motion.tr
                key={u._id}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-2 border dark:border-gray-600">
                  <img
                    src={
                      u.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                    }
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2 border dark:border-gray-600">{u.email}</td>
                <td className="p-2 border dark:border-gray-600">{u.name}</td>
                <td className="p-2 border dark:border-gray-600">{u.role}</td>
                <td className="p-2 border dark:border-gray-600">{u.status}</td>
                <td className="p-2 border dark:border-gray-600">
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-2 py-1 font-semibold"
                      title="Actions"
                    >
                      <FaEllipsisV />
                    </button>
                    <ul className="dropdown-content menu shadow bg-white dark:bg-gray-800 rounded-box w-48 z-10 text-gray-800 dark:text-white">
                      {u.status === "active" && (
                        <li>
                          <button
                            onClick={() =>
                              handleUpdate(u._id, { status: "blocked" })
                            }
                          >
                            Block
                          </button>
                        </li>
                      )}
                      {u.status === "blocked" && (
                        <li>
                          <button
                            onClick={() =>
                              handleUpdate(u._id, { status: "active" })
                            }
                          >
                            Unblock
                          </button>
                        </li>
                      )}
                      {u.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() =>
                              handleUpdate(u._id, { role: "volunteer" })
                            }
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}
                      {u.role !== "admin" && (
                        <li>
                          <button
                            onClick={() =>
                              handleUpdate(u._id, { role: "admin" })
                            }
                          >
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            className={`px-4 py-2 rounded-md font-semibold ${
              page === i + 1
                ? "bg-rose-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-rose-400 hover:text-white"
            }`}
            onClick={() => setPage(i + 1)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
