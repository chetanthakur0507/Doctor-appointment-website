"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const RazorpayPayment = dynamic(() => import("@/components/RazorpayPayment"), { ssr: false });

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const router = useRouter();

  // Department color mappings
  const departmentColors = {
    "cardiology": { color: "from-red-500 to-pink-500", icon: "🫀" },
    "neurology": { color: "from-purple-500 to-indigo-500", icon: "🧠" },
    "orthopedics": { color: "from-blue-500 to-cyan-500", icon: "🦴" },
    "dermatology": { color: "from-yellow-500 to-orange-500", icon: "💆" },
    "gastroenterology": { color: "from-green-500 to-emerald-500", icon: "🍽️" },
    "pediatrics": { color: "from-pink-500 to-rose-500", icon: "👶" },
    "oncology": { color: "from-indigo-500 to-purple-500", icon: "💊" },
    "pulmonology": { color: "from-cyan-500 to-blue-500", icon: "🫁" },
  };

  const getColorForDept = (deptName) => {
    const key = deptName.toLowerCase().replace(/\s+/g, "");
    return departmentColors[key] || { color: "from-blue-500 to-cyan-500", icon: "👨‍⚕️" };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchDoctors();
  }, [router]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.doctorId || !formData.date || !formData.time) {
      setError("Please fill all required fields");
      return;
    }

    // Validate date (no past dates)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("❌ Cannot book appointment for past dates. Please select today or a future date.");
      return;
    }

    // Check for duplicate bookings
    try {
      const token = localStorage.getItem("token");
      const checkRes = await fetch("/api/appointments?checkDuplicate=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: formData.doctorId,
          date: formData.date,
          time: formData.time,
        }),
      });

      const checkData = await checkRes.json();
      if (!checkRes.ok || checkData.isDuplicate) {
        setError("❌ This time slot with this doctor is already booked. Please choose another time or date.");
        return;
      }
    } catch (err) {
      console.log("Could not check duplicates, proceeding anyway");
    }

    // Store appointment data and show payment
    setAppointmentData(formData);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...appointmentData,
          paymentId,
          paymentStatus: "completed",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to book appointment");
        return;
      }

      setSuccess("✅ Appointment booked successfully! Redirecting...");
      setShowPayment(false);
      setTimeout(() => {
        router.push("/user/dashboard");
      }, 2000);
    } catch (error) {
      setError("Appointment booking failed after payment. Please contact support.");
      console.error("Error booking appointment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentFailure = (errorMsg) => {
    setError(`Payment failed: ${errorMsg}. Please try again.`);
    setShowPayment(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading doctors...</p>
        </div>
      </div>
    );
  }

  const selectedDoctor = doctors.find((d) => d._id === formData.doctorId);
  const deptColor = selectedDoctor ? getColorForDept(selectedDoctor.department) : null;
  const appointmentFee = selectedDoctor?.fees || 500; // Use doctor's fee or default 500

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-lg text-blue-100">Schedule a consultation with our expert doctors</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/user/dashboard" 
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold mb-8 flex items-center gap-2 transition"
          >
            ← Back to Dashboard
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500  px-8 py-8">
              <h2 className="text-2xl font-bold text-white">Schedule Your Consultation</h2>
              <p className="text-blue-100 mt-2">Fill in the details below to book your appointment</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 animate-fade-in-up flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 animate-fade-in-up flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Doctor Fee Display */}
              {selectedDoctor && (
                <div className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded-lg animate-fade-in-up mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Selected Doctor:</span> Dr. {selectedDoctor.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-bold">Consultation Fee:</span> ₹{selectedDoctor.fees}
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">₹{selectedDoctor.fees}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Doctor Selection */}
                <div className="animate-fade-in-up animation-delay-100">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Select Doctor <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all bg-white"
                    required
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        Dr. {doctor.name} - {doctor.department} (₹{doctor.fees})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Preview Card */}
                {selectedDoctor && (
                  <div className={`bg-gradient-to-r ${deptColor.color} rounded-xl p-6 text-white shadow-lg animate-fade-in-up animation-delay-100 transform hover:scale-105 transition-transform`}>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{deptColor.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">Dr. {selectedDoctor.name}</h3>
                        <div className="space-y-2 text-sm font-medium">
                          <p>🏥 Department: {selectedDoctor.department}</p>
                          <p>⭐ Experience: {selectedDoctor.experience} years</p>
                          <p>📧 Specialization: {selectedDoctor.specialization}</p>
                          <p className="text-lg font-bold mt-3">💰 Consultation Fee: ₹{selectedDoctor.fees}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Date Selection */}
                <div className="animate-fade-in-up animation-delay-200">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">📅 Only future dates allowed</p>
                </div>

                {/* Time Selection */}
                <div className="animate-fade-in-up animation-delay-300">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Appointment Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all bg-white"
                    required
                  >
                    <option value="">Select time slot...</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="animate-fade-in-up animation-delay-400">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Additional Notes <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-700 transition-all resize-none"
                    placeholder="Describe your symptoms, medical history, or any concerns..."
                    rows="4"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up animation-delay-500">
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      setError("");
                      setSuccess("");
                      if (!formData.doctorId || !formData.date || !formData.time) {
                        setError("Please fill all required fields");
                        return;
                      }
                      setSubmitting(true);
                      try {
                        const token = localStorage.getItem("token");
                        const res = await fetch("/api/appointments", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                          },
                          body: JSON.stringify(formData),
                        });
                        const data = await res.json();
                        if (!res.ok) {
                          setError(data.message || "Failed to book appointment");
                          return;
                        }
                        setSuccess("✅ Appointment booked successfully! Redirecting...");
                        setTimeout(() => {
                          router.push("/user/dashboard");
                        }, 2000);
                      } catch (error) {
                        setError("Something went wrong. Please try again.");
                        console.error("Error booking appointment:", error);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={submitting}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "🔄 Booking..." : "✓ Book Appointment"}
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "🔄 Processing..." : "💳 Proceed to Payment"}
                  </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded-lg animate-fade-in-up animation-delay-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">📌 Note:</span> Please ensure you select a future date. You will receive a confirmation email once your appointment is booked. Payment is optional.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Why Book With Us */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">Why Book With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md text-center animate-fade-in-up animation-delay-100 hover:shadow-lg transition">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="font-bold text-gray-800 mb-2">Easy Booking</h4>
                <p className="text-gray-600 text-sm">Simple and hassle-free appointment scheduling</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center animate-fade-in-up animation-delay-200 hover:shadow-lg transition">
                <div className="text-4xl mb-4">🏥</div>
                <h4 className="font-bold text-gray-800 mb-2">Expert Doctors</h4>
                <p className="text-gray-600 text-sm">Highly qualified and experienced specialists</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center animate-fade-in-up animation-delay-300 hover:shadow-lg transition">
                <div className="text-4xl mb-4">✅</div>
                <h4 className="font-bold text-gray-800 mb-2">Instant Confirmation</h4>
                <p className="text-gray-600 text-sm">Get immediate booking confirmation via email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
