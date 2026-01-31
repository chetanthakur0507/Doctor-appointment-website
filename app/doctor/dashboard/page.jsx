"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/auth/login");
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (userData?.role !== "doctor") {
        router.push(userData?.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
        return;
      }
      setUser(userData);
      fetchDoctorData(token);
    } catch (err) {
      console.error("Invalid user data", err);
      router.push("/auth/login");
    }
  }, [router]);

  const fetchDoctorData = async (token) => {
    try {
      const res = await fetch("/api/doctor/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load doctor data");
        return;
      }
      setDoctor(data.doctor || null);
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
    } catch (err) {
      console.error("Doctor dashboard error", err);
      setError("Failed to load doctor data");
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (appointmentId) => {
    setCompletingId(appointmentId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/doctor/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (res.ok) {
        const updated = await res.json();
        setAppointments((prev) =>
          prev.map((apt) => (apt._id === appointmentId ? updated : apt))
        );
      } else {
        const data = await res.json();
        setError(data.message || "Failed to mark appointment complete");
      }
    } catch (err) {
      console.error("Doctor complete error", err);
      setError("Failed to mark appointment complete");
    } finally {
      setCompletingId(null);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const token = localStorage.getItem("token");
      await fetchDoctorData(token);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const todayStr = new Date().toDateString();
  const todayCount = appointments.filter((a) => new Date(a.date).toDateString() === todayStr).length;
  const upcomingCount = appointments.filter((a) => a.status === "booked").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Welcome{user?.name ? `, Dr. ${user.name}` : ""}
            </p>
            {doctor && (
              <p className="text-sm text-gray-500 mt-1">
                {doctor.department} • {doctor.specialization}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base whitespace-nowrap disabled:opacity-50"
            >
              <span className={refreshing ? "animate-spin" : ""}>🔄</span>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <Link
              href="/doctor/profile"
              className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base whitespace-nowrap"
            >
              <span>✏️</span>
              Edit Profile
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-blue-600 rounded-lg font-semibold border border-blue-200 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base whitespace-nowrap"
            >
              <span>🏠</span>
              Back to Home
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Today" value={todayCount} color="blue" />
          <StatCard title="Upcoming" value={upcomingCount} color="green" />
          <StatCard title="Completed" value={completedCount} color="purple" />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td className="px-6 py-6 text-gray-600" colSpan={5}>
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt._id} className="border-b border-gray-200">
                      <td className="px-6 py-4">{apt.userId?.name || "Patient"}</td>
                      <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{apt.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          apt.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : apt.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {apt.userId?._id ? (
                            <Link
                              href={`/doctor/patients/${apt.userId?._id}`}
                              className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-semibold hover:bg-blue-100 transition"
                            >
                              View Profile
                            </Link>
                          ) : (
                            <span className="px-3 py-2 bg-gray-100 text-gray-500 rounded-md text-sm font-semibold">
                              No Profile
                            </span>
                          )}
                          {apt.status !== "completed" && apt.status !== "cancelled" ? (
                            <button
                              onClick={() => markComplete(apt._id)}
                              disabled={completingId === apt._id}
                              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition font-semibold text-sm"
                            >
                              {completingId === apt._id ? "Marking..." : "✓ Mark Complete"}
                            </button>
                          ) : (
                            <span className="text-gray-500 text-sm">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-600 font-semibold">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>{value}</p>
    </div>
  );
}
