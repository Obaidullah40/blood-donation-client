const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Mission */}
        <div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-rose-400 mb-2">🩸 BloodConnect</h2>
          <p className="text-sm">
            A platform to connect lives through blood donation.
            <br /> Made with ❤️ using the MERN stack.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-red-500 dark:text-rose-400 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-red-500 dark:hover:text-rose-300 transition-all" href="/">Home</a>
            </li>
            <li>
              <a className="hover:text-red-500 dark:hover:text-rose-300 transition-all" href="/donation-requests">Donation Requests</a>
            </li>
            <li>
              <a className="hover:text-red-500 dark:hover:text-rose-300 transition-all" href="/blogs">Blog</a>
            </li>
            <li>
              <a className="hover:text-red-500 dark:hover:text-rose-300 transition-all" href="/search">Search Donors</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-red-500 dark:text-rose-400 mb-3">Contact Us</h3>
          <p className="text-sm">
            Email: <a href="mailto:help@bloodconnect.com" className="text-red-600 dark:text-rose-300">help@bloodconnect.com</a><br />
            Phone: <span className="text-red-600 dark:text-rose-300">+880 1234-567890</span><br />
            Address: Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
