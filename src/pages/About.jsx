import { motion } from "framer-motion";
import { Link } from "react-router";

// Enhanced Framer Motion variants for animations
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-br from-rose-50 to-red-100 dark:from-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white"
            variants={sectionVariants}
          >
            About{" "}
            <span className="text-rose-500 bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
              BloodConnect
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
            variants={sectionVariants}
          >
            Connecting lives through blood donation. Our mission is to make blood donation 
            seamless, accessible, and impactful for communities in need.
          </motion.p>
          
          <motion.div variants={sectionVariants}>
            <Link
              to="/donation-request"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Involved Today
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-6">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto text-center leading-relaxed"
            variants={sectionVariants}
          >
            BloodConnect is dedicated to bridging the gap between blood donors and recipients. 
            Built with the latest technologies, our platform empowers donors, volunteers, and 
            administrators to save lives by facilitating blood donation requests, donor searches, 
            and community engagement. We believe that every drop counts and every life matters.
          </motion.p>
        </div>
      </motion.section>

      {/* Impact Section (Cards) */}
      <motion.section
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-6">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {/* Card 1 */}
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-rose-500 mb-4 text-center">Lives Saved</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                Thousands of lives have been saved through our platform by connecting 
                generous donors with those in critical need of blood transfusions.
              </p>
              <div className="text-center">
                <Link
                  to="/donation-request"
                  className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors duration-300"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-rose-500 mb-4 text-center">Community Engagement</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                Our volunteers and donors form a strong, compassionate community 
                dedicated to making a meaningful difference in people's lives.
              </p>
              <div className="text-center">
                <Link
                  to="/blogs"
                  className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors duration-300"
                >
                  Read Stories
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-rose-500 mb-4 text-center">Accessible Platform</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                Our user-friendly platform ensures anyone can register, donate, 
                or request blood easily with just a few simple clicks.
              </p>
              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors duration-300"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {[
              { number: "10,000+", label: "Lives Saved", icon: "❤️" },
              { number: "5,000+", label: "Active Donors", icon: "🩸" },
              { number: "50+", label: "Cities Covered", icon: "🏙️" },
              { number: "24/7", label: "Support Available", icon: "🕒" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={cardVariants}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-rose-500 to-red-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            variants={sectionVariants}
          >
            Join the BloodConnect Community
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={sectionVariants}
          >
            Become a donor or volunteer today and help save lives. Every contribution matters, 
            and together we can make a lasting impact on our communities.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={buttonVariants}
          >
            <Link
              to="/register"
              className="bg-white text-rose-500 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up as Donor
            </Link>
            <Link
              to="/donation-request"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-rose-500 font-bold px-8 py-4 rounded-full transition-colors duration-300"
            >
              Request Blood
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;