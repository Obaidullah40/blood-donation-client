import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useRole from "../../../hooks/useRole";
import Loading from "../../shared/Loading";

const ContentManagement = () => {
  const axios = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const { role, loading } = useRole(); // ✅ Get role

  const fetchBlogs = async () => {
    const res = await axios.get(`/blogs?status=${filter}`);
    setBlogs(res.data);
  };

  useEffect(() => {
    if (!loading) {
      fetchBlogs();
    }
  }, [filter, loading]);

  const handleStatusChange = async (id, status) => {
    const res = await axios.patch(`/blogs/${id}`, { status });
    if (res.data.modifiedCount) {
      Swal.fire("Success", `Blog ${status} successfully`, "success");
      fetchBlogs();
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      const res = await axios.delete(`/blogs/${id}`);
      if (res.data.deletedCount) {
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
        fetchBlogs();
      }
    }
  };

  if (loading) return <div className="text-center mt-8">
    <Loading />
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Content Management 📝</h2>
        <Link
          to="/dashboard/content-management/add-blog"
          className="btn btn-primary"
        >
          ➕ Add Blog
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        <select
          className="select select-bordered w-fit"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="card bg-base-100 border border-gray-200 shadow-md"
          >
            <figure>
              <img src={blog.thumbnail} alt={blog.title} className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body space-y-2">
              <h3 className="card-title text-lg">{blog.title}</h3>
              <p className="text-xs text-gray-500">Status: {blog.status}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {/* ✅ Edit (all roles) */}
                <Link
                  to={`/dashboard/content-management/edit/${blog._id}`}
                  className="btn btn-sm btn-outline"
                >
                  ✏️ Edit
                </Link>

                {/* ✅ Admin-only actions */}
                {role === "admin" && (
                  <>
                    {blog.status === "draft" ? (
                      <button
                        onClick={() => handleStatusChange(blog._id, "published")}
                        className="btn btn-sm btn-success"
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(blog._id, "draft")}
                        className="btn btn-sm btn-warning"
                      >
                        Unpublish
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
