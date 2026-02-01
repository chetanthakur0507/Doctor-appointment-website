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
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="animate-fade-in-up flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                Welcome, Dr. {user?.name}! 👨‍⚕️
              </h1>
              <p className="text-lg text-blue-100">Manage your appointments and patient consultations</p>
              {doctor && (
                <p className="text-blue-200 mt-2 font-semibold">
                  {doctor.department} • {doctor.specialization}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <span className={refreshing ? "animate-spin" : ""}>🔄</span>
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
              <Link
                href="/doctor/profile"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>✏️</span>
                Edit Profile
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>🏠</span>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
          <StatCard title="Today" value={todayCount} color="blue" icon="📋" />
          <StatCard title="Upcoming" value={upcomingCount} color="green" icon="✅" />
          <StatCard title="Completed" value={completedCount} color="purple" icon="🎉" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900">Your Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b border-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td className="px-6 py-12 text-center text-gray-600" colSpan={5}>
                      <p className="text-6xl mb-4">📭</p>
                      <p className="text-lg">No appointments found.</p>
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt._id} className="border-b border-blue-100 hover:bg-blue-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{apt.userId?.name || "Patient"}</div>
                        {apt.notes?.trim() && (
                          <div className="text-xs text-gray-500 mt-1 max-w-[240px] truncate">
                            📝 {apt.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{new Date(apt.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-700">{apt.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
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
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const colorMap = {
    blue: { gradient: "from-blue-500 to-cyan-500", text: "text-blue-600" },
    green: { gradient: "from-green-500 to-emerald-500", text: "text-green-600" },
    purple: { gradient: "from-purple-500 to-indigo-500", text: "text-purple-600" },
  };
  
  const { gradient, text } = colorMap[color] || colorMap.blue;
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up">
      <div className={`bg-gradient-to-r ${gradient} h-24 flex items-center justify-center text-5xl`}>
        {icon}
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
        <p className={`text-4xl font-bold ${text}`}>{value}</p>
      </div>
    </div>
  );
}
