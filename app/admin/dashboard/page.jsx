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
      });
      setRecentAppointments(appointments.slice(0, 5));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of the platform</p>
          </div>
          <div className="space-x-3">
            <Link
              href="/"
              className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              View Site
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Doctors" value={stats.doctors} color="blue" />
          <StatCard title="Users" value={stats.users} color="green" />
          <StatCard title="Appointments" value={stats.appointments} color="purple" />
          <StatCard title="Completed" value={stats.completed} color="emerald" />
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
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-600 font-semibold">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>{value}</p>
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
