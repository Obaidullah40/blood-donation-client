import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const requests = [
  {
    id: 1,
    title: "Urgent A+ Blood Needed",
    image: "https://images.unsplash.com/photo-1576765607924-84f7b72c7a16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Patient in critical condition requires A+ blood in Dhaka.",
  },
  {
    id: 2,
    title: "B- Blood for Surgery",
    image: "https://images.unsplash.com/photo-1615461066159-fea09c7d9e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Help a child undergoing surgery by donating B- blood.",
  },
  {
    id: 3,
    title: "O+ Donors Needed",
    image: "https://images.unsplash.com/photo-1582719183514-2ffd9b4fb797?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    desc: "Multiple patients need O+ blood in Chittagong.",
  },
];

export default function RecentRequestsSection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-base-200">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-center mb-12 text-gray-900"
      >
        Recent Donation Requests
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {requests.map(({ id, title, image, desc }) => (
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
                onClick={() => navigate("/donation-request")}
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