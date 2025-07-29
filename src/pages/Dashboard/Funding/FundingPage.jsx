import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import FundPayment from "./FundPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../../shared/Loading";
import { motion } from "framer-motion";

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundingPage = () => {
  const axios = useAxios();

  const { data: fundings = [], isLoading, refetch } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axios.get("/fundings");
      return res.data.fundings || res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center mt-16">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-red-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          💰 All Funding Contributions
        </motion.h2>
        <motion.button
          className="btn btn-primary"
          onClick={() => document.getElementById("fundModal").showModal()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          ➕ Give Fund
        </motion.button>
      </div>

      {/* Funding Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="table table-zebra w-full">
          <thead className="bg-red-100 text-red-700">
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td className="font-semibold text-green-600">${f.amount}</td>
                <td>{new Date(f.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {fundings.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No fundings yet. Be the first to contribute!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stripe Payment Modal */}
      <dialog id="fundModal" className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4 text-center">Give a Fund</h3>
          <Elements stripe={stripePromise}>
            <FundPayment refetch={refetch} />
          </Elements>
        </div>
      </dialog>
    </motion.div>
  );
};

export default FundingPage;
