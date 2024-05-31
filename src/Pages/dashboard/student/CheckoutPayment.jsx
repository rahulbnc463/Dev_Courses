import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js";
import UseSecurity from "../../../hooks/UseSecurity";
import UseUser from "../../../hooks/UseUser";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CheckoutPayment = ({ price, cartItm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseSecurity();
  const { currentUser, isLoading } = UseUser();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // const URL = ;

  if (price < 0 || !price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure
        .get(`/api/cart-data/user/${currentUser.email}`)
        .then((res) => {
          const classesId = res.data.map((item) => item._id);
          setCart(classesId);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setMessage(error.message);
      return;
    }
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "Unspecified",
            email: currentUser?.email || "Unspecified",
          },
        },
      });
    if (paymentError) {
      console.log("Payment error:", paymentError.message);
      setMessage(paymentError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        // setSucceeded(true);
        const transactionId = paymentIntent.id;
        const paymentData = {
          transactionId,
          paymentMethod: paymentIntent.payment_method,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          paymentStatus: paymentIntent.status,
          userName: currentUser?.name,
          userEmail: currentUser?.email,
          classesId: cartItm ? [cartItm] : cart,
          date: new Date(),
        };
        console.log(paymentData);
        const url = cartItm
          ? `https://dev-courses-rahul-server.onrender.com/api/payment-info?classesId=${cartItm}`
          : `https://dev-courses-rahul-server.onrender.com/api/payment-info`;

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(paymentData),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("Payment result:", res);
            if (
              res.deletedResult.deletedCount > 0 &&
              res.paymentResult.insertedId &&
              res.updateResult.modifiedCount > 0
            ) {
              setSucceeded(true);
              navigate("/dashboard/enrolled-class", { replace: true });
            } else {
              setSucceeded(false);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment Amount: <span className="text-secondary">${price}</span>
        </h1>
      </div>
      <div className="flex items-center justify-center flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg m-5 shadow-md"
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !stripe || !clientSecret}
            className={`mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            Pay
          </button>
        </form>
        {message && <p className="text-red-500">{message}</p>}
        {succeeded && (
          <p className="text-green-500">
            Payment Successful, You can now access your classes
          </p>
        )}
      </div>
    </>
  );
};

export default CheckoutPayment;
