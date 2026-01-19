"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // 'success', 'error', or ''
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setLoading(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    }, 1000);
  };

  return (
    <section className="px-4 sm:px-8 py-16">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4 animate-bounce">📧</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Updated with Health Tips
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest healthcare news, medical tips, and exclusive offers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("");
                }}
                className="flex-1 px-5 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                placeholder="Enter your email address"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-center animate-fade-in">
                ✅ Successfully subscribed! Check your email.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-center animate-fade-in">
                ❌ Please enter a valid email address.
              </div>
            )}
          </form>

          <p className="text-xs text-blue-100 text-center mt-4">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
