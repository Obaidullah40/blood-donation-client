// src/pages/Public/Blogs.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loading from "./shared/Loading";
import useAxios from "../hooks/useAxios";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Blogs = () => {
  const axios = useAxios();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const res = await axios.get("/blogs?status=published");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-rose-500"
        >
          Published Blogs 📝
        </motion.h1>

        {blogs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-700 dark:text-gray-300 text-lg"
          >
            No blogs found.
          </motion.p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-[#1a1a1a] border border-rose-200 dark:border-rose-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-rose-500 mb-3">
                  {blog.title}
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="mt-4 text-right">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-block px-5 py-2 rounded-lg border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white font-medium transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;