import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Components/Redux/Store/Store.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise  = loadStripe(`${import.meta.env.VITE_API_STRIPE_KEY}`);

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <Elements stripe={stripePromise}>
    <App />
    </Elements>
  </Provider>
);
