import React from "react";
// import "./Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutPayment from "./CheckoutPayment";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const UserPayment = () => {
  const location = useLocation();
  // console.log(location);
  const price = location?.state?.price;
  const cartItm = location?.state?.itemId;
  // console.log(price, cartItm);

  if (!price) {
    return <Navigate to="/dashboard/my-selected" />;
  }
  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckoutPayment price={price} cartItm={cartItm} />
      </Elements>
    </div>
  );
};

export default UserPayment;
