import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";
import Loading from "./shared/Loading";

const BlogDetails = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`/blogs/${id}`);
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

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 flex items-center justify-center">
        <p className="text-center text-rose-500 text-xl font-semibold">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-rose-200 dark:border-rose-900 overflow-hidden"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        
        <div className="p-6 md:p-8 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-extrabold text-rose-500"
          >
            {blog.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none text-gray-800 dark:text-gray-300 leading-relaxed
                       prose-headings:text-rose-500 dark:prose-headings:text-rose-400
                       prose-a:text-rose-500 dark:prose-a:text-rose-400
                       prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                       prose-code:text-rose-600 dark:prose-code:text-rose-400
                       prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800
                       prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetails;