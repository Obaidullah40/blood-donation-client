import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BAHSL from "../../assets/BeAHeroSaveLives.png";
import EDC from "../../assets/EveryDropCounts.png";
import TWSL from "../../assets/TogetherWeSaveLives.png";

const fallbackImage = "https://i.ibb.co/5Y3Xz0Z/fallback-blood-donation.jpg";

const slides = [
  {
    image: BAHSL,
    title: "Be a Hero. Save Lives.",
    subtitle: "Join our life-saving community or find a donor near you.",
  },
  {
    image: EDC,
    title: "Every Drop Counts",
    subtitle: "Your blood donation can make a difference today.",
  },
  {
    image: TWSL,
    title: "Together, We Save Lives",
    subtitle: "Connect with donors and recipients in your community.",
  },
];

const preloadImages = (slides, fallback) => {
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
    img.onerror = () => {
      slide.image = fallback;
    };
  });
};

const Banner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    preloadImages(slides, fallbackImage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] text-white bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 overflow-hidden">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image || fallbackImage})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 via-black/50 to-black/80 dark:from-black/40 dark:via-black/70 dark:to-black/90" />

                <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center h-full px-4 text-center">
                  <motion.h1
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-extrabold mb-4 text-white"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg md:text-xl mb-10 max-w-2xl text-gray-100"
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
                      className="px-6 py-3 rounded-lg font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Join as Donor
                    </button>
                    <button
                      onClick={() => navigate("/search")}
                      className="px-6 py-3 rounded-lg font-semibold text-rose-500 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Search Donors
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-rose-500 scale-110 shadow-md"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;