"use client";

import { useState } from "react";

export default function RazorpayPayment({ amount = 500, appointmentId = null, onSuccess = null, onFailure = null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initiatePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Step 1: Create Razorpay Order
      const orderRes = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: appointmentId ? `apt_${appointmentId}` : `order_${Date.now()}`,
          notes: {
            appointmentId: appointmentId || "N/A",
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Step 2: Load Razorpay Checkout Script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5MMOk78R9X2",
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Medicare Hospital",
          description: `Payment for Appointment`,
          image: "/img/logo.png", // Optional: add your logo
          order_id: orderData.order_id,
          handler: async (response) => {
            // Step 3: Verify Payment
            try {
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                console.log("✅ Payment successful:", response.razorpay_payment_id);
                if (onSuccess) onSuccess(response.razorpay_payment_id);
                alert("Payment Successful! Your appointment is confirmed.");
              } else {
                throw new Error("Payment verification failed");
              }
            } catch (err) {
              console.error("Verification error:", err);
              setError("Payment verification failed. Please contact support.");
              if (onFailure) onFailure(err.message);
            }
          },
          prefill: {
            name: "Patient Name",
            email: "patient@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#2563eb",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError(err.message || "Failed to initiate payment");
      if (onFailure) onFailure(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={initiatePayment}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? "Processing..." : `Pay ₹${amount} with Razorpay`}
      </button>
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          ❌ {error}
        </div>
      )}
      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
}
