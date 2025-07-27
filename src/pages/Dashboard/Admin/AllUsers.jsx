import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEllipsisV } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const AllUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

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

  const handleUpdate = async (id, updates) => {
    try {
      await axios.patch(`/users/${id}`, updates);
      fetchUsers();
      Swal.fire("Success", "User updated", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update user", "error");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Filter Tabs */}
      <div className="tabs mb-4">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={`tab tab-bordered ${
              statusFilter === status ? "tab-active" : ""
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <img
                    src={
                    u.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                  }
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn btn-ghost btn-xs"
                      title="Actions"
                    >
                      <FaEllipsisV />
                    </button>
                    <ul className="dropdown-content menu shadow bg-base-100 rounded-box w-48 z-10">
                      {u.status === "active" && (
                        <li>
                          <button onClick={() => handleUpdate(u._id, { status: "blocked" })}>
                            Block
                          </button>
                        </li>
                      )}
                      {u.status === "blocked" && (
                        <li>
                          <button onClick={() => handleUpdate(u._id, { status: "active" })}>
                            Unblock
                          </button>
                        </li>
                      )}
                      {u.role !== "volunteer" && (
                        <li>
                          <button onClick={() => handleUpdate(u._id, { role: "volunteer" })}>
                            Make Volunteer
                          </button>
                        </li>
                      )}
                      {u.role !== "admin" && (
                        <li>
                          <button onClick={() => handleUpdate(u._id, { role: "admin" })}>
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
