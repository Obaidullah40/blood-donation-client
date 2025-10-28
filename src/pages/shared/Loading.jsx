import { motion } from "framer-motion";

const Loading = () => {
  // Animation variants for blood bag fill effect
  const fillVariants = {
    fill: {
      y: [20, 0, 20],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Drop animation variants
  const dropVariants = {
    fall: {
      y: [0, 20],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeIn",
      },
    },
  };

  // Pulse animation for blood bag
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="flex flex-col items-center space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          variants={pulseVariants}
          animate="pulse"
          className="relative"
        >
          <svg
            width="80"
            height="80"
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tube at top */}
            <path
              d="M10 2V4H14V2"
              stroke="#F43F5E"
              strokeWidth="1.5"
              strokeLinecap="round"
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
              rx="1"
            />
            {/* Plus symbol on bag */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <rect
                x="11"
                y="12"
                width="2"
                height="6"
                fill="white"
                rx="0.5"
              />
              <rect
                x="9"
                y="14"
                width="6"
                height="2"
                fill="white"
                rx="0.5"
              />
            </motion.g>
          </svg>

          {/* Animated blood drops */}
          <motion.div
            variants={dropVariants}
            animate="fall"
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          >
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path
                d="M6 0C6 0 0 6 0 10C0 13.3137 2.68629 16 6 16C9.31371 16 12 13.3137 12 10C12 6 6 0 6 0Z"
                fill="#F43F5E"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-2"
        >
          <p className="text-rose-500 font-semibold text-lg">
            Saving Lives, One Drop at a Time...
          </p>
          
          {/* Loading dots */}
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-rose-500 rounded-full"
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;