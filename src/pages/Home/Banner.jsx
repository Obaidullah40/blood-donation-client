import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Sample high-quality images (16:9 aspect ratio, 1920x1080 or higher)
const slides = [
  {
    image: "https://images.unsplash.com/photo-1615461066159-fea09c7d9e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Be a Hero. Save Lives.",
    subtitle: "Join our life-saving community or find a donor near you.",
  },
  {
    image: "https://images.unsplash.com/photo-1576765607924-84f7b72c7a16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Every Drop Counts",
    subtitle: "Your blood donation can make a difference today.",
  },
  {
    image: "https://images.unsplash.com/photo-1582719183514-2ffd9b4fb797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Together, We Save Lives",
    subtitle: "Connect with donors and recipients in your community.",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] text-white overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center h-full px-4 text-center">
                <motion.h1
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-extrabold mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg md:text-xl mb-10"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <button
                    onClick={() => navigate("/register")}
                    className="btn btn-primary text-white font-semibold py-2 px-6 rounded-full"
                  >
                    Join as Donor
                  </button>
                  <button
                    onClick={() => navigate("/search")}
                    className="btn btn-secondary text-white font-semibold py-2 px-6 rounded-full"
                  >
                    Search Donors
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
      {/* Slider Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;