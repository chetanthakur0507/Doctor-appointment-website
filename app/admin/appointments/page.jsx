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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Appointments</h1>
            <p className="text-gray-600">View every appointment across users</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doctor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Session</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt._id} className="border-b border-gray-200 hover:bg-gray-50">
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
  );
}
