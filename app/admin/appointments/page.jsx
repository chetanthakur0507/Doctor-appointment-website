"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminAppointments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      router.push("/admin/login");
      return;
    }
    fetchAppointments(token);
  }, [router]);

  const fetchAppointments = async (token) => {
    try {
      const res = await fetch("/api/admin/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load appointments");
        return;
      }
      // Sort by creation date (newest first)
      const sortedData = (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAppointments(sortedData);
    } catch (err) {
      console.error("Admin appointments error", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (appointmentId) => {
    setCompletingId(appointmentId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (res.ok) {
        setAppointments(
          appointments.map((apt) =>
            apt._id === appointmentId
              ? { ...apt, status: "completed", completedAt: new Date() }
              : apt
          )
        );
      } else {
        const data = await res.json();
        alert(data.message || "Failed to mark appointment complete");
      }
    } catch (err) {
      console.error("Error marking complete:", err);
      alert("Failed to mark appointment complete");
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="animate-fade-in-up flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                All Appointments 📋
              </h1>
              <p className="text-lg text-indigo-100">Manage and track all appointments across users</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>←</span>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-50 border-b border-indigo-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Session</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="border-b border-indigo-100 hover:bg-indigo-50 transition">
                      <td className="px-6 py-4">{apt.userId?.name || "User"}</td>
                      <td className="px-6 py-4">{apt.doctorId?.name || "Doctor"}</td>
                      <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{apt.time}</td>
                      <td className="px-6 py-4">#{apt.sessionNumber}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            apt.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {apt.status !== "completed" && apt.status !== "cancelled" && (
                          <button
                            onClick={() => markComplete(apt._id)}
                            disabled={completingId === apt._id}
                          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition font-semibold text-sm"
                        >
                          {completingId === apt._id ? "Marking..." : "✓ Mark Complete"}
                        </button>
                      )}
                      {apt.status === "completed" && (
                        <span className="text-green-600 font-semibold text-sm">
                          ✅ Completed on {apt.completedAt ? new Date(apt.completedAt).toLocaleDateString() : "N/A"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
