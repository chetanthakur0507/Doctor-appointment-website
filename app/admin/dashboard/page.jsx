"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    doctors: 0,
    users: 0,
    appointments: 0,
    completed: 0,
    booked: 0,
    cancelled: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

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
    fetchData(token);
  }, [router]);

  const fetchData = async (token) => {
    try {
      const [doctorsRes, usersRes, appointmentsRes] = await Promise.all([
        fetch("/api/doctors"),
        fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const doctors = await doctorsRes.json();
      const users = await usersRes.json();
      const appointments = await appointmentsRes.json();

      if (!usersRes.ok || !appointmentsRes.ok) {
        setError("Failed to load admin data");
        setLoading(false);
        return;
      }

      setStats({
        doctors: doctors.length || 0,
        users: users.length || 0,
        appointments: appointments.length || 0,
        completed: appointments.filter((a) => a.status === "completed").length,
        booked: appointments.filter((a) => a.status === "booked").length,
        cancelled: appointments.filter((a) => a.status === "cancelled").length,
      });
      // Show only recent booked appointments (not completed) - sorted by creation date
      const recentBookedApts = appointments
        .filter((a) => a.status === "booked")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentAppointments(recentBookedApts);
    } catch (err) {
      console.error("Admin dashboard load error", err);
      setError("Failed to load data");
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
                Welcome to Admin 🎛️
              </h1>
              <p className="text-lg text-indigo-100">Manage doctors, users, and appointments across the platform</p>
            </div>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>🏠</span>
              Back to Home
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
          <StatCard title="Doctors" value={stats.doctors} color="blue" icon="👨‍⚕️" />
          <StatCard title="Users" value={stats.users} color="green" icon="👥" />
          <StatCard title="Total Appointments" value={stats.appointments} color="purple" icon="📋" />
          <StatCard title="Completed" value={stats.completed} color="emerald" icon="✅" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in-up animation-delay-100">
          <StatCard title="Upcoming (Booked)" value={stats.booked} color="blue" icon="📅" />
          <StatCard 
            title="Completion Rate" 
            value={stats.appointments > 0 ? Math.round((stats.completed / stats.appointments) * 100) + "%" : "0%"} 
            color="emerald" 
            icon="📊"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
            </div>
            <div className="space-y-3">
              <LinkCard href="/admin/doctors" label="Manage Doctors" />
              <LinkCard href="/admin/appointments" label="Manage Appointments" />
              <LinkCard href="/admin/users" label="View Users" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
              <Link href="/admin/appointments" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>
            {recentAppointments.length === 0 ? (
              <p className="text-gray-600">No appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {recentAppointments.map((apt) => (
                  <div key={apt._id} className="border border-gray-200 rounded-md px-4 py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{apt.doctorId?.name || "Doctor"}</p>
                        <p className="text-sm text-gray-600">{apt.userId?.name || "User"}</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {new Date(apt.date).toLocaleDateString()} {apt.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Status: {apt.status}</p>
                  </div>
                ))}
              </div>
            )}
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
    emerald: { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600" },
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

function LinkCard({ href, label }) {
  return (
    <Link
      href={href}
      className="block border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 text-gray-900 font-semibold"
    >
      {label}
    </Link>
  );
}
