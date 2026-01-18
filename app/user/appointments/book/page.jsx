"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();

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

      setSuccess("Appointment booked successfully!");
      setTimeout(() => {
        router.push("/user/dashboard");
      }, 2000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error booking appointment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const selectedDoctor = doctors.find((d) => d._id === formData.doctorId);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/user/dashboard" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Book an Appointment
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor *
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name} - {doctor.department} (₹{doctor.fees})
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Dr. {selectedDoctor.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Department: {selectedDoctor.department}
                </p>
                <p className="text-gray-600 text-sm">
                  Experience: {selectedDoctor.experience} years
                </p>
                <p className="text-gray-600 text-sm">
                  Consultation Fee: ₹{selectedDoctor.fees}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select time slot</option>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes or symptoms"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {submitting ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
