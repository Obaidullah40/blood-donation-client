import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";
import districts from '../assets/districts.json';
import upazilas from "../assets/upazilas.json";

const SearchPage = () => {
  const axios = useAxios();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const matched = districts.find(d => d.name === formData.district);
      if (matched) {
        const filtered = upazilas.filter(u => u.district_id === matched.id);
        setFilteredUpazilas(filtered);
      } else {
        setFilteredUpazilas([]);
      }
    } else {
      setFilteredUpazilas([]);
    }
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("/search-donors", {
        params: {
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
        },
      });
      setDonors(res.data || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] dark:bg-[#0f0f0f] transition-colors duration-500 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-rose-200 dark:border-rose-900"
        >
          <h2 className="text-3xl font-extrabold text-center mb-8 text-rose-500">
            🔍 Find Blood Donors
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                required
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                required
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                Upazila
              </label>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 border border-rose-200 dark:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                required
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-rose-500 text-white hover:bg-rose-600 rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-colors duration-200 md:col-span-2"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          {loading ? (
            <p className="text-center text-gray-800 dark:text-gray-300 text-lg">Searching...</p>
          ) : donors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donors.map((donor, index) => (
                <motion.div
                  key={donor._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1a1a1a] shadow-md rounded-xl p-6 border border-rose-200 dark:border-rose-900 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-rose-500 mb-3">{donor.name}</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Email:</span> {donor.email}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Blood Group:</span> {donor.bloodGroup}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">Location:</span> {donor.upazila}, {donor.district}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300 text-lg">No donors found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;