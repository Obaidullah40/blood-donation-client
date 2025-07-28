import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [content, setContent] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const imageKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

  // ✅ Load existing blog data
  useEffect(() => {
    axiosSecure.get(`/blogs/${id}`).then((res) => {
      const blog = res.data;
      setExistingImage(blog.thumbnail);
      setContent(blog.content);
      reset({
        title: blog.title,
      });
    });
  }, [id, axiosSecure, reset]);

  // ✅ Submit updated data
  const onSubmit = async (data) => {
    let imageURL = existingImage;

    
    if (data.thumbnail?.[0]) {
      const formData = new FormData();
      formData.append("image", data.thumbnail[0]);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageKey}`,
        formData
      );
      imageURL = res.data.data.url;
    }

    const updated = {
      title: data.title,
      content,
      thumbnail: imageURL,
    };

    const res = await axiosSecure.patch(`/blogs/${id}`, updated);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated", "Blog updated successfully", "success");
      navigate("/dashboard/content-management");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">✏️ Edit Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="input input-bordered w-full"
        />

        {/* Thumbnail Upload */}
        <div>
          <label className="label">Thumbnail Image</label>
          <input
            type="file"
            {...register("thumbnail")}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {existingImage && (
            <img
              src={existingImage}
              alt="Current thumbnail"
              className="mt-2 h-32 rounded shadow"
            />
          )}
        </div>

        {/* Content Editor */}
        <JoditEditor value={content} onChange={(v) => setContent(v)} />

        <button className="btn btn-primary w-full mt-4">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
