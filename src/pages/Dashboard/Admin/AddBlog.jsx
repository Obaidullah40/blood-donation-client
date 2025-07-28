// src/pages/Dashboard/AddBlog.jsx

import { useForm } from "react-hook-form";
import { useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const imageBB_API = import.meta.env.VITE_image_upload_key; 

const AddBlog = () => {
  const axios = useAxios();
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // 🌀 Show uploading spinner
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while we upload your blog",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // 📷 Upload image to imgBB
      const formData = new FormData();
      formData.append("image", data.thumbnail[0]);

      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imageBB_API}`, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) {
        Swal.fire("❌ Error", "Image upload failed", "error");
        return;
      }

      const thumbnailURL = imgData.data.url;

      // 📝 Construct blog object
      const blog = {
        title: data.title,
        thumbnail: thumbnailURL,
        content,
        status: "draft", // default
        createdAt: new Date(),
      };

      // ✅ Send to server
      const res = await axios.post("/blogs", blog);

      if (res.data.insertedId) {
        Swal.fire("🎉 Created!", "Your blog has been successfully created.", "success");
        reset();
        setContent("");
      } else {
        Swal.fire("❌ Error", "Blog creation failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">➕ Add New Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🔤 Blog Title */}
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="input input-bordered w-full"
        />

        {/* 📷 Thumbnail Upload */}
        <input
          type="file"
          {...register("thumbnail", { required: true })}
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />

        {/* ✍️ Jodit Rich Text Editor */}
        <JoditEditor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        {/* ✅ Submit */}
        <button type="submit" className="btn btn-primary w-full">
          📝 Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
