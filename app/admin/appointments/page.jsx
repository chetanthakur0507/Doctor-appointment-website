"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminAppointments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

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
      setAppointments(data || []);
    } catch (err) {
      console.error("Admin appointments error", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
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
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
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
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt._id} className="border-b border-gray-200">
                    <td className="px-6 py-4">{apt.userId?.name || "User"}</td>
                    <td className="px-6 py-4">{apt.doctorId?.name || "Doctor"}</td>
                    <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{apt.time}</td>
                    <td className="px-6 py-4">#{apt.sessionNumber}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 font-semibold">
                        {apt.status}
                      </span>
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
