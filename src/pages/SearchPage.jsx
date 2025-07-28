import { useState } from "react";
import useAxios from "../hooks/useAxios";

const SearchPage = () => {
  const axios = useAxios();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("/search-donors", {
        params: {
          ...formData,
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">🔍 Find Blood Donors</h2>

      <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4">
        {/* Blood Group */}
        <select
          name="bloodGroup"
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="">Select District</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Rajshahi">Rajshahi</option>
          {/* Add more */}
        </select>

        {/* Upazila */}
        <select
          name="upazila"
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="">Select Upazila</option>
          <option value="Dhanmondi">Dhanmondi</option>
          <option value="Mirpur">Mirpur</option>
          <option value="Kotwali">Kotwali</option>
          {/* Add more */}
        </select>

        <button type="submit" className="btn btn-primary col-span-full md:col-span-3">
          Search
        </button>
      </form>

      {/* Donor Results */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : donors.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {donors.map((donor) => (
              <div key={donor._id} className="card bg-base-100 shadow p-4">
                <h3 className="text-xl font-bold">{donor.name}</h3>
                <p>Email: {donor.email}</p>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  Location: {donor.upazila}, {donor.district}
                </p>
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
