// src/pages/Public/Blogs.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "./shared/Loading";
import useAxios from "../hooks/useAxios";

const Blogs = () => {
  const axios = useAxios();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const res = await axios.get("/blogs?status=published");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-8">
    <Loading />
  </div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-red-600">Published Blogs 📝</h1>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 line-clamp-3 mt-2" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className="mt-4 text-right">
                <Link to={`/blogs/${blog._id}`} className="btn btn-sm btn-outline btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
