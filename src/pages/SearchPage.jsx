import { useState, useEffect } from "react";
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
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">🔍 Find Blood Donors</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
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
          <label className="label">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
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
          <label className="label">Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="select select-bordered w-full"
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
          className="btn bg-gradient-to-r from-red-500 to-red-700 text-white mt-2 col-span-1 md:col-span-2"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-8">
        {loading ? (
          <p className="text-center text-gray-600">Searching...</p>
        ) : donors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <div key={donor._id} className="card bg-base-100 shadow-md p-5 rounded-lg">
                <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
                <p><span className="font-semibold">Email:</span> {donor.email}</p>
                <p><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
                <p><span className="font-semibold">Location:</span> {donor.upazila}, {donor.district}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
