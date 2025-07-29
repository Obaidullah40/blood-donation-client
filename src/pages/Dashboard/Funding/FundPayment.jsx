import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useUserData from "../../../hooks/useUserData";
import useAxios from "../../../hooks/useAxios";


const FundPayment = ({ refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxios();
  const { userData } = useUserData();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      // 1. Get clientSecret from server
      const { data } = await axios.post("/create-payment-intent", { amount });
      const clientSecret = data.clientSecret;

      // 2. Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userData?.name || "Anonymous",
            email: userData?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Save to database
        const paymentData = {
          email: userData?.email,
          name: userData?.name,
          amount: parseFloat(amount),
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        await axios.post("/fundings", paymentData);
        setSuccess(true);

        // ✅ Close the modal after successful payment
        document.getElementById("fundModal").close();
         refetch();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="number"
        placeholder="Enter Amount (USD)"
        className="input input-bordered w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <CardElement className="p-4 border rounded" />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600 font-semibold">Payment successful!</p>}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Donate"}
      </button>
    </form>
  );
};

export default FundPayment;
