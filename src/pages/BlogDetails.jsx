import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
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

  if (isLoading) return <div className="text-center mt-8">
    <Loading />
  </div>;

  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <img src={blog.thumbnail} alt={blog.title} className="w-full rounded" />
      <h1 className="text-3xl font-bold text-red-600">{blog.title}</h1>
      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetails;
