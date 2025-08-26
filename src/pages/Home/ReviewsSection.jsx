import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";

// Framer Motion variants for animations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function TestimonialsSection() {
  const navigate = useNavigate();
  const [imageOpacity, setImageOpacity] = useState(1); // Default: fully visible

  const testimonials = [
    {
      image: "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/6d0d06ce-e8a5-434e-a633-a4893841b6a3/2022-08-10-Trinet-Henderson-Tiara-1485.jpg",
      title: "Life-Saving Platform",
      desc: "This platform connected me with a donor in hours. Truly amazing!",
      author: "Sarah M.",
    },
    {
      image: "https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ=",
      title: "Easy to Use",
      desc: "The interface is user-friendly, and I could request blood easily.",
      author: "John K.",
    },
    {
      image: "https://heroshotphotography.com/wp-content/uploads/2023/04/Hero-Shot-Photography-1982-682x1024.jpeg",
      title: "Community Impact",
      desc: "I’ve donated multiple times through this platform. It’s impactful!",
      author: "Dr. Rahman",
    },
  ];

  const toggleImageVisibility = () => {
    setImageOpacity((prev) => (prev === 1 ? 0.5 : prev === 0.5 ? 0 : 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-rose-500"
      >
        What Our Users Say
      </motion.h2>

      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-4 py-2 font-semibold"
          onClick={toggleImageVisibility}
        >
          {imageOpacity === 1 ? "Half Visible" : imageOpacity === 0.5 ? "Hide Images" : "Show Images"}
        </button>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-2 border flex flex-col text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.title}
              className="w-24 h-24 mx-auto rounded-full object-cover"
              style={{ opacity: imageOpacity }}
            />
            <h3 className="text-xl font-semibold text-rose-500">{testimonial.title}</h3>
            <p className="text-gray-800 dark:text-white flex-grow">{testimonial.desc}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">— {testimonial.author}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          className="btn bg-rose-500 text-white hover:bg-rose-400 border-none rounded-md px-6 py-3 font-semibold"
          onClick={() => navigate("/register")}
        >
          Become a Donor
        </button>
      </motion.div>
    </section>
  );
}