import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import FundPayment from "./FundPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const FundingPage = () => {
    const axios = useAxios();

    const { data: fundings = [] } = useQuery({
        queryKey: ["fundings"],
        queryFn: async () => {
            const res = await axios.get("/fundings");
            return res.data.fundings || res.data; // support both types
        },
    });

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">💰 All Fundings</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => document.getElementById("fundModal").showModal()}
                >
                    ➕ Give Fund
                </button>
            </div>

            {/* Funding Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundings.map((f) => (
                            <tr key={f._id}>
                                <td>{f.name}</td>
                                <td>{f.email}</td>
                                <td>${f.amount}</td>
                                <td>{new Date(f.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal with Stripe <Elements> wrapper */}
            <dialog id="fundModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Give a Fund</h3>
                    <Elements stripe={stripePromise}>
                        <FundPayment />
                    </Elements>
                </div>
            </dialog>
        </div>
    );
};

export default FundingPage;
