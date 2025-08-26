import { motion } from "framer-motion";

const Loading = () => {
  // Animation variants for blood bag fill effect
  const fillVariants = {
    fill: {
      y: [20, 0, 20], // Moves fill from bottom to top and back
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blood bag outline */}
            <path
              d="M6 2H18V6H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6H6V2Z"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="1.5"
            />
            {/* Tube at top */}
            <path
              d="M10 2V4H14V2"
              stroke="#F43F5E"
              strokeWidth="1.5"
            />
            {/* Blood fill (animated) */}
            <motion.rect
              x="6"
              y="6"
              width="12"
              height="14"
              fill="#F43F5E"
              variants={fillVariants}
              animate="fill"
            />
          </svg>
        </motion.div>
        <p className="text-rose-500 font-semibold text-lg">Saving Lives, One Drop at a Time...</p>
      </div>
    </div>
  );
};

export default Loading;