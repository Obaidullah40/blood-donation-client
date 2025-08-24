import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    title: "Life-Saving Platform",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "This platform connected me with a donor in hours. Truly amazing!",
    author: "Sarah M.",
  },
  {
    id: 2,
    title: "Easy to Use",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "The interface is user-friendly, and I could request blood easily.",
    author: "John K.",
  },
  {
    id: 3,
    title: "Community Impact",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "I’ve donated multiple times through this platform. It’s impactful!",
    author: "Dr. Rahman",
  },
];

export default function ReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-base-200">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        What Our Users Say
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map(({ id, title, image, desc, author }) => (
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
              <p className="text-sm text-gray-500 mt-2">— {author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}