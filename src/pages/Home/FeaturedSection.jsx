import { FaHandsHelping, FaTint, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const features = [
  {
    id: 1,
    icon: <FaHandsHelping className="text-red-600 w-12 h-12" />,
    title: "Connect Donors & Recipients",
    image: "https://images.unsplash.com/photo-1615461066159-fea09c7d9e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Easily find and connect donors with those in need of blood in your community.",
  },
  {
    id: 2,
    icon: <FaTint className="text-red-600 w-12 h-12" />,
    title: "Manage Blood Donations",
    image: "https://images.unsplash.com/photo-1576765607924-84f7b72c7a16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Create, track, and update blood donation requests with real-time status updates.",
  },
  {
    id: 3,
    icon: <FaUsers className="text-red-600 w-12 h-12" />,
    title: "Role-Based Access",
    image: "https://images.unsplash.com/photo-1582719183514-2ffd9b4fb797?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Secure platform supporting admins, donors, and volunteers with custom permissions.",
  },
];

export default function FeaturedSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Why Choose Our Blood Donation Platform?
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ id, icon, title, image, desc }) => (
          <motion.div
            key={id}
            className="card bg-base-100 shadow-xl rounded-lg overflow-hidden h-[400px] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: id * 0.2 }}
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-2">
                {icon}
                <h3 className="text-xl font-semibold text-red-700">{title}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{desc}</p>
              <button
                className="btn btn-outline btn-primary mt-4"
                onClick={() => navigate("/about")}
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