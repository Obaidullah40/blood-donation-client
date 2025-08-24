import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const donors = [
  {
    id: 1,
    title: "John Doe",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Donated 10 times, saving countless lives in the community.",
  },
  {
    id: 2,
    title: "Jane Smith",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Regular O+ donor, always ready to help in emergencies.",
  },
  {
    id: 3,
    title: "Dr. Ahmed",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Volunteered in 15+ blood drives across the country.",
  },
];

export default function FeaturedDonorsSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Our Heroes: Featured Donors
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {donors.map(({ id, title, image, desc }) => (
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
                onClick={() => navigate("/donors")}
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