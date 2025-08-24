import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const stories = [
  {
    id: 1,
    title: "Saved a Child’s Life",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Thanks to our donors, a young girl received the blood she needed for surgery.",
  },
  {
    id: 2,
    title: "Emergency Response",
    image: "https://images.unsplash.com/photo-1516841273335-e39b378f1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Quick donor response saved a patient in a car accident.",
  },
  {
    id: 3,
    title: "Community Effort",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e28f37f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "A blood drive rallied 50+ donors to help local hospitals.",
  },
];

export default function SuccessStoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-base-200">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Success Stories
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(({ id, title, image, desc }) => (
          <motion.div
            key={id}
            className="card bg-base-100 shadow-xl rounded-lg overflow-hidden h-[400px] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: id * 0.2 }}
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-red-700 mb-2">{title}</h3>
              <p className="text-gray-600 flex-grow">{desc}</p>
              <button
                className="btn btn-outline btn-primary mt-4"
                onClick={() => navigate("/stories")}
              >
                See More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}